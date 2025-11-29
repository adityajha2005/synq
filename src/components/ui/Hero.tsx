"use client"

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Code2 } from 'lucide-react'

interface HeroProps {
  badge?: string
  title: string
  titleHighlight?: string
  description: string
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string; icon?: React.ReactNode }
  showDashboard?: boolean
}

export function Hero({
  badge = "v2.0 LIVE ON MAINNET",
  title,
  titleHighlight,
  description,
  primaryCta = { text: "Get Started", href: "/checkout-demo" },
  secondaryCta = { text: "View SDK", href: "/sdk-demo", icon: <Code2 size={18} /> },
  showDashboard = true
}: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center text-center px-4 bg-[#0A0A0C] z-0">
      {/* Background Decor - Geometric Shapes & Glow */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        {/* Main Central Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#C3FF32]/10 rounded-full blur-[150px] opacity-60" />
        
        {/* Geometric Shapes (Abstract floating elements) */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-white/5 rounded-3xl rotate-12 border border-white/5 backdrop-blur-sm opacity-30"></div>
        <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-[#C3FF32]/5 rounded-full border border-[#C3FF32]/10 backdrop-blur-sm opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-blue-500/5 rounded-xl rotate-45 border border-blue-500/10 backdrop-blur-sm opacity-20"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          {title}
          {titleHighlight && (
            <>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3FF32] via-[#e2ff8d] to-white">
                {titleHighlight}
              </span>
            </>
          )}
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
          <Link href={primaryCta.href} className="bg-[#C3FF32] text-black px-8 py-4 rounded-md font-bold text-sm tracking-wide hover:bg-[#b0e62e] transition-all transform hover:-translate-y-1 shadow-[0_0_25px_rgba(195,255,50,0.3)] flex items-center justify-center gap-2 group">
            {primaryCta.text} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
          </Link>
          {secondaryCta && (
            <Link href={secondaryCta.href} className="bg-white/5 backdrop-blur-sm border border-white/10 text-white px-8 py-4 rounded-md font-bold text-sm tracking-wide hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              {secondaryCta.icon} {secondaryCta.text}
            </Link>
          )}
        </div>

        {/* Dashboard Preview Container */}
        {showDashboard && (
          <div className="relative w-full max-w-6xl perspective-1000 group animate-in fade-in zoom-in duration-1000 delay-700">
            {/* Subtle blur glow around dashboard - much more subtle */}
            <div className="absolute -inset-8 bg-gradient-to-r from-[#C3FF32]/5 via-[#C3FF32]/3 to-[#C3FF32]/5 blur-[60px] rounded-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-1000"></div>
            <div className="absolute -inset-4 bg-white/5 blur-[40px] rounded-2xl opacity-30"></div>
            
            <div className="relative bg-[#0E0E11] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
              {/* Fake Browser Header */}
              <div className="h-12 border-b border-white/5 bg-[#141419] flex items-center px-6 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                </div>
                <div className="ml-4 px-4 py-1.5 bg-black/40 rounded text-xs text-gray-500 font-mono w-64 text-center">dashboard.synq.com</div>
              </div>

              {/* Dashboard Visual Content */}
              <div className="p-8 md:p-12 bg-[#0A0A0C] grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column - Stats Cards */}
                <div className="col-span-1 space-y-6">
                  <div className="bg-[#0E0E11] p-5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                    <div className="text-gray-500 text-xs font-medium mb-1.5 uppercase tracking-wider">Total Revenue</div>
                    <div className="text-2xl font-bold text-white mb-1.5">0.0030 AVAX</div>
                    <div className="text-[#C3FF32] text-xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C3FF32]"></span>
                      3 payments received
                    </div>
                  </div>
                  <div className="bg-[#0E0E11] p-5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                    <div className="text-gray-500 text-xs font-medium mb-1.5 uppercase tracking-wider">Active Subscriptions</div>
                    <div className="text-2xl font-bold text-white mb-1.5">3</div>
                    <div className="text-gray-400 text-xs">All active</div>
                  </div>
                  <div className="bg-[#0E0E11] p-5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                    <div className="text-gray-500 text-xs font-medium mb-1.5 uppercase tracking-wider">Plans</div>
                    <div className="text-2xl font-bold text-white mb-1.5">1</div>
                    <div className="text-gray-400 text-xs">Test Monthly Plan</div>
                  </div>
                </div>

                {/* Middle & Right Column - Chart & Activity */}
                <div className="col-span-1 md:col-span-2 space-y-6">
                  {/* Main Chart Area - More realistic */}
                  <div className="bg-[#0E0E11] p-5 rounded-lg border border-white/5 h-56 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-gray-400 text-xs font-medium uppercase tracking-wider">Revenue Overview</div>
                      <div className="text-[#C3FF32] text-xs">Last 30 days</div>
                    </div>
                    {/* More realistic chart with actual data points */}
                    <div className="absolute bottom-4 left-5 right-5 h-36 flex items-end justify-between gap-1">
                      {[0.001, 0.001, 0.001, 0.001, 0.001].map((val, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div 
                            className="w-full bg-gradient-to-t from-[#C3FF32]/20 to-[#C3FF32]/5 rounded-t border-t border-x border-[#C3FF32]/20 transition-all hover:from-[#C3FF32]/30 hover:to-[#C3FF32]/10"
                            style={{ height: `${60 + i * 5}%` }}
                          ></div>
                          <div className="text-[10px] text-gray-600 font-mono">{['M', 'T', 'W', 'T', 'F'][i]}</div>
                        </div>
                      ))}
                    </div>
                    <div className="absolute top-12 right-5 text-xs text-gray-500 font-mono">0.001 AVAX avg</div>
                  </div>
                  
                  {/* Recent Activity List - More realistic */}
                  <div className="bg-[#0E0E11] p-5 rounded-lg border border-white/5">
                    <div className="text-gray-400 text-xs font-medium mb-3 uppercase tracking-wider">Recent Payments</div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 bg-[#C3FF32]/10 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[#C3FF32]"></div>
                          </div>
                          <div>
                            <div className="text-sm text-white font-medium">0xcb54...b599</div>
                            <div className="text-xs text-gray-500 font-mono">Verified • 2 min ago</div>
                          </div>
                        </div>
                        <div className="text-sm text-[#C3FF32] font-mono">+0.001 AVAX</div>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 bg-[#C3FF32]/10 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[#C3FF32]"></div>
                          </div>
                          <div>
                            <div className="text-sm text-white font-medium">0xcb54...b599</div>
                            <div className="text-xs text-gray-500 font-mono">Verified • 1 hr ago</div>
                          </div>
                        </div>
                        <div className="text-sm text-[#C3FF32] font-mono">+0.001 AVAX</div>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 bg-[#C3FF32]/10 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[#C3FF32]"></div>
                          </div>
                          <div>
                            <div className="text-sm text-white font-medium">0xcb54...b599</div>
                            <div className="text-xs text-gray-500 font-mono">Verified • 3 hrs ago</div>
                          </div>
                        </div>
                        <div className="text-sm text-[#C3FF32] font-mono">+0.001 AVAX</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
