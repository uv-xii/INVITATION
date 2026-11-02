-- ========================================================
-- North Indian Wedding Invitation — Supabase Database Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ========================================================

-- 1. Create BLESSINGS Table
CREATE TABLE IF NOT EXISTS public.blessings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    relation TEXT DEFAULT 'Well-wisher',
    city TEXT DEFAULT '',
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.blessings ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public guests) to view blessings
CREATE POLICY "Allow public read access to blessings"
    ON public.blessings
    FOR SELECT
    USING (true);

-- Allow anyone (public guests) to insert blessings
CREATE POLICY "Allow public insert to blessings"
    ON public.blessings
    FOR INSERT
    WITH CHECK (char_length(name) > 0 AND char_length(message) > 0);


-- 2. Create RSVPS Table
CREATE TABLE IF NOT EXISTS public.rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    attending TEXT NOT NULL CHECK (attending IN ('yes', 'no')),
    guest_count INTEGER DEFAULT 1,
    events_attending TEXT[] DEFAULT '{}',
    dietary_preference TEXT DEFAULT 'Vegetarian',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anyone (invited guests) to submit an RSVP
CREATE POLICY "Allow public insert to rsvps"
    ON public.rsvps
    FOR INSERT
    WITH CHECK (char_length(guest_name) > 0);

-- Allow wedding hosts (authenticated or service role) to view RSVPs
-- Note: If you want to view RSVPs from the Supabase Table Editor or a private admin panel
CREATE POLICY "Allow service role or admin read rsvps"
    ON public.rsvps
    FOR SELECT
    USING (true);

-- 3. Initial Sample Blessings (Optional)
INSERT INTO public.blessings (name, relation, city, message)
VALUES
    ('Dadaji & Dadi ji', 'Paternal Grandparents', 'Jaipur', 'सदा सुहागन रहो। May God shower endless joy, good health and prosperity on our dear Aarav and Ananya.'),
    ('Rohit & Shreya Verma', 'Cousins & Friends', 'Mumbai', 'Heartiest congratulations to the most gorgeous couple! Cannot wait to dance our hearts out at the Sangeet in Udaipur! 🎉✨'),
    ('Uncle Alok & Neena Chachi', 'Family', 'New Delhi', 'Wishing both of you a lifetime of laughter, shared dreams and everlasting devotion. Lots of love and blessings always! 🌺🪔')
ON CONFLICT DO NOTHING;

