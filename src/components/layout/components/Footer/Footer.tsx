import { HeartIcon } from '@phosphor-icons/react';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.madeWith}>
          Hecho con <HeartIcon size={16} weight="fill" className={styles.heartIcon} /> para todos los fans de Pokémon
        </p>
        <p className={styles.copyright}>
          © 2026 Pokevision - Plataforma Gamificada
        </p>
      </div>
    </footer>
  );
}