import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const body = await req.json()

    if (body.type !== 'payment') return new Response('ok', { status: 200 })

    const paymentId = body.data?.id
    if (!paymentId) return new Response('ok', { status: 200 })

    const isSandbox   = Deno.env.get('MP_SANDBOX') === 'true'
    const accessToken = isSandbox
      ? Deno.env.get('MP_ACCESS_TOKEN_TEST')!
      : Deno.env.get('MP_ACCESS_TOKEN')!

    const paymentRes = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      { headers: { 'Authorization': `Bearer ${accessToken}` } },
    )
    const payment = await paymentRes.json()

    const externalRef: string = payment.external_reference ?? ''

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    if (externalRef.startsWith('rifa_')) {
      // Pago de rifa
      const participacionId = externalRef.slice(5)

      await supabase
        .from('rifa_participaciones')
        .update({
          estado:        payment.status,
          mp_payment_id: String(paymentId),
        })
        .eq('id', participacionId)

      // Si fue aprobado, incrementar numeros_vendidos en la rifa
      if (payment.status === 'approved') {
        const { data: part } = await supabase
          .from('rifa_participaciones')
          .select('rifa_id, cantidad_numeros')
          .eq('id', participacionId)
          .single()

        if (part) {
          const { data: rifaData } = await supabase
            .from('rifas')
            .select('numeros_vendidos')
            .eq('id', part.rifa_id)
            .single()

          if (rifaData) {
            await supabase
              .from('rifas')
              .update({ numeros_vendidos: rifaData.numeros_vendidos + part.cantidad_numeros })
              .eq('id', part.rifa_id)
          }
        }
      }
    } else {
      // Pago de compra/paquete
      await supabase
        .from('compras')
        .update({
          estado:        payment.status,
          mp_payment_id: String(paymentId),
        })
        .eq('id', externalRef)
    }

    return new Response('ok', { status: 200 })

  } catch (err: any) {
    console.error('Webhook error:', err.message)
    return new Response('error', { status: 500 })
  }
})
