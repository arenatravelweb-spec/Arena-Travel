import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  try {
    const { nombre, precio, descripcion, comprador } = req.body

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

    const origin = req.headers.origin || process.env.APP_URL || ''
    const isProd  = origin && !origin.includes('localhost')

    const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
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
        external_reference: String(compra.id),
        ...(isProd && {
          back_urls: {
            success: `${origin}/?pago=exitoso`,
            failure: `${origin}/?pago=fallido`,
            pending: `${origin}/?pago=pendiente`,
          },
          auto_return: 'approved',
        }),
      }),
    })

    const mpData = await mpRes.json()

    if (!mpData.id) throw new Error(mpData.message || 'Error al crear preferencia en MercadoPago')

    return res.status(200).json({ preference_id: mpData.id, init_point: mpData.init_point })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
