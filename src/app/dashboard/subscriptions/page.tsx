'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { Navbar } from '@/components/ui'
import { Loader2, AlertCircle, CheckCircle2, XCircle, Clock, Users } from 'lucide-react'

interface Subscription {
  id: string
  payer_wallet: string
  status: string
  current_period_end: number
  created_at: string
  plans: {
    name: string
    amount: string
    interval: string
  }
}

export default function SubscriptionsDashboard() {
  const { address } = useAccount()
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (address) {
      fetchSubscriptions()
    }
  }, [address])

  const fetchSubscriptions = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/subscriptions/list?merchant=${address}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch subscriptions')
      }

      setSubscriptions(data.subscriptions)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-[#C3FF32]/10 border border-[#C3FF32]/20 text-[#C3FF32]'
      case 'canceled':
        return 'bg-red-500/10 border border-red-500/20 text-red-400'
      case 'expired':
        return 'bg-gray-500/10 border border-gray-500/20 text-gray-400'
      case 'payment_required':
        return 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
      default:
        return 'bg-gray-500/10 border border-gray-500/20 text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 size={14} />
      case 'canceled':
        return <XCircle size={14} />
      case 'expired':
        return <Clock size={14} />
      default:
        return <Clock size={14} />
    }
  }

  if (!address) {
    return (
      <div className="bg-[#0A0A0C] min-h-screen text-white font-sans">
        <Navbar />
        <main className="min-h-screen pt-32 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-[#0E0E11] rounded-2xl border border-white/5 p-8 text-center">
              <p className="text-gray-400">Please connect your wallet to view subscriptions.</p>
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
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#C3FF32]/5 blur-[120px] rounded-full"></div>
          </div>

          <div className="relative z-10 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Subscription Dashboard</h1>
            <p className="text-gray-400 text-lg">
              Manage subscriptions for merchant: <span className="font-mono text-[#C3FF32]">{address.slice(0, 6)}...{address.slice(-4)}</span>
            </p>
          </div>

          {loading ? (
            <div className="bg-[#0E0E11] rounded-2xl border border-white/5 p-8 text-center">
              <Loader2 className="animate-spin h-8 w-8 text-[#C3FF32] mx-auto mb-4" />
              <p className="text-gray-400">Loading subscriptions...</p>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
              <p className="text-red-400 font-semibold flex items-center gap-2 mb-1">
                <AlertCircle size={18} />
                Error
              </p>
              <p className="text-red-300/80 text-sm mt-1">{error}</p>
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="bg-[#0E0E11] rounded-2xl border border-white/5 p-8 text-center">
              <p className="text-gray-400">No subscriptions found for this merchant.</p>
            </div>
          ) : (
            <div className="bg-[#0E0E11] rounded-2xl border border-white/5 overflow-hidden relative group hover:border-[#C3FF32]/30 transition-all">
              <div className="absolute -inset-4 bg-[#C3FF32]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 overflow-x-auto">
                <table className="min-w-full divide-y divide-white/5">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Customer Wallet
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Period End
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#0E0E11] divide-y divide-white/5">
                    {subscriptions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-mono">
                          {sub.payer_wallet.slice(0, 6)}...{sub.payer_wallet.slice(-4)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {sub.plans?.name || 'N/A'}
                          <span className="text-gray-400 text-xs ml-2">
                            ({sub.plans?.interval || 'N/A'})
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#C3FF32] font-semibold">
                          {sub.plans?.amount ? (parseFloat(sub.plans.amount) / 1e18).toFixed(4) : '0'} AVAX
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 w-fit border ${getStatusColor(sub.status)}`}>
                            {getStatusIcon(sub.status)}
                            {sub.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {formatDate(sub.current_period_end)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {new Date(sub.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-8 bg-[#0E0E11] rounded-2xl border border-white/5 p-6">
            <p className="text-white font-semibold text-base mb-3 flex items-center gap-2">
              <Users size={18} className="text-[#C3FF32]" />
              Total Subscriptions: <span className="text-[#C3FF32]">{subscriptions.length}</span>
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <p className="text-[#C3FF32] text-2xl font-bold">{subscriptions.filter(s => s.status === 'active').length}</p>
                <p className="text-gray-400 text-xs mt-1">Active</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <p className="text-red-400 text-2xl font-bold">{subscriptions.filter(s => s.status === 'canceled').length}</p>
                <p className="text-gray-400 text-xs mt-1">Canceled</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <p className="text-gray-400 text-2xl font-bold">{subscriptions.filter(s => s.status === 'expired').length}</p>
                <p className="text-gray-400 text-xs mt-1">Expired</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

