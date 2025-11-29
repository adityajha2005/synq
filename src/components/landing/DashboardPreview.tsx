"use client"

import React from 'react'

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
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          <p className="text-gray-400 mt-2">{subtitle}</p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="absolute -inset-4 bg-[#C3FF32]/10 blur-3xl rounded-full opacity-50 pointer-events-none"></div>
          
          <div className="relative rounded-lg border border-white/10 bg-[#0E0E11] p-2 md:p-4 shadow-2xl">
            <div className="aspect-video bg-[#050505] rounded border border-white/5 relative overflow-hidden flex flex-col">
              {/* Sidebar */}
              <div className="absolute left-0 top-0 bottom-0 w-16 md:w-64 border-r border-white/5 bg-[#0A0A0C] hidden md:flex flex-col p-4 gap-4">
                <div className="h-8 w-8 bg-[#C3FF32] rounded mb-8"></div>
                <div className="h-4 w-32 bg-white/10 rounded"></div>
                <div className="h-4 w-24 bg-white/5 rounded"></div>
                <div className="h-4 w-28 bg-white/5 rounded"></div>
                <div className="h-4 w-20 bg-white/5 rounded"></div>
              </div>
              
              {/* Header */}
              <div className="h-16 border-b border-white/5 ml-0 md:ml-64 flex items-center justify-between px-8">
                <div className="h-4 w-48 bg-white/10 rounded"></div>
                <div className="h-8 w-8 rounded-full bg-gray-800"></div>
              </div>

              {/* Content */}
              <div className="ml-0 md:ml-64 p-8 grid grid-cols-3 gap-6">
                <div className="h-32 bg-white/5 rounded border border-white/5 p-4">
                  <div className="h-4 w-20 bg-white/10 rounded mb-4"></div>
                  <div className="h-8 w-32 bg-[#C3FF32]/20 rounded mb-2"></div>
                </div>
                <div className="h-32 bg-white/5 rounded border border-white/5 p-4">
                  <div className="h-4 w-20 bg-white/10 rounded mb-4"></div>
                  <div className="h-8 w-32 bg-white/10 rounded mb-2"></div>
                </div>
                <div className="h-32 bg-white/5 rounded border border-white/5 p-4">
                  <div className="h-4 w-20 bg-white/10 rounded mb-4"></div>
                  <div className="h-8 w-32 bg-white/10 rounded mb-2"></div>
                </div>
                <div className="col-span-3 h-64 bg-white/5 rounded border border-white/5 flex items-center justify-center">
                  <div className="text-gray-600 font-mono text-sm">Chart Visualization Placeholder</div>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent opacity-60 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

