import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingFlowerOverlayProps {
  onComplete: () => void;
}

export const LoadingFlowerOverlay: React.FC<LoadingFlowerOverlayProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hideTimer = window.setTimeout(() => setVisible(false), 1200);
    const doneTimer = window.setTimeout(() => onComplete(), 1600);
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-[#4A1020] via-[#7D1429] to-[#24060E]"
        >
          <div className="relative flex items-center justify-center w-32 h-32">
            <div className="absolute inset-0 rounded-full bg-[#E63956]/30 blur-2xl" />
            <motion.svg
              viewBox="0 0 120 120"
              className="relative w-28 h-28 drop-shadow-[0_12px_28px_rgba(230,57,86,0.45)]"
              initial={{ scale: 0.35, rotate: -28, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                <motion.ellipse
                  key={angle}
                  cx="60"
                  cy="31"
                  rx="13"
                  ry="25"
                  fill={idx % 2 === 0 ? '#C62845' : '#E63956'}
                  opacity="0.9"
                  transform={`rotate(${angle} 60 60)`}
                  initial={{ scale: 0.25 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.78, delay: idx * 0.045 }}
                />
              ))}
              <circle cx="60" cy="60" r="14" fill="#7D1429" />
              <circle cx="60" cy="60" r="6.5" fill="#F1D6C8" />
            </motion.svg>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-4 font-display text-2xl italic text-[#F1D6C8] tracking-wide"
          >
            Blooming a little world for Bebe...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
