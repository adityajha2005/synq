'use client'

import AvaxCheckout from '@/components/AvaxCheckout'
import { useWatchContractEvent } from 'wagmi'
import { paymentsAbi, paymentsAddress } from '@/lib/contract'
import { Navbar } from '@/components/ui'
import { Zap, ArrowRight } from 'lucide-react'

export default function CheckoutDemoPage() {
  useWatchContractEvent({
    address: paymentsAddress,
    abi: paymentsAbi,
    eventName: 'PaymentReceived',
    onLogs(logs) {
      console.log('Payment event received:', logs)
      logs.forEach((log: any) => {
        console.log('Merchant:', log.args.merchant)
        console.log('Payer:', log.args.payer)
        console.log('Amount:', log.args.amount?.toString())
        console.log('Timestamp:', log.args.timestamp?.toString())
      })
    }
  })

  return (
    <div className="bg-[#0A0A0C] min-h-screen text-white font-sans">
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4 pt-32 pb-16">
        <div className="max-w-2xl w-full text-center">
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C3FF32]/5 blur-[120px] rounded-full"></div>
          </div>

          <div className="relative z-10">
            {/* Badge */}
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C3FF32]/20 bg-[#C3FF32]/5 text-[#C3FF32] text-xs font-mono mb-6">
              <Zap size={12} />
              Live Demo
            </div> */}

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              synq pay
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C3FF32] via-[#e2ff8d] to-white">
                Checkout Demo
              </span>
            </h1>
            <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
              Test the checkout flow on Avalanche Fuji testnet. Connect your wallet and subscribe in seconds.
            </p>

            {/* Checkout Component */}
            <div className="bg-[#0E0E11] rounded-2xl border border-white/5 p-8 relative overflow-hidden group hover:border-[#C3FF32]/30 transition-all">
              <div className="absolute -inset-4 bg-[#C3FF32]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <AvaxCheckout />
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              <div className="bg-[#0E0E11] border border-white/5 rounded-xl p-4">
                <div className="text-[#C3FF32] text-sm font-semibold mb-1">Fast</div>
                <div className="text-gray-400 text-xs">Instant payments</div>
              </div>
              <div className="bg-[#0E0E11] border border-white/5 rounded-xl p-4">
                <div className="text-[#C3FF32] text-sm font-semibold mb-1">Secure</div>
                <div className="text-gray-400 text-xs">On-chain verification</div>
              </div>
              <div className="bg-[#0E0E11] border border-white/5 rounded-xl p-4">
                <div className="text-[#C3FF32] text-sm font-semibold mb-1">Simple</div>
                <div className="text-gray-400 text-xs">One-click checkout</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

