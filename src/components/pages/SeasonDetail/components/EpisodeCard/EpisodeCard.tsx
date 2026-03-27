import { Link } from 'react-router-dom';
import styles from './EpisodeCard.module.scss';
import { getSeasonColor, type PokemonSticker } from '@/utils/pokemonSeasons';
import type { Episode } from '@/types/episode';
import {
  BookOpenTextIcon,
  CheckIcon,
  CircleIcon,
  LockKeyIcon,
  PlayIcon,
  ProhibitIcon,
  RepeatIcon,
  StarIcon,
} from '@phosphor-icons/react';
import { useSounds } from '@/contexts/SoundProvider';

interface EpisodeCardProps {
  episode: Episode;
  seasonNumber: number;
  watched: boolean;
  debutPokemon?: PokemonSticker;
  onToggleWatched: (code: string, event: React.MouseEvent) => void;
}

export default function EpisodeCard({
  episode,
  seasonNumber,
  watched,
  debutPokemon,
  onToggleWatched,
}: EpisodeCardProps) {
  const { play } = useSounds();
  const seasonColor = getSeasonColor(seasonNumber);

  return (
    <div
      key={episode.code}
      className={`${styles.episodeCard} ${watched ? styles.watched : ''} ${debutPokemon ? styles.hasDebut : ''}`}
    >
      <div className={styles.episodeNumber} style={{ background: seasonColor }}>
        {episode.absoluteEpisode}
      </div>

      {/* Silueta de Pokémon debut */}
      {debutPokemon && (
        <div
          className={`${styles.debutPokemon} ${watched ? styles.unlocked : ''}`}
        >
          <img
            src={debutPokemon.img}
            alt={watched ? debutPokemon.name : '???'}
            className={styles.debutSticker}
          />
          {!watched && (
            <div className={styles.debutLock}>
              <LockKeyIcon size={14} weight="fill" />
            </div>
          )}
        </div>
      )}

      <div className={styles.episodeContent}>
        <h4 className={styles.episodeTitle}>
          Episodio {episode.episode}: {episode.name}
        </h4>

        <div className={styles.episodeMeta}>
          <span
            className={`${styles.badge} ${episode.isCanon ? styles.badgeCanon : styles.badgeFiller}`}
          >
            {episode.isCanon ? (
              <>
                <BookOpenTextIcon size={14} weight="fill" /> Historia
              </>
            ) : (
              <>
                <RepeatIcon size={14} weight="fill" /> Relleno
              </>
            )}
          </span>

          {episode.isCensored && (
            <span className={`${styles.badge} ${styles.badgeCensored}`}>
              <ProhibitIcon size={14} weight="fill" /> Censurado
            </span>
          )}

          {debutPokemon && (
            <span className={`${styles.badge} ${styles.badgeDebut}`}>
              <StarIcon size={14} weight="fill" /> Debut
            </span>
          )}
        </div>
      </div>

      <div className={styles.watchContainer}>
        <Link
          to={`/season/${seasonNumber}/episode/${episode.episode}`}
          className={styles.watchLink}
          onClick={() => play('select')}
        >
          <PlayIcon size={14} weight="fill" /> Ver
        </Link>

        <button
          onClick={(e) => onToggleWatched(episode.code, e)}
          className={`${styles.watchButton} ${watched ? styles.watched : ''}`}
          title={watched ? 'Marcar como no visto' : 'Marcar como visto'}
        >
          {watched ? (
            <CheckIcon size={24} weight="bold" />
          ) : (
            <CircleIcon size={24} />
          )}
        </button>
      </div>
    </div>
  );
}
