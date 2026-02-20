
-- Create table for carpet defect analysis results
CREATE TABLE public.defect_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  file_name TEXT NOT NULL,
  has_defect BOOLEAN NOT NULL,
  confidence NUMERIC NOT NULL,
  defect_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.defect_analyses ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view analyses"
  ON public.defect_analyses FOR SELECT
  USING (true);

-- Public insert access (from edge function / anon)
CREATE POLICY "Anyone can insert analyses"
  ON public.defect_analyses FOR INSERT
  WITH CHECK (true);
