export interface TutorialStep {
  character: 'professor' | 'rival' | 'nurse' | 'custom';
  characterName?: string;
  characterImage?: string;
  message: string;
  position?: 'bottom' | 'top';
  highlightElement?: string;
  action?: () => void;
  options?: TutorialOption[]; // Nuevo: opciones para el usuario
}

export interface TutorialOption {
  label: string;
  action: 'continue' | 'skip' | 'custom';
  callback?: () => void;
}

export interface TutorialConfig {
  id: string;
  steps: TutorialStep[];
  onComplete?: () => void;
  onSkip?: () => void;
  skippable?: boolean;
}
