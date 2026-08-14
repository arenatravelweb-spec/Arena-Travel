-- Río de Janeiro 2027 (internacional, en bus, con escala en Foz de Iguazú)
-- Mismo esquema de viaje que Búzios 2027 (20260813_buzios_2027.sql)

INSERT INTO productos (
  nombre, categoria, descripcion,
  origen_ciudad, destino_ciudad,
  duracion_dias, duracion_noches,
  precio, precio_desde,
  itinerario, incluye, no_incluye,
  fechas_salida
) VALUES (
  'Río de Janeiro 2027',
  'internacional',
  'Río de Janeiro en bus desde Tucumán con parada en Foz de Iguazú: 7 noches en Río de Janeiro (Hotel Mirador 4*) y 2 noches en Foz de Iguazú con visita a Cataratas incluida. 13 días / 9 noches, con salidas en enero y febrero de 2027. Precio en cuotas: salidas de enero, 6 cuotas de $250.000; salidas de febrero, 7 cuotas de $210.000 (tarifa válida hasta el 30/09).',
  'San Miguel de Tucumán',
  'Río de Janeiro',
  13, 9,
  0, 1470000,
  '[
    {"dia":1,"titulo":"Salida desde Tucumán","descripcion":"Salida en Bus Internacional 5* Mix desde la Terminal de Ómnibus de Tucumán. Viaje nocturno con destino a Río de Janeiro.","actividades":["Salida en Bus Internacional 5* Mix"]},
    {"dia":2,"titulo":"Viaje — cruce de frontera","descripcion":"Continuamos viaje hacia Río de Janeiro. Trámites de aduana a cargo de la empresa.","actividades":["Trámites de aduana a cargo de la empresa"]},
    {"dia":3,"titulo":"Llegada a Río de Janeiro","descripcion":"Arribo a Río de Janeiro. Transfer in puerta a puerta y check-in en Hotel Mirador 4*. Comienzan las noches de alojamiento en Río de Janeiro.","actividades":["Transfer in puerta a puerta","Check-in en Hotel Mirador 4*"]},
    {"dia":4,"titulo":"Río de Janeiro","descripcion":"Día libre para disfrutar de las playas y de Río de Janeiro.","actividades":[]},
    {"dia":5,"titulo":"Río de Janeiro","descripcion":"Día libre en Río de Janeiro.","actividades":[]},
    {"dia":6,"titulo":"Río de Janeiro","descripcion":"Día libre en Río de Janeiro.","actividades":[]},
    {"dia":7,"titulo":"Río de Janeiro","descripcion":"Día libre en Río de Janeiro.","actividades":[]},
    {"dia":8,"titulo":"Río de Janeiro","descripcion":"Día libre en Río de Janeiro.","actividades":[]},
    {"dia":9,"titulo":"Río de Janeiro","descripcion":"Último día libre en Río de Janeiro. Por la noche, checkout del hotel.","actividades":[]},
    {"dia":10,"titulo":"Río de Janeiro — Foz de Iguazú","descripcion":"Viaje en bus desde Río de Janeiro con destino a Foz de Iguazú.","actividades":[]},
    {"dia":11,"titulo":"Llegada a Foz de Iguazú","descripcion":"Arribo a Foz de Iguazú y check-in en Hotel Portinari 3*.","actividades":["Check-in en Hotel Portinari 3*"]},
    {"dia":12,"titulo":"Visita a las Cataratas del Iguazú","descripcion":"Visita a las Cataratas del Iguazú incluida en el paquete.","actividades":["Visita a las Cataratas del Iguazú"]},
    {"dia":13,"titulo":"Regreso a Tucumán","descripcion":"Checkout del Hotel Portinari. Transfer out puerta a puerta y regreso a Tucumán. Fin de nuestros servicios.","actividades":["Transfer out puerta a puerta"]}
  ]'::jsonb,
  '["Bus Internacional 5* Mix","Trámites de aduana a cargo de la empresa","Transfer in/out puerta a puerta","7 noches de alojamiento en Río de Janeiro — Hotel Mirador 4*","2 noches de alojamiento en Foz de Iguazú — Hotel Portinari 3*, con visita a Cataratas incluida","Coordinación permanente — contacto en línea","Facilitación para el cambio de divisas"]'::jsonb,
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
