'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import AvaxCheckout from '@/components/AvaxCheckout'
import { merchantAddress } from '@/lib/contract'

export default function ProtectedPage() {
  const { address, isConnected } = useAccount()
  const router = useRouter()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null)
  const [showCheckout, setShowCheckout] = useState(false)

  useEffect(() => {
    if (isConnected && address) {
      checkAccess()
    } else {
      setLoading(false)
    }
  }, [address, isConnected])

  const checkAccess = async () => {
    if (!address) return

    try {
      setLoading(true)
      const response = await fetch('/api/access/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet: address,
          merchant: merchantAddress,
        }),
      })

      const data = await response.json()
      setHasAccess(data.access)

      if (data.access && data.subscription) {
        setSubscriptionInfo(data.subscription)
      }
    } catch (error) {
      console.error('Error checking access:', error)
      setHasAccess(false)
    } finally {
      setLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-md w-full mx-4 bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600">Please connect your wallet to access this content.</p>
          </div>
          <button
            onClick={() => router.push('/checkout-demo')}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Connect Wallet
          </button>
        </div>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </main>
    )
  }

  if (hasAccess === false) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-md w-full mx-4 bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-1">
              This content is only available to subscribers.
            </p>
            <p className="text-sm text-gray-500">
              Wallet: {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-900 text-sm font-semibold mb-2">Get Access Now</p>
            <p className="text-blue-700 text-xs">
              Subscribe to unlock premium content and features.
            </p>
          </div>

          {showCheckout ? (
            <AvaxCheckout 
              onSuccess={() => {
                setShowCheckout(false)
                checkAccess()
              }}
            />
          ) : (
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              Subscribe Now
            </button>
          )}

          <button
            onClick={checkAccess}
            className="mt-4 text-sm text-gray-600 hover:text-gray-800"
          >
            Already subscribed? Refresh
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                🎉 Premium Content Unlocked!
              </h1>
              <p className="text-gray-600">
                Welcome to exclusive subscriber-only content.
              </p>
            </div>
            <div className="bg-green-100 px-4 py-2 rounded-full">
              <span className="text-green-800 font-semibold text-sm">✓ Active</span>
            </div>
          </div>

          {subscriptionInfo && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Your Subscription</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Plan</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {subscriptionInfo.plan || 'Premium'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Expires</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {new Date(subscriptionInfo.expires * 1000).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Exclusive Premium Content
          </h2>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4">
              This is your protected content area. Only subscribers with active subscriptions can view this page.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  📊 Premium Analytics
                </h3>
                <p className="text-gray-600 text-sm">
                  Access to advanced analytics and insights dashboard.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  🔐 API Access
                </h3>
                <p className="text-gray-600 text-sm">
                  Full API access with increased rate limits.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  🎓 Educational Content
                </h3>
                <p className="text-gray-600 text-sm">
                  Exclusive tutorials and documentation.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  💬 Priority Support
                </h3>
                <p className="text-gray-600 text-sm">
                  Get help faster with priority support access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

