-- ─────────────────────────────────────────────────
-- 1. Agregar columnas de itinerario si no existen
-- ─────────────────────────────────────────────────
alter table productos
  add column if not exists origen_ciudad         text,
  add column if not exists destino_ciudad        text,
  add column if not exists duracion_dias         int,
  add column if not exists duracion_noches       int,
  add column if not exists precio_single_recargo numeric default 50,
  add column if not exists itinerario            jsonb  default '[]',
  add column if not exists fechas_salida         jsonb  default '[]',
  add column if not exists alojamiento           jsonb,
  add column if not exists incluye               jsonb  default '[]',
  add column if not exists no_incluye            jsonb  default '[]',
  add column if not exists opciones_transporte   jsonb  default '[]';

-- ─────────────────────────────────────────────────
-- 2. Insertar paquete Buenos Aires Julio 2026
-- ─────────────────────────────────────────────────
insert into productos (
  nombre,
  precio,
  categoria,
  descripcion,
  origen_ciudad,
  destino_ciudad,
  duracion_dias,
  duracion_noches,
  precio_single_recargo,
  incluye,
  no_incluye,
  fechas_salida,
  opciones_transporte,
  itinerario,
  hot_sale
) values (
  'Buenos Aires en Vacaciones de Julio',
  450000,
  'nacional',
  'Viví Buenos Aires en vacaciones de julio. 5 días recorriendo la historia, la cultura y los paisajes más icónicos de la capital: Plaza de Mayo, Puerto Madero, Recoleta, La Boca y mucho más. Salida desde Tucumán.',
  'Tucumán',
  'Buenos Aires',
  5,
  3,
  50,

  '["Alojamiento en Hotel Embajador (3 noches)","Bus Mix","Régimen Media Pensión","Asistencia al Viajero","Coordinador Permanente","City tour por Buenos Aires","Regreso por Basílica Nuestra Señora de Luján"]',

  '["Excursión Jardín Japones: $28.000 (+ entrada $6.000)","Excursión La Boca y San Telmo: $28.000","Excursión Tigre / Puerto de Frutos: $42.000","Gastos personales"]',

  '[{"fecha":"2026-07-19","disponible":true}]',

  '[{"tipo":"Bus Mix","precio_adicional":0},{"tipo":"Coche Cama","precio_adicional":35000},{"tipo":"Panorámica o Cafetera","precio_adicional":43000}]',

  '[
    {"dia":1,"titulo":"Salida desde Tucumán","descripcion":"Salida desde Tucumán hacia Buenos Aires. Viaje nocturno.","actividades":["Salida desde Tucumán"]},
    {"dia":2,"titulo":"Llegada y City Tour","descripcion":"Llegada en horas de la mañana. City Tour por Buenos Aires visitando Plaza de Mayo, Puerto Madero y Recoleta. Por la tarde, excursión opcional al Jardín Japones y el Hipódromo de Palermo. Cena.","actividades":["City Tour: Plaza de Mayo, Puerto Madero, Recoleta","Alojamiento en Hotel Embajador","Cena","Opcional: Jardín Japones e Hipódromo de Palermo"]},
    {"dia":3,"titulo":"Buenos Aires libre — La Boca y San Telmo","descripcion":"Desayuno. Mañana libre para recorrer la ciudad. Por la tarde, excursión opcional a La Boca y San Telmo: Caminito, Iglesia San Ignacio, Mercado de San Telmo. Opción de navegación por el Río de la Plata.","actividades":["Desayuno","Mañana libre","Opcional: La Boca y San Telmo","Opcional: Navegación por el Río de la Plata"]},
    {"dia":4,"titulo":"Excursión a Tigre","descripcion":"Desayuno. Excursión opcional a Tigre: Puerto de Frutos, productos regionales y artesanales. Opción de paseo en catamarán por el delta del Paraná. Regreso al hotel. Cena.","actividades":["Desayuno","Opcional: Tigre y Puerto de Frutos","Opcional: Catamarán por el delta","Cena"]},
    {"dia":5,"titulo":"Regreso — Basílica de Luján","descripcion":"Desayuno. Emprendemos el regreso visitando la Basílica Nuestra Señora de Luján. Llegada al lugar de origen. Fin de nuestros servicios.","actividades":["Desayuno","Visita Basílica Nuestra Señora de Luján","Regreso a Tucumán"]}
  ]',

  false
);
