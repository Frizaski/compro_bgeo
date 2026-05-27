-- Synchronize the existing BGEO tables with the fields consumed by /cms.
-- Safe to run repeatedly: existing columns and data are preserved.

alter table public.site_settings
  add column if not exists hero_word_one text not null default 'Build',
  add column if not exists hero_word_two text not null default 'With',
  add column if not exists hero_word_three text not null default 'BGEO.',
  add column if not exists cursor_text text not null default 'BGEO',
  add column if not exists about_label text not null default 'About BGEO',
  add column if not exists about_heading text not null default 'We build digital experiences that drive growth.',
  add column if not exists about_paragraph_one text not null default '',
  add column if not exists about_paragraph_two text not null default '',
  add column if not exists vision_text text not null default 'NEXT BIG MOVE WITH BGEO AND BUILD BEYOND LIMITS',
  add column if not exists contact_email text not null default 'bgeodev@gmail.com',
  add column if not exists contact_phone_label text not null default '(+62) 895 3232 89181',
  add column if not exists contact_phone_href text not null default '+62895323289181',
  add column if not exists contact_instagram text not null default 'https://instagram.com/bgeodev',
  add column if not exists contact_linkedin text not null default '#';

alter table public.history_items
  add column if not exists number_label text not null default '',
  add column if not exists subtitle text not null default '',
  add column if not exists description text not null default '',
  add column if not exists image_url text not null default '',
  add column if not exists sort_order integer not null default 0,
  add column if not exists is_published boolean not null default true;

alter table public.services
  add column if not exists description text not null default '',
  add column if not exists sort_order integer not null default 0,
  add column if not exists is_published boolean not null default true;

alter table public.projects
  add column if not exists project_year integer not null default 2026,
  add column if not exists image_url text not null default '',
  add column if not exists technologies text[] not null default '{}',
  add column if not exists summary text not null default '',
  add column if not exists accent_gradient text not null default '',
  add column if not exists sort_order integer not null default 0,
  add column if not exists is_published boolean not null default true;

alter table public.team_members
  add column if not exists bio text not null default '',
  add column if not exists image_url text not null default '',
  add column if not exists instagram_url text not null default '#',
  add column if not exists portfolio_url text not null default '#',
  add column if not exists linkedin_url text not null default '#',
  add column if not exists sort_order integer not null default 0,
  add column if not exists is_published boolean not null default true;

alter table public.faq_items
  add column if not exists answer text not null default '',
  add column if not exists sort_order integer not null default 0,
  add column if not exists is_published boolean not null default true;

alter table public.invoices
  add column if not exists client_name text not null default '',
  add column if not exists client_email text not null default '',
  add column if not exists client_address text not null default '',
  add column if not exists notes text not null default '',
  add column if not exists tax_percent numeric(8, 2) not null default 0,
  add column if not exists discount numeric(14, 2) not null default 0,
  add column if not exists subtotal numeric(14, 2) not null default 0,
  add column if not exists tax_amount numeric(14, 2) not null default 0,
  add column if not exists total_amount numeric(14, 2) not null default 0,
  add column if not exists created_by uuid references auth.users(id);

alter table public.invoice_items
  add column if not exists unit_price numeric(14, 2) not null default 0,
  add column if not exists line_total numeric(14, 2) not null default 0,
  add column if not exists sort_order integer not null default 0;

-- Ask PostgREST to notice the newly added columns immediately.
notify pgrst, 'reload schema';
