-- PostgreSQL schema for Community (Visitor CMS) system
-- This file contains tables for visitor users and their blog submissions

-- Enable uuid-ossp extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: website_users
-- For visitors who signup as creators
CREATE TABLE IF NOT EXISTS website_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: website_blog_submissions
-- For visitor-submitted content
CREATE TABLE IF NOT EXISTS website_blog_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES website_users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100),
    excerpt TEXT,
    cover_image TEXT,
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_tags TEXT[], -- Meta tags as an array of strings
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_website_users_email ON website_users(email);
CREATE INDEX IF NOT EXISTS idx_website_blog_submissions_user_id ON website_blog_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_website_blog_submissions_status ON website_blog_submissions(status);
CREATE INDEX IF NOT EXISTS idx_website_blog_submissions_slug ON website_blog_submissions(slug);

-- Update timestamp trigger (if not already defined)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'trigger_set_timestamp') THEN
        CREATE FUNCTION trigger_set_timestamp()
        RETURNS TRIGGER AS $$$
        BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
        END;
        $$$ LANGUAGE plpgsql;
    END IF;
END $$;

-- Apply updated_at trigger to our new tables
CREATE TRIGGER set_website_users_timestamp
  BEFORE UPDATE ON website_users
  FOR EACH ROW
  EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_website_blog_submissions_timestamp
  BEFORE UPDATE ON website_blog_submissions
  FOR EACH ROW
  EXECUTE FUNCTION trigger_set_timestamp();
