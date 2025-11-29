'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle2, ArrowRight, BarChart3, Key, BookOpen, HeadphonesIcon, RefreshCw, Wallet } from 'lucide-react'
import AvaxCheckout from '@/components/AvaxCheckout'
import { merchantAddress } from '@/lib/contract'
import { Navbar } from '@/components/ui'

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
      <div className="bg-[#0A0A0C] min-h-screen text-white font-sans">
        <Navbar />
        <main className="min-h-screen flex items-center justify-center px-4 pt-32 pb-16">
          <div className="max-w-2xl w-full text-center">
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C3FF32]/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Access Denied
              </h1>
              <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
                Please connect your wallet to access this content.
              </p>

              {/* Card */}
              <div className="bg-[#0E0E11] rounded-2xl border border-white/5 p-8 relative overflow-hidden group hover:border-[#C3FF32]/30 transition-all">
                <div className="absolute -inset-4 bg-[#C3FF32]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <button
                    onClick={() => router.push('/checkout-demo')}
                    className="px-10 py-4 bg-[#C3FF32] text-black rounded-xl font-bold text-base tracking-tight hover:bg-[#b0e62e] transition-all duration-200 shadow-[0_0_30px_rgba(195,255,50,0.4)] hover:shadow-[0_0_40px_rgba(195,255,50,0.5)] active:scale-[0.98] flex items-center justify-center gap-2 mx-auto"
                  >
                    <Wallet size={20} />
                    Connect Wallet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="bg-[#0A0A0C] min-h-screen text-white font-sans">
        <Navbar />
        <main className="min-h-screen flex items-center justify-center px-4 pt-32">
          <div className="text-center">
            <div className="relative">
              <Loader2 className="animate-spin h-12 w-12 text-[#C3FF32] mx-auto mb-4" />
              <div className="absolute inset-0 bg-[#C3FF32]/20 blur-xl rounded-full"></div>
            </div>
            <p className="text-gray-400 text-lg">Verifying access...</p>
          </div>
        </main>
      </div>
    )
  }

  if (hasAccess === false) {
    return (
      <div className="bg-[#0A0A0C] min-h-screen text-white font-sans">
        <Navbar />
        <main className="min-h-screen flex items-center justify-center px-4 pt-32 pb-16">
          <div className="max-w-2xl w-full text-center">
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C3FF32]/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Access Denied
              </h1>
              <p className="text-gray-400 text-lg mb-2 max-w-xl mx-auto">
                This content is only available to subscribers.
              </p>
              <p className="text-sm text-gray-500 mb-12 font-mono">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>

              {/* Card */}
              <div className="bg-[#0E0E11] rounded-2xl border border-white/5 p-8 relative overflow-hidden group hover:border-[#C3FF32]/30 transition-all">
                <div className="absolute -inset-4 bg-[#C3FF32]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  {showCheckout ? (
                    <AvaxCheckout 
                      onSuccess={() => {
                        setShowCheckout(false)
                        checkAccess()
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="text-center mb-2">
                        <p className="text-sm text-gray-400 mb-1">Premium Subscription</p>
                        <p className="text-2xl font-bold text-white">
                          0.001 <span className="text-[#C3FF32]">AVAX</span>
                        </p>
                      </div>
                      <button
                        onClick={() => setShowCheckout(true)}
                        className="relative px-10 py-4 bg-[#C3FF32] text-black rounded-xl font-bold text-base tracking-tight hover:bg-[#b0e62e] transition-all duration-200 shadow-[0_0_30px_rgba(195,255,50,0.4)] hover:shadow-[0_0_40px_rgba(195,255,50,0.5)] active:scale-[0.98]"
                      >
                        <span className="relative z-10">Subscribe Now</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity"></div>
                      </button>
                      <p className="text-xs text-gray-500 mt-1">One-time payment • Instant access</p>
                    </div>
                  )}

                  <button
                    onClick={checkAccess}
                    className="mt-6 text-sm text-gray-400 hover:text-[#C3FF32] transition-colors flex items-center justify-center gap-2 mx-auto"
                  >
                    <RefreshCw size={14} />
                    Already subscribed? Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="bg-[#0A0A0C] min-h-screen text-white font-sans">
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Success Header Card */}
          <div className="bg-[#0E0E11] rounded-2xl border border-white/5 p-8 mb-8 relative overflow-hidden group hover:border-[#C3FF32]/30 transition-all">
            {/* Background glow */}
            <div className="absolute -inset-4 bg-[#C3FF32]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#C3FF32]/10 border border-[#C3FF32]/20 rounded-xl flex items-center justify-center">
                    <CheckCircle2 size={24} className="text-[#C3FF32]" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      Premium Content Unlocked!
                    </h1>
                    <p className="text-gray-400">
                      Welcome to exclusive subscriber-only content.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#C3FF32]/10 border border-[#C3FF32]/20 px-6 py-3 rounded-xl">
                <span className="text-[#C3FF32] font-bold text-sm flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  Active Subscription
                </span>
              </div>
            </div>

            {subscriptionInfo && (
              <div className="relative z-10 mt-8 bg-white/5 border border-white/5 rounded-xl p-6">
                <p className="text-sm text-gray-400 mb-4 uppercase tracking-wider">Your Subscription</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Plan</p>
                    <p className="text-lg font-bold text-white">
                      {subscriptionInfo.plan || 'Premium'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Expires</p>
                    <p className="text-lg font-bold text-white">
                      {new Date(subscriptionInfo.expires * 1000).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Premium Content Grid */}
          <div className="bg-[#0E0E11] rounded-2xl border border-white/5 p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Exclusive Premium Content
            </h2>
            
            <p className="text-gray-400 mb-8 max-w-2xl">
              This is your protected content area. Only subscribers with active subscriptions can view this page.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#050505] border border-white/5 rounded-xl p-6 hover:border-[#C3FF32]/30 transition-all group relative overflow-hidden">
                <div className="absolute -inset-4 bg-[#C3FF32]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-[#C3FF32]/10 border border-[#C3FF32]/20 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 size={24} className="text-[#C3FF32]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Premium Analytics
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Access to advanced analytics and insights dashboard.
                  </p>
                </div>
              </div>

              <div className="bg-[#050505] border border-white/5 rounded-xl p-6 hover:border-[#C3FF32]/30 transition-all group relative overflow-hidden">
                <div className="absolute -inset-4 bg-[#C3FF32]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-[#C3FF32]/10 border border-[#C3FF32]/20 rounded-lg flex items-center justify-center mb-4">
                    <Key size={24} className="text-[#C3FF32]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    API Access
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Full API access with increased rate limits.
                  </p>
                </div>
              </div>

              <div className="bg-[#050505] border border-white/5 rounded-xl p-6 hover:border-[#C3FF32]/30 transition-all group relative overflow-hidden">
                <div className="absolute -inset-4 bg-[#C3FF32]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-[#C3FF32]/10 border border-[#C3FF32]/20 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen size={24} className="text-[#C3FF32]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Educational Content
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Exclusive tutorials and documentation.
                  </p>
                </div>
              </div>

              <div className="bg-[#050505] border border-white/5 rounded-xl p-6 hover:border-[#C3FF32]/30 transition-all group relative overflow-hidden">
                <div className="absolute -inset-4 bg-[#C3FF32]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-[#C3FF32]/10 border border-[#C3FF32]/20 rounded-lg flex items-center justify-center mb-4">
                    <HeadphonesIcon size={24} className="text-[#C3FF32]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Priority Support
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Get help faster with priority support access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

