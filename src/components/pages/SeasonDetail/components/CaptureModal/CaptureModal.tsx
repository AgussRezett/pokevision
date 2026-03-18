import Pokeball from '@/components/pages/SeasonDetail/components/CaptureModal/components/Pokeball/Pokeball';
import styles from './CaptureModal.module.scss';
import { LightningIcon } from '@phosphor-icons/react';
import type { CapturedPokemon } from '@/types/episode';

interface CaptureModalProps {
    showCaptureAnimation: boolean;
    capturedPokemon: CapturedPokemon;
    setCapturedPokemon: (capturedPokemon: CapturedPokemon | null) => void;
    handleCapturePokemon: () => void;
}

export default function CaptureModal({
    showCaptureAnimation,
    capturedPokemon,
    setCapturedPokemon,
    handleCapturePokemon,
}: CaptureModalProps) {
    return (
        <div
            className={`${styles.captureModal} ${showCaptureAnimation ? styles.animating : ''}`}
        >
            <div
                className={styles.captureOverlay}
                onClick={() => !showCaptureAnimation && setCapturedPokemon(null)}
            />

            <div className={styles.captureContent}>
                <div className={styles.pokeballContainer}>
                    <div className={styles.pokeballContent}>
                        <Pokeball size="small" />
                    </div>
                </div>

                <h2 className={styles.captureTitle}>¡Pokémon Capturado!</h2>

                <div
                    className={`${styles.capturePokemon} ${showCaptureAnimation ? styles.flyingToHeader : ''}`}
                    id="captured-pokemon-img"
                >
                    <img
                        src={capturedPokemon.img}
                        alt={capturedPokemon.name}
                        className={styles.capturedSticker}
                    />
                </div>

                <p className={styles.captureName}>{capturedPokemon.name}</p>
                <p className={styles.captureDebut}>
                    Episodio debut #{capturedPokemon.debutEpisode}
                </p>

                {!showCaptureAnimation && (
                    <button
                        onClick={handleCapturePokemon}
                        className={styles.captureButton}
                    >
                        <LightningIcon size={24} weight="duotone" /> Capturar
                    </button>
                )}
            </div>
        </div>
    );
}
