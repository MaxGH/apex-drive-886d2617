-- HYROXPRO Database Schema
-- Execute this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Race Goals Table
CREATE TABLE IF NOT EXISTS race_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  race_name TEXT NOT NULL,
  race_date DATE NOT NULL,
  training_start_date DATE NOT NULL,
  race_category TEXT,
  sessions_per_week INTEGER DEFAULT 5 CHECK (sessions_per_week BETWEEN 4 AND 6),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Workouts Template Library
CREATE TABLE IF NOT EXISTS workouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('run', 'strength', 'engine', 'mixed', 'recovery')),
  intensity TEXT NOT NULL CHECK (intensity IN ('low', 'moderate', 'hard', 'max')),
  duration INTEGER NOT NULL,
  description TEXT,
  exercises JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_by UUID REFERENCES auth.users(id),
  is_template BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scheduled Workouts (User's Calendar)
CREATE TABLE IF NOT EXISTS scheduled_workouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  workout_id UUID REFERENCES workouts(id) ON DELETE SET NULL,
  race_goal_id UUID REFERENCES race_goals(id) ON DELETE CASCADE NOT NULL,
  scheduled_date DATE NOT NULL,
  week_number INTEGER,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Roles (for Admin Check)
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_race_goals_user_active ON race_goals(user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_scheduled_workouts_user_date ON scheduled_workouts(user_id, scheduled_date);
CREATE INDEX IF NOT EXISTS idx_scheduled_workouts_race_goal ON scheduled_workouts(race_goal_id);
CREATE INDEX IF NOT EXISTS idx_workouts_category ON workouts(category);
CREATE INDEX IF NOT EXISTS idx_user_roles_user ON user_roles(user_id);

-- Row Level Security (RLS) Policies

-- Race Goals RLS
ALTER TABLE race_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own race goals"
  ON race_goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own race goals"
  ON race_goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own race goals"
  ON race_goals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own race goals"
  ON race_goals FOR DELETE
  USING (auth.uid() = user_id);

-- Workouts RLS
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view workouts"
  ON workouts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can create workouts"
  ON workouts FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update workouts"
  ON workouts FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete workouts"
  ON workouts FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- Scheduled Workouts RLS
ALTER TABLE scheduled_workouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own scheduled workouts"
  ON scheduled_workouts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own scheduled workouts"
  ON scheduled_workouts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scheduled workouts"
  ON scheduled_workouts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own scheduled workouts"
  ON scheduled_workouts FOR DELETE
  USING (auth.uid() = user_id);

-- User Roles RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own role"
  ON user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Function to automatically create user role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call function on new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Comments for documentation
COMMENT ON TABLE race_goals IS 'Stores user race goals and training parameters';
COMMENT ON TABLE workouts IS 'Template library of workouts available to all users';
COMMENT ON TABLE scheduled_workouts IS 'User-specific scheduled workouts in calendar';
COMMENT ON TABLE user_roles IS 'User permission levels (user or admin)';
