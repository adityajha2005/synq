"use client"

import React from 'react'

interface Chain {
  name: string
  icon: string
  color: string
  highlighted?: boolean
}

interface SupportedChainsProps {
  chains?: Chain[]
  highlightedChain?: string
}

const defaultChains: Chain[] = [
  { name: "Avalanche", icon: "A", color: "red", highlighted: true },
  { name: "Ethereum", icon: "E", color: "blue" },
  { name: "Polygon", icon: "P", color: "purple" },
  { name: "BSC", icon: "B", color: "yellow" },
  { name: "Optimism", icon: "O", color: "red" },
]

const colorClasses: Record<string, string> = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  yellow: "bg-yellow-500",
}

export function SupportedChains({ chains = defaultChains, highlightedChain }: SupportedChainsProps) {
  return (
    <section className="py-10 border-y border-white/5 bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto px-4 overflow-hidden">
        <div className="flex justify-center items-center gap-12 md:gap-20 opacity-60 flex-wrap">
          {chains.map((chain) => {
            const isHighlighted = chain.highlighted || chain.name === highlightedChain
            return (
              <div
                key={chain.name}
                className={`flex items-center gap-3 transition-all ${
                  isHighlighted ? 'opacity-100' : 'grayscale opacity-40 hover:opacity-100 hover:grayscale-0'
                }`}
              >
                <div
                  className={`w-8 h-8 ${colorClasses[chain.color] || 'bg-gray-500'} rounded-full flex items-center justify-center text-white font-bold ${
                    isHighlighted ? 'shadow-[0_0_15px_rgba(239,68,68,0.4)]' : ''
                  }`}
                >
                  {chain.icon}
                </div>
                <span className={`font-semibold text-lg tracking-wide transition-colors ${
                  isHighlighted ? 'text-white group-hover:text-red-400' : 'text-gray-400'
                }`}>
                  {chain.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

