-- Run this in Supabase SQL Editor after creating the public website-assets bucket.
drop policy if exists "BGEO admins can insert website assets" on storage.objects;
drop policy if exists "BGEO admins can update website assets" on storage.objects;
drop policy if exists "BGEO admins can delete website assets" on storage.objects;

create policy "BGEO admins can insert website assets"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'website-assets'
  and exists (
    select 1
    from public.admin_profiles
    where admin_profiles.user_id = auth.uid()
      and admin_profiles.role = 'admin'
  )
);

create policy "BGEO admins can update website assets"
on storage.objects for update to authenticated
using (
  bucket_id = 'website-assets'
  and exists (
    select 1
    from public.admin_profiles
    where admin_profiles.user_id = auth.uid()
      and admin_profiles.role = 'admin'
  )
)
with check (
  bucket_id = 'website-assets'
  and exists (
    select 1
    from public.admin_profiles
    where admin_profiles.user_id = auth.uid()
      and admin_profiles.role = 'admin'
  )
);

create policy "BGEO admins can delete website assets"
on storage.objects for delete to authenticated
using (
  bucket_id = 'website-assets'
  and exists (
    select 1
    from public.admin_profiles
    where admin_profiles.user_id = auth.uid()
      and admin_profiles.role = 'admin'
  )
);
