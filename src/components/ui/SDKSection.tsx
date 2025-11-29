"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Terminal, CheckCircle2, ArrowRight, Copy, Check, FileCode, X } from 'lucide-react'

interface SDKSectionProps {
  title?: string
  description?: string
  features?: string[]
  codeExample?: React.ReactNode
  docsLink?: string
  badges?: string[]
}

export function SDKSection({
  title = "Integrated in minutes, not weeks.",
  description = "Our SDK abstracts away the complexity of smart contract interactions, gas estimation, and wallet connection. Just drop in the component and start accepting payments.",
  features = ['Type-safe response types', 'Automatic wallet detection', 'Built-in error handling'],
  codeExample,
  docsLink = "/sdk-demo",
  badges = ['Type-safe SDK', '3-minute integration', 'Zero backend required']
}: SDKSectionProps) {
  const [copied, setCopied] = useState(false)

  const defaultCode = (
    <>
      <div className="flex items-center gap-2 mb-4">
        {/* <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-[#ff5f56]"></div>
          <div className="w-2 h-2 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-2 h-2 rounded-full bg-[#27c93f]"></div>
        </div> */}
        <div className="flex-1"></div>
      </div>
      <div className="space-y-1">
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">1</div>
          <code className="flex-1 text-[#abb2bf]">
            <span className="text-[#c678dd]">npm</span> install <span className="text-[#e06c75]">synq-sdk</span>
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">2</div>
          <code className="flex-1"></code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">3</div>
          <code className="flex-1 text-[#abb2bf]">
            <span className="text-[#c678dd]">import</span> {'{'} <span className="text-[#e5c07b]">CheckoutButton</span> {'}'} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">"synq-sdk"</span>;
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">4</div>
          <code className="flex-1"></code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">5</div>
          <code className="flex-1 text-[#abb2bf]">
            <span className="text-[#c678dd]">function</span> <span className="text-[#61afef]">PaymentPage</span>() {'{'}
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">6</div>
          <code className="flex-1 text-[#abb2bf] pl-4">
            <span className="text-[#c678dd]">return</span> (
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">7</div>
          <code className="flex-1 text-[#abb2bf] pl-8">
            &lt;<span className="text-[#e06c75]">CheckoutButton</span> 
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">8</div>
          <code className="flex-1 text-[#abb2bf] pl-12">
            <span className="text-[#d19a66]">amount</span>={'{'}<span className="text-[#d19a66]">0.02</span>{'}'}
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">9</div>
          <code className="flex-1 text-[#abb2bf] pl-12">
            <span className="text-[#d19a66]">currency</span>=<span className="text-[#98c379]">"AVAX"</span>
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">10</div>
          <code className="flex-1 text-[#abb2bf] pl-8">
            /&gt;
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">11</div>
          <code className="flex-1 text-[#abb2bf] pl-4">
            );
          </code>
        </div>
        <div className="flex">
          <div className="w-8 text-right pr-4 text-gray-600 text-xs font-mono select-none">12</div>
          <code className="flex-1 text-[#abb2bf]">
            {'}'}
          </code>
        </div>
      </div>
    </>
  )

  const codeToCopy = `npm install synq-sdk

import { CheckoutButton } from "synq-sdk";

function PaymentPage() {
  return (
    <CheckoutButton 
      amount={0.02}
      currency="AVAX"
    />
  );
}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="sdk" className="py-20 bg-[#0E0E11] relative border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(195,255,50,0.03)_0%,transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-[#C3FF32] text-sm font-mono mb-6 border border-[#C3FF32]/20 bg-[#C3FF32]/5">
            <Terminal size={14} /> Developer Experience
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">{title}</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">{description}</p>
          
          {/* Badges */}
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {badges.map((badge, i) => (
                <div key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 font-medium">
                  {badge}
                </div>
              ))}
            </div>
          )}
          
          <ul className="space-y-4 mb-8">
            {features.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300">
                <div className="w-5 h-5 rounded-full bg-[#C3FF32]/20 flex items-center justify-center text-[#C3FF32]">
                  <CheckCircle2 size={12} />
                </div>
                {item}
              </li>
            ))}
          </ul>
          <Link href={docsLink} className="text-[#C3FF32] font-medium hover:underline flex items-center gap-2 group">
            Read the documentation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
          </Link>
        </div>

        <div className="relative">
          {/* Left glow */}
          <div className="absolute -inset-1 bg-gradient-to-br from-[#C3FF32] to-transparent opacity-20 blur-md rounded-xl"></div>
          {/* Right glow */}
          <div className="absolute -inset-1 bg-gradient-to-bl from-[#C3FF32] to-transparent opacity-20 blur-md rounded-xl"></div>
          
          {/* VS Code-like IDE Window */}
          <div className="bg-[#1e1e1e] rounded-lg border border-white/10 overflow-hidden shadow-2xl relative z-10">
            {/* VS Code Title Bar */}
            <div className="bg-[#2d2d30] border-b border-white/5 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <FileCode size={12} className="text-gray-400" />
                  <span className="text-xs text-gray-400 font-mono">App.tsx</span>
                </div>
              </div>
              <button
                onClick={handleCopy}
                className="px-3 py-1 bg-[#3e3e42] hover:bg-[#4e4e52] border border-white/5 rounded text-xs text-gray-300 font-medium flex items-center gap-1.5 transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-[#4ec9b0]" />
                    <span className="text-[#4ec9b0]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* VS Code Tab Bar */}
            <div className="bg-[#252526] border-b border-white/5 flex items-center px-2">
              <div className="px-3 py-1.5 bg-[#1e1e1e] border-t border-x border-white/5 rounded-t text-xs text-gray-300 font-mono flex items-center gap-2">
                <FileCode size={10} />
                App.tsx
              </div>
            </div>

            {/* VS Code Editor */}
            <div className="bg-[#1e1e1e] p-4">
              <div className="font-mono text-sm leading-relaxed">
                {codeExample || defaultCode}
              </div>
            </div>

            {/* VS Code Status Bar */}
            <div className="bg-[#007acc] px-4 py-1.5 flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-4">
                <span className="font-mono">Ln 7, Col 20</span>
                <span className="font-mono">Spaces: 2</span>
                <span className="font-mono">TypeScript React</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono">UTF-8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
