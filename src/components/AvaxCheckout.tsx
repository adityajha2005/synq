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
      <button
        onClick={() => setModalOpen(true)}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold text-lg"
      >
        Subscribe for 0.001 AVAX
      </button>

      <CheckoutModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        redirectTo={redirectTo}
        onSuccess={onSuccess}
      />
    </>
  )
}

