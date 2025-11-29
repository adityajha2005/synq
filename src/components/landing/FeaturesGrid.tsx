"use client"

import React from 'react'
import { Zap, Webhook } from 'lucide-react'

interface FeatureCard {
  title: string
  description: string
  span?: number // 2 or 3 for lg:col-span
  visual?: React.ReactNode
}

interface FeaturesGridProps {
  title?: string
  subtitle?: string
  features?: FeatureCard[]
}

const defaultFeatures: FeatureCard[] = [
  {
    title: "Smart Checkout Widget",
    description: "Embeddable, customizable checkout UI for accepting AVAX, USDC, and bridged assets. Handles wallet connection and gas estimation automatically.",
    span: 3,
    visual: (
      <div className="h-48 mb-8 bg-[#050505] rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-x-8 top-8 bottom-0 bg-[#0A0A0C] rounded-t-xl border-x border-t border-white/10 p-4 shadow-2xl">
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
            <span className="text-[10px] text-gray-500 font-mono">Pay with Crypto</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-1/2 bg-white/10 rounded"></div>
            <div className="h-8 w-full bg-[#C3FF32]/10 border border-[#C3FF32]/20 rounded flex items-center px-3 justify-between">
              <span className="text-xs text-white">20 AVAX</span>
              <span className="text-[10px] text-[#C3FF32]">Max</span>
            </div>
            <div className="h-8 w-full bg-[#C3FF32] rounded flex items-center justify-center text-black text-xs font-bold mt-2">Confirm Payment</div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Merchant Dashboard",
    description: "Real-time analytics, customer management, and transaction history in a unified dark-mode view. Brand it with your own logo and colors.",
    span: 3,
    visual: (
      <div className="h-48 mb-8 bg-[#050505] rounded-xl border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="w-16 border-r border-white/5 bg-[#0A0A0C] p-2 flex flex-col gap-2">
            <div className="w-full h-1 bg-[#C3FF32] rounded"></div>
            <div className="w-8 h-8 rounded bg-white/5"></div>
            <div className="w-8 h-8 rounded bg-white/5"></div>
          </div>
          <div className="flex-1 p-4 space-y-3">
            <div className="flex gap-2">
              <div className="w-32 h-20 bg-white/5 rounded border border-white/5"></div>
              <div className="w-32 h-20 bg-white/5 rounded border border-white/5"></div>
            </div>
            <div className="w-full h-2 bg-white/5 rounded"></div>
            <div className="w-2/3 h-2 bg-white/5 rounded"></div>
          </div>
          <div className="absolute bottom-4 right-4 bg-[#C3FF32] text-black px-3 py-1 rounded-full text-[10px] font-bold shadow-[0_0_10px_rgba(195,255,50,0.3)]">
            Customize
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Revenue Analytics",
    description: "Track MRR, churn, and LTV with built-in visualization tools designed for crypto-native metrics.",
    span: 2,
    visual: (
      <div className="h-32 mb-6 bg-[#050505] rounded-lg border border-white/5 flex items-end justify-between p-4 px-6 gap-2">
        <div className="w-full bg-white/5 rounded-t hover:bg-[#C3FF32] transition-colors h-[40%]"></div>
        <div className="w-full bg-white/5 rounded-t hover:bg-[#C3FF32] transition-colors h-[70%]"></div>
        <div className="w-full bg-white/5 rounded-t hover:bg-[#C3FF32] transition-colors h-[50%]"></div>
        <div className="w-full bg-white/5 rounded-t hover:bg-[#C3FF32] transition-colors h-[85%]"></div>
        <div className="w-full bg-white/5 rounded-t hover:bg-[#C3FF32] transition-colors h-[60%]"></div>
        <div className="absolute top-3 right-3 text-[10px] text-[#C3FF32] flex items-center gap-1">
          <Zap size={10} /> +25%
        </div>
      </div>
    )
  },
  {
    title: "Webhooks & API",
    description: "Reliable event delivery for payment success, failed renewals, and dispute resolutions via webhooks.",
    span: 2,
    visual: (
      <div className="h-32 mb-6 bg-[#050505] rounded-lg border border-white/5 relative flex items-center justify-center">
        <div className="w-12 h-12 bg-[#C3FF32]/20 rounded-full border border-[#C3FF32] flex items-center justify-center text-[#C3FF32] z-10 relative">
          <Webhook size={20} />
        </div>
        <div className="absolute w-24 h-24 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
        <div className="absolute w-16 h-16 border border-white/10 rounded-full animate-[spin_7s_linear_infinite_reverse]">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full"></div>
        </div>
      </div>
    )
  },
  {
    title: "Cross-Platform SDK",
    description: "Create checkout experiences that look stunning on any device. React, Vue, and vanilla JS supported.",
    span: 2,
    visual: (
      <div className="h-32 mb-6 bg-[#050505] rounded-lg border border-white/5 flex items-center justify-center gap-2 p-2 relative overflow-hidden">
        <div className="w-24 h-full bg-[#0A0A0C] border border-white/10 rounded-t-lg mt-4 shadow-xl"></div>
        <div className="w-12 h-20 bg-[#0A0A0C] border border-white/10 rounded absolute bottom-2 right-8 border-l-4 border-l-[#C3FF32] shadow-2xl"></div>
      </div>
    )
  }
]

export function FeaturesGrid({
  title = "Powerful features to simplify your commerce",
  subtitle = "Infrastructure grade tools for the next generation of Web3 commerce, designed for scale.",
  features = defaultFeatures
}: FeaturesGridProps) {
  return (
    <section id="features" className="py-24 bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {title.split(' ').slice(0, -3).join(' ')} <br/> 
            <span className="text-[#C3FF32]">{title.split(' ').slice(-3).join(' ')}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {features.map((feature, i) => {
            const spanClass = feature.span === 3 ? 'lg:col-span-3' : 'lg:col-span-2'
            return (
            <div
              key={i}
              className={`${spanClass} bg-[#0E0E11] rounded-2xl border border-white/8 ${feature.span === 3 ? 'p-8' : 'p-6'} relative overflow-hidden group hover:border-[#C3FF32]/25 transition-all duration-300 flex flex-col h-full hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(195,255,50,0.08)]`}
            >
              {/* Top neon border accent on hover - reduced opacity (10-12% less) */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C3FF32]/0 to-transparent group-hover:via-[#C3FF32]/40 transition-all duration-500"></div>
              
              {/* Visual Mockup */}
              <div className="flex-shrink-0">
                {feature.visual}
              </div>
              
              {/* Content - flex-grow to fill space */}
              <div className="flex-grow flex flex-col">
                <h3 className={`font-bold text-white mb-2 ${feature.span === 3 ? 'text-xl' : 'text-lg'}`}>
                  {feature.title}
                </h3>
                <p className={`text-gray-400 leading-relaxed ${feature.span === 3 ? 'text-sm' : 'text-xs'}`}>
                  {feature.description}
                </p>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Export type for external use
export type { FeatureCard }
