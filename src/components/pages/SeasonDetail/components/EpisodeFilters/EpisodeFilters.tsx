import styles from './EpisodeFilters.module.scss';

interface EpisodeFiltersProps {
  filterWatched: ('watched' | 'unwatched')[];
  filterType: ('canon' | 'filler' | 'censored')[];
  toggleFilterWatched: (filter: 'watched' | 'unwatched') => void;
  toggleFilterType: (filter: 'canon' | 'filler' | 'censored') => void;
  clearAllFilters: () => void;
  totalEpisodes: number;
  filteredEpisodes: number;
}

export default function EpisodeFilters({
  filterWatched,
  filterType,
  toggleFilterWatched,
  toggleFilterType,
  clearAllFilters,
  totalEpisodes,
  filteredEpisodes,
}: EpisodeFiltersProps) {
  const areFiltersActive = filterWatched.length > 0 || filterType.length > 0;
  return (
    <>
      <div className={styles.filtersCard}>
        <div className={styles.filtersContainer}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              Estado de visualización
              {filterWatched.length > 0 && (
                <span className={styles.filterCount}>
                  {filterWatched.length}
                </span>
              )}
            </label>
            <div className={styles.filterButtons}>
              <button
                onClick={() => toggleFilterWatched('watched')}
                className={`${styles.filterButton} ${filterWatched.includes('watched') ? styles.active : ''}`}
              >
                {filterWatched.includes('watched') && (
                  <span className={styles.checkmark}>✓</span>
                )}
                Vistos
              </button>
              <button
                onClick={() => toggleFilterWatched('unwatched')}
                className={`${styles.filterButton} ${filterWatched.includes('unwatched') ? styles.active : ''}`}
              >
                {filterWatched.includes('unwatched') && (
                  <span className={styles.checkmark}>✓</span>
                )}
                No vistos
              </button>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              Tipo de episodio
              {filterType.length > 0 && (
                <span className={styles.filterCount}>{filterType.length}</span>
              )}
            </label>
            <div className={styles.filterButtons}>
              <button
                onClick={() => toggleFilterType('canon')}
                className={`${styles.filterButton} ${styles.canon} ${filterType.includes('canon') ? styles.active : ''}`}
              >
                {filterType.includes('canon') && (
                  <span className={styles.checkmark}>✓</span>
                )}
                Historia
              </button>
              <button
                onClick={() => toggleFilterType('filler')}
                className={`${styles.filterButton} ${styles.filler} ${filterType.includes('filler') ? styles.active : ''}`}
              >
                {filterType.includes('filler') && (
                  <span className={styles.checkmark}>✓</span>
                )}
                Relleno
              </button>
              <button
                onClick={() => toggleFilterType('censored')}
                className={`${styles.filterButton} ${styles.censored} ${filterType.includes('censored') ? styles.active : ''}`}
              >
                {filterType.includes('censored') && (
                  <span className={styles.checkmark}>✓</span>
                )}
                Censurado
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.resultsCount}>
        Mostrando {filteredEpisodes} de {totalEpisodes} episodios
        {areFiltersActive && (
          <button onClick={clearAllFilters} className={styles.clearFiltersText}>
            · Limpiar filtros
          </button>
        )}
      </div>
    </>
  );
}
