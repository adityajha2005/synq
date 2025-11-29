'use client'

import AvaxCheckout from '@/components/AvaxCheckout'
import { useWatchContractEvent } from 'wagmi'
import { paymentsAbi, paymentsAddress } from '@/lib/contract'

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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Avalanche Commerce Demo
        </h1>
        <p className="text-gray-600 mb-8">
          Test the checkout flow on Avalanche Fuji testnet
        </p>
        <AvaxCheckout />
      </div>
    </main>
  )
}

