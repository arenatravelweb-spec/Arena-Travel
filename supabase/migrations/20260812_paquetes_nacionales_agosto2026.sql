-- Villa de Merlo (Fiesta del Asado), Oktoberfest 2026, Visita del Papa León XIV a Córdoba

INSERT INTO productos (
  nombre, categoria, descripcion,
  origen_ciudad, destino_ciudad,
  duracion_dias, duracion_noches,
  precio,
  alojamiento,
  itinerario, incluye, no_incluye,
  fechas_salida
) VALUES

-- ─── VILLA DE MERLO — FIESTA DEL ASADO ────────────────────────────────────────
(
  'Villa de Merlo — Fiesta del Asado',
  'nacional',
  'Viví el microclima único de Villa de Merlo con pensión completa, la Gran Fiesta del Asado con show folclórico, tarde de mate y tortas fritas, día de campo en Estancia Rancho Clima y la Gran Fiesta Retro Dorada. 4 días / 3 noches saliendo desde Tucumán.',
  'San Miguel de Tucumán',
  'Villa de Merlo, San Luis',
  4, 3,
  410000,
  '{"nombre": "Grupo Clima Villa de Merlo", "descripcion": "Hotelería en Villa de Merlo con pensión completa, en pleno corazón serrano puntano.", "estrellas": 0}'::jsonb,
  '[
    {"dia":1,"titulo":"Llegada a Villa de Merlo","descripcion":"Salida en bus semicama a las 23:30 hs desde la Terminal de Ómnibus con destino a Villa de Merlo. Viaje nocturno y arribo por la mañana. Check-in en hotelería Grupo Clima y tarde libre para conocer el pueblo.","actividades":["Salida 23:30 hs desde Terminal de Ómnibus","Check-in en hotelería Grupo Clima","Pensión completa: desayuno, almuerzo y cena"]},
    {"dia":2,"titulo":"Fiesta del Asado y show folclórico","descripcion":"Desayuno. Tarde de mate y tortas fritas para disfrutar del clima serrano. Por la noche, Gran Fiesta del Asado con show folclórico en vivo.","actividades":["Tarde de mate y tortas fritas","Fiesta del Asado","Show folclórico en vivo"]},
    {"dia":3,"titulo":"Día de campo en Estancia Rancho Clima","descripcion":"Desayuno. Día de campo completo en la Estancia Rancho Clima, con actividades al aire libre. Por la noche, Gran Fiesta Retro Dorada para cerrar el viaje a pura música y baile.","actividades":["Día de campo en Estancia Rancho Clima","Gran Fiesta Retro Dorada","Juegos y regalos sorpresa"]},
    {"dia":4,"titulo":"Regreso a Tucumán","descripcion":"Desayuno y checkout. Emprendemos el regreso a Tucumán. Fin de nuestros servicios.","actividades":[]}
  ]'::jsonb,
  '["Traslado en bus semicama, salida 23:30 hs desde Terminal de Ómnibus","3 noches de alojamiento en hotelería Grupo Clima Villa de Merlo","Pensión completa (desayuno, almuerzo y cena)","Fiesta del Asado","Show folclórico en vivo","Tarde de mate y tortas fritas","Día de campo en Estancia Rancho Clima","Gran Fiesta Retro Dorada","Coordinación permanente","Asistencia al viajero y seguros","Juegos y regalos sorpresa durante el viaje"]'::jsonb,
  '["Actividades opcionales","Gastos personales","Propinas"]'::jsonb,
  '[{"fecha":"2026-09-23","estado":"disponible"}]'::jsonb
),

-- ─── OKTOBERFEST 2026 — VILLA GENERAL BELGRANO ────────────────────────────────
(
  'Oktoberfest 2026 — Villa General Belgrano',
  'nacional',
  'Viví el 63° Oktoberfest en Villa General Belgrano con traslado incluido, alojamiento en Villa Carlos Paz y media pensión. 4 días / 2 noches, salida el 9 de octubre y regreso el 12.',
  'San Miguel de Tucumán',
  'Villa General Belgrano / Villa Carlos Paz, Córdoba',
  4, 2,
  330000,
  '{"nombre": "Gran Hotel Oasis", "descripcion": "Hotel en Villa Carlos Paz, a orillas del Lago San Roque.", "estrellas": 0}'::jsonb,
  '[
    {"dia":1,"titulo":"Salida desde Tucumán","descripcion":"Salida en bus 5* Mix con destino a Villa Carlos Paz. Viaje nocturno.","actividades":["Salida en Bus 5* Mix"]},
    {"dia":2,"titulo":"Traslado a Villa General Belgrano — Oktoberfest","descripcion":"Arribo a Villa Carlos Paz y check-in en el Gran Hotel Oasis. Por la tarde, traslado ida y vuelta a Villa General Belgrano para vivir el 63° Oktoberfest (entrada al festival no incluida). Regreso al hotel por la noche.","actividades":["Check-in en Gran Hotel Oasis","Traslado ida y vuelta a Villa General Belgrano","63° Oktoberfest — entrada no incluida"]},
    {"dia":3,"titulo":"Día libre en Villa Carlos Paz","descripcion":"Desayuno y almuerzo (media pensión). Día libre para disfrutar de la ciudad, el Lago San Roque y sus alrededores.","actividades":["Media pensión: desayuno y almuerzo","Día libre en Villa Carlos Paz"]},
    {"dia":4,"titulo":"Regreso a Tucumán","descripcion":"Desayuno y checkout. Emprendemos el regreso a Tucumán. Fin de nuestros servicios.","actividades":[]}
  ]'::jsonb,
  '["Bus 5* Mix","Traslado ida y vuelta a Villa General Belgrano el día sábado (no incluye entrada al festival)","2 noches de alojamiento en Villa Carlos Paz (Gran Hotel Oasis)","Media pensión (desayuno y almuerzo)","Coordinación","Asistencia al viajero"]'::jsonb,
  '["Entrada al Festival Oktoberfest","Cena","Excursiones opcionales","Gastos personales"]'::jsonb,
  '[{"fecha":"2026-10-09","estado":"disponible"}]'::jsonb
),

-- ─── VISITA DEL PAPA LEÓN XIV — CÓRDOBA ───────────────────────────────────────
(
  'Visita del Papa León XIV — Córdoba',
  'nacional',
  'Viví un momento único de fe, encuentro y esperanza: viajá a Córdoba para presenciar la misa del Papa León XIV en noviembre de 2026. Traslados, hotel en Villa Carlos Paz y asistencia de viaje incluidos. Cupos limitados. Precio a consultar — seña de reserva $50.000.',
  'San Miguel de Tucumán',
  'Córdoba',
  4, 2,
  0,
  '{"nombre": "Hotel en Villa Carlos Paz", "descripcion": "Alojamiento en Villa Carlos Paz, base para la visita a Córdoba Capital.", "estrellas": 0}'::jsonb,
  '[
    {"dia":1,"titulo":"Salida desde Tucumán","descripcion":"Salida desde la Terminal de Tucumán a las 23:30 hs en Bus Mix con destino a Córdoba.","actividades":["Salida 23:30 hs desde Terminal de Tucumán"]},
    {"dia":2,"titulo":"Llegada a Villa Carlos Paz","descripcion":"Llegada a la Terminal de Santiago del Estero aprox. 1:30 hs (ascenso de pasajeros). Arribo a Villa Carlos Paz aprox. 8:30 hs. Día libre.","actividades":["Ascenso de pasajeros en Santiago del Estero","Arribo a Villa Carlos Paz — día libre"]},
    {"dia":3,"titulo":"Misa del Sumo Pontífice en Córdoba","descripcion":"Desayuno en el hotel. Salida hacia Córdoba Capital para presenciar la misa del Papa León XIV en el predio de FAdeA, con traslado ida y vuelta incluido. Regreso a Carlos Paz a convenir según la finalización de las actividades del día.","actividades":["Traslado ida y vuelta a la misa en el predio de FAdeA","Misa del Papa León XIV"]},
    {"dia":4,"titulo":"Regreso a Tucumán","descripcion":"Desayuno en el hotel y checkout. Emprendemos el regreso a Tucumán. Llegada aproximada 19 hs. Fin de los servicios.","actividades":[]}
  ]'::jsonb,
  '["Traslado Tucumán – Córdoba en Bus Mix","Hotel en Villa Carlos Paz (2 noches)","Traslado ida y vuelta a la misa en el predio de FAdeA","Media pensión","Asistencia de viaje","Coordinación permanente"]'::jsonb,
  '["Almuerzos y cenas fuera de la media pensión","Excursiones y actividades opcionales","Gastos personales"]'::jsonb,
  '[{"fecha":"2026-11-07","estado":"disponible"}]'::jsonb
);
