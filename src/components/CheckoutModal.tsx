'use client'

import { useConnect, useAccount, useWriteContract, useWaitForTransactionReceipt, useSwitchChain, useDisconnect } from 'wagmi'
import { paymentsAbi, paymentsAddress, merchantAddress } from '@/lib/contract'
import { parseEther } from 'viem'
import { avalancheFuji } from 'wagmi/chains'

interface CheckoutModalProps {
  open: boolean
  onClose: () => void
}

export default function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { connectors, connect } = useConnect()
  const { isConnected, address, chain, connector } = useAccount()
  const { data: hash, writeContract, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })
  const { switchChain } = useSwitchChain()
  const { disconnect } = useDisconnect()

  const isWrongNetwork = chain?.id !== avalancheFuji.id

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
        value: parseEther('0.01'),
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
          <p className="text-3xl font-bold text-gray-900 mb-2">0.01 AVAX</p>
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
              {isWrongNetwork ? 'Switch to Fuji Network' : isPending ? 'Confirm in Wallet...' : isConfirming ? 'Processing...' : 'Pay 0.01 AVAX'}
            </button>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-semibold">Error</p>
                <p className="text-red-600 text-xs mt-1">{error.message}</p>
              </div>
            )}

            {isSuccess && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-semibold">Payment Successful!</p>
                <p className="text-green-600 text-sm mt-1">Transaction hash: {hash?.slice(0, 10)}...</p>
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

