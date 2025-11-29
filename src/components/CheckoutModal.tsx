'use client'

import { useConnect, useAccount, useWriteContract, useWaitForTransactionReceipt, useSwitchChain, useDisconnect } from 'wagmi'
import { paymentsAbi, paymentsAddress, merchantAddress } from '@/lib/contract'
import { parseEther } from 'viem'
import { avalancheFuji } from 'wagmi/chains'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Wallet, CheckCircle2, Loader2, AlertCircle, ExternalLink } from 'lucide-react'

interface CheckoutModalProps {
  open: boolean
  onClose: () => void
  redirectTo?: string
  onSuccess?: () => void
}

export default function CheckoutModal({ open, onClose, redirectTo, onSuccess }: CheckoutModalProps) {
  const router = useRouter()
  const { connectors, connect } = useConnect()
  const { isConnected, address, chain, connector } = useAccount()
  const { data: hash, writeContract, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })
  const { switchChain } = useSwitchChain()
  const { disconnect } = useDisconnect()

  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationError, setVerificationError] = useState<string | null>(null)
  const [isVerified, setIsVerified] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)

  const isWrongNetwork = chain?.id !== avalancheFuji.id

  useEffect(() => {
    if (isSuccess && hash && !isVerified && !isVerifying) {
      verifyPayment()
    }
  }, [isSuccess, hash])

  const verifyPayment = async () => {
    if (!hash) return

    setIsVerifying(true)
    setVerificationError(null)

    try {
      console.log('Verifying payment on backend...')
      
      const response = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          txHash: hash,
          merchant: merchantAddress,
          amount: 0.01,
          plan_id: '4862ed5f-eca5-46fe-af4e-dceb575b6ff5',
          create_subscription: true,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.verified) {
        throw new Error(data.error || 'Payment verification failed')
      }

      console.log('Payment verified successfully:', data)
      if (data.subscription) {
        console.log('Subscription created:', data.subscription)
      }
      setIsVerified(true)

      if (data.subscription && address) {
        console.log('Checking access after subscription creation...')
        const accessResponse = await fetch('/api/access/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            wallet: address,
            merchant: merchantAddress,
          }),
        })

        const accessData = await accessResponse.json()
        console.log('Access check result:', accessData)

        if (accessData.access) {
          setHasAccess(true)
          
          if (onSuccess) {
            console.log('Calling onSuccess callback')
            setTimeout(() => {
              onSuccess()
              onClose()
            }, 2000)
          } else if (redirectTo) {
            setTimeout(() => {
              console.log('Redirecting to:', redirectTo)
              router.push(redirectTo)
            }, 2000)
          }
        }
      }
    } catch (err: any) {
      console.error('Verification error:', err)
      setVerificationError(err.message || 'Failed to verify payment')
    } finally {
      setIsVerifying(false)
    }
  }

  const handlePay = () => {
    console.log('Pay button clicked')
    console.log('Connected:', isConnected)
    console.log('Address:', address)
    console.log('Chain:', chain?.id, chain?.name)
    console.log('Contract:', paymentsAddress)
    
    if (isWrongNetwork) {
      console.log('Wrong network, switching to Fuji...')
      switchChain({ chainId: avalancheFuji.id })
      return
    }

    try {
      writeContract({
        address: paymentsAddress,
        abi: paymentsAbi,
        functionName: 'pay',
        args: [merchantAddress],
        value: parseEther('0.001'),
      })
      console.log('Transaction initiated')
    } catch (err) {
      console.error('Error calling writeContract:', err)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0E0E11] rounded-2xl border border-white/5 p-8 max-w-lg w-full mx-4 relative overflow-hidden group">
        {/* Background glow */}
        <div className="absolute -inset-4 bg-[#C3FF32]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Checkout</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-8 bg-[#050505] border border-white/5 rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-[#C3FF32] mb-2">0.001 AVAX</p>
            <p className="text-base text-gray-400">Premium Subscription</p>
          </div>

        {!isConnected ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Wallet className="text-[#C3FF32]" size={20} />
              <p className="text-sm text-gray-300">Connect your wallet:</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => connect({ connector })}
                  className="aspect-square bg-white/5 border border-white/10 rounded-xl hover:border-[#C3FF32]/50 hover:bg-white/10 transition-all flex items-center justify-center group relative overflow-hidden"
                  title={connector.name}
                >
                  <div className="absolute inset-0 bg-[#C3FF32]/1 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {connector.icon ? (
                    <img 
                      src={connector.icon} 
                      alt={connector.name}
                      className="w-10 h-10 object-contain relative z-10"
                    />
                  ) 
                  : (
                    <Wallet size={32} className="text-[#C3FF32] relative z-10" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {isWrongNetwork && (
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <p className="text-yellow-400 text-sm font-semibold flex items-center gap-2 mb-1">
                  <AlertCircle size={16} />
                  Wrong Network
                </p>
                <p className="text-yellow-300/80 text-xs">Please switch to Avalanche Fuji</p>
              </div>
            )}

            <div className="text-xs bg-white/5 border border-white/5 p-4 rounded-xl">
              <p className="font-semibold text-white mb-2 flex items-center gap-2">
                <Wallet size={14} className="text-[#C3FF32]" />
                {connector?.name || 'Unknown'}
              </p>
              <p className="text-gray-400 font-mono mb-1">Address: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
              <p className="text-gray-400 mb-3">Network: {chain?.name} (ID: {chain?.id})</p>
              <button
                onClick={() => disconnect()}
                className="text-red-400 hover:text-red-300 text-xs font-semibold transition-colors"
              >
                Disconnect & Switch Wallet
              </button>
            </div>

            <button
              onClick={handlePay}
              disabled={isPending || isConfirming}
              className="w-full px-6 py-4 bg-[#C3FF32] text-black rounded-lg hover:bg-[#b0e62e] transition-all font-bold disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(195,255,50,0.3)] disabled:shadow-none"
            >
              {isPending || isConfirming ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {isPending ? 'Confirm in Wallet...' : 'Processing...'}
                </>
              ) : isWrongNetwork ? (
                'Switch to Fuji Network'
              ) : (
                <>
                  Pay 0.001 AVAX
                  <ExternalLink size={18} />
                </>
              )}
            </button>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-xs font-semibold flex items-center gap-1.5 mb-1">
                  <AlertCircle size={14} />
                  Error
                </p>
                <p className="text-red-300/80 text-[10px] mt-1">{error.message}</p>
              </div>
            )}

            {isSuccess && (
              <div className="space-y-2">
                <div className="p-3 bg-[#C3FF32]/10 border border-[#C3FF32]/20 rounded-lg">
                  <p className="text-[#C3FF32] font-semibold flex items-center gap-1.5 mb-1 text-xs">
                    <CheckCircle2 size={14} />
                    Transaction Confirmed!
                  </p>
                  <p className="text-gray-400 text-[10px] mt-1 font-mono">Tx: {hash?.slice(0, 10)}...</p>
                </div>

                {isVerifying && (
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-blue-400 text-xs flex items-center gap-1.5">
                      <Loader2 size={14} className="animate-spin" />
                      Verifying payment on backend...
                    </p>
                  </div>
                )}

                {isVerified && (
                  <div className="space-y-2">
                    <div className="p-3 bg-[#C3FF32]/10 border border-[#C3FF32]/30 rounded-lg">
                      <p className="text-[#C3FF32] font-semibold text-xs flex items-center gap-1.5">
                        <CheckCircle2 size={14} />
                        Payment Verified & Subscription Created!
                      </p>
                    </div>
                    {hasAccess && redirectTo && (
                      <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <p className="text-blue-400 font-semibold text-xs flex items-center gap-1.5">
                          <CheckCircle2 size={14} />
                          Access Granted! Redirecting...
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {verificationError && (
                  <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <p className="text-orange-400 text-xs font-semibold flex items-center gap-1.5 mb-1">
                      <AlertCircle size={14} />
                      Verification Warning
                    </p>
                    <p className="text-orange-300/80 text-[10px] mt-1">{verificationError}</p>
                    <p className="text-orange-300/60 text-[10px] mt-1">Payment was sent but backend verification failed.</p>
                  </div>
                )}
              </div>
            )}

            {hash && !isSuccess && (
              <p className="text-xs text-gray-400 text-center font-mono">
                Transaction submitted: {hash.slice(0, 10)}...
              </p>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

