// Script de migración: copia imágenes de Cloudinary viejo → nuevo
// y actualiza las URLs en Supabase.
//
// Uso:
//   node migrate-cloudinary.mjs
//
// Requiere: CLOUDINARY_API_SECRET de la NUEVA cuenta (pedíselo al dashboard)

import { createClient } from '@supabase/supabase-js'
import { createHash } from 'crypto'

// ── Configuración ────────────────────────────────────────────────
const OLD_CLOUD   = 'dabikk5ei'
const NEW_CLOUD   = 'doxubzldn'
const NEW_API_KEY = '784389254264828'
const NEW_SECRET  = process.env.CLOUDINARY_API_SECRET  // pasalo por env

const SUPABASE_URL      = 'https://qlmjfuxfoofchjgtglfd.supabase.co'
const SUPABASE_SERVICE  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbWpmdXhmb29mY2hqZ3RnbGZkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njk2MzE1MCwiZXhwIjoyMDkyNTM5MTUwfQ.TNNcLEbYdBz4j3uUROL93A-f2lkC16O09DOMXY_nVLE'
// ─────────────────────────────────────────────────────────────────

if (!NEW_SECRET) {
  console.error('❌ Falta CLOUDINARY_API_SECRET. Ejecutá así:')
  console.error('   CLOUDINARY_API_SECRET=tu_secret node migrate-cloudinary.mjs')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE)

function signRequest(params) {
  const sorted = Object.keys(params).sort()
    .map(k => `${k}=${params[k]}`).join('&')
  return createHash('sha1').update(sorted + NEW_SECRET).digest('hex')
}

async function uploadFromUrl(imageUrl) {
  const timestamp = Math.floor(Date.now() / 1000)
  const params = { timestamp, upload_preset: 'ArenaTravel' }
  const signature = signRequest(params)

  const body = new FormData()
  body.append('file', imageUrl)
  body.append('upload_preset', 'ArenaTravel')
  body.append('api_key', NEW_API_KEY)
  body.append('timestamp', timestamp)
  body.append('signature', signature)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${NEW_CLOUD}/image/upload`,
    { method: 'POST', body }
  )
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.secure_url
}

async function main() {
  console.log('📦 Obteniendo productos de Supabase...')
  const { data: productos, error } = await supabase
    .from('productos')
    .select('id, nombre, imagen_url')

  if (error) { console.error('❌ Error Supabase:', error.message); return }

  const conImagen = productos.filter(p =>
    p.imagen_url && p.imagen_url.includes(OLD_CLOUD)
  )

  console.log(`🖼  ${conImagen.length} imágenes para migrar\n`)

  for (const p of conImagen) {
    try {
      console.log(`⬆️  Migrando: ${p.nombre}`)
      const nuevaUrl = await uploadFromUrl(p.imagen_url)

      await supabase
        .from('productos')
        .update({ imagen_url: nuevaUrl })
        .eq('id', p.id)

      console.log(`✅ OK → ${nuevaUrl}\n`)
    } catch (err) {
      console.error(`❌ Error en "${p.nombre}": ${err.message}\n`)
    }
  }

  console.log('🎉 Migración de productos completada.')
  console.log('')
  console.log('⚠️  Acordate de actualizar también las imágenes hardcodeadas en el código:')
  console.log('   - src/components/Navbar.jsx')
  console.log('   - src/components/Footer.jsx')
  console.log('   - src/components/Hero.jsx')
  console.log('   - src/components/About.jsx')
  console.log('   - src/components/CTABanner.jsx')
}

main()
