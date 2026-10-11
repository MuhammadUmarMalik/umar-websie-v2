-- Migration: initial schema for likes and comments
-- Run against your Supabase/Neon PostgreSQL database

DO $$ BEGIN
  CREATE TYPE post_status AS ENUM ('draft', 'published', 'scheduled');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE comment_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  cover_image TEXT DEFAULT '',
  cover_image_alt TEXT,
  author TEXT DEFAULT 'Muhammad Umar Malik',
  tags TEXT[] DEFAULT '{}',
  status post_status DEFAULT 'draft',
  published_at TIMESTAMP,
  scheduled_at TIMESTAMP,
  views INTEGER DEFAULT 0,
  seo_title TEXT,
  meta_description TEXT,
  focus_keyword TEXT,
  canonical_url TEXT,
  og_image TEXT,
  noindex BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS likes (
  id TEXT PRIMARY KEY,
  post_slug TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  CONSTRAINT likes_post_visitor UNIQUE (post_slug, visitor_id)
);

CREATE INDEX IF NOT EXISTS likes_post_slug_idx ON likes (post_slug);

CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  post_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  body TEXT NOT NULL,
  status comment_status DEFAULT 'pending',
  parent_id TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS comments_post_slug_idx ON comments (post_slug);
CREATE INDEX IF NOT EXISTS comments_status_idx ON comments (status);
