import { useState, useEffect, useRef } from 'react';
import styles from './DialogBox.module.scss';
import { useSounds } from '@/hooks/useSounds';

interface DialogBoxProps {
    message: string;
    characterName?: string;
    characterImage?: string;
    hasOptions?: boolean;
    onComplete: () => void;
    onTextComplete?: () => void;
    typingSpeed?: number;
}

export default function DialogBox({
    message,
    characterName,
    characterImage,
    hasOptions = false,
    onComplete,
    onTextComplete,
    typingSpeed = 30,
}: DialogBoxProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const intervalRef = useRef<number | null>(null);
    const hasNotifiedComplete = useRef(false);
    const { play } = useSounds();

    useEffect(() => {
        // Reset completo
        setDisplayedText('');
        setIsComplete(false);
        hasNotifiedComplete.current = false;

        setTimeout(() => setIsVisible(true), 50);

        let currentIndex = 0;

        intervalRef.current = setInterval(() => {
            if (currentIndex < message.length) {
                setDisplayedText(message.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                // Texto completo
                setIsComplete(true);

                // Notificar solo UNA VEZ
                if (!hasNotifiedComplete.current && onTextComplete) {
                    hasNotifiedComplete.current = true;
                    onTextComplete();
                }

                // Limpiar intervalo
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            }
        }, typingSpeed);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [message, typingSpeed]); // onTextComplete NO está en las dependencias

    const handleClick = () => {
        // Si el texto NO está completo, completarlo instantáneamente
        if (!isComplete) {
            // Detener la animación de escritura
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }

            // Mostrar todo el texto
            setDisplayedText(message);
            setIsComplete(true);

            // Notificar solo si no se había notificado antes
            if (!hasNotifiedComplete.current && onTextComplete) {
                hasNotifiedComplete.current = true;
                onTextComplete();
            }

            play("back")
            return; // NO avanzar todavía
        }

        // Si tiene opciones y el texto YA está completo, no hacer nada
        if (hasOptions) {
            return;
        }

        // Si el texto YA está completo y NO hay opciones, avanzar
        play("claim")
        setIsVisible(false);
        setTimeout(onComplete, 300);
    };

    return (
        <div
            className={`${styles.dialogBox} ${isVisible ? styles.visible : ''} ${hasOptions ? styles.hasOptions : ''}`}
            onClick={handleClick}
        >
            {characterImage && (
                <div className={styles.characterPortrait}>
                    <img src={characterImage} alt={characterName || 'Character'} />
                </div>
            )}

            <div className={styles.dialogContent}>
                {characterName && (
                    <div className={styles.characterName}>{characterName}</div>
                )}

                <div className={styles.messageText}>
                    {displayedText}
                    {isComplete && !hasOptions && (
                        <span className={styles.continueArrow}>▼</span>
                    )}
                </div>
            </div>
        </div>
    );
}
