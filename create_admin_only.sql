-- Quick Admin Setup - Run this if you only need to create admin table
-- Copy this entire content and paste in Supabase SQL Editor

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

-- Verify admin was created
SELECT * FROM admins WHERE username = 'admin';

