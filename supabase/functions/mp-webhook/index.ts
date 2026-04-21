import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const body = await req.json()

    // MP envía distintos tipos: payment, merchant_order, etc.
    if (body.type !== 'payment') {
      return new Response('ok', { status: 200 })
    }

    const paymentId = body.data?.id
    if (!paymentId) return new Response('ok', { status: 200 })

    const accessToken = Deno.env.get('MP_ACCESS_TOKEN')!

    // Obtener detalles del pago desde MP
    const paymentRes = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      { headers: { 'Authorization': `Bearer ${accessToken}` } }
    )
    const payment = await paymentRes.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Actualizar estado de la compra
    await supabase
      .from('compras')
      .update({
        estado:        payment.status,        // approved | rejected | pending
        mp_payment_id: String(paymentId),
      })
      .eq('id', payment.external_reference)

    return new Response('ok', { status: 200 })

  } catch (err: any) {
    console.error('Webhook error:', err.message)
    return new Response('error', { status: 500 })
  }
})
