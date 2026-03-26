import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para TypeScript
export type User = {
  id: string;
  email: string;
  display_name: string;
  avatar_url?: string;
  created_at: string;
};

export type WatchedEpisode = {
  id: string;
  user_id: string;
  episode_code: string;
  watched_at: string;
};
