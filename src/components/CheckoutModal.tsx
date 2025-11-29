'use client'

import { useConnect, useAccount } from 'wagmi'

interface CheckoutModalProps {
  open: boolean
  onClose: () => void
  onPay: () => void
}

export default function CheckoutModal({ open, onClose, onPay }: CheckoutModalProps) {
  const { connectors, connect } = useConnect()
  const { isConnected } = useAccount()

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
          <p className="text-3xl font-bold text-gray-900 mb-2">2 AVAX</p>
          <p className="text-gray-600">Premium Subscription</p>
        </div>

        {!isConnected ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 mb-3">Connect your wallet to continue:</p>
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
          <button
            onClick={onPay}
            className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Pay 2 AVAX
          </button>
        )}
      </div>
    </div>
  )
}

