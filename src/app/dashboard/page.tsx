'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/landing'
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp, 
  ArrowRight,
  FileText,
  RefreshCw,
  Loader2,
  Activity
} from 'lucide-react'

interface DashboardStats {
  totalRevenue: number
  totalPayments: number
  activeSubscriptions: number
  canceledSubscriptions: number
  expiredSubscriptions: number
  totalSubscriptions: number
}

interface ChartDataPoint {
  date: string
  revenue: number
  count: number
}

export default function DashboardPage() {
  const { address } = useAccount()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalPayments: 0,
    activeSubscriptions: 0,
    canceledSubscriptions: 0,
    expiredSubscriptions: 0,
    totalSubscriptions: 0
  })
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])

  useEffect(() => {
    if (address) {
      fetchDashboardData()
    } else {
      setLoading(false)
    }
  }, [address])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch payments and subscriptions in parallel
      const [paymentsResponse, subsResponse] = await Promise.all([
        fetch(`/api/payments/list?merchant=${address}`),
        fetch(`/api/subscriptions/list?merchant=${address}`)
      ])
      
      const paymentsData = await paymentsResponse.json()
      const subsData = await subsResponse.json()
      
      let totalRevenue = 0
      let totalPayments = 0
      let activeSubscriptions = 0
      let canceledSubscriptions = 0
      let expiredSubscriptions = 0
      let totalSubscriptions = 0
      
      // Process payments data
      if (paymentsResponse.ok && paymentsData) {
        console.log('Payments response:', paymentsData)
        totalRevenue = paymentsData.totalRevenue || 0
        totalPayments = paymentsData.count || 0
        
        // Process chart data - group by date
        if (paymentsData.payments && paymentsData.payments.length > 0) {
          const dataMap = new Map<string, { revenue: number; count: number; timestamp: number }>()
          
          paymentsData.payments.forEach((payment: any) => {
            // Handle timestamp - it's stored as string, convert to number
            let timestamp = payment.timestamp
            if (typeof timestamp === 'string') {
              timestamp = parseInt(timestamp)
            }
            if (!timestamp || isNaN(timestamp)) {
              console.warn('Invalid timestamp in payment:', payment)
              return
            }
            
            // Timestamp is in seconds, convert to milliseconds for Date
            const date = new Date(timestamp * 1000)
            const dateKey = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            
            const revenue = parseFloat(payment.amount) / 1e18
            if (isNaN(revenue)) {
              console.warn('Invalid amount in payment:', payment)
              return
            }
            
            const existing = dataMap.get(dateKey) || { revenue: 0, count: 0, timestamp: timestamp }
            
            dataMap.set(dateKey, {
              revenue: existing.revenue + revenue,
              count: existing.count + 1,
              timestamp: timestamp // Keep original timestamp for sorting
            })
          })
          
          // Convert to array and sort by timestamp
          const chartDataArray = Array.from(dataMap.entries())
            .map(([date, data]) => ({ date, ...data }))
            .sort((a, b) => a.timestamp - b.timestamp)
            .slice(-7) // Last 7 days
            .map(({ timestamp, ...rest }) => rest) // Remove timestamp from final data
          
          setChartData(chartDataArray)
        }
      }
      
      // Process subscriptions data
      if (subsResponse.ok && subsData.subscriptions) {
        const subscriptions = subsData.subscriptions
        activeSubscriptions = subscriptions.filter((s: any) => s.status === 'active').length
        canceledSubscriptions = subscriptions.filter((s: any) => s.status === 'canceled').length
        expiredSubscriptions = subscriptions.filter((s: any) => s.status === 'expired').length
        totalSubscriptions = subscriptions.length
      }
      
      setStats({
        totalRevenue,
        totalPayments,
        activeSubscriptions,
        canceledSubscriptions,
        expiredSubscriptions,
        totalSubscriptions
      })
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!address) {
    return (
      <div className="bg-[#0A0A0C] min-h-screen text-white font-sans">
        <Navbar />
        <main className="min-h-screen pt-32 pb-16 px-4 flex items-center justify-center">
          <div className="bg-[#0E0E11] rounded-2xl border border-white/5 p-8 text-center max-w-md">
            <p className="text-gray-400">Please connect your wallet to view the dashboard.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="bg-[#0A0A0C] min-h-screen text-white font-sans">
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#C3FF32]/5 blur-[120px] rounded-full"></div>
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-gray-400 text-lg">
                Overview of your commerce analytics and subscriptions
              </p>
              <p className="text-sm text-gray-500 mt-2 font-mono">
                Merchant: {address.slice(0, 6)}...{address.slice(-4)}
              </p>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Total Revenue Card */}
              <div className="bg-[#0E0E11] rounded-2xl border border-[#C3FF32]/20 p-6 relative overflow-hidden group hover:border-[#C3FF32]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(195,255,50,0.3)]">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C3FF32]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#C3FF32]/10 border border-[#C3FF32]/20 rounded-xl flex items-center justify-center">
                      <DollarSign size={24} className="text-[#C3FF32]" />
                    </div>
                    <TrendingUp size={20} className="text-[#C3FF32]" />
                  </div>
                  <p className="text-gray-400 text-sm mb-2">Total Revenue</p>
                  {loading ? (
                    <Loader2 className="animate-spin h-6 w-6 text-[#C3FF32]" />
                  ) : (
                    <p className="text-3xl font-bold text-white">
                      {stats.totalRevenue.toFixed(4)} <span className="text-[#C3FF32] text-xl">AVAX</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Active Subscriptions Card */}
              <div className="bg-[#0E0E11] rounded-2xl border border-[#C3FF32]/20 p-6 relative overflow-hidden group hover:border-[#C3FF32]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(195,255,50,0.3)]">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C3FF32]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#C3FF32]/10 border border-[#C3FF32]/20 rounded-xl flex items-center justify-center">
                      <Users size={24} className="text-[#C3FF32]" />
                    </div>
                    <Activity size={20} className="text-[#C3FF32]" />
                  </div>
                  <p className="text-gray-400 text-sm mb-2">Active Subscriptions</p>
                  {loading ? (
                    <Loader2 className="animate-spin h-6 w-6 text-[#C3FF32]" />
                  ) : (
                    <p className="text-3xl font-bold text-white">
                      {stats.activeSubscriptions}
                    </p>
                  )}
                </div>
              </div>

              {/* Total Payments Card */}
              <div className="bg-[#0E0E11] rounded-2xl border border-[#C3FF32]/20 p-6 relative overflow-hidden group hover:border-[#C3FF32]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(195,255,50,0.3)]">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C3FF32]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#C3FF32]/10 border border-[#C3FF32]/20 rounded-xl flex items-center justify-center">
                      <BarChart3 size={24} className="text-[#C3FF32]" />
                    </div>
                    <TrendingUp size={20} className="text-[#C3FF32]" />
                  </div>
                  <p className="text-gray-400 text-sm mb-2">Total Payments</p>
                  {loading ? (
                    <Loader2 className="animate-spin h-6 w-6 text-[#C3FF32]" />
                  ) : (
                    <p className="text-3xl font-bold text-white">
                      {stats.totalPayments}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Analytics Card */}
              <div 
                onClick={() => router.push('/dashboard/analytics')}
                className="bg-[#0E0E11] rounded-2xl border border-[#C3FF32]/20 p-8 relative overflow-hidden group hover:border-[#C3FF32]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(195,255,50,0.3)] cursor-pointer"
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C3FF32]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -inset-4 bg-[#C3FF32]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-[#C3FF32]/10 border border-[#C3FF32]/20 rounded-xl flex items-center justify-center">
                      <BarChart3 size={32} className="text-[#C3FF32]" />
                    </div>
                    <ArrowRight size={24} className="text-[#C3FF32] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Analytics</h3>
                  <p className="text-gray-400 text-base mb-6">
                    Run AI agents to generate invoices, manage renewals, and get comprehensive revenue insights.
                  </p>
                  <div className="flex items-center gap-2 text-[#C3FF32] font-semibold">
                    <span>View Analytics</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Subscriptions Card */}
              <div 
                onClick={() => router.push('/dashboard/subscriptions')}
                className="bg-[#0E0E11] rounded-2xl border border-[#C3FF32]/20 p-8 relative overflow-hidden group hover:border-[#C3FF32]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(195,255,50,0.3)] cursor-pointer"
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C3FF32]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -inset-4 bg-[#C3FF32]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-[#C3FF32]/10 border border-[#C3FF32]/20 rounded-xl flex items-center justify-center">
                      <Users size={32} className="text-[#C3FF32]" />
                    </div>
                    <ArrowRight size={24} className="text-[#C3FF32] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Subscriptions</h3>
                  <p className="text-gray-400 text-base mb-6">
                    Manage all your subscriptions, view customer details, and track subscription status.
                  </p>
                  <div className="flex items-center gap-2 text-[#C3FF32] font-semibold">
                    <span>View Subscriptions</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-[#0E0E11] rounded-2xl border border-white/5 p-8 relative overflow-hidden group hover:border-[#C3FF32]/30 transition-all">
              <div className="absolute -inset-4 bg-[#C3FF32]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Revenue Overview</h2>
                  <div className="text-sm text-gray-400">
                    Last 7 days
                  </div>
                </div>
                
                {loading ? (
                  <div className="bg-[#050505] border border-white/5 rounded-xl p-12 flex items-center justify-center min-h-[300px]">
                    <Loader2 className="animate-spin h-8 w-8 text-[#C3FF32]" />
                  </div>
                ) : chartData.length === 0 ? (
                  <div className="bg-[#050505] border border-white/5 rounded-xl p-12 flex items-center justify-center min-h-[300px]">
                    <div className="text-center">
                      <BarChart3 size={48} className="text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-500 font-mono text-sm">No payment data yet</p>
                      <p className="text-gray-600 text-xs mt-2">Revenue trends will appear here once you receive payments</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#050505] border border-white/5 rounded-xl p-6">
                    {/* Chart Container */}
                    <div className="relative h-64 mb-6">
                      <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                        {/* Grid lines */}
                        <defs>
                          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#C3FF32" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#C3FF32" stopOpacity="0" />
                          </linearGradient>
                          <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                        
                        {/* Horizontal grid lines */}
                        {[0, 1, 2, 3, 4].map((i) => (
                          <line
                            key={i}
                            x1="0"
                            y1={40 + i * 40}
                            x2="800"
                            y2={40 + i * 40}
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="1"
                          />
                        ))}
                        
                        {chartData.length > 0 && (() => {
                          const maxRevenue = Math.max(...chartData.map(p => p.revenue), 0.001)
                          const minRevenue = 0
                          const range = maxRevenue - minRevenue || 0.001
                          const width = 800
                          const height = 160
                          const padding = 40
                          const chartWidth = width - padding * 2
                          const chartHeight = height - padding * 2
                          const stepX = chartData.length > 1 ? chartWidth / (chartData.length - 1) : 0
                          
                          // Generate points
                          const points = chartData.map((point, index) => {
                            const x = padding + (index * stepX)
                            const y = padding + chartHeight - ((point.revenue - minRevenue) / range) * chartHeight
                            return { x, y, ...point }
                          })
                          
                          // Create area path
                          const areaPath = points.reduce((path, point, index) => {
                            if (index === 0) {
                              return `M ${point.x} ${padding + chartHeight} L ${point.x} ${point.y}`
                            }
                            return `${path} L ${point.x} ${point.y}`
                          }, '') + ` L ${points[points.length - 1].x} ${padding + chartHeight} Z`
                          
                          // Create line path
                          const linePath = points.reduce((path, point, index) => {
                            if (index === 0) {
                              return `M ${point.x} ${point.y}`
                            }
                            return `${path} L ${point.x} ${point.y}`
                          }, '')
                          
                          return (
                            <>
                              {/* Area fill */}
                              <path
                                d={areaPath}
                                fill="url(#areaGradient)"
                              />
                              
                              {/* Line */}
                              <path
                                d={linePath}
                                fill="none"
                                stroke="#C3FF32"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                filter="url(#glow)"
                              />
                              
                              {/* Data points */}
                              {points.map((point, index) => (
                                <g key={index}>
                                  <circle
                                    cx={point.x}
                                    cy={point.y}
                                    r="5"
                                    fill="#C3FF32"
                                    className="hover:r-7 transition-all cursor-pointer"
                                    filter="url(#glow)"
                                  >
                                    <title>{point.revenue.toFixed(4)} AVAX - {point.date}</title>
                                  </circle>
                                </g>
                              ))}
                            </>
                          )
                        })()}
                      </svg>
                      
                      {/* X-axis labels */}
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
                        {chartData.map((point, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <span className="text-xs text-gray-400">{point.date}</span>
                            <span className="text-[10px] text-gray-500 mt-0.5">{point.count} {point.count === 1 ? 'pay' : 'pay'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Summary Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Total (7 days)</p>
                        <p className="text-lg font-bold text-[#C3FF32]">
                          {chartData.reduce((sum, p) => sum + p.revenue, 0).toFixed(4)} AVAX
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Average</p>
                        <p className="text-lg font-bold text-white">
                          {chartData.length > 0 
                            ? (chartData.reduce((sum, p) => sum + p.revenue, 0) / chartData.length).toFixed(4)
                            : '0.0000'
                          } AVAX
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Transactions</p>
                        <p className="text-lg font-bold text-white">
                          {chartData.reduce((sum, p) => sum + p.count, 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

