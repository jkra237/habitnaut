-- FlowNaut Cloud Profile Sync Schema
-- Profile-centric storage: profile data is synced, logs are optional

-- Create cloud_profiles table (stores synced profile data)
CREATE TABLE public.cloud_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  personality_axes JSONB,
  preferred_tone TEXT DEFAULT 'gentle',
  cloud_sync_enabled BOOLEAN DEFAULT true,
  sync_logs_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cloud_habits table (habit definitions only)
CREATE TABLE public.cloud_habits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  local_id TEXT NOT NULL, -- links to local habit ID
  name TEXT NOT NULL,
  description TEXT,
  emoji TEXT,
  time_anchor TEXT DEFAULT 'none',
  soft_frequency TEXT DEFAULT 'free',
  is_resting BOOLEAN DEFAULT false,
  resting_note TEXT,
  reminder_frequency TEXT DEFAULT 'none',
  reminder_time_anchor TEXT DEFAULT 'none',
  reminder_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, local_id)
);

-- Create cloud_habit_logs table (optional sync)
CREATE TABLE public.cloud_habit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date TEXT NOT NULL, -- YYYY-MM-DD format
  habits JSONB NOT NULL DEFAULT '{}', -- Record<habitId, state>
  mood INTEGER,
  energy INTEGER,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Create cloud_reflections table (optional sync)
CREATE TABLE public.cloud_reflections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  week_start TEXT NOT NULL, -- YYYY-MM-DD format
  word TEXT,
  takeaway TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, week_start)
);

-- Enable Row Level Security
ALTER TABLE public.cloud_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cloud_habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cloud_habit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cloud_reflections ENABLE ROW LEVEL SECURITY;

-- Helper function to check profile ownership
CREATE OR REPLACE FUNCTION public.is_own_profile(check_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid() = check_user_id
$$;

-- RLS Policies for cloud_profiles
CREATE POLICY "Users can view own profile"
  ON public.cloud_profiles FOR SELECT
  USING (public.is_own_profile(user_id));

CREATE POLICY "Users can insert own profile"
  ON public.cloud_profiles FOR INSERT
  WITH CHECK (public.is_own_profile(user_id));

CREATE POLICY "Users can update own profile"
  ON public.cloud_profiles FOR UPDATE
  USING (public.is_own_profile(user_id));

CREATE POLICY "Users can delete own profile"
  ON public.cloud_profiles FOR DELETE
  USING (public.is_own_profile(user_id));

-- RLS Policies for cloud_habits
CREATE POLICY "Users can view own habits"
  ON public.cloud_habits FOR SELECT
  USING (public.is_own_profile(user_id));

CREATE POLICY "Users can insert own habits"
  ON public.cloud_habits FOR INSERT
  WITH CHECK (public.is_own_profile(user_id));

CREATE POLICY "Users can update own habits"
  ON public.cloud_habits FOR UPDATE
  USING (public.is_own_profile(user_id));

CREATE POLICY "Users can delete own habits"
  ON public.cloud_habits FOR DELETE
  USING (public.is_own_profile(user_id));

-- RLS Policies for cloud_habit_logs
CREATE POLICY "Users can view own logs"
  ON public.cloud_habit_logs FOR SELECT
  USING (public.is_own_profile(user_id));

CREATE POLICY "Users can insert own logs"
  ON public.cloud_habit_logs FOR INSERT
  WITH CHECK (public.is_own_profile(user_id));

CREATE POLICY "Users can update own logs"
  ON public.cloud_habit_logs FOR UPDATE
  USING (public.is_own_profile(user_id));

CREATE POLICY "Users can delete own logs"
  ON public.cloud_habit_logs FOR DELETE
  USING (public.is_own_profile(user_id));

-- RLS Policies for cloud_reflections
CREATE POLICY "Users can view own reflections"
  ON public.cloud_reflections FOR SELECT
  USING (public.is_own_profile(user_id));

CREATE POLICY "Users can insert own reflections"
  ON public.cloud_reflections FOR INSERT
  WITH CHECK (public.is_own_profile(user_id));

CREATE POLICY "Users can update own reflections"
  ON public.cloud_reflections FOR UPDATE
  USING (public.is_own_profile(user_id));

CREATE POLICY "Users can delete own reflections"
  ON public.cloud_reflections FOR DELETE
  USING (public.is_own_profile(user_id));

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cloud_profiles_updated_at
  BEFORE UPDATE ON public.cloud_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cloud_habits_updated_at
  BEFORE UPDATE ON public.cloud_habits
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cloud_habit_logs_updated_at
  BEFORE UPDATE ON public.cloud_habit_logs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();