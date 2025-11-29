import { NextRequest, NextResponse } from 'next/server'
import { ensureSupabase } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const supabase = ensureSupabase()
    const body = await req.json()
    const { wallet, merchant, plan_id } = body

    if (!wallet) {
      return NextResponse.json(
        { error: 'Missing required field: wallet', access: false },
        { status: 400 }
      )
    }

    console.log('Verifying access for:', { wallet, merchant, plan_id })

    const { data: merchantData } = await supabase
      .from('merchants')
      .select('id')
      .eq('wallet', merchant?.toLowerCase() || '')
      .single()

    if (!merchantData) {
      console.log('Merchant not found')
      return NextResponse.json({ access: false, reason: 'Merchant not found' })
    }

    let query = supabase
      .from('subscriptions')
      .select('*, plans(*)')
      .eq('payer_wallet', wallet.toLowerCase())
      .eq('merchant_id', merchantData.id)
      .eq('status', 'active')

    if (plan_id) {
      query = query.eq('plan_id', plan_id)
    }

    const { data: subscriptions } = await query

    if (!subscriptions || subscriptions.length === 0) {
      console.log('No active subscription found')
      return NextResponse.json({ 
        access: false, 
        reason: 'No active subscription found' 
      })
    }

    const now = Math.floor(Date.now() / 1000)
    const activeSubscription = subscriptions.find(
      (sub: any) => sub.current_period_end > now
    )

    if (!activeSubscription) {
      console.log('Subscription expired')
      return NextResponse.json({ 
        access: false, 
        reason: 'Subscription expired' 
      })
    }

    console.log('Access granted:', activeSubscription.id)

    return NextResponse.json({
      access: true,
      subscription: {
        id: activeSubscription.id,
        plan: activeSubscription.plans?.name,
        expires: activeSubscription.current_period_end,
      },
    })
  } catch (error: any) {
    console.error('Error verifying access:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to verify access', access: false },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const wallet = searchParams.get('wallet')
  const merchant = searchParams.get('merchant')
  const plan_id = searchParams.get('plan_id')

  if (!wallet) {
    return NextResponse.json(
      { error: 'Missing required parameter: wallet', access: false },
      { status: 400 }
    )
  }

  return POST(
    new NextRequest(req.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wallet, merchant, plan_id }),
    })
  )
}

