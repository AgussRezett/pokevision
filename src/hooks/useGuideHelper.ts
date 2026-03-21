import type { TutorialConfig } from '@/components/GuideHelper/types';
import { useState, useEffect } from 'react';

export function useGuideHelper(
  config: TutorialConfig,
  autoStart: boolean = true
) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem(`tutorial_${config.id}_completed`);

    if (completed !== 'true' && autoStart) {
      // Pequeño delay para que la página cargue
      setTimeout(() => setShouldShow(true), 500);
    }
  }, [config.id, autoStart]);

  const markAsCompleted = () => {
    localStorage.setItem(`tutorial_${config.id}_completed`, 'true');
    setShouldShow(false);
  };

  const resetTutorial = () => {
    localStorage.removeItem(`tutorial_${config.id}_completed`);
    setShouldShow(true);
  };

  return {
    shouldShow,
    markAsCompleted,
    resetTutorial,
  };
}
