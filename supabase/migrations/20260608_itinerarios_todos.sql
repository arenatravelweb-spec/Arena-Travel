-- ══════════════════════════════════════════════════════════════
-- Itinerarios completos para todos los paquetes
-- ══════════════════════════════════════════════════════════════

-- ── CATARATAS ──────────────────────────────────────────────────
UPDATE productos SET
  origen_ciudad   = 'Tucumán',
  destino_ciudad  = 'Puerto Iguazú',
  duracion_dias   = 7,
  duracion_noches = 6,
  fechas_salida   = '[{"fecha":"2026-07-09","estado":"disponible"}]',
  alojamiento     = '{"nombre":"Hotel en Puerto Iguazú","estrellas":3,"descripcion":"Hotel céntrico con piscina y desayuno incluido."}',
  incluye         = '["Bus ida y vuelta","6 noches de alojamiento","Desayuno diario","Traslados aeropuerto/hotel","Coordinador permanente","Asistencia al viajero","Entrada Cataratas Argentinas","Entrada Cataratas Brasileñas"]',
  no_incluye      = '["Vuelos internacionales","Almuerzo y cena","Excursiones opcionales","Gastos personales"]',
  opciones_transporte = '[{"nombre":"Bus Semicama","precio_adicional":0,"incluido":true},{"nombre":"Bus Coche Cama","precio_adicional":35000,"incluido":false}]',
  itinerario      = '[
    {"dia":1,"titulo":"Salida desde Tucumán","descripcion":"Partida nocturna desde Tucumán hacia Puerto Iguazú. Viaje en bus con servicio a bordo.","actividades":["Salida desde Tucumán"]},
    {"dia":2,"titulo":"Llegada a Puerto Iguazú","descripcion":"Llegada en horas de la mañana. Traslado al hotel, check-in y tarde libre para descansar o recorrer la ciudad.","actividades":["Check-in en hotel","Tarde libre","City walk por Puerto Iguazú"]},
    {"dia":3,"titulo":"Cataratas Argentinas","descripcion":"Visita al Parque Nacional Iguazú, lado argentino. Recorremos el Paseo Superior, el Paseo Inferior y la impresionante Garganta del Diablo.","actividades":["Paseo Superior","Paseo Inferior","Garganta del Diablo","Tren ecológico de la selva"]},
    {"dia":4,"titulo":"Cataratas Brasileñas","descripcion":"Cruzamos la frontera para vivir el lado brasileño de las Cataratas, con la panorámica más amplia de las cascadas. Por la tarde, visita al Hito de las Tres Fronteras.","actividades":["Cataratas lado brasileño","Panorámica general","Hito de las Tres Fronteras"]},
    {"dia":5,"titulo":"Itaipú y Parque de las Aves","descripcion":"Visita a la represa de Itaipú, una de las mayores obras de ingeniería del mundo. Por la tarde, Parque de las Aves (opcional).","actividades":["Represa de Itaipú","Opcional: Parque de las Aves"]},
    {"dia":6,"titulo":"Día libre en Puerto Iguazú","descripcion":"Mañana libre para disfrutar la ciudad, compras o actividades opcionales. Por la tarde, preparación para el regreso.","actividades":["Mañana libre","Compras en el free shop","Preparación regreso"]},
    {"dia":7,"titulo":"Regreso a Tucumán","descripcion":"Traslado al terminal y partida hacia Tucumán. Llegada estimada a la mañana siguiente.","actividades":["Traslado al terminal","Partida hacia Tucumán"]}
  ]'
WHERE nombre ILIKE '%cataratas%';

-- ── MAR DEL PLATA ──────────────────────────────────────────────
UPDATE productos SET
  origen_ciudad   = 'Tucumán',
  destino_ciudad  = 'Mar del Plata',
  duracion_dias   = 8,
  duracion_noches = 7,
  fechas_salida   = '[{"fecha":"2027-01-10","estado":"disponible"},{"fecha":"2027-01-17","estado":"disponible"},{"fecha":"2027-01-24","estado":"disponible"}]',
  alojamiento     = '{"nombre":"Apart Hotel Mar del Plata","estrellas":3,"descripcion":"Apart hotel a pocas cuadras de la playa con cocina equipada."}',
  incluye         = '["Bus ida y vuelta","7 noches de alojamiento","Desayuno diario","Coordinador permanente","Asistencia al viajero"]',
  no_incluye      = '["Almuerzo y cena","Entradas a lugares turísticos","Excursiones opcionales","Gastos personales"]',
  opciones_transporte = '[{"nombre":"Bus Semicama","precio_adicional":0,"incluido":true},{"nombre":"Bus Coche Cama","precio_adicional":40000,"incluido":false},{"nombre":"Bus Panorámico","precio_adicional":55000,"incluido":false}]',
  itinerario      = '[
    {"dia":1,"titulo":"Salida desde Tucumán","descripcion":"Partida nocturna desde Tucumán hacia Mar del Plata.","actividades":["Salida desde Tucumán"]},
    {"dia":2,"titulo":"Llegada a Mar del Plata","descripcion":"Llegada en horas de la tarde. Check-in y primera caminata por la costa.","actividades":["Check-in","Primera visita a la playa","Bristol y Rambla Casino"]},
    {"dia":3,"titulo":"Playas y centro","descripcion":"Mañana de playa libre. Por la tarde city tour: Puerto, Catedral, calle Güemes y Diagonal.","actividades":["Playa libre","Puerto de Mar del Plata","Catedral","Calle Güemes"]},
    {"dia":4,"titulo":"Sierra de los Padres y Laguna de los Padres","descripcion":"Excursión opcional a la sierra y laguna. Contacto con la naturaleza y paisajes únicos del entorno marplatense.","actividades":["Sierra de los Padres","Laguna de los Padres","Opcional: paseo a caballo"]},
    {"dia":5,"titulo":"Día de playa","descripcion":"Jornada completa de playa a elección. Por la noche, propuesta cultural o de entretenimiento.","actividades":["Playa libre todo el día","Opcional: Acuario Municipal","Noche de casino"]},
    {"dia":6,"titulo":"Miramar o Necochea","descripcion":"Excursión opcional a Miramar o Necochea para conocer otras playas del litoral bonaerense.","actividades":["Opcional: Miramar","Opcional: Necochea","Compras en Mar del Plata"]},
    {"dia":7,"titulo":"Último día en la costa","descripcion":"Mañana libre de compras en el centro comercial y recuerdos. Por la tarde, preparación del regreso.","actividades":["Paseo de compras","Paseo del Puerto","Check-out y preparación"]},
    {"dia":8,"titulo":"Regreso a Tucumán","descripcion":"Traslado al terminal y partida hacia Tucumán.","actividades":["Traslado al terminal","Partida hacia Tucumán"]}
  ]'
WHERE nombre ILIKE '%mar del plata%';

-- ── BARILOCHE (egresados) ──────────────────────────────────────
UPDATE productos SET
  origen_ciudad   = 'Tucumán',
  destino_ciudad  = 'San Carlos de Bariloche',
  duracion_dias   = 8,
  duracion_noches = 7,
  fechas_salida   = '[{"fecha":"2026-07-10","estado":"disponible"},{"fecha":"2026-07-17","estado":"disponible"}]',
  alojamiento     = '{"nombre":"Hotel Categoría Turista Bariloche","estrellas":3,"descripcion":"Hotel céntrico con desayuno incluido y excelente ubicación."}',
  incluye         = '["Bus ida y vuelta","7 noches de alojamiento","Desayuno diario","Coordinador permanente","Asistencia al viajero","City tour Bariloche"]',
  no_incluye      = '["Ropa de nieve","Equipo de ski","Excursiones opcionales","Almuerzo y cena","Gastos personales"]',
  opciones_transporte = '[{"nombre":"Bus Semicama","precio_adicional":0,"incluido":true},{"nombre":"Bus Coche Cama","precio_adicional":40000,"incluido":false}]',
  itinerario      = '[
    {"dia":1,"titulo":"Salida desde Tucumán","descripcion":"Partida nocturna desde Tucumán hacia Bariloche. Viaje en bus con servicio a bordo.","actividades":["Salida desde Tucumán"]},
    {"dia":2,"titulo":"En ruta hacia Bariloche","descripcion":"Día de viaje. Paisajes patagónicos durante el trayecto.","actividades":["Viaje en bus","Paisajes patagónicos"]},
    {"dia":3,"titulo":"Llegada a Bariloche","descripcion":"Llegada a Bariloche. Traslado al hotel, check-in y primera caminata por el Centro Cívico.","actividades":["Check-in en hotel","Centro Cívico","Primera vista al lago Nahuel Huapi"]},
    {"dia":4,"titulo":"Cerro Catedral","descripcion":"Día en el Cerro Catedral, el centro de ski más grande de Sudamérica. Esquí, snowboard o actividades en la nieve para todos los niveles.","actividades":["Cerro Catedral","Ski y snowboard","Telesillas panorámicas","Actividades en la nieve"]},
    {"dia":5,"titulo":"Circuito Chico y Llao Llao","descripcion":"Excursión por el Circuito Chico: Punto Panorámico, Cerro Campanario y el Hotel Llao Llao con vistas increíbles al lago.","actividades":["Circuito Chico","Cerro Campanario","Hotel Llao Llao","Punto Panorámico"]},
    {"dia":6,"titulo":"Isla Victoria y Bosque de Arrayanes","descripcion":"Navegación por el lago Nahuel Huapi hasta la Isla Victoria y el mágico Bosque de Arrayanes, único en el mundo.","actividades":["Navegación lago Nahuel Huapi","Isla Victoria","Bosque de Arrayanes"]},
    {"dia":7,"titulo":"Ruta del Chocolate y compras","descripcion":"Recorrida por la Ruta del Chocolate, degustaciones y compras en el centro. Última noche en Bariloche.","actividades":["Ruta del Chocolate","Chocolaterías tradicionales","Compras en el centro","Última cena en Bariloche"]},
    {"dia":8,"titulo":"Regreso a Tucumán","descripcion":"Traslado al terminal y partida hacia Tucumán. Llegada estimada al segundo día.","actividades":["Traslado al terminal","Partida hacia Tucumán"]}
  ]'
WHERE nombre ILIKE '%bariloche%';

-- ── CARLOS PAZ (egresados) ────────────────────────────────────
UPDATE productos SET
  origen_ciudad   = 'Tucumán',
  destino_ciudad  = 'Villa Carlos Paz',
  duracion_dias   = 6,
  duracion_noches = 5,
  fechas_salida   = '[{"fecha":"2026-07-08","estado":"disponible"},{"fecha":"2026-07-15","estado":"disponible"}]',
  alojamiento     = '{"nombre":"Hotel en Villa Carlos Paz","estrellas":3,"descripcion":"Hotel con desayuno incluido a metros del lago San Roque."}',
  incluye         = '["Bus ida y vuelta","5 noches de alojamiento","Desayuno diario","Coordinador permanente","Asistencia al viajero"]',
  no_incluye      = '["Almuerzo y cena","Entradas a excursiones","Gastos personales"]',
  opciones_transporte = '[{"nombre":"Bus Semicama","precio_adicional":0,"incluido":true},{"nombre":"Bus Coche Cama","precio_adicional":30000,"incluido":false}]',
  itinerario      = '[
    {"dia":1,"titulo":"Salida desde Tucumán","descripcion":"Partida nocturna desde Tucumán hacia Villa Carlos Paz, Córdoba.","actividades":["Salida desde Tucumán"]},
    {"dia":2,"titulo":"Llegada a Carlos Paz","descripcion":"Llegada en horas de la mañana. Check-in y tarde libre para conocer la costanera y el lago San Roque.","actividades":["Check-in en hotel","Costanera del lago San Roque","Ciudad de Carlos Paz"]},
    {"dia":3,"titulo":"La Cumbrecita","descripcion":"Excursión al pintoresco pueblo de montaña La Cumbrecita, con arquitectura alpina y naturaleza serrana.","actividades":["La Cumbrecita","Cascadas de montaña","Caminatas por senderos","Gastronomía regional"]},
    {"dia":4,"titulo":"Villa General Belgrano y Nono","descripcion":"Excursión a Villa General Belgrano, famosa por su arquitectura alemana y la Fiesta de la Cerveza. Visita a Nono y el Museo Rocsen.","actividades":["Villa General Belgrano","Cervecerías artesanales","Nono","Museo Rocsen"]},
    {"dia":5,"titulo":"Shows y actividad acuática","descripcion":"Tarde libre para disfrutar actividades en el lago, paseos en lancha o visita al parque temático. Por la noche, show de entretenimiento.","actividades":["Paseo en lancha por el lago","Parque temático opcional","Show nocturno"]},
    {"dia":6,"titulo":"Regreso a Tucumán","descripcion":"Mañana libre para últimas compras. Traslado al terminal y partida hacia Tucumán.","actividades":["Últimas compras","Traslado al terminal","Partida hacia Tucumán"]}
  ]'
WHERE nombre ILIKE '%carlos paz%';

-- ── CAMBORIÚ (egresados) ──────────────────────────────────────
UPDATE productos SET
  origen_ciudad   = 'Tucumán',
  destino_ciudad  = 'Balneário Camboriú',
  duracion_dias   = 9,
  duracion_noches = 8,
  fechas_salida   = '[{"fecha":"2026-11-20","estado":"disponible"},{"fecha":"2026-11-27","estado":"disponible"},{"fecha":"2026-12-04","estado":"disponible"}]',
  alojamiento     = '{"nombre":"Hotel en Camboriú","estrellas":3,"descripcion":"Hotel con desayuno incluido a metros de la playa central."}',
  incluye         = '["Bus ida y vuelta","8 noches de alojamiento","Desayuno diario","Coordinador permanente","Asistencia al viajero","Seguro de viaje"]',
  no_incluye      = '["Almuerzo y cena","Beto Carrero World","Excursiones opcionales","Gastos personales"]',
  opciones_transporte = '[{"nombre":"Bus Semicama","precio_adicional":0,"incluido":true},{"nombre":"Bus Coche Cama","precio_adicional":45000,"incluido":false}]',
  itinerario      = '[
    {"dia":1,"titulo":"Salida desde Tucumán","descripcion":"Partida nocturna desde Tucumán hacia Balneário Camboriú, Brasil.","actividades":["Salida desde Tucumán"]},
    {"dia":2,"titulo":"En ruta — cruce de frontera","descripcion":"Día de viaje. Cruce por el paso fronterizo. Llegada estimada a la noche.","actividades":["Viaje en bus","Cruce fronterizo","Llegada a Brasil"]},
    {"dia":3,"titulo":"Llegada a Camboriú","descripcion":"Llegada en horas de la mañana. Check-in, descanso y primera tarde en la playa central.","actividades":["Check-in en hotel","Playa central de Camboriú","Avenida Atlántica"]},
    {"dia":4,"titulo":"Beto Carrero World","descripcion":"Día completo en Beto Carrero World, el mayor parque temático de Sudamérica con atracciones para todos.","actividades":["Beto Carrero World (entrada no incluida)","Atracciones temáticas","Shows del parque"]},
    {"dia":5,"titulo":"Playa y Unipraias","descripcion":"Mañana de playa libre. Por la tarde, subida al teleférico Unipraias con vistas panorámicas sobre Camboriú y el mar.","actividades":["Playa libre","Teleférico Unipraias","Playa de Laranjeiras","Vista panorámica"]},
    {"dia":6,"titulo":"Ballneário Camboriú y compras","descripcion":"Día libre para disfrutar la playa o recorrer los shoppings. La noche comercial de Camboriú es imperdible.","actividades":["Shopping Atlântico","Compras duty free","Vida nocturna de Camboriú"]},
    {"dia":7,"titulo":"Playa Taquaras y alrededores","descripcion":"Excursión a playas cercanas menos concurridas como Taquaras e Interlagos.","actividades":["Playa Taquaras","Playa Interlagos","Gastronomía local"]},
    {"dia":8,"titulo":"Último día en Brasil","descripcion":"Mañana libre para disfrutar y hacer las últimas compras. Por la tarde, preparación del equipaje y check-out.","actividades":["Últimas compras","Recuerdos","Check-out"]},
    {"dia":9,"titulo":"Regreso a Tucumán","descripcion":"Partida hacia Tucumán. Cruce fronterizo de regreso. Llegada estimada al día siguiente.","actividades":["Partida desde Brasil","Cruce fronterizo","Rumbo a Tucumán"]}
  ]'
WHERE nombre ILIKE '%camborí%' AND categoria = 'egresados';

-- ── PUNTA CANA ────────────────────────────────────────────────
UPDATE productos SET
  origen_ciudad   = 'Buenos Aires / Tucumán',
  destino_ciudad  = 'Punta Cana',
  duracion_dias   = 8,
  duracion_noches = 7,
  fechas_salida   = '[{"fecha":"2026-12-20","estado":"disponible"},{"fecha":"2027-01-08","estado":"disponible"},{"fecha":"2027-01-16","estado":"disponible"}]',
  alojamiento     = '{"nombre":"Resort All Inclusive Punta Cana","estrellas":4,"descripcion":"Resort frente al mar con todo incluido: comidas, bebidas y actividades."}',
  incluye         = '["Vuelo de ida y vuelta","7 noches en resort all inclusive","Todas las comidas y bebidas","Traslados aeropuerto/hotel","Coordinación permanente","Asistencia al viajero"]',
  no_incluye      = '["Excursiones opcionales","Seguro de viaje adicional","Gastos personales","Propinas"]',
  opciones_transporte = '[{"nombre":"Vuelo en clase turista","precio_adicional":0,"incluido":true}]',
  itinerario      = '[
    {"dia":1,"titulo":"Vuelo a Punta Cana","descripcion":"Salida en vuelo hacia Punta Cana, República Dominicana. Llegada al resort, check-in y primera cena all inclusive.","actividades":["Vuelo internacional","Check-in en resort","Cena de bienvenida"]},
    {"dia":2,"titulo":"Primer día de resort","descripcion":"Jornada de descanso y disfrute del resort. Piscinas, playa, deportes acuáticos y entretenimiento.","actividades":["Playa privada del resort","Piscinas","Deportes acuáticos incluidos","Show nocturno"]},
    {"dia":3,"titulo":"Excursión a Isla Saona","descripcion":"Excursión opcional a la paradisíaca Isla Saona: aguas turquesas, piscina natural y almuerzo a bordo.","actividades":["Navegación en catamarán","Isla Saona","Piscina natural","Almuerzo típico a bordo"]},
    {"dia":4,"titulo":"Día libre en el resort","descripcion":"Jornada completamente libre para disfrutar todas las instalaciones del resort.","actividades":["Spa (opcional)","Actividades acuáticas","Deportes en la playa","Entretenimiento nocturno"]},
    {"dia":5,"titulo":"Santo Domingo colonial","descripcion":"Excursión opcional a Santo Domingo, la primera ciudad del Nuevo Mundo: Zona Colonial, Catedral, Fortaleza Ozama.","actividades":["Zona Colonial de Santo Domingo","Catedral Primada de América","Fortaleza Ozama","Compras"]},
    {"dia":6,"titulo":"Aventura en el mar","descripcion":"Excursión opcional de snorkel o buceo en los arrecifes de coral. Por la tarde, relax en la playa.","actividades":["Snorkel en arrecifes","Opcional: buceo","Playa libre","Coctel de despedida"]},
    {"dia":7,"titulo":"Último día en el paraíso","descripcion":"Último día en Punta Cana. Disfrute pleno del resort. Por la noche, cena de despedida.","actividades":["Playa y piscina libre","Compras de recuerdos","Cena de despedida"]},
    {"dia":8,"titulo":"Regreso","descripcion":"Check-out y traslado al aeropuerto. Vuelo de regreso.","actividades":["Check-out","Traslado al aeropuerto","Vuelo de regreso"]}
  ]'
WHERE nombre ILIKE '%punta cana%';

-- ── CANASVIEIRAS ──────────────────────────────────────────────
UPDATE productos SET
  origen_ciudad   = 'Tucumán',
  destino_ciudad  = 'Canasvieiras, Florianópolis',
  duracion_dias   = 9,
  duracion_noches = 8,
  fechas_salida   = '[{"fecha":"2026-12-27","estado":"disponible"},{"fecha":"2027-01-10","estado":"disponible"}]',
  alojamiento     = '{"nombre":"Hotel Fenix","estrellas":3,"descripcion":"Hotel con desayuno incluido en pleno corazón de Canasvieiras."}',
  incluye         = '["Bus ida y vuelta","8 noches en Hotel Fenix","Desayuno diario","Coordinador permanente","Asistencia al viajero"]',
  no_incluye      = '["Almuerzo y cena","Excursiones opcionales","Gastos personales"]',
  opciones_transporte = '[{"nombre":"Bus Semicama","precio_adicional":0,"incluido":true},{"nombre":"Bus Coche Cama","precio_adicional":45000,"incluido":false}]',
  itinerario      = '[
    {"dia":1,"titulo":"Salida desde Tucumán","descripcion":"Partida nocturna hacia Florianópolis, Brasil.","actividades":["Salida desde Tucumán"]},
    {"dia":2,"titulo":"En ruta — cruce de frontera","descripcion":"Día de viaje. Cruce por el paso fronterizo. Paisajes del sur de Brasil.","actividades":["Viaje","Cruce fronterizo"]},
    {"dia":3,"titulo":"Llegada a Canasvieiras","descripcion":"Llegada a Florianópolis, traslado a Canasvieiras. Check-in en Hotel Fenix y tarde en la playa.","actividades":["Check-in Hotel Fenix","Primera tarde en Canasvieiras","Playa de Canasvieiras"]},
    {"dia":4,"titulo":"Playas del norte de Floripa","descripcion":"Jornada de playas: Jurerê Internacional, Ingleses y Ponta das Canas. Las más bonitas del norte de la isla.","actividades":["Jurerê Internacional","Playa de los Ingleses","Ponta das Canas"]},
    {"dia":5,"titulo":"Centro de Florianópolis","descripcion":"Excursión al centro histórico de Florianópolis: Mercado Público, Ponte Hercílio Luz y Mirante de la isla.","actividades":["Mercado Público","Ponte Hercílio Luz","Centro histórico","Compras"]},
    {"dia":6,"titulo":"Lagoa da Conceição","descripcion":"Excursión a la Lagoa da Conceição, el corazón de la isla: windsurf, kitesurf, restaurantes y bares únicos.","actividades":["Lagoa da Conceição","Dunas de la laguna","Deportes acuáticos opcionales","Gastronomía local"]},
    {"dia":7,"titulo":"Playa libre y compras","descripcion":"Día libre para disfrutar la playa o recorrer los shoppings y casas de artesanías.","actividades":["Playa libre","Shopping Mueller","Compras de recuerdos"]},
    {"dia":8,"titulo":"Último día en Floripa","descripcion":"Mañana libre en la playa. Por la tarde, preparación del equipaje y despedida.","actividades":["Playa libre","Check-out","Cena de despedida"]},
    {"dia":9,"titulo":"Regreso a Tucumán","descripcion":"Partida hacia Tucumán. Cruce fronterizo de regreso.","actividades":["Partida desde Brasil","Cruce fronterizo","Regreso a Tucumán"]}
  ]'
WHERE nombre ILIKE '%canasvieiras%';

-- ── FERRUGEM ─────────────────────────────────────────────────
UPDATE productos SET
  origen_ciudad   = 'Tucumán',
  destino_ciudad  = 'Ferrugem, Garopaba',
  duracion_dias   = 9,
  duracion_noches = 8,
  fechas_salida   = '[{"fecha":"2026-12-27","estado":"disponible"},{"fecha":"2027-01-10","estado":"disponible"}]',
  alojamiento     = '{"nombre":"Pousada Hinano","estrellas":3,"descripcion":"Pousada frente a la playa con desayuno incluido en el paraíso de Ferrugem."}',
  incluye         = '["Bus ida y vuelta","8 noches en Pousada Hinano","Desayuno diario","Coordinador permanente","Asistencia al viajero"]',
  no_incluye      = '["Almuerzo y cena","Excursiones opcionales","Gastos personales"]',
  opciones_transporte = '[{"nombre":"Bus Semicama","precio_adicional":0,"incluido":true},{"nombre":"Bus Coche Cama","precio_adicional":45000,"incluido":false}]',
  itinerario      = '[
    {"dia":1,"titulo":"Salida desde Tucumán","descripcion":"Partida nocturna hacia Ferrugem, Garopaba, Brasil.","actividades":["Salida desde Tucumán"]},
    {"dia":2,"titulo":"En ruta — cruce de frontera","descripcion":"Día de viaje. Cruce por el paso fronterizo hacia Brasil.","actividades":["Viaje","Cruce fronterizo"]},
    {"dia":3,"titulo":"Llegada a Ferrugem","descripcion":"Llegada a Garopaba. Check-in en Pousada Hinano y primera tarde en la salvaje playa de Ferrugem.","actividades":["Check-in Pousada Hinano","Playa de Ferrugem","Caminata por la playa"]},
    {"dia":4,"titulo":"Garopaba y alrededores","descripcion":"Recorrida por Garopaba: pueblo, feria de artesanías y playas de Garopaba y Siriú.","actividades":["Pueblo de Garopaba","Playa de Siriú","Feria de artesanías","Gastronomía local"]},
    {"dia":5,"titulo":"Ibiraquera y Imbituba","descripcion":"Excursión a la laguna de Ibiraquera ideal para kitesurf y a la hermosa playa de Imbituba.","actividades":["Laguna de Ibiraquera","Imbituba","Opcional: kitesurf"]},
    {"dia":6,"titulo":"Rosa y Praia do Rosa","descripcion":"Excursión a Praia do Rosa, una de las playas más hermosas de Brasil con avistaje de ballenas (en temporada).","actividades":["Praia do Rosa","Vila do Rosa","Opcional: avistaje de ballenas"]},
    {"dia":7,"titulo":"Día libre en Ferrugem","descripcion":"Jornada libre en la playa. Surf, stand up paddle o simplemente descansar frente al mar.","actividades":["Playa libre","Surf y SUP opcionales","Atardecer en Ferrugem"]},
    {"dia":8,"titulo":"Último día en Brasil","descripcion":"Mañana libre en la playa y compras de recuerdos. Por la tarde, check-out y despedida.","actividades":["Playa libre","Compras de recuerdos","Check-out"]},
    {"dia":9,"titulo":"Regreso a Tucumán","descripcion":"Partida hacia Tucumán con los mejores recuerdos de Ferrugem.","actividades":["Partida desde Brasil","Cruce fronterizo","Regreso a Tucumán"]}
  ]'
WHERE nombre ILIKE '%ferrugem%';

-- ── CAMBORIÚ (internacional, no egresados) ────────────────────
UPDATE productos SET
  origen_ciudad   = 'Tucumán',
  destino_ciudad  = 'Balneário Camboriú',
  duracion_dias   = 9,
  duracion_noches = 8,
  fechas_salida   = '[{"fecha":"2026-12-27","estado":"disponible"},{"fecha":"2027-01-10","estado":"disponible"}]',
  alojamiento     = '{"nombre":"Hotel Torre Sol","estrellas":3,"descripcion":"Hotel con desayuno incluido en pleno centro de Camboriú, a metros del mar."}',
  incluye         = '["Bus ida y vuelta","8 noches en Hotel Torre Sol","Desayuno diario","Coordinador permanente","Asistencia al viajero"]',
  no_incluye      = '["Almuerzo y cena","Excursiones opcionales","Beto Carrero World","Gastos personales"]',
  opciones_transporte = '[{"nombre":"Bus Semicama","precio_adicional":0,"incluido":true},{"nombre":"Bus Coche Cama","precio_adicional":45000,"incluido":false}]',
  itinerario      = '[
    {"dia":1,"titulo":"Salida desde Tucumán","descripcion":"Partida nocturna hacia Balneário Camboriú, Brasil.","actividades":["Salida desde Tucumán"]},
    {"dia":2,"titulo":"En ruta — cruce de frontera","descripcion":"Día de viaje cruzando hacia Brasil.","actividades":["Viaje","Cruce fronterizo"]},
    {"dia":3,"titulo":"Llegada a Camboriú","descripcion":"Llegada, check-in en Hotel Torre Sol y primera tarde en la playa central.","actividades":["Check-in Hotel Torre Sol","Playa central de Camboriú","Avenida Atlántica"]},
    {"dia":4,"titulo":"Beto Carrero World","descripcion":"Día completo en el mayor parque temático de Sudamérica.","actividades":["Beto Carrero World","Atracciones del parque","Shows"]},
    {"dia":5,"titulo":"Unipraias y playas","descripcion":"Teleférico Unipraias con vistas increíbles y tarde en playas tranquilas de los alrededores.","actividades":["Teleférico Unipraias","Playa de Laranjeiras","Vista panorámica"]},
    {"dia":6,"titulo":"Día libre en la playa","descripcion":"Jornada libre para disfrutar el mar y recorrer el boulevard comercial.","actividades":["Playa libre","Shopping","Vida nocturna"]},
    {"dia":7,"titulo":"Navegación por la costa","descripcion":"Excursión opcional en barco por la costa de Santa Catarina.","actividades":["Paseo en barco (opcional)","Playa libre","Compras"]},
    {"dia":8,"titulo":"Último día en Camboriú","descripcion":"Mañana libre. Últimas compras en los shoppings y en tiendas de artesanías.","actividades":["Compras finales","Playa","Check-out"]},
    {"dia":9,"titulo":"Regreso a Tucumán","descripcion":"Partida desde Brasil hacia Tucumán.","actividades":["Partida desde Brasil","Cruce fronterizo","Regreso a Tucumán"]}
  ]'
WHERE nombre ILIKE '%camborí%' AND categoria = 'internacional';

-- ── GAROPABA ─────────────────────────────────────────────────
UPDATE productos SET
  origen_ciudad   = 'Tucumán',
  destino_ciudad  = 'Garopaba',
  duracion_dias   = 9,
  duracion_noches = 8,
  fechas_salida   = '[{"fecha":"2026-12-27","estado":"disponible"},{"fecha":"2027-01-10","estado":"disponible"}]',
  alojamiento     = '{"nombre":"Pousada Battistella","estrellas":3,"descripcion":"Pousada con desayuno incluido en el centro de Garopaba."}',
  incluye         = '["Bus ida y vuelta","8 noches en Pousada Battistella","Desayuno diario","Coordinador permanente","Asistencia al viajero"]',
  no_incluye      = '["Almuerzo y cena","Excursiones opcionales","Gastos personales"]',
  opciones_transporte = '[{"nombre":"Bus Semicama","precio_adicional":0,"incluido":true},{"nombre":"Bus Coche Cama","precio_adicional":45000,"incluido":false}]',
  itinerario      = '[
    {"dia":1,"titulo":"Salida desde Tucumán","descripcion":"Partida nocturna hacia Garopaba, Brasil.","actividades":["Salida desde Tucumán"]},
    {"dia":2,"titulo":"En ruta — cruce de frontera","descripcion":"Día de viaje cruzando la frontera hacia Brasil.","actividades":["Viaje","Cruce fronterizo"]},
    {"dia":3,"titulo":"Llegada a Garopaba","descripcion":"Llegada, check-in en Pousada Battistella y primera caminata por el pueblo y la playa.","actividades":["Check-in Pousada Battistella","Playa de Garopaba","Pueblo de Garopaba"]},
    {"dia":4,"titulo":"Ferrugem y Siriú","descripcion":"Excursión a las playas salvajes de Ferrugem y Siriú, con olas perfectas y naturaleza virgen.","actividades":["Playa de Ferrugem","Playa de Siriú","Surf y naturaleza"]},
    {"dia":5,"titulo":"Praia do Rosa","descripcion":"Visita a la famosa Praia do Rosa, elegida entre las mejores playas del mundo, con aguas cálidas y surf.","actividades":["Praia do Rosa","Vila do Rosa","Avistaje de ballenas (en temporada)"]},
    {"dia":6,"titulo":"Imbituba y Laguna","descripcion":"Excursión a Imbituba y la ciudad de Laguna, con historia y playas increíbles.","actividades":["Imbituba","Laguna","Tordesilhas histórica"]},
    {"dia":7,"titulo":"Día libre en Garopaba","descripcion":"Jornada de descanso y actividades libres en la playa local.","actividades":["Playa libre","Gastronomía local","Atardecer en Garopaba"]},
    {"dia":8,"titulo":"Último día en Brasil","descripcion":"Mañana libre para compras y despedidas. Check-out por la tarde.","actividades":["Compras de recuerdos","Playa","Check-out"]},
    {"dia":9,"titulo":"Regreso a Tucumán","descripcion":"Partida desde Garopaba hacia Tucumán.","actividades":["Partida desde Brasil","Cruce fronterizo","Regreso a Tucumán"]}
  ]'
WHERE nombre ILIKE '%garopaba%';

-- ── JURERÉ ───────────────────────────────────────────────────
UPDATE productos SET
  origen_ciudad   = 'Tucumán',
  destino_ciudad  = 'Jurerê, Florianópolis',
  duracion_dias   = 9,
  duracion_noches = 8,
  fechas_salida   = '[{"fecha":"2026-12-27","estado":"disponible"},{"fecha":"2027-01-10","estado":"disponible"}]',
  alojamiento     = '{"nombre":"Pousada Kindermann","estrellas":4,"descripcion":"Pousada boutique en Jurerê con desayuno incluido, a metros de la playa más exclusiva de Florianópolis."}',
  incluye         = '["Bus ida y vuelta","8 noches en Pousada Kindermann","Desayuno diario","Coordinador permanente","Asistencia al viajero"]',
  no_incluye      = '["Almuerzo y cena","Excursiones opcionales","Gastos personales"]',
  opciones_transporte = '[{"nombre":"Bus Semicama","precio_adicional":0,"incluido":true},{"nombre":"Bus Coche Cama","precio_adicional":45000,"incluido":false}]',
  itinerario      = '[
    {"dia":1,"titulo":"Salida desde Tucumán","descripcion":"Partida nocturna hacia Jurerê Internacional, Florianópolis, Brasil.","actividades":["Salida desde Tucumán"]},
    {"dia":2,"titulo":"En ruta — cruce de frontera","descripcion":"Día de viaje cruzando la frontera.","actividades":["Viaje","Cruce fronterizo"]},
    {"dia":3,"titulo":"Llegada a Jurerê","descripcion":"Llegada a Florianópolis, traslado a Jurerê. Check-in en Pousada Kindermann y tarde en la playa más exclusiva de Floripa.","actividades":["Check-in Pousada Kindermann","Jurerê Internacional","Primera tarde en la playa"]},
    {"dia":4,"titulo":"Playas del norte","descripcion":"Recorrida por las playas del norte de la isla: Canasvieiras, Ponta das Canas e Ingleses.","actividades":["Canasvieiras","Ponta das Canas","Playa de los Ingleses"]},
    {"dia":5,"titulo":"Lagoa da Conceição","descripcion":"Excursión a la Lagoa da Conceição: dunas, deportes náuticos, bares y restaurantes únicos.","actividades":["Lagoa da Conceição","Dunas","Kitesurf y windsurf opcionales","Bares y gastronomía"]},
    {"dia":6,"titulo":"Centro de Florianópolis","descripcion":"City tour por el centro histórico: Mercado Público, Ponte Hercílio Luz y miradores.","actividades":["Mercado Público","Ponte Hercílio Luz","Centro histórico","Compras"]},
    {"dia":7,"titulo":"Día libre en Jurerê","descripcion":"Jornada libre en la playa más sofisticada de Brasil. Atardecer con música en vivo.","actividades":["Playa libre en Jurerê","Atardecer con música en vivo","Gastronomía premium"]},
    {"dia":8,"titulo":"Último día en Floripa","descripcion":"Mañana libre. Últimas compras y despedida de Florianópolis.","actividades":["Compras finales","Playa","Check-out"]},
    {"dia":9,"titulo":"Regreso a Tucumán","descripcion":"Partida desde Florianópolis hacia Tucumán.","actividades":["Partida desde Brasil","Cruce fronterizo","Regreso a Tucumán"]}
  ]'
WHERE nombre ILIKE '%jurer%';

-- ── RÍO DE JANEIRO ────────────────────────────────────────────
UPDATE productos SET
  origen_ciudad   = 'Buenos Aires / Tucumán',
  destino_ciudad  = 'Río de Janeiro',
  duracion_dias   = 8,
  duracion_noches = 7,
  fechas_salida   = '[{"fecha":"2027-01-16","estado":"disponible"},{"fecha":"2027-01-23","estado":"disponible"}]',
  alojamiento     = '{"nombre":"Hotel en Copacabana o Ipanema","estrellas":3,"descripcion":"Hotel a pasos de la playa más famosa del mundo con desayuno incluido."}',
  incluye         = '["Vuelo de ida y vuelta","7 noches de alojamiento","Desayuno diario","Traslados aeropuerto/hotel","Coordinación permanente","Asistencia al viajero"]',
  no_incluye      = '["Almuerzo y cena","Excursiones opcionales","Entradas a atracciones","Gastos personales"]',
  opciones_transporte = '[{"nombre":"Vuelo en clase turista","precio_adicional":0,"incluido":true}]',
  itinerario      = '[
    {"dia":1,"titulo":"Vuelo a Río de Janeiro","descripcion":"Vuelo hacia Río de Janeiro. Llegada, traslado al hotel en Copacabana o Ipanema y primera noche en la ciudad maravillosa.","actividades":["Vuelo internacional","Check-in en hotel","Primera noche en Copacabana"]},
    {"dia":2,"titulo":"Cristo Redentor y Santa Teresa","descripcion":"Visita al Cristo Redentor, una de las Maravillas del Mundo moderno, con vistas panorámicas. Por la tarde, barrio bohemio de Santa Teresa.","actividades":["Cristo Redentor","Tren del Corcovado","Barrio Santa Teresa","Lapa"]},
    {"dia":3,"titulo":"Pan de Azúcar","descripcion":"Subida en teleférico al Pão de Açúcar para disfrutar de las mejores vistas de Río, la bahía y las playas.","actividades":["Teleférico Pão de Açúcar","Vista panorámica","Playa de Urca","Playa de Copacabana"]},
    {"dia":4,"titulo":"Playas de Río","descripcion":"Día de playa en las icónicas Copacabana e Ipanema. Caminata por el calçadão y tarde de sol y mar.","actividades":["Playa de Copacabana","Playa de Ipanema","Calçadão de Copacabana","Atardecer en Arpoador"]},
    {"dia":5,"titulo":"Centro histórico y Lapa","descripcion":"Recorrido por el centro histórico: Escadaria Selarón, Arcos da Lapa, Catedral Metropolitana y Cinelândia.","actividades":["Escadaria Selarón","Arcos da Lapa","Catedral Metropolitana","Cinelândia"]},
    {"dia":6,"titulo":"Excursión a Búzios o Petrópolis","descripcion":"Excursión opcional a Búzios (villa costera exclusiva) o Petrópolis (ciudad imperial con historia y naturaleza).","actividades":["Opcional: Búzios","Opcional: Petrópolis","Playa libre en Río"]},
    {"dia":7,"titulo":"Último día en Río","descripcion":"Mañana libre en la playa o de compras en el Feira de São Cristóvão. Noche de samba opcional.","actividades":["Playa o compras libre","Feira de São Cristóvão","Opcional: noche de samba"]},
    {"dia":8,"titulo":"Regreso","descripcion":"Check-out y traslado al aeropuerto. Vuelo de regreso.","actividades":["Check-out","Traslado al aeropuerto","Vuelo de regreso"]}
  ]'
WHERE nombre ILIKE '%rio de janeiro%' OR nombre ILIKE '%río de janeiro%';

-- ── CARTAGENA Y SAN ANDRÉS ────────────────────────────────────
UPDATE productos SET
  origen_ciudad   = 'Buenos Aires / Tucumán',
  destino_ciudad  = 'Cartagena y San Andrés, Colombia',
  duracion_dias   = 9,
  duracion_noches = 8,
  fechas_salida   = '[{"fecha":"2027-01-14","estado":"disponible"}]',
  alojamiento     = '{"nombre":"Hotel en Cartagena + Hotel en San Andrés","estrellas":4,"descripcion":"3 noches en Cartagena y 4 noches en San Andrés, ambos hoteles con desayuno incluido."}',
  incluye         = '["Vuelo de ida y vuelta","Vuelo interno Cartagena-San Andrés","8 noches de alojamiento","Desayuno diario","Traslados aeropuerto/hotel","Coordinación permanente","Asistencia al viajero"]',
  no_incluye      = '["Almuerzo y cena","Excursiones opcionales","Gastos personales","Propinas"]',
  opciones_transporte = '[{"nombre":"Vuelo en clase turista","precio_adicional":0,"incluido":true}]',
  itinerario      = '[
    {"dia":1,"titulo":"Vuelo a Cartagena","descripcion":"Vuelo hacia Cartagena de Indias, Colombia. Llegada, traslado al hotel y primera noche en la Ciudad Heroica.","actividades":["Vuelo internacional","Check-in en hotel","Primera noche en Cartagena"]},
    {"dia":2,"titulo":"Ciudad Amurallada de Cartagena","descripcion":"City tour por la Ciudad Amurallada: Castillo San Felipe de Barajas, Palacio de la Inquisición, Torre del Reloj y coloridos barrios coloniales.","actividades":["Castillo San Felipe de Barajas","Ciudad Amurallada","Palacio de la Inquisición","Torre del Reloj","Barrio Getsemaní"]},
    {"dia":3,"titulo":"Islas del Rosario","descripcion":"Excursión en lancha a las Islas del Rosario: arrecifes de coral, aguas cristalinas y snorkel en un paraíso del Caribe colombiano.","actividades":["Lancha a Islas del Rosario","Snorkel en arrecifes de coral","Playa paradisíaca","Almuerzo de mariscos"]},
    {"dia":4,"titulo":"Vuelo a San Andrés","descripcion":"Vuelo interno hacia San Andrés. Llegada al Mar de los Siete Colores. Check-in y primera tarde en las aguas turquesas.","actividades":["Vuelo Cartagena-San Andrés","Check-in en hotel","Sea Flower Biosphere Reserve","Primera tarde en la playa"]},
    {"dia":5,"titulo":"Johnny Cay y El Acuario","descripcion":"Paseo en lancha a Johnny Cay: playa de arena blanca y palmeras. El Acuario con aguas cristalinas donde nadar con peces tropicales.","actividades":["Johnny Cay","El Acuario","Snorkel con peces tropicales","Haynes Cay"]},
    {"dia":6,"titulo":"Vuelta a la isla en moto o bicicleta","descripcion":"Recorrida por San Andrés: La Piscinita (piscina natural), El Cove, El Cliff y los miradores de la isla.","actividades":["La Piscinita natural","El Cove","El Cliff","Miradores de la isla"]},
    {"dia":7,"titulo":"Playa libre y compras","descripcion":"Jornada libre en la playa. Por la tarde, compras duty free en el centro comercial de San Andrés.","actividades":["Playa libre","Centro Comercial New Point","Compras duty free","Atardecer en el muelle"]},
    {"dia":8,"titulo":"Último día en San Andrés","descripcion":"Mañana libre para disfrutar el mar. Por la tarde, check-out y cena de despedida.","actividades":["Playa libre","Compras de recuerdos","Check-out","Cena de despedida"]},
    {"dia":9,"titulo":"Regreso","descripcion":"Traslado al aeropuerto. Vuelo de regreso.","actividades":["Traslado al aeropuerto","Vuelo de regreso"]}
  ]'
WHERE nombre ILIKE '%cartagena%';
