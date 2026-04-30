import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { payment_id } = req.body
  if (!payment_id) return res.status(400).json({ error: 'payment_id requerido' })

  try {
    const isSandbox   = process.env.MP_SANDBOX === 'true'
    const accessToken = isSandbox
      ? process.env.MP_ACCESS_TOKEN_TEST
      : process.env.MP_ACCESS_TOKEN

    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${payment_id}`, {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    })
    const payment = await mpRes.json()

    if (!payment.id) return res.status(400).json({ error: 'Pago no encontrado' })

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    await supabase
      .from('compras')
      .update({ estado: payment.status, mp_payment_id: String(payment_id) })
      .eq('id', payment.external_reference)

    return res.status(200).json({ status: payment.status })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
