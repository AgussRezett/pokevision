import { useState, useEffect, useRef } from 'react';
import styles from './DialogBox.module.scss';
import { useSounds } from '@/hooks/useSounds';
import type { TutorialOption } from '../types';

interface DialogBoxProps {
  message: string;
  characterName?: string;
  characterImage?: string;
  options?: TutorialOption[];
  onComplete: () => void;
  onOptionSelect?: (action: string) => void;
  onTextComplete?: () => void;
  typingSpeed?: number;
}

export default function DialogBox({
  message,
  characterName,
  characterImage,
  options,
  onComplete,
  onOptionSelect,
  onTextComplete,
  typingSpeed = 30,
}: DialogBoxProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const hasNotifiedComplete = useRef(false);
  const { play } = useSounds();

  const hasOptions = options && options.length > 0;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, typingSpeed]);

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

      play('back');
      return; // NO avanzar todavía
    }

    // Si tiene opciones y el texto YA está completo, no hacer nada
    if (hasOptions) {
      return;
    }

    // Si el texto YA está completo y NO hay opciones, avanzar
    play('claim');
    setIsVisible(false);
    setTimeout(onComplete, 300);
  };

  const handleOptionClick = (option: TutorialOption) => {
    if (option.callback) {
      option.callback();
    }

    if (onOptionSelect) {
      onOptionSelect(option.action);
    }
  };

  return (
    <div className={styles.dialogBoxContainer}>
      {/* Botones de opciones con animación escalonada */}
      {hasOptions && isComplete && (
        <div className={styles.optionsContainer}>
          {options.map((option, index) => (
            <button
              key={index}
              className={styles.optionButton}
              style={{ '--button-index': index } as React.CSSProperties}
              onClick={(e) => {
                e.stopPropagation();
                handleOptionClick(option);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Dialog box */}
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
    </div>
  );
}
