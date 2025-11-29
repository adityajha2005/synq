"use client"

import React from 'react'
import Link from 'next/link'
import { Github } from 'lucide-react'

interface CTAButton {
  text: string
  href: string
  variant?: 'primary' | 'secondary'
  icon?: React.ReactNode
}

interface CTASectionProps {
  title: string
  buttons?: CTAButton[]
}

const defaultButtons: CTAButton[] = [
  { text: "Launch Demo", href: "/checkout-demo", variant: 'primary' },
  { text: "Install SDK", href: "/sdk-demo", variant: 'secondary' },
  { text: "GitHub", href: "https://github.com", variant: 'secondary', icon: <Github size={16} /> }
]

export function CTASection({
  title,
  buttons = defaultButtons
}: CTASectionProps) {
  return (
    <section className="py-24 bg-[#0A0A0C]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-b from-[#141419] to-[#0A0A0C] border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#C3FF32]/10 blur-[60px]" />
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 relative z-10">
            {title}
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            {buttons.map((button, i) => {
              const isExternal = button.href.startsWith('http')
              const isPrimary = button.variant === 'primary'
              const Component = isExternal ? 'a' : Link
              const props = isExternal
                ? { href: button.href, target: '_blank', rel: 'noopener noreferrer' }
                : { href: button.href }

              return (
                <Component
                  key={i}
                  {...props}
                  className={`${
                    isPrimary
                      ? 'bg-[#C3FF32] text-black hover:bg-[#b0e62e] shadow-[0_0_20px_rgba(195,255,50,0.3)]'
                      : 'bg-transparent border border-white/20 text-white hover:bg-white/5'
                  } px-8 py-3 rounded-md font-bold text-sm transition-colors flex items-center justify-center gap-2`}
                >
                  {button.icon}
                  {button.text}
                </Component>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

