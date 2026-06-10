-- ============================================================
-- 1. Agregar columnas a la tabla rifas
-- ============================================================
ALTER TABLE rifas
  ADD COLUMN IF NOT EXISTS imagenes_numeros jsonb DEFAULT '[]'::jsonb;

ALTER TABLE rifas
  ADD COLUMN IF NOT EXISTS numeros_vendidos_lista jsonb DEFAULT '[]'::jsonb;

-- ============================================================
-- 2. Insertar paquete Cancún (internacional)
--    Ejecutar con rol de servicio o desde el panel de Supabase
-- ============================================================
INSERT INTO productos (
  nombre,
  categoria,
  descripcion,
  precio_desde,
  origen_ciudad,
  destino_ciudad,
  duracion_dias,
  duracion_noches,
  incluye,
  no_incluye,
  alojamiento,
  itinerario,
  fechas_salida,
  opciones_transporte
)
VALUES (
  'Cancún — Viva Maya All Inclusive',
  'internacional',
  'Paquete internacional a Cancún con vuelos LATAM desde Salta, 7 noches en Viva Maya by Wyndham All Inclusive en Playa del Carmen, traslados y asistencia al viajero.',
  2400,
  'Salta',
  'Cancún / Playa del Carmen',
  8,
  7,
  ARRAY[
    'Vuelo LATAM Salta → Cancún (11/01/2027 05:40 → 14:20) con equipaje incluido',
    'Vuelo LATAM Cancún → Salta (18/01/2027 15:25 → 19/01/2027 04:35)',
    'Traslado aeropuerto Cancún → Hotel (Playa del Carmen) → Aeropuerto Cancún',
    '7 noches en Viva Maya by Wyndham — All Inclusive — Playa del Carmen',
    'Asistencia al viajero ASSIST CARD'
  ],
  ARRAY[
    'Gastos personales',
    'Excursiones opcionales',
    'Propinas',
    'Seguro de equipaje adicional'
  ],
  '{"nombre": "Viva Maya by Wyndham", "descripcion": "Resort All Inclusive en Playa del Carmen, a pocos metros de la playa con múltiples piscinas, restaurantes y entretenimiento.", "estrellas": 5}'::jsonb,
  '[
    {"dia": 1, "titulo": "Llegada a Cancún", "descripcion": "Vuelo desde Salta. Llegada al aeropuerto de Cancún a las 14:20 hs. Traslado al hotel Viva Maya by Wyndham en Playa del Carmen. Check-in y tarde libre. Noche en el resort.", "actividades": ["Vuelo Salta → Cancún", "Traslado aeropuerto → hotel", "Check-in y bienvenida All Inclusive"]},
    {"dia": 2, "titulo": "Playa del Carmen", "descripcion": "Día libre para disfrutar del resort All Inclusive: playas, piscinas, gastronomía y entretenimiento del hotel.", "actividades": ["Desayuno, almuerzo y cena incluidos", "Actividades del resort", "Quinta Avenida (optativo)"]},
    {"dia": 3, "titulo": "Xcaret o Tulum (optativo)", "descripcion": "Día para explorar los atractivos de la Riviera Maya. Podés visitar el Parque Xcaret o las ruinas de Tulum (excursiones opcionales no incluidas).", "actividades": ["Parque Xcaret (optativo)", "Ruinas de Tulum (optativo)", "Snorkel en cenotes (optativo)"]},
    {"dia": 4, "titulo": "Isla Mujeres (optativo)", "descripcion": "Día libre en el resort o excursión optativa a Isla Mujeres con sus aguas turquesas y coloridos callejones.", "actividades": ["Playa del resort", "Catamaran a Isla Mujeres (optativo)"]},
    {"dia": 5, "titulo": "Chichen Itzá (optativo)", "descripcion": "Posibilidad de visita a Chichén Itzá, una de las 7 maravillas del mundo moderno (excursión optativa no incluida).", "actividades": ["Chichén Itzá (optativo)", "Cenote Ik Kil (optativo)", "Valladolid (optativo)"]},
    {"dia": 6, "titulo": "Día libre en el resort", "descripcion": "Último día completo para aprovechar todas las instalaciones del Viva Maya: piscinas, spa, shows nocturnos y gastronomía ilimitada.", "actividades": ["All Inclusive completo", "Spa y actividades recreativas", "Shows nocturnos"]},
    {"dia": 7, "titulo": "Último día en Playa del Carmen", "descripcion": "Mañana libre hasta el checkout. Tarde de compras en la Quinta Avenida o relax en la playa.", "actividades": ["Checkout del hotel", "Tarde libre en Playa del Carmen", "Traslado al aeropuerto"]},
    {"dia": 8, "titulo": "Regreso a Salta", "descripcion": "Traslado al aeropuerto de Cancún. Vuelo de regreso LATAM 15:25 con llegada a Salta el 19/01/2027 a las 04:35 hs.", "actividades": ["Traslado hotel → aeropuerto Cancún", "Vuelo Cancún → Salta (15:25 → 04:35 del día siguiente)"]}
  ]'::jsonb,
  '[
    {"fecha": "2027-01-11", "estado": "disponible"}
  ]'::jsonb,
  '[]'::jsonb
);
