'use client'

import { useState } from 'react'
import CheckoutModal from './CheckoutModal'

interface AvaxCheckoutProps {
  redirectTo?: string
  onSuccess?: () => void
}

export default function AvaxCheckout({ redirectTo, onSuccess }: AvaxCheckoutProps = {}) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <div className="text-center mb-2">
          <p className="text-sm text-gray-400 mb-1">Premium Subscription</p>
          <p className="text-2xl font-bold text-white">
            0.001 <span className="text-[#C3FF32]">AVAX</span>
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="relative px-10 py-4 bg-[#C3FF32] text-black rounded-xl font-bold text-base tracking-tight hover:bg-[#b0e62e] transition-all duration-200 shadow-[0_0_30px_rgba(195,255,50,0.4)] hover:shadow-[0_0_40px_rgba(195,255,50,0.5)] active:scale-[0.98]"
        >
          <span className="relative z-10">Subscribe Now</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity"></div>
        </button>
        <p className="text-xs text-gray-500 mt-1">One-time payment • Instant access</p>
      </div>

      <CheckoutModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        redirectTo={redirectTo}
        onSuccess={onSuccess}
      />
    </>
  )
}

