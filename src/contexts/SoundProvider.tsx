import {
  createContext,
  useContext,
  useRef,
  useEffect,
  type ReactNode,
} from 'react';

import startSound from '@/assets/sounds/ui/start.mp3';
import selectSound from '@/assets/sounds/ui/select.mp3';
import backSound from '@/assets/sounds/ui/go back.mp3';
import claimSound from '@/assets/sounds/ui/claim.mp3';
import unlockSound from '@/assets/sounds/ui/unlock.mp3';
import toggleOnSound from '@/assets/sounds/ui/toggle_on.mp3';
import toggleOffSound from '@/assets/sounds/ui/toggle_off.mp3';

type SoundName =
  | 'start'
  | 'select'
  | 'claim'
  | 'back'
  | 'unlock'
  | 'toggle_on'
  | 'toggle_off';

const SOUND_PATHS: Record<SoundName, string> = {
  start: startSound,
  select: selectSound,
  claim: claimSound,
  back: backSound,
  unlock: unlockSound,
  toggle_on: toggleOnSound,
  toggle_off: toggleOffSound,
};

interface SoundContextValue {
  play: (soundName: SoundName, volume?: number) => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const audioCache = useRef<Map<SoundName, HTMLAudioElement>>(new Map());

  useEffect(() => {
    // Precargar todos los sonidos UNA SOLA VEZ
    Object.entries(SOUND_PATHS).forEach(([name, path]) => {
      const audio = new Audio(path);
      audio.preload = 'auto';
      audio.volume = 0.7;
      audioCache.current.set(name as SoundName, audio);
    });

    return () => {
      audioCache.current.forEach((audio) => {
        audio.pause();
        audio.src = '';
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      audioCache.current.clear();
    };
  }, []);

  const play = (soundName: SoundName, volume?: number) => {
    const audio = audioCache.current.get(soundName);
    if (audio) {
      audio.currentTime = 0;
      if (volume !== undefined) {
        audio.volume = volume;
      }
      audio.play().catch((error) => {
        console.warn(`Error playing sound ${soundName}:`, error);
      });
    }
  };

  return (
    <SoundContext.Provider value={{ play }}>{children}</SoundContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSounds() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSounds debe usarse dentro de SoundProvider');
  }
  return context;
}
