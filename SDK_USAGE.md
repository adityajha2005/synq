# 📦 SYNQ SDK - Complete Guide

## 🎯 Overview

A TypeScript/React SDK that enables developers to integrate Avalanche-based payments and subscriptions into their applications with minimal code.

**Features:**
- ✅ Pre-built React UI components
- ✅ Complete TypeScript API client
- ✅ Full type definitions
- ✅ Payment verification
- ✅ Subscription management
- ✅ Access control utilities

---

## 📁 SDK Structure

```
/sdk
├── package.json          # SDK package config
├── tsconfig.json         # TypeScript config
├── index.ts             # Main exports
├── /client              # Backend API utilities
│   ├── payments.ts      # Payment verification, checkout URL
│   └── subscriptions.ts # Subscription management, access control
├── /ui                  # React components
│   ├── CheckoutButton.tsx        # Pre-built checkout button
│   └── SubscriptionStatus.tsx    # Subscription status display
├── /types               # TypeScript definitions
│   └── index.ts         # All types exported
└── /dist                # Compiled output (after build)
    ├── index.js
    ├── index.d.ts
    └── ...
```

---

## 🛠️ Build the SDK

```bash
# From root directory
npm run build:sdk

# Or manually
cd sdk
npm run build
```

**Output:** Compiled JS + TypeScript declarations in `sdk/dist/`

---

## 🚀 How to Use the SDK

### **Option 1: Use Locally in Your App**

```tsx
// In any Next.js page/component
import { CheckoutButton, SubscriptionStatus } from '../sdk'

export default function MyPage() {
  return (
    <div>
      <CheckoutButton 
        amount={0.01}
        planId="plan-uuid-here"
        label="Subscribe Now"
      />
      
      <SubscriptionStatus 
        wallet="0xYourWalletAddress"
        showDetails={true}
      />
    </div>
  )
}
```

**Demo:** Visit http://localhost:3000/sdk-demo

---

### **Option 2: Publish to npm** (Future)

```bash
cd sdk
npm publish
```

Then developers can:
```bash
npm install synq-sdk
```

---

## 📚 API Reference

### **UI Components**

#### `<CheckoutButton />`

Pre-built button that redirects to checkout.

```tsx
import { CheckoutButton } from '../sdk'

<CheckoutButton 
  amount={0.01}              // Payment amount (default: 0.01)
  planId="uuid"              // Optional plan ID for subscription
  label="Subscribe Now"      // Button text (default: "Subscribe")
  className="custom-class"   // Optional custom styling
  onCheckout={() => {}}      // Optional callback before redirect
/>
```

**What it does:**
- Generates checkout URL with parameters
- Redirects user to `/checkout-demo`
- Passes amount & planId as query params

---

#### `<SubscriptionStatus />`

Shows subscription status with auto-loading.

```tsx
import { SubscriptionStatus } from '../sdk'
import { useAccount } from 'wagmi'

export default function Dashboard() {
  const { address } = useAccount()
  
  return (
    <SubscriptionStatus 
      wallet={address}           // Required: customer wallet
      className="custom-class"   // Optional styling
      showDetails={true}         // Show expiry date (default: true)
    />
  )
}
```

**What it displays:**
- ✓ Active Subscription (green)
- ⚠️ Subscription Inactive (red)
- Expiry date (if showDetails=true)
- Loading state automatically

---

### **Client Utilities**

#### `verifyPayment()`

Verifies a transaction on-chain and creates subscription.

```tsx
import { verifyPayment } from '../sdk'

const result = await verifyPayment(
  txHash,           // Transaction hash
  merchantAddress,  // Merchant wallet
  0.01,            // Amount in AVAX
  planId           // Optional: plan ID for subscription
)

if (result.verified) {
  console.log('Payment confirmed!')
  if (result.subscription) {
    console.log('Subscription created:', result.subscription.subscription_id)
  }
}
```

**Returns:**
```typescript
{
  verified: boolean
  payer: string
  merchant: string
  timestamp: string
  amount: string
  payment_id: string
  subscription?: {
    subscription_id: string
    status: string
    current_period_end: number
  }
}
```

---

#### `checkAccess()`

Checks if wallet has active subscription.

```tsx
import { checkAccess } from '../sdk'

const { access, subscription } = await checkAccess(
  walletAddress,
  merchantAddress,
  planId  // Optional
)

if (access) {
  // Grant access to premium content
  console.log('Expires:', subscription.expires)
}
```

**Returns:**
```typescript
{
  access: boolean
  reason?: string
  subscription?: {
    id: string
    plan: string
    expires: number
  }
}
```

---

#### `getSubscriptionStatus()`

Gets subscription details for a wallet.

```tsx
import { getSubscriptionStatus } from '../sdk'

const status = await getSubscriptionStatus(walletAddress)

if (status.active) {
  console.log('Plan:', status.plan)
  console.log('Expires:', new Date(status.current_period_end * 1000))
}
```

---

#### `cancelSubscription()`

Cancels an active subscription.

```tsx
import { cancelSubscription } from '../sdk'

await cancelSubscription(subscriptionId)
```

---

#### `listSubscriptions()`

Lists subscriptions for merchant or customer.

```tsx
import { listSubscriptions } from '../sdk'

// Get customer's subscriptions
const { subscriptions } = await listSubscriptions({
  customer: walletAddress
})

// Get merchant's subscriptions
const { subscriptions } = await listSubscriptions({
  merchant: merchantAddress
})
```

---

#### `createCheckoutUrl()`

Generates checkout URL with parameters.

```tsx
import { createCheckoutUrl } from '../sdk'

const url = createCheckoutUrl({
  amount: 0.01,
  planId: 'uuid-here'
})

console.log(url)
// Output: /checkout-demo?amount=0.01&plan=uuid-here
```

---

## 🎨 Styling Components

Both components accept custom `className` prop:

```tsx
<CheckoutButton 
  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full"
/>

<SubscriptionStatus 
  wallet={address}
  className="p-4 bg-green-50 border-2 border-green-200 rounded-lg"
/>
```

---

## 📊 TypeScript Types

All types are exported:

```typescript
import type { 
  CheckoutOptions,
  VerifyResponse,
  SubscriptionStatusData,
  Plan,
  Subscription,
  AccessResponse
} from '../sdk'
```

---

## 🧪 Testing the SDK

### **1. Visit SDK Demo Page**
```
http://localhost:3000/sdk-demo
```

Shows all components in action with examples.

### **2. Test Checkout Flow**
```tsx
// Click CheckoutButton → redirects to /checkout-demo
// Pay with MetaMask → subscription created
// Visit /protected → access granted!
```

### **3. Test Status Component**
```tsx
// Connect wallet
// Component auto-loads subscription status
// Shows active/inactive + expiry date
```

---

## 📦 Exporting for Others

### **Method 1: Git Submodule**
```bash
# Other developers can add as submodule
git submodule add https://github.com/yourusername/avax-402 
```

### **Method 2: npm Package**
```bash
cd sdk
npm publish
```

Then in other apps:
```bash
npm install synq-sdk
```

```tsx
import { CheckoutButton } from 'avalanche-commerce-sdk'
```

---

## ✅ SDK Features Checklist

- ✅ Pre-built React components
- ✅ TypeScript type definitions
- ✅ Payment verification utilities
- ✅ Subscription management
- ✅ Access control checking
- ✅ Auto-loading states
- ✅ Custom styling support
- ✅ Full API client utilities
- ✅ Compiled dist/ output
- ✅ Demo page included

---

## 🚀 Ready to Ship!

Your SDK is production-ready. Developers can now integrate your payment system with just a few lines of code! 🎉

