import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, RotateCw, Sparkles } from 'lucide-react';
import { SPECIAL_CARDS } from '../../lib/bebeContent';
import {
  BabysBreathSvg,
  RedCarnationSvg,
  RedRoseSvg,
  WhiteTulipSvg,
} from './FloralSvgIcons';
import type { SpecialCardItem } from '../../types/bebe';

const renderCardMotif = (motif: SpecialCardItem['motif']) => {
  switch (motif) {
    case 'rose':
      return <RedRoseSvg className="w-12 h-12" />;
    case 'tulip':
      return <WhiteTulipSvg className="w-12 h-12" />;
    case 'carnation':
      return <RedCarnationSvg className="w-12 h-12" />;
    case 'blossom':
      return <BabysBreathSvg className="w-11 h-11" />;
    case 'heart':
      return <Heart className="w-9 h-9 text-[#E63956] fill-[#C62845]" />;
    case 'spark':
      return <Sparkles className="w-9 h-9 text-[#F1D6C8]" />;
  }
};

export const SpecialReasonsSection: React.FC = () => {
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="little-things" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="font-script text-3xl sm:text-4xl text-[#F5B7C5]">
            Six Quiet Admirations
          </p>
          <h2 className="mt-1 font-display text-3xl sm:text-5xl font-semibold text-[#FFF8F5]">
            Little Things That Make You Special
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#F1D6C8]">
            Tap each card to turn it over and read the note inside.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECIAL_CARDS.map((card, idx) => {
            const flipped = Boolean(flippedIds[card.id]);
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                onClick={() => toggleCard(card.id)}
                className="perspective-1200 h-64 cursor-pointer group"
              >
                <div
                  className={`relative w-full h-full preserve-3d transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    flipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front: Romantic Burgundy & Glow */}
                  <div className="absolute inset-0 backface-hidden rounded-[1.75rem] glass-cherry border border-[#F5B7C5]/30 p-6 flex flex-col items-center justify-center text-center shadow-[0_20px_45px_-16px_rgba(0,0,0,0.65)] group-hover:border-[#E63956]/75 group-hover:-translate-y-1 transition-all">
                    <span className="text-[11px] font-medium tracking-[0.22em] text-[#F1D6C8]/80">
                      CARD {card.cardNumber}
                    </span>

                    <div className="mt-3 w-16 h-16 rounded-2xl bg-[#2B0712]/65 border border-[#F5B7C5]/25 flex items-center justify-center">
                      {renderCardMotif(card.motif)}
                    </div>

                    <h3 className="mt-4 font-display text-2xl font-semibold tracking-wide text-[#FFF8F5]">
                      {card.title}
                    </h3>

                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#F5B7C5]">
                      <RotateCw className="w-3 h-3" />
                      <span>Tap to flip</span>
                    </span>
                  </div>

                  {/* Back: Cream & Crimson Reveal */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[1.75rem] cream-stationery border-2 border-[#C62845]/50 p-6 flex flex-col items-center justify-center text-center shadow-[0_24px_55px_-16px_rgba(230,57,86,0.45)] text-[#4A1020]">
                    <Heart className="w-5 h-5 text-[#C62845] fill-[#E63956] mb-3" />
                    <p className="font-display italic text-xl sm:text-2xl text-[#4A1020] leading-snug">
                      &ldquo;{card.message}&rdquo;
                    </p>
                    <span className="mt-4 text-[11px] font-medium tracking-[0.2em] text-[#7D1429]/80">
                      {card.title}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
