/**
 * Intenta agregar la columna numeros_vendidos_lista a la tabla rifas
 * usando la Management API de Supabase (requiere SERVICE_ROLE key).
 *
 * Si falla, imprime el SQL para correr manualmente en el SQL Editor de Supabase.
 */
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://qlmjfuxfoofchjgtglfd.supabase.co'
const SERVICE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbWpmdXhmb29mY2hqZ3RnbGZkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njk2MzE1MCwiZXhwIjoyMDkyNTM5MTUwfQ.TNNcLEbYdBz4j3uUROL93A-f2lkC16O09DOMXY_nVLE'

const VENDIDOS = [5, 12, 13, 37, 46, 55, 57, 67, 68, 70, 73, 99, 100, 113, 128, 130, 138, 177, 213, 214, 218, 222, 247, 255]

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

// 1 ── Intentar ALTER TABLE vía RPC (puede no existir en todos los proyectos)
console.log('Intentando agregar columna numeros_vendidos_lista…')
const { error: alterError } = await supabase.rpc('exec_sql', {
  sql: `ALTER TABLE rifas ADD COLUMN IF NOT EXISTS numeros_vendidos_lista jsonb DEFAULT '[]'::jsonb;`
})

if (alterError) {
  console.warn('RPC exec_sql no disponible:', alterError.message)
  console.log('\n📋 Corré esto manualmente en el SQL Editor de Supabase:\n')
  console.log(`ALTER TABLE rifas ADD COLUMN IF NOT EXISTS imagenes_numeros jsonb DEFAULT '[]'::jsonb;`)
  console.log(`ALTER TABLE rifas ADD COLUMN IF NOT EXISTS numeros_vendidos_lista jsonb DEFAULT '[]'::jsonb;`)
  console.log('\nDespués de correr eso, ejecutá este script de nuevo o corré _set_numeros_vendidos.mjs')
  process.exit(0)
} else {
  console.log('✅ Columna agregada (o ya existía)')
}

// 2 ── Actualizar rifas activas con la lista de vendidos
const { data: rifas } = await supabase.from('rifas').select('id, titulo').eq('activa', true)
if (!rifas?.length) { console.log('No hay rifas activas'); process.exit(0) }

for (const rifa of rifas) {
  const { error } = await supabase
    .from('rifas')
    .update({ numeros_vendidos_lista: VENDIDOS, numeros_vendidos: VENDIDOS.length })
    .eq('id', rifa.id)
  console.log(error ? `❌ ${rifa.titulo}: ${error.message}` : `✅ "${rifa.titulo}" — ${VENDIDOS.length} números vendidos guardados`)
}
