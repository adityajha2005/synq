"use client"

import React from 'react'
import Link from 'next/link'
import { Github } from 'lucide-react'

interface FooterLink {
  label: string
  href: string
  external?: boolean
}

interface FooterProps {
  logoText?: string
  tagline?: string
  links?: FooterLink[]
}

const defaultLinks: FooterLink[] = [
  { label: 'Documentation', href: '/sdk-demo' },
  { label: 'GitHub', href: 'https://github.com', external: true },
  { label: 'Twitter', href: 'https://twitter.com', external: true }
]

export function Footer({
  logoText = "Avalanche Commerce Engine",
  tagline = "Built on Avalanche. Powered by AI.",
  links = defaultLinks
}: FooterProps) {
  return (
    <footer className="bg-[#050505] py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <div className="w-5 h-5 bg-[#C3FF32] rounded-sm flex items-center justify-center text-black font-bold text-xs skew-x-[-10deg]">A</div>
            <span className="text-white font-bold tracking-tight">{logoText}</span>
          </div>
          <p className="text-gray-500 text-sm">{tagline}</p>
        </div>
        
        <div className="flex gap-8 text-sm text-gray-400">
          {links.map((link) => {
            const Component = link.external ? 'a' : Link
            const props = link.external
              ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
              : { href: link.href }
            
            return (
              <Component
                key={link.label}
                {...props}
                className="hover:text-[#C3FF32] transition-colors"
              >
                {link.label}
              </Component>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

