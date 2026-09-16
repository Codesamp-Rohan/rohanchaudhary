-- Run this in the Supabase SQL editor if `projects.category` already
-- exists as a plain `text` column (i.e. you ran the original schema.sql
-- before this migration existed). Safe to run once; converts any
-- existing single value into a one-element array.

alter table projects
  alter column category type text[]
  using case
    when category is null then null
    else array[category]
  end;
