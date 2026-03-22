import type { TutorialConfig } from '@/components/GuideHelper/types';
import episodePlayerStyles from '@/components/pages/EpisodePlayer/EpisodePlayer.module.scss';

export const episodePlayerTutorial: TutorialConfig = {
  id: 'episode_player_intro',
  skippable: false,
  steps: [
    {
      character: 'professor',
      characterName: 'Ordenador',
      message:
        '¡Bienvenido al reproductor! ¿Te gustaría que te explique cómo funciona?',
      options: [
        {
          label: '¡Sí, muéstrame!',
          action: 'continue',
        },
        {
          label: 'No, ya sé usarlo',
          action: 'skip',
        },
      ],
    },
    {
      character: 'professor',
      characterName: 'Ordenador',
      message:
        'Este es el reproductor de episodios. Aquí podrás ver el episodio en pantalla completa con controles simples.',
    },
    {
      character: 'professor',
      characterName: 'Ordenador',
      message:
        'En la esquina superior izquierda está el botón para volver a la lista de episodios.',
      highlightElement: `.${episodePlayerStyles.backButton}`,
    },
    {
      character: 'professor',
      characterName: 'Ordenador',
      message:
        'En la esquina superior derecha puedes marcar el episodio como visto. Si el episodio tiene un debut, ¡verás una animación especial!',
      highlightElement: `.${episodePlayerStyles.watchedButton}`,
    },
    {
      character: 'professor',
      characterName: 'Ordenador',
      message:
        'Este interruptor te permite mostrar u ocultar los controles. ¡Úsalo para tener una experiencia inmersiva!',
      highlightElement: `.${episodePlayerStyles.toggleSwitchContainer}`,
    },
    {
      character: 'professor',
      characterName: 'Ordenador',
      message:
        'En la parte inferior verás el título del episodio y los botones para navegar al episodio anterior o siguiente.',
      highlightElement: `.${episodePlayerStyles.bottomControls}`,
    },
    {
      character: 'professor',
      characterName: 'Ordenador',
      message:
        '¡Perfecto! Ya sabes todo. El episodio se marcará automáticamente como visto después de 10 segundos. ¡Disfruta viendo Pokémon!',
    },
  ],
  onSkip: () => {
    console.log('Usuario omitió el tutorial del reproductor');
  },
};
