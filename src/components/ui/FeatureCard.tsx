"use client"

import React from 'react'
import { ArrowRight, LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
  href?: string
}

export function FeatureCard({ icon: Icon, title, description, delay = 0, href }: FeatureCardProps) {
  const content = (
    <div className="group p-6 rounded-xl border border-white/5 bg-[#0E0E11] hover:border-[#C3FF32]/50 hover:bg-white/[0.02] transition-all duration-300 relative overflow-hidden h-full">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C3FF32]/0 to-transparent group-hover:via-[#C3FF32]/50 transition-all duration-500"></div>
      
      <div className="w-12 h-12 rounded-lg bg-[#C3FF32]/10 flex items-center justify-center text-[#C3FF32] mb-5 group-hover:scale-110 transition-transform duration-300">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#C3FF32] transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 text-[#C3FF32]">
        <ArrowRight size={16} />
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block h-full">
        {content}
      </a>
    )
  }

  return content
}

