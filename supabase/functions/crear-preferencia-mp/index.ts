import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  let body: any
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }

  try {
    const { nombre, precio, descripcion, comprador } = body

    const accessToken = Deno.env.get('MP_ACCESS_TOKEN')!
    const baseUrl     = Deno.env.get('APP_URL') || req.headers.get('origin') || 'http://localhost:5173'

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Guardar compra en DB
    const { data: compra, error: dbErr } = await supabase
      .from('compras')
      .insert({
        nombre:          comprador.nombre,
        email:           comprador.email,
        telefono:        comprador.telefono ?? '',
        producto_nombre: nombre,
        precio:          Number(precio),
        estado:          'pendiente',
      })
      .select()
      .single()

    if (dbErr) throw new Error(dbErr.message)

    // Crear preferencia en Mercado Pago
    const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        items: [{
          title:       nombre,
          description: descripcion ?? '',
          unit_price:  Number(precio),
          quantity:    1,
          currency_id: 'ARS',
        }],
        payer: {
          name:  comprador.nombre,
          email: comprador.email,
        },
        external_reference: compra.id,
        back_urls: {
          success: `${baseUrl}/?pago=exitoso`,
          failure: `${baseUrl}/?pago=fallido`,
          pending: `${baseUrl}/?pago=pendiente`,
        },
        auto_return:      'approved',
        notification_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/mp-webhook`,
      }),
    })

    const mpData = await mpRes.json()

    const url = mpData.init_point

    return new Response(JSON.stringify({ preference_id: mpData.id, init_point: url }), {
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
})
