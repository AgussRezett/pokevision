import { useState, useEffect, useRef } from 'react';
import DialogBox from './DialogBox/DialogBox';
import { type TutorialConfig } from './types';
import styles from './GuideHelper.module.scss';
import { useSounds } from '@/hooks/useSounds';

interface GuideHelperProps {
    config: TutorialConfig;
    isActive: boolean;
    onComplete: () => void;
}

export default function GuideHelper({
    config,
    isActive,
    onComplete,
}: GuideHelperProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
    const [isTextComplete, setIsTextComplete] = useState(false);
    const { play } = useSounds()
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isActive) return;

        const currentStepData = config.steps[currentStep];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsTextComplete(false);

        if (currentStepData.highlightElement) {
            setTimeout(() => {
                const element = document.querySelector(
                    currentStepData.highlightElement!
                );

                if (element) {
                    const rect = element.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    const elementHeight = rect.height;

                    const dialogHeight = 250;
                    const safeZone = {
                        top: 100,
                        bottom: dialogHeight + 50,
                    };

                    const isInSafeZone =
                        rect.top >= safeZone.top &&
                        rect.bottom <= viewportHeight - safeZone.bottom;

                    const isTooLarge = elementHeight > viewportHeight * 0.6;

                    if (!isInSafeZone && !isTooLarge) {
                        const targetScrollY = window.scrollY + rect.top - safeZone.top - 50;

                        window.scrollTo({
                            top: targetScrollY,
                            behavior: 'smooth',
                        });

                        setTimeout(() => {
                            const updatedRect = element.getBoundingClientRect();
                            setHighlightRect(updatedRect);
                        }, 500);
                    } else {
                        setHighlightRect(rect);
                    }
                } else {
                    console.warn(
                        `Elemento no encontrado: ${currentStepData.highlightElement}`
                    );
                    setHighlightRect(null);
                }
            }, 100);
        } else {
            setHighlightRect(null);
        }
    }, [currentStep, isActive, config.steps]);

    useEffect(() => {
        if (isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isActive]);

    if (!isActive) {
        return null;
    }

    const handleNext = () => {
        const step = config.steps[currentStep];

        if (step.action) {
            step.action();
        }

        if (currentStep < config.steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete();
        }
    };

    const handleOptionSelect = (action: string) => {
        if (action === 'skip') {
            if (config.onSkip) {
                config.onSkip();
            }
            onComplete();
        } else if (action === 'continue') {
            handleNext();
            play("select")
        }
    };

    const currentStepData = config.steps[currentStep];
    const hasOptions =
        currentStepData.options && currentStepData.options.length > 0;

    return (
        <>
            {/* Overlay con clase condicional */}
            <div
                className={`${styles.tutorialOverlay} ${highlightRect ? styles.hasHighlight : ''}`}
                ref={overlayRef}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            />

            {/* Highlight del elemento */}
            {highlightRect && (
                <div
                    className={styles.highlightSpotlight}
                    style={{
                        top: `${highlightRect.top - 8}px`,
                        left: `${highlightRect.left - 8}px`,
                        width: `${highlightRect.width + 16}px`,
                        height: `${highlightRect.height + 16}px`,
                    }}
                />
            )}

            {/* Botones de opciones (fuera del dialog) */}
            {hasOptions && isTextComplete && (
                <div className={styles.optionsContainer}>
                    {currentStepData.options!.map((option, index) => (
                        <button
                            key={index}
                            className={styles.optionButton}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleOptionSelect(option.action);
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Caja de diálogo */}
            <DialogBox
                message={currentStepData.message}
                characterName={currentStepData.characterName}
                characterImage={currentStepData.characterImage}
                hasOptions={hasOptions}
                onComplete={handleNext}
                onTextComplete={() => setIsTextComplete(true)}
                typingSpeed={30}
            />

            {/* Indicador de progreso (abajo) */}
            <div className={styles.progressIndicator}>
                {config.steps.map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.progressDot} ${index === currentStep ? styles.active : ''} ${index < currentStep ? styles.completed : ''}`}
                    />
                ))}
            </div>
        </>
    );
}
