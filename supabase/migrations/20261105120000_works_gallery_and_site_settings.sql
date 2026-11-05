-- =====================================================================
-- Aixa Nails · Galería de trabajos (Storage + tabla works) y Ajustes del sitio
-- Ejecutar en Supabase → SQL Editor (o `supabase db push`).
-- Es idempotente: se puede correr más de una vez sin romper nada.
--
-- IMPORTANTE (seguridad): las políticas de escritura usan el rol
-- `authenticated`. Eso significa "cualquier usuario logueado". Para que eso
-- equivalga a "solo Aixa", desactivá los registros públicos en
-- Authentication → Providers → Email → "Allow new users to sign up" = OFF
-- y creá el usuario de Aixa a mano desde el panel de Supabase.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Tabla works (galería)
-- ---------------------------------------------------------------------
create table if not exists public.works (
  id          uuid primary key default gen_random_uuid(),
  title       text not null check (char_length(title) between 1 and 120),
  category    text not null check (category in ('Semipermanente', 'Polygel', 'Soft gel')),
  image_url   text not null,
  is_featured boolean not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists works_created_at_idx on public.works (created_at desc);
create index if not exists works_featured_idx on public.works (is_featured) where is_featured;

alter table public.works enable row level security;

drop policy if exists "works_public_read" on public.works;
create policy "works_public_read"
  on public.works for select
  to anon, authenticated
  using (true);

drop policy if exists "works_admin_insert" on public.works;
create policy "works_admin_insert"
  on public.works for insert
  to authenticated
  with check (true);

drop policy if exists "works_admin_update" on public.works;
create policy "works_admin_update"
  on public.works for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "works_admin_delete" on public.works;
create policy "works_admin_delete"
  on public.works for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------
-- 2. Bucket público 'nail-works' (máx 5 MB, solo imágenes)
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'nail-works',
  'nail-works',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Lectura pública (el bucket es public, pero dejamos la política explícita)
drop policy if exists "nail_works_public_read" on storage.objects;
create policy "nail_works_public_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'nail-works');

drop policy if exists "nail_works_admin_insert" on storage.objects;
create policy "nail_works_admin_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'nail-works');

drop policy if exists "nail_works_admin_update" on storage.objects;
create policy "nail_works_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'nail-works')
  with check (bucket_id = 'nail-works');

drop policy if exists "nail_works_admin_delete" on storage.objects;
create policy "nail_works_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'nail-works');

-- ---------------------------------------------------------------------
-- 3. Ajustes del sitio (fila única id = 1)
-- ---------------------------------------------------------------------
create table if not exists public.site_settings (
  id             smallint primary key default 1 check (id = 1),
  whatsapp_phone text check (whatsapp_phone is null or whatsapp_phone ~ '^[0-9]{8,15}$'),
  updated_at     timestamptz not null default now()
);

insert into public.site_settings (id, whatsapp_phone)
values (1, null)
on conflict (id) do nothing;

alter table public.site_settings enable row level security;

drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read"
  on public.site_settings for select
  to anon, authenticated
  using (true);

drop policy if exists "site_settings_admin_update" on public.site_settings;
create policy "site_settings_admin_update"
  on public.site_settings for update
  to authenticated
  using (id = 1)
  with check (id = 1);

-- ---------------------------------------------------------------------
-- 4. Permitir a la admin editar precio / duración de services
--    (solo si la tabla services ya existe)
-- ---------------------------------------------------------------------
do $$
begin
  if to_regclass('public.services') is not null then
    execute 'alter table public.services enable row level security';
    execute 'drop policy if exists "services_public_read" on public.services';
    execute 'create policy "services_public_read" on public.services for select to anon, authenticated using (true)';
    execute 'drop policy if exists "services_admin_update" on public.services';
    execute 'create policy "services_admin_update" on public.services for update to authenticated using (true) with check (true)';
  end if;
end $$;
