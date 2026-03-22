import type { TutorialConfig } from '@/components/GuideHelper/types';
import seasonHeaderStyles from '@/components/pages/SeasonDetail/components/SeasonHeader/SeasonHeader.module.scss';
import episodeFiltersStyles from '@/components/pages/SeasonDetail/components/EpisodeFilters/EpisodeFilters.module.scss';
import episodeCardStyles from '@/components/pages/SeasonDetail/components/EpisodeCard/EpisodeCard.module.scss';

export const seasonDetailTutorial: TutorialConfig = {
  id: 'season_detail_intro',
  skippable: false,
  steps: [
    {
      character: 'professor',
      characterName: 'Ordenador',
      message:
        '¡Bienvenido a la vista de temporada! ¿Te gustaría que te muestre cómo funciona esta sección?',
      options: [
        {
          label: '¡Sí, enséñame!',
          action: 'continue',
        },
        {
          label: 'No, ya lo sé',
          action: 'skip',
        },
      ],
    },
    {
      character: 'professor',
      characterName: 'Ordenador',
      message:
        'Aquí verás el header con los Pokémon de la temporada. Los que están oscuros son los que aún no has desbloqueado.',
      highlightElement: `.${seasonHeaderStyles.seasonHeader}`,
    },
    {
      character: 'professor',
      characterName: 'Ordenador',
      message:
        'Estas estadísticas te muestran tu progreso: episodios vistos, faltantes, de historia y relleno.',
      highlightElement: `.${seasonHeaderStyles.statsGrid}`,
    },
    {
      character: 'professor',
      characterName: 'Ordenador',
      message:
        'La barra de progreso muestra tu avance en la temporada. Los marcadores indican dónde debutan los Pokémon especiales.',
      highlightElement: `.${seasonHeaderStyles.progressSection}`,
    },
    {
      character: 'professor',
      characterName: 'Ordenador',
      message:
        'Usa estos filtros para mostrar solo los episodios que te interesan: vistos, no vistos, historia, relleno o censurados.',
      highlightElement: `.${episodeFiltersStyles.filtersCard}`,
    },
    {
      character: 'professor',
      characterName: 'Ordenador',
      message:
        'Aquí puedes ver cuántos episodios se están mostrando con los filtros actuales. ¡Muy útil para encontrar lo que buscas!',
      highlightElement: `.${episodeFiltersStyles.resultsCount}`,
    },
    {
      character: 'professor',
      characterName: 'Ordenador',
      message:
        'Cada card de episodio muestra su información. Si tiene una estrella dorada, ¡significa que un Pokémon debuta ahí!',
      highlightElement: `.${episodeCardStyles.episodeCard}`,
    },
    {
      character: 'professor',
      characterName: 'Ordenador',
      message:
        'El círculo te permite marcar el episodio como visto. Si el episodio tiene un debut de Pokémon, ¡verás una animación especial!',
      highlightElement: `.${episodeCardStyles.watchButton}`,
    },
    {
      character: 'professor',
      characterName: 'Ordenador',
      message:
        '¡Perfecto! Ya sabes todo lo necesario. Ahora empieza a ver episodios y desbloquea todos los Pokémon. ¡Adelante!',
    },
  ],
  onSkip: () => {
    console.log('Usuario omitió el tutorial de temporada');
  },
};