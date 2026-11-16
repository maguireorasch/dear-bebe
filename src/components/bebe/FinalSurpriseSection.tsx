import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, RotateCcw, Sparkles, X } from 'lucide-react';
import { FINAL_SURPRISE_MESSAGE } from '../../lib/bebeContent';
import {
  BOUQUET_FLOWERS,
  DigitalBouquetArtwork,
} from './DigitalBouquetArtwork';

interface FinalSurpriseSectionProps {
  onTriggerShower: () => void;
}

export const FinalSurpriseSection: React.FC<FinalSurpriseSectionProps> = ({
  onTriggerShower,
}) => {
  const [cinematicOpen, setCinematicOpen] = useState(false);
  const [bloomCount, setBloomCount] = useState(0);
  const timerRef = useRef<number | null>(null);

  const clearBloomTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearBloomTimer();
  }, []);

  const startSurpriseSequence = () => {
    clearBloomTimer();
    setCinematicOpen(true);
    setBloomCount(0);
    onTriggerShower();

    let count = 0;
    timerRef.current = window.setInterval(() => {
      count += 1;
      setBloomCount(count);
      if (count >= BOUQUET_FLOWERS.length) {
        clearBloomTimer();
      }
    }, 180);
  };

  return (
    <section
      id="surprise"
      className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden"
    >
      {/* Deep Cherry & Romantic Red Glow Backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#7D1429]/35 to-[#4A1020]/65" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="glass-cherry rounded-[2.25rem] px-6 py-12 sm:p-14 border border-[#F5B7C5]/25"
        >
          <p className="font-script text-3xl sm:text-4xl text-[#F5B7C5]">
            One Final Moment
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-5xl font-semibold text-[#FFF8F5]">
            A World Made Just For You
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#F1D6C8] max-w-md mx-auto">
            Whenever you are ready, press the button below for your final surprise.
          </p>

          <button
            type="button"
            onClick={startSurpriseSequence}
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#C62845] via-[#E63956] to-[#C62845] border border-[#F5B7C5]/50 px-8 py-4 text-base font-medium text-[#FFF8F5] shadow-[0_18px_42px_-6px_rgba(230,57,86,0.75)] hover:scale-[1.04] transition-transform whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-5 h-5" />
            <span>One Last Surprise For You ♡</span>
          </button>
        </motion.div>
      </div>

      {/* Full-Screen Cinematic Deep Romantic Red Experience */}
      <AnimatePresence>
        {cinematicOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85 }}
            className="fixed inset-0 z-[75] overflow-y-auto bg-gradient-to-b from-[#4A1020] via-[#7D1429] to-[#2B0712] px-4 py-12 sm:py-16 flex flex-col items-center justify-center"
          >
            {/* Glowing Hearts & Soft Spotlight */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-[#E63956]/25 blur-[120px]" />
              {Array.from({ length: 10 }, (_, idx) => (
                <Heart
                  key={idx}
                  className="animate-tiny-heart absolute text-[#F5B7C5]/55 fill-[#E63956]/45"
                  style={{
                    left: `${8 + idx * 9}%`,
                    bottom: `${5 + (idx % 3) * 16}%`,
                    width: 16 + (idx % 3) * 4,
                    height: 16 + (idx % 3) * 4,
                    animationDelay: `${idx * 0.65}s`,
                  }}
                />
              ))}
            </div>

            {/* Quiet Exit Control */}
            <button
              type="button"
              onClick={() => {
                clearBloomTimer();
                setCinematicOpen(false);
              }}
              aria-label="Return to page"
              className="fixed top-5 right-5 z-20 inline-flex items-center gap-1.5 rounded-full bg-[#2B0712]/75 border border-[#F5B7C5]/30 px-4 py-2 text-xs text-[#F1D6C8] hover:text-[#FFF8F5] backdrop-blur-md"
            >
              <X className="w-3.5 h-3.5" />
              <span>Return</span>
            </button>

            <div className="relative z-10 max-w-2xl w-full text-center my-auto">
              {/* Centered Sequential Blooming Digital Bouquet */}
              <motion.div
                initial={{ scale: 0.72, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[260px] sm:max-w-[300px] mx-auto"
              >
                <DigitalBouquetArtwork bloomedCount={bloomCount} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35 }}
                className="mt-6 glass-cherry rounded-[2rem] px-6 py-8 sm:px-10 sm:py-10 border border-[#F5B7C5]/30"
              >
                <p className="font-script text-3xl sm:text-4xl text-[#F5B7C5]">
                  Always For You ♡
                </p>

                <div className="mt-4 font-display text-xl sm:text-2xl leading-[1.72] text-[#FFF8F5] whitespace-pre-line">
                  {FINAL_SURPRISE_MESSAGE}
                </div>

                <div className="mt-8 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={startSurpriseSequence}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C62845] to-[#E63956] border border-[#F5B7C5]/45 px-7 py-3 text-sm font-medium text-[#FFF8F5] shadow-[0_14px_32px_-8px_rgba(230,57,86,0.75)] hover:scale-[1.03] transition-transform whitespace-nowrap shrink-0"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Replay Surprise ♡</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
