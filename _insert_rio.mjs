import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://qlmjfuxfoofchjgtglfd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbWpmdXhmb29mY2hqZ3RnbGZkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njk2MzE1MCwiZXhwIjoyMDkyNTM5MTUwfQ.TNNcLEbYdBz4j3uUROL93A-f2lkC16O09DOMXY_nVLE'
)

const destino = 'Río de Janeiro'
const hotelDestino = 'Hotel Mirador 4*'

const rio = {
  nombre: 'Río de Janeiro 2027',
  categoria: 'internacional',
  descripcion: 'Río de Janeiro en bus desde Tucumán con parada en Foz de Iguazú: 7 noches en Río de Janeiro (Hotel Mirador 4*) y 2 noches en Foz de Iguazú con visita a Cataratas incluida. 13 días / 9 noches, con salidas en enero y febrero de 2027. Precio en cuotas: salidas de enero, 6 cuotas de $250.000; salidas de febrero, 7 cuotas de $210.000 (tarifa válida hasta el 30/09).',
  origen_ciudad: 'San Miguel de Tucumán',
  destino_ciudad: 'Río de Janeiro',
  duracion_dias: 13,
  duracion_noches: 9,
  precio: 0,
  precio_desde: 1470000,
  itinerario: [
    { dia: 1, titulo: 'Salida desde Tucumán', descripcion: `Salida en Bus Internacional 5* Mix desde la Terminal de Ómnibus de Tucumán. Viaje nocturno con destino a ${destino}.`, actividades: ['Salida en Bus Internacional 5* Mix'] },
    { dia: 2, titulo: 'Viaje — cruce de frontera', descripcion: `Continuamos viaje hacia ${destino}. Trámites de aduana a cargo de la empresa.`, actividades: ['Trámites de aduana a cargo de la empresa'] },
    { dia: 3, titulo: `Llegada a ${destino}`, descripcion: `Arribo a ${destino}. Transfer in puerta a puerta y check-in en ${hotelDestino}. Comienzan las noches de alojamiento en ${destino}.`, actividades: ['Transfer in puerta a puerta', `Check-in en ${hotelDestino}`] },
    { dia: 4, titulo: destino, descripcion: `Día libre para disfrutar de las playas y de ${destino}.`, actividades: [] },
    { dia: 5, titulo: destino, descripcion: `Día libre en ${destino}.`, actividades: [] },
    { dia: 6, titulo: destino, descripcion: `Día libre en ${destino}.`, actividades: [] },
    { dia: 7, titulo: destino, descripcion: `Día libre en ${destino}.`, actividades: [] },
    { dia: 8, titulo: destino, descripcion: `Día libre en ${destino}.`, actividades: [] },
    { dia: 9, titulo: destino, descripcion: `Último día libre en ${destino}. Por la noche, checkout del hotel.`, actividades: [] },
    { dia: 10, titulo: `${destino} — Foz de Iguazú`, descripcion: `Viaje en bus desde ${destino} con destino a Foz de Iguazú.`, actividades: [] },
    { dia: 11, titulo: 'Llegada a Foz de Iguazú', descripcion: 'Arribo a Foz de Iguazú y check-in en Hotel Portinari 3*.', actividades: ['Check-in en Hotel Portinari 3*'] },
    { dia: 12, titulo: 'Visita a las Cataratas del Iguazú', descripcion: 'Visita a las Cataratas del Iguazú incluida en el paquete.', actividades: ['Visita a las Cataratas del Iguazú'] },
    { dia: 13, titulo: 'Regreso a Tucumán', descripcion: 'Checkout del Hotel Portinari. Transfer out puerta a puerta y regreso a Tucumán. Fin de nuestros servicios.', actividades: ['Transfer out puerta a puerta'] },
  ],
  incluye: [
    'Bus Internacional 5* Mix',
    'Trámites de aduana a cargo de la empresa',
    'Transfer in/out puerta a puerta',
    '7 noches de alojamiento en Río de Janeiro — Hotel Mirador 4*',
    '2 noches de alojamiento en Foz de Iguazú — Hotel Portinari 3*, con visita a Cataratas incluida',
    'Coordinación permanente — contacto en línea',
    'Facilitación para el cambio de divisas',
  ],
  no_incluye: ['Comidas no mencionadas en el itinerario', 'Excursiones opcionales', 'Gastos personales'],
  fechas_salida: [
    { fecha: '2027-01-02', estado: 'disponible' },
    { fecha: '2027-01-09', estado: 'disponible' },
    { fecha: '2027-01-16', estado: 'disponible' },
    { fecha: '2027-01-23', estado: 'disponible' },
    { fecha: '2027-02-13', estado: 'disponible' },
    { fecha: '2027-02-20', estado: 'disponible' },
    { fecha: '2027-02-27', estado: 'disponible' },
  ],
  opciones_transporte: [],
}

const { data, error } = await supabase.from('productos').insert(rio).select().single()

if (error) {
  console.error('Error:', error.message)
  process.exit(1)
}
console.log('✅ Río de Janeiro 2027 insertado con ID:', data.id)
