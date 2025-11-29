import AvaxCheckout from '@/components/AvaxCheckout'

export default function CheckoutDemoPage() {
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

