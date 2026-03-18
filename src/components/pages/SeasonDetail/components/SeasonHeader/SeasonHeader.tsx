import styles from './SeasonHeader.module.scss';
import type { PokemonSticker } from '@/utils/pokemonSeasons';
import type { Episode } from '@/types/episode';
import { LockKeyIcon, StarIcon } from '@phosphor-icons/react';

interface SeasonHeaderProps {
  season: number;
  seasonName: string;
  seasonColor: string;
  pokemons: PokemonSticker[];
  episodes: Episode[];
  isWatched: (code: string) => boolean;
}

export default function SeasonHeader({
  season,
  seasonName,
  seasonColor,
  pokemons,
  episodes,
  isWatched,
}: SeasonHeaderProps) {
  const seasonEpisodes = episodes.filter((ep) => ep.season === season);
  const totalEpisodes = seasonEpisodes.length;

  const watchedCount = seasonEpisodes.filter((ep) => isWatched(ep.code)).length;
  const canonCount = seasonEpisodes.filter((ep) => ep.isCanon).length;
  const fillerCount = seasonEpisodes.filter((ep) => !ep.isCanon).length;
  const progress = Math.round((watchedCount / totalEpisodes) * 100);

  const seasonAbsoluteStart = seasonEpisodes[0]?.absoluteEpisode || 0;
  const seasonAbsoluteEnd =
    seasonEpisodes[seasonEpisodes.length - 1]?.absoluteEpisode || 0;
  const seasonTotalRange = seasonAbsoluteEnd - seasonAbsoluteStart + 1;

  return (
    <div
      className={styles.seasonCard}
      style={{ '--season-color': seasonColor } as React.CSSProperties}
      id="pokemon-header"
    >
      <div className={styles.seasonHeader}>
        <div className={styles.headerContent}>
          <h1>Temporada {season}</h1>
          <p>{seasonName}</p>
        </div>

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
                      '--sticker-rotation': `${(index - 1) * 12}deg`,
                    } as React.CSSProperties
                  }
                  id={`pokemon-${pokemon.name}`}
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
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Vistos</span>
          <span className={styles.statValue}>{watchedCount}</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Faltantes</span>
          <span className={styles.statValue}>
            {totalEpisodes - watchedCount}
          </span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Historia</span>
          <span className={styles.statValue}>{canonCount}</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Relleno</span>
          <span className={styles.statValue}>{fillerCount}</span>
        </div>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>Progreso General</span>
          <span className={styles.progressPercent}>{progress}%</span>
        </div>
        <div className={styles.progressBarWrapper}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${progress}%`,
                background: seasonColor,
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
                    <StarIcon size={12} weight="fill" color="yellow" />
                  ) : (
                    <LockKeyIcon size={12} weight="fill" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
