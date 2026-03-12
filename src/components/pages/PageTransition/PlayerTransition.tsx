import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

interface PlayerTransitionProps {
  children: ReactNode;
}

const playerVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 15,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function PlayerTransition({ children }: PlayerTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={playerVariants}
      style={{
        width: '100%',
        height: '100%',
        transformOrigin: 'center center',
      }}
    >
      {children}
    </motion.div>
  );
}
