-- =====================================================================
-- Aixa Nails · Migración: Categorías dinámicas, orden de galería,
-- sincronización de services (price/base_price) y ajustes de ubicación
-- =====================================================================

-- 1. Agregar order_index a works para ordenamiento manual
alter table public.works add column if not exists order_index integer default 0;
create index if not exists works_order_idx on public.works (order_index asc, created_at desc);

-- 2. Tabla categories para filtros y etiquetas dinámicas
create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique check (char_length(name) between 1 and 60),
  order_index integer not null default 0,
  created_at  timestamptz not null default now()
);

alter table public.categories enable row level security;

drop policy if exists "categories_public_read" on public.categories;
create policy "categories_public_read"
  on public.categories for select
  to anon, authenticated
  using (true);

drop policy if exists "categories_admin_all" on public.categories;
create policy "categories_admin_all"
  on public.categories for all
  to authenticated
  using (true)
  with check (true);

-- Sembrar categorías base iniciales
insert into public.categories (name, order_index)
values
  ('Semipermanente', 1),
  ('Polygel', 2),
  ('Soft gel', 3)
on conflict (name) do nothing;

-- 3. Sincronización de columnas price y base_price en services
do $$
begin
  if to_regclass('public.services') is not null then
    alter table public.services add column if not exists base_price numeric default 0;
    alter table public.services add column if not exists price numeric default 0;
    update public.services set price = base_price where (price = 0 or price is null) and base_price is not null and base_price > 0;
    update public.services set base_price = price where (base_price = 0 or base_price is null) and price is not null and price > 0;
    -- Permitir DELETE en services para administradores autenticados
    drop policy if exists "services_admin_delete" on public.services;
    create policy "services_admin_delete" on public.services for delete to authenticated using (true);
    drop policy if exists "services_admin_insert" on public.services;
    create policy "services_admin_insert" on public.services for insert to authenticated with check (true);
  end if;
end $$;

-- 4. Asegurar campos whatsapp_number y location_text en site_settings
do $$
begin
  if to_regclass('public.site_settings') is not null then
    alter table public.site_settings add column if not exists whatsapp_number text;
    alter table public.site_settings add column if not exists location_text text default 'Zona Norte (Servicio a domicilio)';
  end if;
end $$;
