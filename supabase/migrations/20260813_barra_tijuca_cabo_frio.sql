-- Barra de Tijuca y Cabo Frío (internacional, en bus, con escala en Foz de Iguazú)
-- Mismo esquema de viaje que Búzios 2027 (20260813_buzios_2027.sql)

INSERT INTO productos (
  nombre, categoria, descripcion,
  origen_ciudad, destino_ciudad,
  duracion_dias, duracion_noches,
  precio, precio_desde,
  itinerario, incluye, no_incluye,
  fechas_salida
) VALUES

-- ─── BARRA DE TIJUCA ───────────────────────────────────────────────────────
(
  'Barra de Tijuca',
  'internacional',
  'Barra de Tijuca en bus desde Tucumán con parada en Foz de Iguazú: 7 noches en Barra de Tijuca (Hotel Ibis Barra 3* o Mercure 4*) y 2 noches en Foz de Iguazú con visita a Cataratas incluida. 13 días / 9 noches, con salidas en enero y febrero de 2027. Precio en cuotas: salidas de enero, 6 cuotas de $250.000; salidas de febrero, 7 cuotas de $210.000 (tarifa válida hasta el 30/09).',
  'San Miguel de Tucumán',
  'Barra de Tijuca, Río de Janeiro',
  13, 9,
  0, 1470000,
  '[
    {"dia":1,"titulo":"Salida desde Tucumán","descripcion":"Salida en Bus Internacional 5* Mix desde la Terminal de Ómnibus de Tucumán. Viaje nocturno con destino a Barra de Tijuca.","actividades":["Salida en Bus Internacional 5* Mix"]},
    {"dia":2,"titulo":"Viaje — cruce de frontera","descripcion":"Continuamos viaje hacia Barra de Tijuca. Trámites de aduana a cargo de la empresa.","actividades":["Trámites de aduana a cargo de la empresa"]},
    {"dia":3,"titulo":"Llegada a Barra de Tijuca","descripcion":"Arribo a Barra de Tijuca. Transfer in puerta a puerta y check-in en Hotel Ibis Barra 3* (o Mercure 4*). Comienzan las noches de alojamiento en Barra de Tijuca.","actividades":["Transfer in puerta a puerta","Check-in en Hotel Ibis Barra 3* (o Mercure 4*)"]},
    {"dia":4,"titulo":"Barra de Tijuca","descripcion":"Día libre para disfrutar de las playas y de Barra de Tijuca.","actividades":[]},
    {"dia":5,"titulo":"Barra de Tijuca","descripcion":"Día libre en Barra de Tijuca.","actividades":[]},
    {"dia":6,"titulo":"Barra de Tijuca","descripcion":"Día libre en Barra de Tijuca.","actividades":[]},
    {"dia":7,"titulo":"Barra de Tijuca","descripcion":"Día libre en Barra de Tijuca.","actividades":[]},
    {"dia":8,"titulo":"Barra de Tijuca","descripcion":"Día libre en Barra de Tijuca.","actividades":[]},
    {"dia":9,"titulo":"Barra de Tijuca","descripcion":"Último día libre en Barra de Tijuca. Por la noche, checkout del hotel.","actividades":[]},
    {"dia":10,"titulo":"Barra de Tijuca — Foz de Iguazú","descripcion":"Viaje en bus desde Barra de Tijuca con destino a Foz de Iguazú.","actividades":[]},
    {"dia":11,"titulo":"Llegada a Foz de Iguazú","descripcion":"Arribo a Foz de Iguazú y check-in en Hotel Portinari 3*.","actividades":["Check-in en Hotel Portinari 3*"]},
    {"dia":12,"titulo":"Visita a las Cataratas del Iguazú","descripcion":"Visita a las Cataratas del Iguazú incluida en el paquete.","actividades":["Visita a las Cataratas del Iguazú"]},
    {"dia":13,"titulo":"Regreso a Tucumán","descripcion":"Checkout del Hotel Portinari. Transfer out puerta a puerta y regreso a Tucumán. Fin de nuestros servicios.","actividades":["Transfer out puerta a puerta"]}
  ]'::jsonb,
  '["Bus Internacional 5* Mix","Trámites de aduana a cargo de la empresa","Transfer in/out puerta a puerta","7 noches de alojamiento en Barra de Tijuca — Hotel Ibis Barra 3* o Mercure 4*","2 noches de alojamiento en Foz de Iguazú — Hotel Portinari 3*, con visita a Cataratas incluida","Coordinación permanente — contacto en línea","Facilitación para el cambio de divisas"]'::jsonb,
  '["Comidas no mencionadas en el itinerario","Excursiones opcionales","Gastos personales"]'::jsonb,
  '[
    {"fecha":"2027-01-02","estado":"disponible"},
    {"fecha":"2027-01-09","estado":"disponible"},
    {"fecha":"2027-01-16","estado":"disponible"},
    {"fecha":"2027-01-23","estado":"disponible"},
    {"fecha":"2027-02-13","estado":"disponible"},
    {"fecha":"2027-02-20","estado":"disponible"},
    {"fecha":"2027-02-27","estado":"disponible"}
  ]'::jsonb
),

-- ─── CABO FRÍO ─────────────────────────────────────────────────────────────
(
  'Cabo Frío',
  'internacional',
  'Cabo Frío en bus desde Tucumán con parada en Foz de Iguazú: 7 noches en Cabo Frío (Posada Porto Forte) y 2 noches en Foz de Iguazú con visita a Cataratas incluida. 13 días / 9 noches, con salidas en enero y febrero de 2027. Precio en cuotas: salidas de enero, 6 cuotas de $250.000; salidas de febrero, 7 cuotas de $210.000 (tarifa válida hasta el 30/09).',
  'San Miguel de Tucumán',
  'Cabo Frío, Río de Janeiro',
  13, 9,
  0, 1470000,
  '[
    {"dia":1,"titulo":"Salida desde Tucumán","descripcion":"Salida en Bus Internacional 5* Mix desde la Terminal de Ómnibus de Tucumán. Viaje nocturno con destino a Cabo Frío.","actividades":["Salida en Bus Internacional 5* Mix"]},
    {"dia":2,"titulo":"Viaje — cruce de frontera","descripcion":"Continuamos viaje hacia Cabo Frío. Trámites de aduana a cargo de la empresa.","actividades":["Trámites de aduana a cargo de la empresa"]},
    {"dia":3,"titulo":"Llegada a Cabo Frío","descripcion":"Arribo a Cabo Frío. Transfer in puerta a puerta y check-in en Posada Porto Forte. Comienzan las noches de alojamiento en Cabo Frío.","actividades":["Transfer in puerta a puerta","Check-in en Posada Porto Forte"]},
    {"dia":4,"titulo":"Cabo Frío","descripcion":"Día libre para disfrutar de las playas y de Cabo Frío.","actividades":[]},
    {"dia":5,"titulo":"Cabo Frío","descripcion":"Día libre en Cabo Frío.","actividades":[]},
    {"dia":6,"titulo":"Cabo Frío","descripcion":"Día libre en Cabo Frío.","actividades":[]},
    {"dia":7,"titulo":"Cabo Frío","descripcion":"Día libre en Cabo Frío.","actividades":[]},
    {"dia":8,"titulo":"Cabo Frío","descripcion":"Día libre en Cabo Frío.","actividades":[]},
    {"dia":9,"titulo":"Cabo Frío","descripcion":"Último día libre en Cabo Frío. Por la noche, checkout del hotel.","actividades":[]},
    {"dia":10,"titulo":"Cabo Frío — Foz de Iguazú","descripcion":"Viaje en bus desde Cabo Frío con destino a Foz de Iguazú.","actividades":[]},
    {"dia":11,"titulo":"Llegada a Foz de Iguazú","descripcion":"Arribo a Foz de Iguazú y check-in en Hotel Portinari 3*.","actividades":["Check-in en Hotel Portinari 3*"]},
    {"dia":12,"titulo":"Visita a las Cataratas del Iguazú","descripcion":"Visita a las Cataratas del Iguazú incluida en el paquete.","actividades":["Visita a las Cataratas del Iguazú"]},
    {"dia":13,"titulo":"Regreso a Tucumán","descripcion":"Checkout del Hotel Portinari. Transfer out puerta a puerta y regreso a Tucumán. Fin de nuestros servicios.","actividades":["Transfer out puerta a puerta"]}
  ]'::jsonb,
  '["Bus Internacional 5* Mix","Trámites de aduana a cargo de la empresa","Transfer in/out puerta a puerta","7 noches de alojamiento en Cabo Frío — Posada Porto Forte","2 noches de alojamiento en Foz de Iguazú — Hotel Portinari 3*, con visita a Cataratas incluida","Coordinación permanente — contacto en línea","Facilitación para el cambio de divisas"]'::jsonb,
  '["Comidas no mencionadas en el itinerario","Excursiones opcionales","Gastos personales"]'::jsonb,
  '[
    {"fecha":"2027-01-02","estado":"disponible"},
    {"fecha":"2027-01-09","estado":"disponible"},
    {"fecha":"2027-01-16","estado":"disponible"},
    {"fecha":"2027-01-23","estado":"disponible"},
    {"fecha":"2027-02-13","estado":"disponible"},
    {"fecha":"2027-02-20","estado":"disponible"},
    {"fecha":"2027-02-27","estado":"disponible"}
  ]'::jsonb
);
