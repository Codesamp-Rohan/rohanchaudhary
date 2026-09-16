create extension if not exists "pgcrypto";

-- ============================================================
-- Tables
-- ============================================================

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  tagline text,
  description text, -- markdown
  start_date date,
  end_date date,
  status text, -- idea | in-progress | shipped | maintained | archived
  scale text, -- micro | small | medium | flagship
  origin text, -- company | freelance | personal
  category text[], -- e.g. {web app, ML, CLI tool, game, ...}
  is_featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects (id) on delete cascade,
  url text not null,
  caption text,
  sort_order int not null default 0
);

create table if not exists project_links (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects (id) on delete cascade,
  type text, -- repo | live | demo-video | writeup
  url text not null,
  label text
);

create table if not exists tags (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  category text -- language | framework | tool | domain
);

create table if not exists project_tags (
  project_id uuid not null references projects (id) on delete cascade,
  tag_id uuid not null references tags (id) on delete cascade,
  primary key (project_id, tag_id)
);

create table if not exists project_updates (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Indexes
-- ============================================================

create index if not exists idx_project_images_project_id on project_images (project_id);
create index if not exists idx_project_links_project_id on project_links (project_id);
create index if not exists idx_project_tags_tag_id on project_tags (tag_id);
create index if not exists idx_project_updates_project_id on project_updates (project_id);

-- ============================================================
-- updated_at auto-touch trigger (projects)
-- ============================================================

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_projects_updated_at on projects;

create trigger trg_projects_updated_at
before update on projects
for each row
execute function set_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================

alter table projects enable row level security;
alter table project_images enable row level security;
alter table project_links enable row level security;
alter table tags enable row level security;
alter table project_tags enable row level security;
alter table project_updates enable row level security;

-- Public read access
create policy "projects_public_select" on projects for select using (true);
create policy "project_images_public_select" on project_images for select using (true);
create policy "project_links_public_select" on project_links for select using (true);
create policy "tags_public_select" on tags for select using (true);
create policy "project_tags_public_select" on project_tags for select using (true);
create policy "project_updates_public_select" on project_updates for select using (true);

-- Authenticated-owner write access (single-user app: any authenticated user is the owner)
create policy "projects_owner_insert" on projects for insert with check (auth.uid() is not null);
create policy "projects_owner_update" on projects for update using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "projects_owner_delete" on projects for delete using (auth.uid() is not null);

create policy "project_images_owner_insert" on project_images for insert with check (auth.uid() is not null);
create policy "project_images_owner_update" on project_images for update using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "project_images_owner_delete" on project_images for delete using (auth.uid() is not null);

create policy "project_links_owner_insert" on project_links for insert with check (auth.uid() is not null);
create policy "project_links_owner_update" on project_links for update using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "project_links_owner_delete" on project_links for delete using (auth.uid() is not null);

create policy "tags_owner_insert" on tags for insert with check (auth.uid() is not null);
create policy "tags_owner_update" on tags for update using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "tags_owner_delete" on tags for delete using (auth.uid() is not null);

create policy "project_tags_owner_insert" on project_tags for insert with check (auth.uid() is not null);
create policy "project_tags_owner_update" on project_tags for update using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "project_tags_owner_delete" on project_tags for delete using (auth.uid() is not null);

create policy "project_updates_owner_insert" on project_updates for insert with check (auth.uid() is not null);
create policy "project_updates_owner_update" on project_updates for update using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "project_updates_owner_delete" on project_updates for delete using (auth.uid() is not null);
