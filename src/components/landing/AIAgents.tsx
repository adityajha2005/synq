"use client"

import React from 'react'
import { Zap, Bot, BarChart3, LucideIcon } from 'lucide-react'

export interface AIAgent {
  title: string
  description: string
  color?: 'blue' | 'green' | 'purple'
}

interface AIAgentsProps {
  // badge?: string
  title?: string
  subtitle?: string
  agents?: AIAgent[]
  heroTitle?: string
  heroDescription?: string
  heroBenefits?: string[]
  heroStat?: {
    value: string
    label: string
  }
}

const defaultAgents: AIAgent[] = [
  {
    title: "Invoice Agent",
    description: "Automatically matches on-chain transactions to invoices, detects underpayments, and sends payment reminders via email or Discord.",
    color: 'blue'
  },
  {
    title: "Renewal Agent",
    description: "Predicts subscription churn based on wallet activity (e.g. low balance) and engages users with personalized retention offers.",
    color: 'green'
  },
  {
    title: "Analytics Agent",
    description: "Natural language queries for your financial data. Ask \"What was my MRR growth last month?\" and get instant answers with charts.",
    color: 'purple'
  }
]

const colorClasses = {
  blue: {
    border: 'hover:border-blue-500/30',
    gradient: 'from-blue-500/5',
    glow: 'bg-blue-500/10 group-hover:bg-blue-500/20'
  },
  green: {
    border: 'hover:border-[#C3FF32]/30',
    gradient: 'from-[#C3FF32]/5',
    glow: 'bg-[#C3FF32]/10 group-hover:bg-[#C3FF32]/20'
  },
  purple: {
    border: 'hover:border-purple-500/30',
    gradient: 'from-purple-500/5',
    glow: 'bg-purple-500/10 group-hover:bg-purple-500/20'
  }
}

export function AIAgents({
  // badge = "Gemini 2.0 Flash",
  title = "Autonomous Commerce Agents",
  subtitle = "Delegate the busywork. Our AI agents handle invoicing, retention, and analytics 24/7.",
  agents = defaultAgents,
  heroTitle = "Maximize Revenue Efficiency",
  heroDescription = "Stop manually reconciling payments or chasing failed transactions. Our agents work in the background to recover revenue and provide instant insights.",
  heroBenefits = [
    'Automate invoice reconciliation',
    'Reduce churn by up to 40%',
    'Instant natural language analytics'
  ],
  heroStat = {
    value: "80%",
    label: "Less manual operation time"
  }
}: AIAgentsProps) {
  return (
    <section id="agents" className="py-24 bg-[#0A0A0C] relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#C3FF32]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{title}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Large Hero Card (Spans 2 cols) */}
          <div className="lg:col-span-2 bg-[#0E0E11] rounded-3xl border border-white/5 p-8 relative flex flex-col justify-between overflow-visible">
            {/* Floating 3D-style Icon */}
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-[#C3FF32] to-green-600 rounded-2xl rotate-12 flex items-center justify-center shadow-[0_0_30px_rgba(195,255,50,0.3)] z-20">
              <Bot size={40} className="text-black" />
            </div>
            
            <div className="mt-12">
              <h3 className="text-3xl font-bold text-white mb-4 leading-tight">{heroTitle}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                {heroDescription}
              </p>

              <div className="space-y-3 mb-10">
                {heroBenefits.map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/5 rounded-full px-4 py-2 text-xs text-gray-300 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C3FF32]"></div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Stat Card */}
            <div className="bg-gradient-to-r from-white/5 to-transparent border border-white/5 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <BarChart3 size={48} className="text-[#C3FF32]" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">{heroStat.value}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">{heroStat.label}</div>
            </div>
          </div>

          {/* Right: Agent Stack (Spans 3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {agents.map((agent, i) => {
              const colors = colorClasses[agent.color || 'blue']
              return (
                <div
                  key={i}
                  className={`bg-[#0E0E11] p-6 rounded-2xl border border-white/5 ${colors.border} transition-all group relative overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                  <h4 className="text-xl font-bold text-white mb-2 relative z-10">{agent.title}</h4>
                  <p className="text-gray-400 text-sm relative z-10">
                    {agent.description}
                  </p>
                  <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0E0E11] to-transparent z-0"></div>
                  <div className={`absolute -right-10 -bottom-10 w-40 h-40 ${colors.glow} blur-3xl rounded-full transition-colors`}></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
