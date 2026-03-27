import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

interface UseWatchedEpisodesReturn {
  watchedEpisodes: Set<string>;
  syncStatus: 'idle' | 'syncing' | 'synced' | 'error';
  syncWithSupabase: () => Promise<void>;
  addWatchedEpisode: (code: string) => Promise<void>;
  removeWatchedEpisode: (code: string) => Promise<void>;
}

export function useWatchedEpisodes(
  user: User | null
): UseWatchedEpisodesReturn {
  const [watchedEpisodes, setWatchedEpisodes] = useState<Set<string>>(
    new Set()
  );
  const [syncStatus, setSyncStatus] = useState<
    'idle' | 'syncing' | 'synced' | 'error'
  >('idle');

  useEffect(() => {
    if (user) {
      syncWithSupabase();
    } else {
      // Si no hay usuario, limpiar los episodios vistos
      setWatchedEpisodes(new Set());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const syncWithSupabase = async () => {
    if (!user) return;

    setSyncStatus('syncing');

    try {
      const { data: supabaseEpisodes, error: fetchError } = await supabase
        .from('watched_episodes')
        .select('episode_code')
        .eq('user_id', user.id);

      if (fetchError) throw fetchError;

      const supabaseSet = new Set(
        supabaseEpisodes?.map((ep) => ep.episode_code) || []
      );

      setWatchedEpisodes(supabaseSet);
      setSyncStatus('synced');
      console.log(`✅ Sincronización completa: ${supabaseSet.size} episodios`);
    } catch (error) {
      console.error('❌ Error sincronizando con Supabase:', error);
      setSyncStatus('error');
    }
  };

  const addWatchedEpisode = async (code: string) => {
    if (!user) return;

    // Optimistic update
    setWatchedEpisodes((prev) => new Set([...prev, code]));

    try {
      const { error } = await supabase.from('watched_episodes').insert({
        user_id: user.id,
        episode_code: code,
        watched_at: new Date().toISOString(),
      });

      if (error && !error.message.includes('duplicate')) {
        throw error;
      }
    } catch (error) {
      console.error('Error agregando episodio a Supabase:', error);
      // Revertir optimistic update
      setWatchedEpisodes((prev) => {
        const newSet = new Set(prev);
        newSet.delete(code);
        return newSet;
      });
    }
  };

  const removeWatchedEpisode = async (code: string) => {
    if (!user) return;

    // Optimistic update
    setWatchedEpisodes((prev) => {
      const newSet = new Set(prev);
      newSet.delete(code);
      return newSet;
    });

    try {
      const { error } = await supabase
        .from('watched_episodes')
        .delete()
        .eq('user_id', user.id)
        .eq('episode_code', code);

      if (error) throw error;
    } catch (error) {
      console.error('Error eliminando episodio de Supabase:', error);
      // Revertir optimistic update
      setWatchedEpisodes((prev) => new Set([...prev, code]));
    }
  };

  return {
    watchedEpisodes,
    syncStatus,
    syncWithSupabase,
    addWatchedEpisode,
    removeWatchedEpisode,
  };
}
