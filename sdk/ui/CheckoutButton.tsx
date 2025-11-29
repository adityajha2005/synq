"use client"

import React from "react"
import { createCheckoutUrl } from "../client/payments"

export interface CheckoutButtonProps {
  amount?: number
  planId?: string
  label?: string
  className?: string
  onCheckout?: () => void
}

export function CheckoutButton({
  amount = 0.01,
  planId,
  label = "Subscribe",
  className,
  onCheckout,
}: CheckoutButtonProps) {
  function openCheckout() {
    const url = createCheckoutUrl({ amount, planId })
    
    if (onCheckout) {
      onCheckout()
    }
    
    window.location.href = url
  }

  return (
    <button
      onClick={openCheckout}
      className={
        className ||
        "px-6 py-3 bg-[#C3FF32] text-black rounded-lg font-bold text-sm tracking-wide hover:bg-[#b0e62e] transition-all transform hover:-translate-y-0.5 shadow-[0_0_20px_rgba(195,255,50,0.3)] hover:shadow-[0_0_25px_rgba(195,255,50,0.4)] active:scale-[0.98]"
      }
    >
      {label}
    </button>
  )
}

