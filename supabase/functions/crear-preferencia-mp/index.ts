import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS })
  }

  try {
    const { nombre, precio, descripcion } = await req.json()
    const accessToken = Deno.env.get('MP_ACCESS_TOKEN')
    const baseUrl = req.headers.get('origin') || 'http://localhost:5173'

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
        back_urls: {
          success: `${baseUrl}/?pago=exitoso`,
          failure: `${baseUrl}/?pago=fallido`,
          pending: `${baseUrl}/?pago=pendiente`,
        },
        auto_return: 'approved',
      }),
    })

    const data = await response.json()

    return new Response(JSON.stringify({ init_point: data.init_point }), {
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
})
