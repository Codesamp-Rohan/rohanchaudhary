-- Run this in the Supabase SQL editor. Adds the `origin` column
-- (company | freelance | personal) to an existing `projects` table.

alter table projects
  add column if not exists origin text;
