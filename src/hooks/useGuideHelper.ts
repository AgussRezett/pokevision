import type { TutorialConfig } from '@/components/GuideHelper/types';
import { useState, useEffect } from 'react';

export function useGuideHelper(
  config: TutorialConfig,
  autoStart: boolean = true,
  forceShow: boolean = false
) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (forceShow) {
      setTimeout(() => setShouldShow(true), 500);
      return;
    }

    const completed = localStorage.getItem(`tutorial_${config.id}_completed`);

    if (completed !== 'true' && autoStart) {
      setTimeout(() => setShouldShow(true), 500);
    }
  }, [config.id, autoStart, forceShow]);

  const markAsCompleted = () => {
    localStorage.setItem(`tutorial_${config.id}_completed`, 'true');
    setShouldShow(false);
  };

  const resetTutorial = () => {
    localStorage.removeItem(`tutorial_${config.id}_completed`);
    setShouldShow(true);
  };

  const showTutorial = () => {
    setShouldShow(true);
  };

  return {
    shouldShow,
    markAsCompleted,
    resetTutorial,
    showTutorial,
  };
}
