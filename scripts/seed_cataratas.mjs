import { createClient } from '@supabase/supabase-js'

const url = 'https://qlmjfuxfoofchjgtglfd.supabase.co'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbWpmdXhmb29mY2hqZ3RnbGZkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njk2MzE1MCwiZXhwIjoyMDkyNTM5MTUwfQ.TNNcLEbYdBz4j3uUROL93A-f2lkC16O09DOMXY_nVLE'
const sb = createClient(url, key)

const itinerario = [
  { dia: 1, titulo: 'Salida desde origen', descripcion: 'Salida desde la zona de origen hacia Foz do Iguazú.', actividades: [] },
  { dia: 2, titulo: 'Cataratas — lado argentino', descripcion: 'Desayuno. Excursión de día completo al Parque Nacional Iguazú (lado argentino). Por la tarde cruce fronterizo y arribo a Foz do Iguazú.', actividades: ['Circuito Inferior — Salto Bossetti, Salto Dos Hermanas, Isla San Martín', 'Circuito Superior — vistas panorámicas de los saltos', 'Circuito Garganta del Diablo — el salto más imponente del parque', 'Cruce fronterizo a Brasil — trámites migratorios'] },
  { dia: 3, titulo: 'Foz do Iguazú', descripcion: 'Desayuno. Día con opcionales: Ciudad del Este (Paraguay), Catamarán por el Río Paraná hasta la Triple Frontera, Show Nocturno Brasilero.', actividades: ['Tour de compras en Ciudad del Este, Paraguay (opcional)', 'Paseo en Catamarán por el Río Paraná — Triple Frontera Argentina, Brasil y Paraguay (opcional)', 'Show Nocturno Brasilero — danzas típicas del Mercosur (opcional)'] },
  { dia: 4, titulo: 'Cataratas — lado brasilero', descripcion: 'Desayuno. Excursión de medio día al Parque Nacional Iguazú del lado brasilero con vistas panorámicas de los saltos.', actividades: ['Recorrido por las pasarelas — Saltos Bossetti, San Martín, Velo de Novia, Los Tres Mosqueteros y Garganta del Diablo', 'Safari Macuco (opcional) — tren eléctrico por la selva + gomón a 200 mts de la Garganta del Diablo'] },
  { dia: 5, titulo: 'Minas de Wanda y Ruinas de San Ignacio', descripcion: 'Desayuno. Trámites migratorios. Visita a las Minas de Wanda y a las Ruinas Jesuíticas de San Ignacio de Miní. Inicio del regreso.', actividades: ['Visita a las Minas de piedras semipreciosas de Wanda', 'Visita guiada a las Ruinas Jesuíticas de San Ignacio de Miní — Patrimonio de la Humanidad'] },
  { dia: 6, titulo: 'Llegada a origen', descripcion: 'Llegada a la ciudad de origen. Fin de nuestros servicios.', actividades: [] },
]

const incluye = [
  'Transporte 5*',
  '3 noches de alojamiento en Foz do Iguazú',
  'Media Pensión (desayuno y cena)',
  'Cataratas del Iguazú lado argentino (Circuito Inferior, Superior y Garganta del Diablo)',
  'Cataratas del Iguazú lado brasilero',
  'Visita a las Minas de Wanda',
  'Visita guiada a las Ruinas Jesuíticas de San Ignacio de Miní',
  'Coordinador permanente',
  'Asistencia al Viajero',
]

const no_incluye = [
  'Entradas a Parques Nacionales y Ruinas (deben comprarse con anticipación por web de cada parque)',
  'Bebidas en las comidas',
  'Excursiones opcionales',
  'Comidas en ruta',
  'Propinas',
]

// Update the row we just inserted (sin itinerario) and add the full data
const { data, error } = await sb
  .from('productos')
  .update({ itinerario, incluye, no_incluye })
  .eq('nombre', 'Cataratas del Iguazu')
  .select('id, nombre')

if (error) {
  console.error('ERROR:', error.message)
  process.exit(1)
}
console.log('Actualizado:', JSON.stringify(data))
