'use client'

import { useConnect, useAccount, useWriteContract, useWaitForTransactionReceipt, useSwitchChain, useDisconnect } from 'wagmi'
import { paymentsAbi, paymentsAddress, merchantAddress } from '@/lib/contract'
import { parseEther } from 'viem'
import { avalancheFuji } from 'wagmi/chains'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <p className="text-3xl font-bold text-gray-900 mb-2">0.001 AVAX</p>
          <p className="text-gray-600">Premium Subscription</p>
        </div>

        {!isConnected ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 mb-3">Connect your wallet to continue:</p>
            <p className="text-xs text-blue-600 mb-2">💡 Make sure MetaMask extension is enabled</p>
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => connect({ connector })}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Connect {connector.name}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {isWrongNetwork && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm font-semibold">Wrong Network</p>
                <p className="text-yellow-700 text-xs mt-1">Please switch to Avalanche Fuji</p>
              </div>
            )}

            <div className="text-xs bg-gray-50 p-3 rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-700 mb-1">Wallet: {connector?.name || 'Unknown'}</p>
              <p className="text-gray-600">Address: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
              <p className="text-gray-600">Network: {chain?.name} (ID: {chain?.id})</p>
              <button
                onClick={() => disconnect()}
                className="mt-2 text-red-600 hover:text-red-700 text-xs font-semibold"
              >
                Disconnect & Switch Wallet
              </button>
            </div>

            <button
              onClick={handlePay}
              disabled={isPending || isConfirming}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isWrongNetwork ? 'Switch to Fuji Network' : isPending ? 'Confirm in Wallet...' : isConfirming ? 'Processing...' : 'Pay 0.001 AVAX'}
            </button>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-semibold">Error</p>
                <p className="text-red-600 text-xs mt-1">{error.message}</p>
              </div>
            )}

            {isSuccess && (
              <div className="space-y-2">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-semibold">Transaction Confirmed!</p>
                  <p className="text-green-600 text-sm mt-1">Tx: {hash?.slice(0, 10)}...</p>
                </div>

                {isVerifying && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-700 text-sm">Verifying payment on backend...</p>
                  </div>
                )}

                {isVerified && (
                  <div className="space-y-2">
                    <div className="p-3 bg-green-50 border border-green-300 rounded-lg">
                      <p className="text-green-800 font-semibold text-sm">✓ Payment Verified & Subscription Created!</p>
                    </div>
                    {hasAccess && redirectTo && (
                      <div className="p-3 bg-blue-50 border border-blue-300 rounded-lg">
                        <p className="text-blue-800 font-semibold text-sm">✓ Access Granted! Redirecting...</p>
                      </div>
                    )}
                  </div>
                )}

                {verificationError && (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-orange-800 text-sm font-semibold">Verification Warning</p>
                    <p className="text-orange-700 text-xs mt-1">{verificationError}</p>
                    <p className="text-orange-600 text-xs mt-1">Payment was sent but backend verification failed.</p>
                  </div>
                )}
              </div>
            )}

            {hash && !isSuccess && (
              <p className="text-sm text-gray-600 text-center">
                Transaction submitted: {hash.slice(0, 10)}...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

