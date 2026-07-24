-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Services Table
create table public.services (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  duration_minutes integer not null default 60,
  price numeric(10, 2),
  is_active boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Customers Table
create table public.customers (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  phone text not null,
  address text,
  internal_notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Appointments Table
create table public.appointments (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references public.customers(id),
  full_name text not null,
  email text not null,
  phone text not null,
  property_address text,
  service_id uuid references public.services(id) not null,
  appointment_date date not null,
  start_time time not null,
  end_time time not null,
  status text not null default 'pending', -- pending, confirmed, completed, cancelled
  notes text,
  review_rating integer check (review_rating >= 1 and review_rating <= 5),
  review_text text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Business Hours Table
create table public.business_hours (
  id uuid primary key default uuid_generate_v4(),
  weekday integer not null, -- 0 (Sunday) to 6 (Saturday)
  is_open boolean not null default true,
  start_time time not null default '08:00:00',
  end_time time not null default '17:00:00',
  unique(weekday)
);

-- Initialize default business hours (Monday-Friday)
insert into public.business_hours (weekday, is_open, start_time, end_time) values
  (0, false, '08:00:00', '17:00:00'), -- Sunday
  (1, true, '08:00:00', '17:00:00'),  -- Monday
  (2, true, '08:00:00', '17:00:00'),  -- Tuesday
  (3, true, '08:00:00', '17:00:00'),  -- Wednesday
  (4, true, '08:00:00', '17:00:00'),  -- Thursday
  (5, true, '08:00:00', '17:00:00'),  -- Friday
  (6, false, '08:00:00', '17:00:00'); -- Saturday

-- 5. Blocked Dates Table
create table public.blocked_dates (
  id uuid primary key default uuid_generate_v4(),
  blocked_date date not null,
  reason text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(blocked_date)
);

-- 6. Business Settings Table
create table public.business_settings (
  id uuid primary key default uuid_generate_v4(),
  business_name text not null default 'L&M Septic Pros',
  business_email text,
  business_phone text,
  business_address text,
  slot_interval_minutes integer not null default 30,
  booking_notice_hours integer not null default 24,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Initialize default settings
insert into public.business_settings (id) values (uuid_generate_v4());

-- 7. Admin Users Table
create table public.admin_users (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- Setup RLS (Row Level Security)

-- Enable RLS on all tables
alter table public.services enable row level security;
alter table public.customers enable row level security;
alter table public.appointments enable row level security;
alter table public.business_hours enable row level security;
alter table public.blocked_dates enable row level security;
alter table public.business_settings enable row level security;
alter table public.admin_users enable row level security;

-- Policies for public reading (Services, Business Hours, Blocked Dates, Settings)
create policy "Allow public read access on services" on public.services for select using (true);
create policy "Allow public read access on business_hours" on public.business_hours for select using (true);
create policy "Allow public read access on blocked_dates" on public.blocked_dates for select using (true);
create policy "Allow public read access on business_settings" on public.business_settings for select using (true);

-- Appointments policy (Public can insert, admins can do all)
create policy "Allow public to insert appointments" on public.appointments for insert with check (true);
-- Note: Intentionally NOT adding a public SELECT policy for appointments.

-- Customers policy (Public can insert so booking form can create customers)
create policy "Allow public to insert customers" on public.customers for insert with check (true);
-- Note: Intentionally NOT adding a public SELECT policy for customers.

-- Admin Policies
-- Check if user is an admin
create or replace function public.is_admin(user_id uuid)
returns boolean as $$
begin
  return exists (select 1 from public.admin_users where admin_users.user_id = $1);
end;
$$ language plpgsql security definer;

-- Admins can do everything
create policy "Admins can do everything on services" on public.services to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create policy "Admins can do everything on customers" on public.customers to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create policy "Admins can do everything on appointments" on public.appointments to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create policy "Admins can do everything on business_hours" on public.business_hours to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create policy "Admins can do everything on blocked_dates" on public.blocked_dates to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create policy "Admins can do everything on business_settings" on public.business_settings to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create policy "Admins can do everything on admin_users" on public.admin_users to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

