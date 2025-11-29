"use client"

import React, { useEffect, useState } from "react"
import { getSubscriptionStatus } from "../client/subscriptions"
import type { SubscriptionStatusData } from "../types"

export interface SubscriptionStatusProps {
  wallet: string
  className?: string
  showDetails?: boolean
}

export function SubscriptionStatus({
  wallet,
  className,
  showDetails = true,
}: SubscriptionStatusProps) {
  const [status, setStatus] = useState<SubscriptionStatusData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (wallet) {
      loadStatus()
    }
  }, [wallet])

  async function loadStatus() {
    try {
      setLoading(true)
      const data = await getSubscriptionStatus(wallet)
      setStatus(data)
    } catch (error) {
      console.error("Failed to load subscription status:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={className || "bg-[#0E0E11] border border-white/10 rounded-lg p-4"}>
        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <div className="w-4 h-4 border-2 border-[#C3FF32] border-t-transparent rounded-full animate-spin"></div>
          <span>Loading subscription status...</span>
        </div>
      </div>
    )
  }

  if (!status) {
    return (
      <div className={className || "bg-[#0E0E11] border border-white/10 rounded-lg p-4"}>
        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <div className="w-4 h-4 rounded-full border-2 border-gray-500"></div>
          <span>Unable to load subscription status</span>
        </div>
      </div>
    )
  }

  if (!status.active) {
    return (
      <div className={className || "bg-[#0E0E11] border border-red-500/20 rounded-lg p-4 relative overflow-hidden group"}>
        <div className="absolute -inset-1 bg-red-500/5 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-red-500/20 border-2 border-red-400 flex items-center justify-center flex-shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
          </div>
          <div>
            <p className="text-red-400 font-semibold text-sm">Subscription Inactive</p>
            {showDetails && (
              <p className="text-gray-500 text-xs mt-1">
                No active subscription found
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={className || "bg-[#0E0E11] border border-[#C3FF32]/20 rounded-lg p-4 relative overflow-hidden group hover:border-[#C3FF32]/30 transition-all"}>
      <div className="absolute -inset-1 bg-[#C3FF32]/5 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-4 h-4 rounded-full bg-[#C3FF32]/20 border-2 border-[#C3FF32] flex items-center justify-center flex-shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-[#C3FF32]"></div>
          </div>
          <p className="text-[#C3FF32] font-semibold text-sm">Active Subscription</p>
        </div>
        {showDetails && status.current_period_end && (
          <p className="text-gray-400 text-xs ml-7">
            Expires: <span className="text-gray-300 font-medium">{new Date(status.current_period_end * 1000).toLocaleDateString()}</span>
          </p>
        )}
      </div>
    </div>
  )
}

