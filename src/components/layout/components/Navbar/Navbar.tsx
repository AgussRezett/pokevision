import { Link } from 'react-router-dom';
import ThemeToggleButton from '@/components/ThemeToggleButton/ThemeToggleButton';
import styles from './Navbar.module.scss';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <Link to="/" className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.pokeball}>⚪</span>
          </div>
          <div className={styles.brandText}>
            <h1>Pokémon Tracker</h1>
            <p>Tu aventura gamificada</p>
          </div>
        </Link>

        <div className={styles.navActions}>
          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
}
