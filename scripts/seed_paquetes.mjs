import { createClient } from '@supabase/supabase-js'

const url = 'https://qlmjfuxfoofchjgtglfd.supabase.co'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbWpmdXhmb29mY2hqZ3RnbGZkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njk2MzE1MCwiZXhwIjoyMDkyNTM5MTUwfQ.TNNcLEbYdBz4j3uUROL93A-f2lkC16O09DOMXY_nVLE'
const sb = createClient(url, key)

const paquetes = [
  {
    nombre: 'Cataratas del Iguazú',
    categoria: 'nacional',
    descripcion: 'Viví las Cataratas del Iguazú desde ambos lados: el lado argentino con la imponente Garganta del Diablo y el lado brasilero con sus vistas panorámicas. 6 días / 3 noches en Foz do Iguazú con excursiones incluidas.',
    destino_ciudad: 'Cataratas del Iguazú',
    origen_ciudad: 'San Miguel de Tucumán',
    duracion_dias: 6,
    duracion_noches: 3,
    precio: 0,
    itinerario: [
      { dia: 1, titulo: 'Salida desde origen', descripcion: 'Salida desde la zona de origen hacia Foz do Iguazú.', actividades: [] },
      { dia: 2, titulo: 'Cataratas lado argentino', descripcion: 'Desayuno. Excursión de día completo al Parque Nacional Iguazú (lado argentino). Por la tarde cruce fronterizo y arribo a Foz do Iguazú.', actividades: ['Circuito Inferior — Salto Bossetti, Salto Dos Hermanas, Isla San Martín', 'Circuito Superior — vistas panorámicas de los saltos', 'Circuito Garganta del Diablo — el salto más imponente del parque', 'Cruce fronterizo a Brasil — trámites migratorios'] },
      { dia: 3, titulo: 'Foz do Iguazú', descripcion: 'Desayuno. Día libre con opcionales: Ciudad del Este (Paraguay), Catamarán por el Río Paraná hasta la Triple Frontera, y Show Nocturno Brasilero.', actividades: ['Tour de compras en Ciudad del Este, Paraguay (opcional)', 'Paseo en Catamarán por el Río Paraná — Triple Frontera Argentina, Brasil y Paraguay (opcional)', 'Show Nocturno Brasilero — danzas típicas del Mercosur (opcional)'] },
      { dia: 4, titulo: 'Cataratas lado brasilero', descripcion: 'Desayuno. Excursión de medio día al Parque Nacional Iguazú del lado brasilero — vistas panorámicas de los saltos.', actividades: ['Recorrido por las pasarelas — Saltos Bossetti, San Martín, Velo de Novia, Los Tres Mosqueteros y Garganta del Diablo', 'Safari Macuco (opcional) — tren eléctrico por la selva + gomón hasta 200 mts de la Garganta del Diablo'] },
      { dia: 5, titulo: 'Wanda y San Ignacio — Regreso', descripcion: 'Desayuno. Trámites migratorios. Visita incluida a las Minas de Wanda y a las Ruinas Jesuíticas de San Ignacio. Emprendemos el regreso.', actividades: ['Visita a las Minas de piedras semipreciosas de Wanda', 'Visita guiada a las Ruinas Jesuíticas de San Ignacio de Miní'] },
      { dia: 6, titulo: 'Llegada a origen', descripcion: 'Llegada a la ciudad de origen. Fin de nuestros servicios.', actividades: [] },
    ],
    incluye: ['Transporte 5*', '3 noches de alojamiento en Foz do Iguazú', 'Media Pensión (desayuno y cena)', 'Cataratas del Iguazú lado argentino (Circuito Inferior, Superior y Garganta del Diablo)', 'Cataratas del Iguazú lado brasilero', 'Visita a las Minas de Wanda', 'Visita guiada a las Ruinas Jesuíticas de San Ignacio de Miní', 'Coordinador permanente', 'Asistencia al Viajero'],
    no_incluye: ['Entradas a Parques Nacionales y Ruinas (deben comprarse con anticipación por web)', 'Bebidas en las comidas', 'Excursiones opcionales', 'Comidas en ruta', 'Propinas'],
  },
  {
    nombre: 'Patagonia Soñada',
    categoria: 'nacional',
    descripcion: 'Un recorrido épico por la Patagonia Argentina: Puerto Madryn, Ushuaia, El Calafate, Perito Moreno y Bariloche. 18 días de aventura, glaciares, ballenas y paisajes que quitan el aliento.',
    destino_ciudad: 'Patagonia Argentina',
    origen_ciudad: 'San Miguel de Tucumán',
    duracion_dias: 18,
    duracion_noches: 12,
    precio: 0,
    itinerario: [
      { dia: 1, titulo: 'Salida desde origen', descripcion: 'Salida en horas de la mañana desde el lugar de origen con destino a Puerto Madryn o Trelew.', actividades: [] },
      { dia: 2, titulo: 'Puerto Madryn / Trelew', descripcion: 'Arribo a la ciudad en horas de la mañana. Alojamiento en el hotel previsto.', actividades: ['Visita al Área Natural Protegida Doradillo — avistaje de ballenas francas australes (opcional)'] },
      { dia: 3, titulo: 'Puerto Madryn / Trelew', descripcion: 'Desayuno. City Tour incluido por Puerto Madryn y visita a la Reserva Faunística de la Península Valdés hasta Puerto Pirámides.', actividades: ['City Tour por Puerto Madryn', 'Visita a la Reserva Faunística Península Valdés', 'Embarque en Puerto Pirámides — avistaje de fauna marina (opcional)'] },
      { dia: 4, titulo: 'Puerto Madryn — Río Gallegos', descripcion: 'Desayuno. Excursión al Valle Inferior del Río Chubut: Trelew, Rawson, Playa Unión y Gaiman. Por la tarde viaje nocturno por Ruta 3.', actividades: ['City Tour por Trelew y Rawson', 'Visita a Gaiman — Té Galés (opcional)', 'Viaje nocturno: Comodoro Rivadavia, Caleta Olivia, Puerto San Julián'] },
      { dia: 5, titulo: 'Río Gallegos', descripcion: 'Arribo en horas de la mañana a la capital santacruceña. Tarde libre para descansar y recorrer la ciudad.', actividades: [] },
      { dia: 6, titulo: 'Río Gallegos — Ushuaia', descripcion: 'Luego del desayuno partimos hacia Chile. Cruce del Estrecho de Magallanes en ferri, atravesando San Sebastián, Río Grande y Tolhuin hasta Ushuaia.', actividades: ['Trámites migratorios en la frontera con Chile', 'Cruce en ferri por el Estrecho de Magallanes'] },
      { dia: 7, titulo: 'Ushuaia', descripcion: 'Desayuno. Navegación por el Canal de Beagle y excursión al Parque Nacional Tierra del Fuego.', actividades: ['Navegación por el Canal de Beagle — Faro del Fin del Mundo, Isla de los Pájaros e Isla de Lobos (opcional)', 'Excursión al Parque Nacional Tierra del Fuego: Río Pipo, Bosque Encantado, Lago Roca, Bahía Lapataia', 'Tren del Fin del Mundo (opcional)'] },
      { dia: 8, titulo: 'Ushuaia', descripcion: 'Desayuno. Recorrido por la ciudad y excursión a los Lagos Fagnano y Escondido.', actividades: ['City tour por Ushuaia y alrededores (opcional)', 'Excursión a Lagos Fagnano y Escondido: Valle de Tierra Mayor, Valle de los Huskies', 'Almuerzo de Cordero Fueguino (opcional)'] },
      { dia: 9, titulo: 'Ushuaia — El Calafate', descripcion: 'Salida en horas de la mañana con destino a El Calafate. Cruce en ferri por el Estrecho de Magallanes. Noche en bus.', actividades: ['Trámites migratorios en frontera con Chile', 'Cruce en ferri por el Estrecho de Magallanes'] },
      { dia: 10, titulo: 'El Calafate', descripcion: 'Arribo a la Capital Nacional de los Glaciares. Excursión incluida al Glaciar Perito Moreno y City Tour por la ciudad.', actividades: ['Excursión al Parque Nacional Los Glaciares', 'Visita al Glaciar Perito Moreno — recorrido por las pasarelas', 'City Tour por El Calafate', 'Bar de Hielo (opcional)'] },
      { dia: 11, titulo: 'El Calafate', descripcion: 'Desayuno. Día libre. Se recomienda la excursión opcional a El Chaltén, Capital Nacional del Trekking.', actividades: ['Excursión a El Chaltén — Cerro Fitz Roy (opcional)', 'Estancia La Leona, Lago Viedma y Glaciar Viedma'] },
      { dia: 12, titulo: 'El Calafate', descripcion: 'Desayuno. Día libre. Se recomienda la Navegación Todo Glaciares por el Lago Argentino.', actividades: ['Navegación Todo Glaciares: Glaciar Upsala, Seco y Spegazzini (opcional)'] },
      { dia: 13, titulo: 'El Calafate — Perito Moreno', descripcion: 'Luego del desayuno viaje por la mítica Ruta Nacional N° 40 hacia la localidad de Perito Moreno.', actividades: [] },
      { dia: 14, titulo: 'Perito Moreno', descripcion: 'Desayuno. Visita opcional a las Cuevas de las Manos. City tour incluido por Los Antiguos. Por la tarde partimos hacia Bariloche.', actividades: ['Cuevas de las Manos a orillas del Río Pinturas (opcional)', 'City Tour incluido por Los Antiguos — Capital Nacional de la Cereza'] },
      { dia: 15, titulo: 'Bariloche', descripcion: 'Arribo en horas del mediodía. Por la tarde excursión opcional de Circuito Chico y Punto Panorámico.', actividades: ['Excursión Circuito Chico y Punto Panorámico — Lago Nahuel Huapi (opcional)', 'Cerro Campanario en aerosilla (opcional)'] },
      { dia: 16, titulo: 'Bariloche', descripcion: 'Desayuno. Día libre. Se recomienda la excursión de los Siete Lagos.', actividades: ['Excursión Siete Lagos: Villa La Angostura y San Martín de los Andes (opcional)'] },
      { dia: 17, titulo: 'Bariloche — Regreso', descripcion: 'Luego del desayuno emprendemos el regreso hacia el lugar de origen.', actividades: [] },
      { dia: 18, titulo: 'Llegada a origen', descripcion: 'Llegada a nuestra zona en horas de la mañana. Fin de nuestros servicios.', actividades: [] },
    ],
    incluye: ['Bus CAMA', '2 noches de alojamiento en Puerto Madryn o Trelew', '1 noche de alojamiento en Río Gallegos', '3 noches de alojamiento en Ushuaia', '3 noches de alojamiento en El Calafate', '1 noche de alojamiento en Perito Moreno o Los Antiguos', '2 noches de alojamiento en Bariloche', 'Media pensión en noches de hotel', 'City Tour en Puerto Madryn, Trelew, Rawson y Gaiman', 'Excursión a Península Valdés hasta Puerto Pirámides', 'Parque Nacional Tierra del Fuego en Ushuaia', 'City Tour y Glaciar Perito Moreno en El Calafate', 'City Tour por Los Antiguos', 'Coordinación permanente', 'Asistencia al viajero'],
    no_incluye: ['Excursiones opcionales', 'Bebidas en las comidas', 'Comidas en ruta', 'Impuestos a Parques Nacionales y museos', 'Propinas', 'Eco Tasa de Bariloche (tasa municipal por pernocte)'],
  },
  {
    nombre: 'Villa Carlos Paz',
    categoria: 'nacional',
    descripcion: 'Conocé las sierras cordobesas en Carlos Paz con pensión completa. 4 días junto al Lago San Roque, Cumbrecita y Villa General Belgrano.',
    destino_ciudad: 'Villa Carlos Paz',
    origen_ciudad: 'San Miguel de Tucumán',
    duracion_dias: 4,
    duracion_noches: 3,
    precio: 0,
    itinerario: [
      { dia: 1, titulo: 'Llegada a Villa Carlos Paz', descripcion: 'Salida desde el lugar de origen. Llegada al hotel en horas de la mañana. Almuerzo. Tarde libre para disfrutar de la ciudad.', actividades: ['Paseo en náutico por el Lago San Roque (opcional)'] },
      { dia: 2, titulo: 'Villa Carlos Paz', descripcion: 'Desayuno. Excursión opcional a Cumbrecita, la pintoresca colonia alemana en las sierras.', actividades: ['Excursión a Cumbrecita (opcional): San Clemente, Garay, Dique los Molinos', 'Tiempo libre en el pueblo peatonal de Cumbrecita'] },
      { dia: 3, titulo: 'Villa Carlos Paz', descripcion: 'Desayuno. Excursión opcional a Villa General Belgrano, famosa por su Festival Nacional de la Cerveza y su arquitectura alpina.', actividades: ['Excursión a Villa General Belgrano (opcional): Alta Gracia, Dique Los Molinos', 'Almuerzo. Tarde libre en la ciudad.'] },
      { dia: 4, titulo: 'Regreso a origen', descripcion: 'Luego del desayuno emprendemos el regreso. Llegada al lugar de origen. Fin de nuestros servicios.', actividades: [] },
    ],
    incluye: ['Bus 5* Mix', '3 noches de alojamiento en Villa Carlos Paz', 'Pensión Completa (desayuno, almuerzo y cena)', 'Coordinación permanente', 'Asistencia Médica'],
    no_incluye: ['Excursiones opcionales', 'Comidas en ruta', 'Propinas'],
  },
  {
    nombre: 'Mendoza',
    categoria: 'nacional',
    descripcion: 'La capital del vino argentino te espera con City Tour incluido, bodegas, chocolates y la majestuosa Cordillera de los Andes. 6 días / 3 noches de alojamiento.',
    destino_ciudad: 'Mendoza',
    origen_ciudad: 'San Miguel de Tucumán',
    duracion_dias: 6,
    duracion_noches: 3,
    precio: 0,
    itinerario: [
      { dia: 1, titulo: 'Salida desde origen', descripcion: 'Salida desde el lugar de origen hacia la ciudad de Mendoza.', actividades: [] },
      { dia: 2, titulo: 'Mendoza', descripcion: 'Llegada en horas de la mañana. City Tour incluido: Ciudad Vieja, Ciudad Nueva, zona vitivinícola y fábrica de chocolates.', actividades: ['City Tour incluido: Ciudad Vieja (fundada en 1561), Ciudad Nueva, Barrio Cívico, Palacio de Justicia', 'Visita guiada a una bodega — degustación', 'Visita a fábrica de alfajores y chocolates', 'Cerro de la Gloria en Parque San Martín (opcional)'] },
      { dia: 3, titulo: 'Mendoza', descripcion: 'Desayuno. Día libre. Se recomienda la excursión Alta Montaña por la Cordillera de los Andes.', actividades: ['Excursión Alta Montaña (opcional): Río Mendoza, Dique Potrerillos, Villa Uspallata, Penitentes, Puente de Inca, Las Cuevas'] },
      { dia: 4, titulo: 'Mendoza', descripcion: 'Desayuno. Se recomienda visitar las Termas de Cacheuta a orillas del río Mendoza y rodeadas por la Cordillera.', actividades: ['Termas de Cacheuta (opcional): piscinas termales y asado al pie de la montaña', 'Mirador Dique de Potrerillos', 'Peña folclórica (opcional)'] },
      { dia: 5, titulo: 'Mendoza — Regreso', descripcion: 'Luego del desayuno emprendemos viaje de regreso al lugar de origen.', actividades: [] },
      { dia: 6, titulo: 'Llegada a origen', descripcion: 'Llegada. Fin de nuestros servicios.', actividades: [] },
    ],
    incluye: ['Bus 5*', '3 noches de alojamiento en Mendoza', 'Media Pensión (desayuno y cena)', 'City Tour incluido por la ciudad', 'Visita guiada a una bodega', 'Coordinación permanente', 'Asistencia al viajero'],
    no_incluye: ['Entradas o impuestos', 'Excursiones opcionales', 'Bebidas en las comidas', 'Propinas'],
  },
]

const { data, error } = await sb.from('productos').insert(paquetes).select('id, nombre')
if (error) {
  console.error('ERROR:', error.message)
  process.exit(1)
}
console.log('Paquetes insertados:')
data.forEach(p => console.log(' -', p.nombre, '(', p.id, ')'))
