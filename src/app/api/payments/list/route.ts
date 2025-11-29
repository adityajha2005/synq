import { NextRequest, NextResponse } from 'next/server'
import { ensureSupabase } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const supabase = ensureSupabase()
    const { searchParams } = new URL(req.url)
    const merchant = searchParams.get('merchant')

    if (!merchant) {
      return NextResponse.json(
        { error: 'Missing merchant parameter' },
        { status: 400 }
      )
    }

    // Get merchant ID
    const { data: merchantData } = await supabase
      .from('merchants')
      .select('id')
      .eq('wallet', merchant.toLowerCase())
      .single()

    if (!merchantData) {
      return NextResponse.json({
        payments: [],
        count: 0,
        totalRevenue: 0
      })
    }

    // Fetch payments
    const { data: payments, error } = await supabase
      .from('payments')
      .select('*')
      .eq('merchant_id', merchantData.id)
      .eq('status', 'verified')
      .order('timestamp', { ascending: false })

    if (error) throw error

    // Calculate total revenue
    let totalRevenue = 0
    if (payments) {
      payments.forEach((payment: any) => {
        if (payment.amount) {
          totalRevenue += parseFloat(payment.amount) / 1e18
        }
      })
    }

    return NextResponse.json({
      payments: payments || [],
      count: payments?.length || 0,
      totalRevenue
    })
  } catch (error: any) {
    console.error('Error listing payments:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to list payments' },
      { status: 500 }
    )
  }
}

