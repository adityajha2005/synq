"use client"

import { CheckoutButton } from "../../../sdk/ui/CheckoutButton"
import { SubscriptionStatus } from "../../../sdk/ui/SubscriptionStatus"
import { useAccount } from "wagmi"
import { Navbar } from '@/components/ui'
import { Code2, Package, CheckCircle2, AlertCircle } from 'lucide-react'

export default function SDKDemoPage() {
  const { address } = useAccount()

  return (
    <div className="bg-[#0A0A0C] min-h-screen text-white font-sans">
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C3FF32]/20 bg-[#C3FF32]/5 text-[#C3FF32] text-xs font-mono mb-6">
              <Code2 size={12} />
              Developer SDK
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              SDK Demo
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Test and explore SYNQ SDK components with live examples
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-[#0E0E11] rounded-2xl border border-white/5 p-8 relative overflow-hidden group hover:border-[#C3FF32]/30 transition-all">
              <div className="absolute -inset-4 bg-[#C3FF32]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                  <Package size={24} className="text-[#C3FF32]" />
                  CheckoutButton Component
                </h2>
                <p className="text-gray-400 mb-6">
                  Pre-built button that redirects to checkout:
                </p>
                
                <div className="space-y-6">
                  <div className="bg-[#050505] border border-white/5 rounded-xl p-6">
                    <p className="text-sm font-medium text-gray-300 mb-4">Default Style:</p>
                    <CheckoutButton amount={0.01} />
                  </div>

                  <div className="bg-[#050505] border border-white/5 rounded-xl p-6">
                    <p className="text-sm font-medium text-gray-300 mb-4">With Custom Label:</p>
                    <CheckoutButton 
                      amount={0.005}
                      label="Subscribe for 0.005 AVAX"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0E0E11] rounded-2xl border border-white/5 p-8 relative overflow-hidden group hover:border-[#C3FF32]/30 transition-all">
              <div className="absolute -inset-4 bg-[#C3FF32]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-[#C3FF32]" />
                  SubscriptionStatus Component
                </h2>
                <p className="text-gray-400 mb-6">
                  Shows subscription status with automatic loading:
                </p>

                {address ? (
                  <div className="space-y-6">
                    <div className="bg-[#050505] border border-white/5 rounded-xl p-6">
                      <p className="text-sm font-medium text-gray-300 mb-4">
                        Your Wallet: <span className="font-mono text-[#C3FF32]">{address.slice(0, 10)}...{address.slice(-8)}</span>
                      </p>
                      <SubscriptionStatus wallet={address} />
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
                    <p className="text-yellow-400 flex items-center gap-2">
                      <AlertCircle size={18} />
                      Connect your wallet to see subscription status
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#0E0E11] rounded-2xl border border-white/5 p-8 relative overflow-hidden group hover:border-[#C3FF32]/30 transition-all">
              <div className="absolute -inset-4 bg-[#C3FF32]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                  <Code2 size={24} className="text-[#C3FF32]" />
                  SDK Usage Examples
                </h2>
                
                <div className="bg-[#050505] border border-white/5 rounded-xl p-6 mt-6 overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono">
{`// Import SDK components
import { CheckoutButton, SubscriptionStatus } from 'synq-sdk'

// Use in your app
export default function MyPage() {
  return (
    <>
      <CheckoutButton 
        amount={0.01}
        planId="your-plan-id"
        label="Subscribe Now"
      />
      
      <SubscriptionStatus 
        wallet="0x..."
      />
    </>
  )
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-[#0E0E11] rounded-2xl border border-[#C3FF32]/20 p-8 relative overflow-hidden">
              <div className="absolute -inset-4 bg-[#C3FF32]/5 blur-2xl opacity-50"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Package size={24} className="text-[#C3FF32]" />
                  SDK Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Pre-built React components',
                    'TypeScript type definitions',
                    'Backend API client utilities',
                    'Payment verification',
                    'Subscription management',
                    'Access control checking'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-lg p-4">
                      <CheckCircle2 size={18} className="text-[#C3FF32] flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

