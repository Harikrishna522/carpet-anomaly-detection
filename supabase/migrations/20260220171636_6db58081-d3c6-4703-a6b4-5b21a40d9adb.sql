
-- Add user_id column to defect_analyses
ALTER TABLE public.defect_analyses 
ADD COLUMN user_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';

-- Remove the default after adding (it was just for existing rows)
ALTER TABLE public.defect_analyses ALTER COLUMN user_id DROP DEFAULT;

-- Drop old permissive policies
DROP POLICY IF EXISTS "Anyone can view analyses" ON public.defect_analyses;
DROP POLICY IF EXISTS "Anyone can insert analyses" ON public.defect_analyses;

-- Create user-scoped policies
CREATE POLICY "Users can view own analyses"
  ON public.defect_analyses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analyses"
  ON public.defect_analyses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own analyses"
  ON public.defect_analyses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
