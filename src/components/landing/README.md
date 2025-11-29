# Landing Page Components

Modular, reusable components for building beautiful landing pages with the Avalanche Commerce design system.

## 📦 Available Components

### **Navbar**
Navigation bar with logo, links, and CTA button.

```tsx
import { Navbar } from '@/components/landing'

<Navbar
  logoText="Avalanche Commerce"
  links={[
    { label: 'Features', href: '#features' },
    { label: 'SDK', href: '#sdk' }
  ]}
  ctaText="Launch Demo"
  ctaHref="/checkout-demo"
  githubUrl="https://github.com"
/>
```

### **Hero**
Hero section with headline, description, and CTAs.

```tsx
import { Hero } from '@/components/landing'

<Hero
  badge="v0.1.0 LIVE"
  title="Your Main Headline"
  titleHighlight="Highlighted Text"
  description="Your description here"
  primaryCta={{ text: "Get Started", href: "/checkout" }}
  secondaryCta={{ text: "Learn More", href: "/docs" }}
  showDemoCard={true}
/>
```

### **FeaturesGrid**
Grid of feature cards.

```tsx
import { FeaturesGrid, type Feature } from '@/components/landing'
import { CreditCard, Bot } from 'lucide-react'

const customFeatures: Feature[] = [
  {
    icon: CreditCard,
    title: "Payment Processing",
    description: "Accept payments instantly"
  },
  {
    icon: Bot,
    title: "AI Agents",
    description: "Automated workflows"
  }
]

<FeaturesGrid
  title="Our Features"
  subtitle="What we offer"
  features={customFeatures}
/>
```

### **SDKSection**
Developer SDK showcase with code example.

```tsx
import { SDKSection } from '@/components/landing'

<SDKSection
  title="Integrated in minutes"
  description="Easy integration"
  features={['Type-safe', 'Fast', 'Reliable']}
  docsLink="/sdk-demo"
/>
```

### **AIAgents**
AI agent showcase cards.

```tsx
import { AIAgents, type AIAgent } from '@/components/landing'
import { FileText, Repeat } from 'lucide-react'

const agents: AIAgent[] = [
  {
    icon: FileText,
    title: "Invoice Agent",
    description: "Auto-generates invoices",
    color: 'blue'
  },
  {
    icon: Repeat,
    title: "Renewal Agent",
    description: "Manages renewals",
    color: 'green'
  }
]

<AIAgents
  badge="Gemini 2.0"
  title="AI Automation"
  subtitle="Powered by AI"
  agents={agents}
/>
```

### **CTASection**
Call-to-action section.

```tsx
import { CTASection } from '@/components/landing'

<CTASection
  title="Start building today"
  buttons={[
    { text: "Get Started", href: "/signup", variant: 'primary' },
    { text: "View Docs", href: "/docs", variant: 'secondary' }
  ]}
/>
```

### **Footer**
Site footer with links.

```tsx
import { Footer } from '@/components/landing'

<Footer
  logoText="Your Brand"
  tagline="Built with ❤️"
  links={[
    { label: 'Docs', href: '/docs' },
    { label: 'GitHub', href: 'https://github.com', external: true }
  ]}
/>
```

### **SupportedChains**
Blockchain network showcase.

```tsx
import { SupportedChains } from '@/components/landing'

<SupportedChains
  highlightedChain="Avalanche"
  chains={[
    { name: "Avalanche", icon: "A", color: "red", highlighted: true },
    { name: "Ethereum", icon: "E", color: "blue" }
  ]}
/>
```

### **DashboardPreview**
Dashboard preview mockup.

```tsx
import { DashboardPreview } from '@/components/landing'

<DashboardPreview
  title="Merchant Dashboard"
  subtitle="Manage your business"
/>
```

## 🎨 Design System

All components use the consistent design system:

- **Background:** `#0A0A0C` (dark)
- **Cards:** `#0E0E11` (slightly lighter)
- **Accent:** `#C3FF32` (lime green)
- **Text:** White/Gray scale
- **Borders:** `white/5` to `white/10` opacity

## 📝 Example: Complete Landing Page

```tsx
"use client"

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
} from '@/components/landing'

export default function LandingPage() {
  return (
    <div className="bg-[#0A0A0C] min-h-screen text-white">
      <Navbar />
      <Hero
        title="Your Product"
        titleHighlight="Amazing Features"
        description="Build amazing things"
      />
      <SupportedChains />
      <FeaturesGrid />
      <SDKSection />
      <DashboardPreview />
      <AIAgents />
      <CTASection title="Get started today" />
      <Footer />
    </div>
  )
}
```

## 🔧 Customization

All components accept props for customization. Check each component's TypeScript interface for available options.

## 📚 Type Exports

```tsx
import type { Feature, AIAgent } from '@/components/landing'
```

