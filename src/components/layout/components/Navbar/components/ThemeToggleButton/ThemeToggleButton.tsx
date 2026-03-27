import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useTheme } from '@/contexts/ThemeContext';
import { useSounds } from '@/contexts/SoundProvider';
import styles from './ThemeToggleButton.module.scss';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const { play } = useSounds();

  const handleClick = () => {
    toggleTheme();
    if (theme === 'light') {
      play('toggle_off');
    } else {
      play('toggle_on');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={styles.themeToggle}
      aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
      title={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
      <span className={styles.icon}>
        {theme === 'light' ? (
          <MoonIcon size={22} weight="fill" />
        ) : (
          <SunIcon size={22} weight="fill" />
        )}
      </span>
    </button>
  );
}
