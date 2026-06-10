-- Tabla compras (pagos de paquetes via MercadoPago)
create table if not exists compras (
  id            uuid        primary key default gen_random_uuid(),
  nombre        text        not null,
  email         text        not null,
  telefono      text        not null default '',
  producto_nombre text      not null,
  precio        numeric     not null,
  estado        text        not null default 'pendiente',
  mp_payment_id text,
  created_at    timestamptz not null default now()
);

alter table compras enable row level security;
create policy "compras_insert_public" on compras for insert with check (true);
create policy "compras_all_service"   on compras using (true) with check (true);

-- Tabla reservas (flujo de reserva con pasajeros, transporte y habitaciones)
create table if not exists reservas (
  id              uuid        primary key default gen_random_uuid(),
  paquete_id      bigint,
  paquete_nombre  text,
  fecha_salida    date,
  pasajeros       jsonb       not null default '[]',
  transportes     jsonb       not null default '[]',
  habitaciones    jsonb       not null default '[]',
  checkout        jsonb       not null default '{}',
  precio_base     numeric     not null default 0,
  precio_total    numeric     not null default 0,
  estado          text        not null default 'pendiente',
  created_at      timestamptz not null default now()
);

alter table reservas enable row level security;
create policy "reservas_insert_public" on reservas for insert with check (true);
create policy "reservas_all_service"   on reservas using (true) with check (true);
