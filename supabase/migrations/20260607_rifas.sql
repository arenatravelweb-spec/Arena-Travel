-- Tabla de rifas
create table if not exists rifas (
  id              uuid        primary key default gen_random_uuid(),
  titulo          text        not null,
  descripcion     text,
  premios         jsonb       not null default '[]',
  precio_numero   numeric     not null,
  total_numeros   int         not null default 300,
  numeros_vendidos int        not null default 0,
  fecha_limite    date,
  imagen_url      text,
  activa          boolean     not null default true,
  caracteristicas jsonb       not null default '[]',
  created_at      timestamptz not null default now()
);

-- Tabla de participaciones en rifas
create table if not exists rifa_participaciones (
  id               uuid        primary key default gen_random_uuid(),
  rifa_id          uuid        not null references rifas(id) on delete cascade,
  nombre           text        not null,
  email            text        not null,
  telefono         text,
  cantidad_numeros int         not null default 1,
  monto_total      numeric,
  estado           text        not null default 'pendiente',
  mp_payment_id    text,
  created_at       timestamptz not null default now()
);

-- RLS: lectura pública para rifas activas
alter table rifas enable row level security;
create policy "rifas_select_public" on rifas for select using (activa = true);
create policy "rifas_all_service" on rifas using (true) with check (true);

-- RLS: inserción pública para participaciones (el usuario compra)
alter table rifa_participaciones enable row level security;
create policy "rifa_part_insert_public" on rifa_participaciones for insert with check (true);
create policy "rifa_part_all_service"   on rifa_participaciones using (true) with check (true);
