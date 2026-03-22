import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './SeasonDetail.module.scss';
import { useEpisodeStore } from '@/store/episodeStore';
import {
  getSeasonColor,
  getSeasonName,
  seasonPokemon,
} from '@/utils/pokemonSeasons';
import PageTransition from '@/components/pages/PageTransition/PageTransition';
import { XIcon } from '@phosphor-icons/react';
import { useSounds } from '@/hooks/useSounds';
import { useGuideHelper } from '@/hooks/useGuideHelper';
import GuideHelper from '@/components/GuideHelper/GuideHelper';
import SeasonHeader from '@/components/pages/SeasonDetail/components/SeasonHeader/SeasonHeader';
import EpisodeFilters from '@/components/pages/SeasonDetail/components/EpisodeFilters/EpisodeFilters';
import CaptureModal from '@/components/pages/SeasonDetail/components/CaptureModal/CaptureModal';
import type { CapturedPokemon } from '@/types/episode';
import EpisodeCard from '@/components/pages/SeasonDetail/components/EpisodeCard/EpisodeCard';
import { seasonDetailTutorial } from '@/components/GuideHelper/tutorials/seasonDetailTutorial';

export default function SeasonDetail() {
  const { seasonNumber } = useParams<{ seasonNumber: string }>();
  const { episodes, loading, fetchEpisodes, isWatched, toggleWatched } =
    useEpisodeStore();
  const { play } = useSounds();
  const { shouldShow, markAsCompleted } = useGuideHelper(seasonDetailTutorial);

  const [filterWatched, setFilterWatched] = useState<
    ('watched' | 'unwatched')[]
  >([]);
  const [filterType, setFilterType] = useState<
    ('canon' | 'filler' | 'censored')[]
  >([]);
  const [capturedPokemon, setCapturedPokemon] =
    useState<CapturedPokemon | null>(null);
  const [showCaptureAnimation, setShowCaptureAnimation] = useState(false);

  const season = seasonNumber ? parseInt(seasonNumber, 10) : null;

  useEffect(() => {
    if (episodes.length === 0) {
      fetchEpisodes();
    }
  }, [episodes.length, fetchEpisodes]);

  useEffect(() => {
    if (season) {
      document.title = `Temporada ${season} | Pokémon Tracker`;
    }
  }, [season]);

  if (!season) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error</h2>
        <p>Temporada no válida</p>
        <Link to="/" className={styles.backButton}>
          Volver a temporadas
        </Link>
      </div>
    );
  }

  const seasonEpisodes = episodes.filter((ep) => ep.season === season);

  if (loading || seasonEpisodes.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <h2>Cargando episodios...</h2>
      </div>
    );
  }

  const pokemons = seasonPokemon[season] || [];

  const toggleFilterWatched = (filter: 'watched' | 'unwatched') => {
    setFilterWatched((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const toggleFilterType = (filter: 'canon' | 'filler' | 'censored') => {
    setFilterType((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const clearAllFilters = () => {
    setFilterWatched([]);
    setFilterType([]);
  };

  const filteredEpisodes = seasonEpisodes.filter((episode) => {
    let passesWatchedFilter = true;
    if (filterWatched.length > 0) {
      passesWatchedFilter = filterWatched.some((filter) => {
        if (filter === 'watched') return isWatched(episode.code);
        if (filter === 'unwatched') return !isWatched(episode.code);
        return false;
      });
    }

    let passesTypeFilter = true;
    if (filterType.length > 0) {
      passesTypeFilter = filterType.some((filter) => {
        if (filter === 'canon') return episode.isCanon;
        if (filter === 'filler') return !episode.isCanon;
        if (filter === 'censored') return episode.isCensored;
        return false;
      });
    }

    return passesWatchedFilter && passesTypeFilter;
  });

  const handleToggleEpisode = (code: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const episode = episodes.find((ep) => ep.code === code);
    if (!episode) return;

    const wasWatched = isWatched(code);

    if (!wasWatched) {
      play('claim');
      const debutPokemon = pokemons.find(
        (p) => p.debutEpisode === episode.absoluteEpisode
      );

      if (debutPokemon) {
        play('start');
        setCapturedPokemon({
          name: debutPokemon.name,
          img: debutPokemon.img,
          debutEpisode: debutPokemon.debutEpisode,
        });
      }
    } else {
      play('back');
    }

    toggleWatched(code);
  };

  const handleCapturePokemon = () => {
    play('unlock');
    setShowCaptureAnimation(true);

    setTimeout(() => {
      setShowCaptureAnimation(false);
      setCapturedPokemon(null);
    }, 2000);
  };

  return (
    <PageTransition>
      <GuideHelper
        config={seasonDetailTutorial}
        isActive={shouldShow}
        onComplete={markAsCompleted}
      />

      <div className={styles.container}>
        <div className={styles.backNav}>
          <Link to="/" className={styles.backLink} onClick={() => play('back')}>
            <XIcon size={16} weight="bold" /> Volver a Temporadas
          </Link>
        </div>

        <SeasonHeader
          season={season}
          seasonName={getSeasonName(season)}
          seasonColor={getSeasonColor(season)}
          pokemons={pokemons}
          episodes={episodes}
          isWatched={isWatched}
        />

        <EpisodeFilters
          filterWatched={filterWatched}
          filterType={filterType}
          toggleFilterWatched={toggleFilterWatched}
          toggleFilterType={toggleFilterType}
          clearAllFilters={clearAllFilters}
          totalEpisodes={seasonEpisodes.length}
          filteredEpisodes={filteredEpisodes.length}
        />

        <div className={styles.episodesList}>
          {filteredEpisodes.length === 0 ? (
            <div className={styles.noResults}>
              <p>No se encontraron episodios con los filtros seleccionados</p>
              <button
                onClick={clearAllFilters}
                className={styles.clearFiltersButton}
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            filteredEpisodes
              .sort((a, b) => a.episode - b.episode)
              .map((episode) => {
                const watched = isWatched(episode.code);
                const debutPokemon = pokemons.find(
                  (p) => p.debutEpisode === episode.absoluteEpisode
                );

                return (
                  <EpisodeCard
                    key={episode.code}
                    episode={episode}
                    seasonNumber={season}
                    watched={watched}
                    debutPokemon={debutPokemon}
                    onToggleWatched={handleToggleEpisode}
                  />
                );
              })
          )}
        </div>

        {capturedPokemon && (
          <CaptureModal
            showCaptureAnimation={showCaptureAnimation}
            capturedPokemon={capturedPokemon}
            setCapturedPokemon={setCapturedPokemon}
            handleCapturePokemon={handleCapturePokemon}
          />
        )}
      </div>
    </PageTransition>
  );
}