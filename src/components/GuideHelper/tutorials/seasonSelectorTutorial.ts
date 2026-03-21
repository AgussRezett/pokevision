import type { TutorialConfig } from '@/components/GuideHelper/types';
import styles from '@components/pages/SeasonSelector/SeasonSelector.module.scss';

export const seasonSelectorTutorial: TutorialConfig = {
  id: 'season_selector_intro',
  skippable: false,
  steps: [
    {
      character: 'professor',
      characterName: 'Profesor Oak',
      characterImage: '/images/professor-oak.png',
      message:
        '¡Hola! Soy el Profesor Oak. ¿Te gustaría que te enseñe cómo funciona el Pokémon Tracker?',
      options: [
        {
          label: '¡Sí, por favor! 👍',
          action: 'continue',
        },
        {
          label: 'No, gracias. Ya sé cómo funciona 🙅',
          action: 'skip',
        },
      ],
    },
    {
      character: 'professor',
      characterName: 'Profesor Oak',
      characterImage: '/images/professor-oak.png',
      message:
        '¡Excelente! Comencemos entonces. Aquí puedes ver todas las temporadas de Pokémon disponibles.',
      highlightElement: `.${styles.seasonsGrid}`, // Usa el styles importado
    },
    {
      character: 'professor',
      characterName: 'Profesor Oak',
      characterImage: '/images/professor-oak.png',
      message:
        'Cada temporada tiene Pokémon especiales que puedes desbloquear. Aparecen como siluetas oscuras al principio.',
      highlightElement: `.${styles.pokemonStickers}`, // Primer grupo de stickers
    },
    {
      character: 'professor',
      characterName: 'Profesor Oak',
      characterImage: '/images/professor-oak.png',
      message:
        'La barra de progreso muestra cuántos episodios has visto. Los marcadores dorados indican dónde debutan los Pokémon.',
      highlightElement: `.${styles.progressSection}`,
    },
    {
      character: 'professor',
      characterName: 'Profesor Oak',
      characterImage: '/images/professor-oak.png',
      message:
        'Las estadísticas te muestran cuántos episodios has visto y cuántos son de relleno.',
      highlightElement: `.${styles.stats}`,
    },
    {
      character: 'professor',
      characterName: 'Profesor Oak',
      characterImage: '/images/professor-oak.png',
      message:
        '¡Perfecto! Ahora selecciona una temporada para comenzar tu aventura. ¡Mucha suerte, entrenador!',
    },
  ],
  onSkip: () => {
    console.log('Usuario omitió el tutorial');
  },
};
