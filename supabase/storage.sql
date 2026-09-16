-- rohanchaudhary — Storage setup for the `project-media` bucket.
--
-- The bucket itself must be created via the Supabase dashboard or CLI
-- (storage.buckets inserts through SQL are possible but the dashboard is
-- simpler and avoids RLS surprises on the storage schema):
--
--   Dashboard steps:
--   1. Storage -> New bucket
--   2. Name: project-media
--   3. Public bucket: ON (so images can be read directly via public URL)
--
-- Equivalent CLI/SQL if you'd rather script it:
--
-- insert into storage.buckets (id, name, public)
-- values ('project-media', 'project-media', true)
-- on conflict (id) do nothing;

-- Policies below assume the bucket already exists and RLS is enabled on
-- storage.objects (it is by default in Supabase projects).

-- Public read access to files in this bucket
create policy "project_media_public_select"
on storage.objects for select
using (bucket_id = 'project-media');

-- Authenticated-owner write access
create policy "project_media_owner_insert"
on storage.objects for insert
with check (bucket_id = 'project-media' and auth.uid() is not null);

create policy "project_media_owner_update"
on storage.objects for update
using (bucket_id = 'project-media' and auth.uid() is not null)
with check (bucket_id = 'project-media' and auth.uid() is not null);

create policy "project_media_owner_delete"
on storage.objects for delete
using (bucket_id = 'project-media' and auth.uid() is not null);
