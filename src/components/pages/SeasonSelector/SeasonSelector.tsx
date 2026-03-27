import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './SeasonSelector.module.scss';
import { useEpisodeStore } from '@/store/episodeStore';
import {
  getSeasonColor,
  getSeasonName,
  seasonPokemon,
} from '@/utils/pokemonSeasons';
import PageTransition from '@/components/pages/PageTransition/PageTransition';
import { useSounds } from '@/contexts/SoundProvider';
import { LockKeyIcon, StarIcon } from '@phosphor-icons/react';
import { useGuideHelper } from '@/hooks/useGuideHelper';
import { seasonSelectorTutorial } from '@/components/GuideHelper/tutorials/seasonSelectorTutorial';
import GuideHelper from '@/components/GuideHelper/GuideHelper';

export default function SeasonSelector() {
  const { episodes, loading, error, fetchEpisodes, isWatched } =
    useEpisodeStore();
  const { shouldShow, markAsCompleted } = useGuideHelper(
    seasonSelectorTutorial
  );
  const { play } = useSounds();

  useEffect(() => {
    fetchEpisodes();
  }, [fetchEpisodes]);

  useEffect(() => {
    document.title = 'Temporadas de Pokémon | Pokémon Tracker';
  }, []);

  const episodesBySeason = episodes.reduce(
    (acc, episode) => {
      if (!acc[episode.season]) {
        acc[episode.season] = [];
      }
      acc[episode.season].push(episode);
      return acc;
    },
    {} as Record<number, typeof episodes>
  );

  const seasons = Object.keys(episodesBySeason)
    .map(Number)
    .sort((a, b) => a - b);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <h2>Cargando temporadas...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <PageTransition>
      <GuideHelper
        config={seasonSelectorTutorial}
        isActive={shouldShow}
        onComplete={markAsCompleted}
      />
      <div className={styles.container}>
        <div className={styles.seasonsGrid}>
          {seasons.map((season) => {
            const seasonEpisodes = episodesBySeason[season];
            const totalEpisodes = seasonEpisodes.length;
            const watchedCount = seasonEpisodes.filter((ep) =>
              isWatched(ep.code)
            ).length;
            const fillerCount = seasonEpisodes.filter(
              (ep) => !ep.isCanon
            ).length;
            const progress = Math.round((watchedCount / totalEpisodes) * 100);
            const pokemons = seasonPokemon[season] || [];

            const seasonAbsoluteStart = seasonEpisodes[0]?.absoluteEpisode || 0;
            const seasonAbsoluteEnd =
              seasonEpisodes[seasonEpisodes.length - 1]?.absoluteEpisode || 0;
            const seasonTotalRange =
              seasonAbsoluteEnd - seasonAbsoluteStart + 1;

            return (
              <Link
                key={season}
                to={`/season/${season}`}
                className={styles.seasonCard}
                style={
                  {
                    '--season-color': getSeasonColor(season),
                  } as React.CSSProperties
                }
                onClick={() => play('select')}
                data-season={season}
              >
                <div
                  className={styles.seasonHeader}
                  style={{ background: getSeasonColor(season) }}
                >
                  <h2>Temporada {season}</h2>
                </div>

                <div className={styles.seasonBody}>
                  <h3 className={styles.seasonName}>{getSeasonName(season)}</h3>

                  {/* Solo renderizar imágenes si la card es visible */}
                  {pokemons.length > 0 && (
                    <div className={styles.pokemonStickers}>
                      {pokemons.map((pokemon, index) => {
                        const debutEpisode = episodes.find(
                          (ep) => ep.absoluteEpisode === pokemon.debutEpisode
                        );
                        const isUnlocked = debutEpisode
                          ? isWatched(debutEpisode.code)
                          : false;

                        return (
                          <div
                            key={pokemon.name}
                            className={`${styles.stickerWrapper} ${!isUnlocked ? styles.locked : ''}`}
                            style={
                              {
                                '--sticker-delay': `${index * 0.1}s`,
                                '--sticker-rotation': `${(index - 1) * 8}deg`,
                              } as React.CSSProperties
                            }
                          >
                            <img
                              src={pokemon.img}
                              alt={isUnlocked ? pokemon.name : '???'}
                              className={styles.pokemonSticker}
                            />
                            {!isUnlocked && (
                              <div className={styles.lockIcon}>
                                <LockKeyIcon size={14} weight="fill" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className={styles.progressSection}>
                    <div className={styles.progressHeader}>
                      <span className={styles.progressLabel}>Progreso</span>
                      <span className={styles.progressPercent}>
                        {progress}%
                      </span>
                    </div>
                    <div className={styles.progressBarWrapper}>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{
                            width: `${progress}%`,
                            background: getSeasonColor(season),
                          }}
                        />
                      </div>

                      {pokemons.map((pokemon) => {
                        const debutPosition =
                          ((pokemon.debutEpisode - seasonAbsoluteStart) /
                            seasonTotalRange) *
                          100;

                        const isInThisSeason =
                          pokemon.debutEpisode >= seasonAbsoluteStart &&
                          pokemon.debutEpisode <= seasonAbsoluteEnd;

                        if (!isInThisSeason) return null;

                        const debutEpisode = episodes.find(
                          (ep) => ep.absoluteEpisode === pokemon.debutEpisode
                        );
                        const isUnlocked = debutEpisode
                          ? isWatched(debutEpisode.code)
                          : false;

                        return (
                          <div
                            key={pokemon.name}
                            className={`${styles.pokemonMarker} ${isUnlocked ? styles.unlocked : ''}`}
                            style={{
                              left: `${Math.max(0, Math.min(100, debutPosition))}%`,
                            }}
                            title={`${pokemon.name} - Ep. ${pokemon.debutEpisode}`}
                          >
                            <div className={styles.markerLine} />
                            <div className={styles.markerIcon}>
                              {isUnlocked ? (
                                <StarIcon
                                  size={12}
                                  weight="fill"
                                  color="yellow"
                                />
                              ) : (
                                <LockKeyIcon size={12} weight="fill" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className={styles.stats}>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Episodios</span>
                      <span className={styles.statValue}>
                        {watchedCount} / {totalEpisodes}
                      </span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Relleno</span>
                      <span className={styles.statValue}>{fillerCount}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
