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
  try { body = await req.json() } catch {
    return new Response(JSON.stringify({ error: 'JSON inválido' }), {
      status: 400, headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }

  try {
    const { rifa_id, nombre, email, telefono, cantidad_numeros } = body

    if (!rifa_id || !nombre || !email || !cantidad_numeros) {
      throw new Error('Faltan campos obligatorios')
    }

    const isSandbox   = Deno.env.get('MP_SANDBOX') === 'true'
    const accessToken = isSandbox
      ? Deno.env.get('MP_ACCESS_TOKEN_TEST')!
      : Deno.env.get('MP_ACCESS_TOKEN')!
    const baseUrl = Deno.env.get('APP_URL') || req.headers.get('origin') || 'http://localhost:5173'

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    // Verificar rifa y disponibilidad
    const { data: rifa, error: rifaErr } = await supabase
      .from('rifas')
      .select('*')
      .eq('id', rifa_id)
      .eq('activa', true)
      .single()

    if (rifaErr || !rifa) throw new Error('Rifa no encontrada o inactiva')

    const disponibles = rifa.total_numeros - rifa.numeros_vendidos
    if (cantidad_numeros > disponibles) {
      throw new Error(`Solo quedan ${disponibles} número${disponibles !== 1 ? 's' : ''} disponibles`)
    }

    const monto_total = Number(rifa.precio_numero) * Number(cantidad_numeros)

    // Crear participación
    const { data: participacion, error: partErr } = await supabase
      .from('rifa_participaciones')
      .insert({
        rifa_id,
        nombre,
        email,
        telefono: telefono || '',
        cantidad_numeros: Number(cantidad_numeros),
        monto_total,
        estado: 'pendiente',
      })
      .select()
      .single()

    if (partErr) throw new Error(partErr.message)

    // Crear preferencia en Mercado Pago
    const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        items: [{
          title:       `${rifa.titulo} — ${cantidad_numeros} número${cantidad_numeros > 1 ? 's' : ''}`,
          description: `Rifa Arena Travel`,
          unit_price:  monto_total,
          quantity:    1,
          currency_id: 'ARS',
        }],
        payer: { name: nombre, email },
        external_reference: `rifa_${participacion.id}`,
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
    const url = isSandbox ? mpData.sandbox_init_point : mpData.init_point

    if (!url) throw new Error('No se pudo crear el link de pago')

    return new Response(JSON.stringify({ init_point: url }), {
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
})
