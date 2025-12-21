-- Schema for RoboticandAI User Registration System
-- Run this SQL in your Supabase SQL Editor to create the users table

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    preferred_language TEXT NOT NULL,
    applied_for TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);

-- Enable Row Level Security (RLS) - optional, uncomment if needed
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Example policy to allow service role to insert (adjust as needed)
-- CREATE POLICY "Service role can insert users" ON users
--     FOR INSERT
--     TO service_role
--     WITH CHECK (true);

-- Create admin table for authentication
CREATE TABLE IF NOT EXISTS admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on username for faster lookups
CREATE INDEX IF NOT EXISTS idx_admins_username ON admins(username);

-- Insert default admin (username: admin, password: admin123)
-- NOTE: Change this password after first login!
-- Password hash for 'admin123' using bcrypt (10 rounds)
INSERT INTO admins (username, password_hash)
VALUES ('admin', '$2a$10$pbG2.dpCC0Ze5UK4C7d8AO3wusOGbrnS37nNdpd9cWavtXdmuKE8O')
ON CONFLICT (username) DO NOTHING;

-- Grant necessary permissions (adjust based on your setup)
-- GRANT USAGE ON SCHEMA public TO anon, authenticated;
-- GRANT ALL ON users TO service_role;
-- GRANT ALL ON admins TO service_role;

