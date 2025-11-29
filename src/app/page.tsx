"use client"

import React from 'react'
import {
  Navbar,
  Hero,
  SupportedChains,
  FeaturesGrid,
  SDKSection,
  DashboardPreview,
  AIAgents,
  CTASection,
  Footer
} from '@/components/ui'

export default function Home() {
  return (
    <div className="bg-[#0A0A0C] min-h-screen text-white font-sans selection:bg-[#C3FF32] selection:text-black scroll-smooth">
      <Navbar />
      <Hero
        title="Stripe Checkout for Avalanche"
        titleHighlight="Powered by AI Agents"
        description="AVAX payments, subscriptions, invoicing, and automated billing workflows for Avalanche dApps. One-line integration. Developer-first."
        primaryCta={{ text: "Get Started", href: "/checkout-demo" }}
        secondaryCta={{ text: "View SDK", href: "/sdk-demo" }}
      />
      <FeaturesGrid />
      <SDKSection />
      <DashboardPreview />
      <AIAgents />
      <CTASection title="Start accepting payments on Avalanche in 5 minutes." />
      <Footer />
    </div>
  )
}
