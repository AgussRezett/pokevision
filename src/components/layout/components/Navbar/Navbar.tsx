import { Link } from 'react-router-dom';
import ThemeToggleButton from '@/components/ThemeToggleButton/ThemeToggleButton';
import styles from './Navbar.module.scss';
import Logo from '@assets/logo.svg';
import { useSounds } from '@/hooks/useSounds';

export default function Navbar() {
  const { play } = useSounds();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <Link to="/" className={styles.brand} onClick={() => play('start')}>
          <div className={styles.logo}>
            <img src={Logo} className={styles.image} />
          </div>
          <div className={styles.brandText}>
            <h1>Pokevision</h1>
            <p>Exclusivamente Pokémon</p>
          </div>
        </Link>

        <div className={styles.navActions}>
          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
}
