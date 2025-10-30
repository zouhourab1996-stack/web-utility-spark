-- Create ads table for classified listings
CREATE TABLE public.ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price TEXT NOT NULL,
  location TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read ads (public marketplace)
CREATE POLICY "Anyone can view ads"
  ON public.ads
  FOR SELECT
  USING (true);

-- Allow anyone to create ads (no auth required)
CREATE POLICY "Anyone can create ads"
  ON public.ads
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to update ad views
CREATE POLICY "Anyone can update ad views"
  ON public.ads
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_ads_category ON public.ads(category);
CREATE INDEX idx_ads_created_at ON public.ads(created_at DESC);