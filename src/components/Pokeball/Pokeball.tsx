import styles from './Pokeball.module.scss';

interface PokeballProps {
  size?: 'small' | 'medium' | 'large';
}

export default function Pokeball({ size = 'medium' }: PokeballProps) {
  return (
    <div className={`${styles.pokeball} ${styles[size]}`}>
      <div className={styles.pokeballTop}></div>
      <div className={styles.pokeballBottom}></div>
      <div className={styles.pokeballCenter}>
        <div className={styles.pokeballButton}></div>
      </div>
    </div>
  );
}
