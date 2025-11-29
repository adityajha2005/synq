"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Github } from 'lucide-react'

interface NavbarProps {
  logoText?: string
  links?: Array<{ label: string; href: string }>
  ctaText?: string
  ctaHref?: string
  githubUrl?: string
}

export function Navbar({
  logoText = "Avalanche Commerce",
  links = [
    { label: 'Features', href: '#features' },
    { label: 'SDK', href: '#sdk' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Agents', href: '#agents' }
  ],
  ctaText = "Launch Demo",
  ctaHref = "/checkout-demo",
  githubUrl = "https://github.com"
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-[#0A0A0C]/90 backdrop-blur-md border-white/10 py-4' : 'bg-transparent border-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#C3FF32] rounded-sm flex items-center justify-center text-black font-bold text-xl skew-x-[-10deg]">
            <span className="skew-x-[10deg]">A</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">{logoText}</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="text-gray-400 hover:text-[#C3FF32] text-sm font-medium transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-300 border border-gray-700 px-4 py-2 rounded-md text-sm hover:border-gray-500 hover:text-white transition-all flex items-center gap-2">
            <Github size={16} /> GitHub
          </a>
          <Link href={ctaHref} className="bg-[#C3FF32] text-black border border-[#C3FF32] px-5 py-2 rounded-md text-sm font-bold hover:bg-[#b0e62e] hover:shadow-[0_0_15px_rgba(195,255,50,0.4)] transition-all">
            {ctaText}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0A0A0C] border-b border-gray-800 p-4 flex flex-col gap-4 shadow-2xl">
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-[#C3FF32] text-lg font-medium">
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-white border border-gray-700 py-3 rounded-md flex items-center justify-center gap-2">
              <Github size={18} /> GitHub
            </a>
            <Link href={ctaHref} onClick={() => setIsOpen(false)} className="text-black bg-[#C3FF32] py-3 rounded-md font-bold text-center">
              {ctaText}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

