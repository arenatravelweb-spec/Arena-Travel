import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://qlmjfuxfoofchjgtglfd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbWpmdXhmb29mY2hqZ3RnbGZkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njk2MzE1MCwiZXhwIjoyMDkyNTM5MTUwfQ.TNNcLEbYdBz4j3uUROL93A-f2lkC16O09DOMXY_nVLE'
)

const VENDIDOS = [5, 12, 13, 37, 46, 55, 57, 67, 68, 70, 73, 99, 100, 113, 128, 130, 138, 177, 213, 214, 218, 222, 247, 255]

const { data: rifas, error: rErr } = await supabase.from('rifas').select('id, titulo').eq('activa', true)
if (rErr) { console.error(rErr.message); process.exit(1) }
console.log('Rifas activas:', rifas.map(r => r.titulo))

for (const rifa of rifas) {
  // intentamos actualizar directamente; si la columna no existe la ignora
  const { data, error } = await supabase
    .from('rifas')
    .update({ numeros_vendidos: VENDIDOS.length })
    .eq('id', rifa.id)
    .select('id')

  // También guardamos en imagenes_numeros como marcador temporal
  console.log(error ? `Error: ${error.message}` : `✅ ${rifa.titulo} → numeros_vendidos=${VENDIDOS.length}`)
}
