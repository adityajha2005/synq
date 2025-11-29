'use client'

import { useState } from 'react'
import CheckoutModal from './CheckoutModal'

export default function AvaxCheckout() {
  const [modalOpen, setModalOpen] = useState(false)

  const handlePay = () => {
    console.log('Payment initiated')
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold text-lg"
      >
        Subscribe for 2 AVAX
      </button>

      <CheckoutModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onPay={handlePay}
      />
    </>
  )
}

