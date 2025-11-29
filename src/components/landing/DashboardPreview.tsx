"use client"

import React from 'react'
import Image from 'next/image'

interface DashboardPreviewProps {
  title?: string
  subtitle?: string
}

export function DashboardPreview({
  title = "Merchant Dashboard Preview",
  subtitle = "Everything you need to manage your crypto business."
}: DashboardPreviewProps) {
  return (
    <section id="dashboard" className="py-24 bg-[#0A0A0C] flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
          <p className="text-gray-400 text-lg">{subtitle}</p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="absolute -inset-4 bg-[#C3FF32]/10 blur-3xl rounded-full opacity-50 pointer-events-none"></div>
          
          <div className="relative rounded-2xl border border-white/10 bg-[#0E0E11] p-2 md:p-4 shadow-2xl overflow-hidden group hover:border-[#C3FF32]/30 transition-all">
            <div className="absolute -inset-4 bg-[#C3FF32]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative rounded-lg border border-white/5 overflow-hidden">
              <Image
                src="/merchantdashboard.png"
                alt="Merchant Dashboard Preview"
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

