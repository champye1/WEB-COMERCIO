-- Finance Dashboard Schema
-- Execute this in your Supabase SQL editor

-- ============================================
-- EXTENSIONES
-- ============================================
create extension if not exists "uuid-ossp";

-- ============================================
-- TABLA: profiles
-- Auto-creado por trigger al registrarse
-- ============================================
create table public.profiles (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null unique references auth.users(id) on delete cascade,
  full_name  text,
  created_at timestamptz default now()
);

-- ============================================
-- TABLA: categories
-- ============================================
create table public.categories (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  name       text not null,
  color      text not null default '#6366f1',
  type       text not null check (type in ('income', 'expense')),
  created_at timestamptz default now(),
  constraint categories_name_user_unique unique (user_id, name)
);

-- ============================================
-- TABLA: transactions
-- ============================================
create table public.transactions (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  amount      numeric(12,2) not null check (amount > 0),
  type        text not null check (type in ('income', 'expense')),
  description text,
  date        date not null default current_date,
  created_at  timestamptz default now()
);

-- Índices para performance
create index idx_transactions_user_id  on public.transactions(user_id);
create index idx_transactions_date     on public.transactions(date desc);
create index idx_transactions_type     on public.transactions(type);
create index idx_transactions_category on public.transactions(category_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
alter table public.profiles     enable row level security;
alter table public.categories   enable row level security;
alter table public.transactions enable row level security;

-- Profiles: solo el dueño puede ver/editar su perfil
create policy "profiles: owner read"
  on public.profiles for select
  using (auth.uid() = user_id);

create policy "profiles: owner update"
  on public.profiles for update
  using (auth.uid() = user_id);

-- Categories: CRUD solo para el dueño
create policy "categories: owner all"
  on public.categories for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Transactions: CRUD solo para el dueño
create policy "transactions: owner all"
  on public.transactions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================
-- TRIGGER: auto-crear perfil al registrarse
-- ============================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
