import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://qlmjfuxfoofchjgtglfd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbWpmdXhmb29mY2hqZ3RnbGZkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njk2MzE1MCwiZXhwIjoyMDkyNTM5MTUwfQ.TNNcLEbYdBz4j3uUROL93A-f2lkC16O09DOMXY_nVLE'
)

// Números vendidos leídos de las imágenes (los que tienen ✈️)
const VENDIDOS = [5, 12, 13, 37, 46, 55, 57, 67, 68, 70, 73, 99, 100, 113, 128, 130, 138, 177, 213, 214, 218, 222, 247, 255]

// Buscar la rifa activa
const { data: rifas } = await supabase.from('rifas').select('id, titulo').eq('activa', true)
console.log('Rifas activas:', rifas?.map(r => `${r.id}: ${r.titulo}`))

if (!rifas?.length) { console.log('No hay rifas activas'); process.exit(0) }

// Actualizar cada rifa activa con los numeros vendidos
for (const rifa of rifas) {
  const { error } = await supabase
    .from('rifas')
    .update({
      numeros_vendidos_lista: VENDIDOS,
      numeros_vendidos: VENDIDOS.length,
    })
    .eq('id', rifa.id)

  if (error) console.error(`Error en rifa ${rifa.id}:`, error.message)
  else console.log(`✅ Rifa "${rifa.titulo}" actualizada — ${VENDIDOS.length} números vendidos`)
}
