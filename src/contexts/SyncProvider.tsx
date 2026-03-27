import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useWatchedEpisodes } from '@/hooks/useWatchedEpisodes';
import { useEpisodeStore } from '@/store/episodeStore';

export default function SyncProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const { watchedEpisodes, addWatchedEpisode, removeWatchedEpisode } =
    useWatchedEpisodes(user);
  const setWatchedEpisodes = useEpisodeStore(
    (state) => state.setWatchedEpisodes
  );

  // Sincronizar watchedEpisodes del hook al store
  useEffect(() => {
    setWatchedEpisodes(watchedEpisodes);
  }, [watchedEpisodes, setWatchedEpisodes]);

  // Override de funciones del store cuando hay usuario autenticado
  useEffect(() => {
    if (!user) {
      // Sin usuario: funciones del store no hacen nada
      useEpisodeStore.setState({
        markAsWatched: () => {},
        markAsUnwatched: () => {},
      });
      return;
    }

    // Con usuario: usar las funciones del hook (con Supabase)
    useEpisodeStore.setState({
      markAsWatched: (code: string) => {
        addWatchedEpisode(code);
      },
      markAsUnwatched: (code: string) => {
        removeWatchedEpisode(code);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <>{children}</>;
}
