import type { TutorialConfig } from '@/components/GuideHelper/types';

export const authRequiredTutorial: TutorialConfig = {
  id: 'auth_required_warning',
  skippable: false,
  steps: [
    {
      character: 'professor',
      characterName: 'Ordenador',
      message:
        '¡Espera un momento, entrenador! Parece que aún no has iniciado sesión en tu cuenta.',
    },
    {
      character: 'professor',
      characterName: 'Ordenador',
      message:
        'Para guardar tu progreso y desbloquear Pokémon, necesitas iniciar sesión con tu cuenta de Google.',
    },
    {
      character: 'professor',
      characterName: 'Ordenador',
      message:
        'Sin una sesión activa, no podrás registrar los episodios que has visto ni capturar Pokémon en tu aventura.',
    },
    {
      character: 'professor',
      characterName: 'Ordenador',
      message:
        '¿Te gustaría iniciar sesión ahora para comenzar a guardar tu progreso?',
      options: [
        {
          label: 'Sí, iniciar sesión',
          action: 'continue',
          callback: () => {
            const loginButton = document.querySelector(
              '[data-login-button]'
            ) as HTMLButtonElement;
            if (loginButton) {
              loginButton.click();
            }
          },
        },
        {
          label: 'Ahora no, solo explorar',
          action: 'skip',
        },
      ],
    },
  ],
  onSkip: () => {
    console.log('Usuario decidió no iniciar sesión');
  },
};
