"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Github } from 'lucide-react'

interface NavbarProps {
  // logoText?: string
  links?: Array<{ label: string; href: string }>
  ctaText?: string
  ctaHref?: string
  githubUrl?: string
}

export function Navbar({
  // logoText = "SYNQ",
  links = [
    { label: 'Features', href: '#features' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Agents', href: '/dashboard/analytics' }
  ],
  ctaText = "Launch Demo",
  ctaHref = "/checkout-demo",
  githubUrl = "https://github.com"
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href.startsWith('#')) return false
    if (!pathname) return false
    
    if (pathname === href) return true
    
    if (pathname.startsWith(href)) {
      const nextChar = pathname[href.length]
      return nextChar === undefined
    }
    
    return false
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0A0C]/95 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg shadow-black/20' : 'bg-transparent border-b border-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group relative">
          <div className="relative">
            <div className="absolute inset-0 bg-[#C3FF32]/20 blur-md opacity-0  transition-opacity duration-300 rounded-lg"></div>
            <Image
              src="/Gemini_Generated_Image_ae2llaae2llaae2l.png"
              alt="SYNQ Logo"
              width={100}
              height={100}
              className="relative z-10 group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
          {/* <span className="text-white font-bold text-lg tracking-tight group-hover:text-[#C3FF32] transition-colors duration-300">{logoText}</span> */}
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          {links.map((link) => {
            const active = isActive(link.href)
            const href = link.href.startsWith('#') ? `/${link.href}` : link.href
            
            return (
              <Link
                key={link.label}
                href={href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'text-[#C3FF32] bg-[#C3FF32]/10'
                    : 'text-gray-400 hover:text-[#C3FF32] hover:bg-white/5'
                }`}
              >
                {link.label}
                {active && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#C3FF32] rounded-full"></div>
                )}
              </Link>
            )
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-300 border border-white/10 px-4 py-2 rounded-lg text-sm hover:border-[#C3FF32]/30 hover:text-[#C3FF32] hover:bg-white/5 transition-all duration-200 flex items-center gap-2 group"
          >
            <Github size={16} className="group-hover:scale-110 transition-transform" /> 
            <span>GitHub</span>
          </a>
          <Link 
            href={ctaHref} 
            className="bg-[#C3FF32] text-black border border-[#C3FF32] px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#b0e62e] hover:shadow-[0_0_20px_rgba(195,255,50,0.5)] hover:scale-105 transition-all duration-200"
          >
            {ctaText}
          </Link>
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-[#0A0A0C]/98 backdrop-blur-xl border-b border-white/10 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 flex flex-col gap-2">
          {links.map((link) => {
            const active = isActive(link.href)
            const href = link.href.startsWith('#') ? `/${link.href}` : link.href
            
            return (
              <Link
                key={link.label}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  active
                    ? 'text-[#C3FF32] bg-[#C3FF32]/10'
                    : 'text-gray-300 hover:text-[#C3FF32] hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-white/10">
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setIsOpen(false)}
              className="text-white border border-white/10 py-3 rounded-lg flex items-center justify-center gap-2 hover:border-[#C3FF32]/30 hover:text-[#C3FF32] transition-all"
            >
              <Github size={18} /> GitHub
            </a>
            <Link 
              href={ctaHref} 
              onClick={() => setIsOpen(false)} 
              className="text-black bg-[#C3FF32] py-3 rounded-lg font-bold text-center hover:bg-[#b0e62e] transition-all"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

