import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MailOpen } from 'lucide-react';
import { LETTER_CONTENT } from '../../lib/bebeContent';

export const LoveLetterSection: React.FC = () => {
  const [unfolded, setUnfolded] = useState(false);

  return (
    <section id="letter" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-script text-3xl sm:text-4xl text-[#F5B7C5]">
            Written in Quiet Ink
          </p>
          <h2 className="mt-1 font-display text-3xl sm:text-5xl font-semibold text-[#FFF8F5]">
            A Little Letter For You ♡
          </h2>
        </div>

        {/* Cream Paper & Burgundy Bordered Stationery */}
        <div className="relative rounded-[2rem] cream-stationery border-2 border-[#7D1429]/55 shadow-[0_30px_70px_-18px_rgba(0,0,0,0.75)] overflow-hidden text-[#4A1020]">
          {/* Burgundy & Champagne Satin Top Ribbon */}
          <div className="h-3 w-full bg-gradient-to-r from-[#4A1020] via-[#C62845] to-[#4A1020]" />

          {!unfolded ? (
            <div className="px-6 py-14 sm:py-16 flex flex-col items-center text-center">
              {/* Embossed Red Wax Seal */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E63956] to-[#7D1429] border-2 border-[#F1D6C8] shadow-[0_10px_24px_rgba(125,20,41,0.45)] flex items-center justify-center">
                <MailOpen className="w-7 h-7 text-[#FFF8F5]" />
              </div>

              <p className="mt-5 font-display text-2xl sm:text-3xl font-semibold text-[#4A1020]">
                Sealed with a Red Wax Heart
              </p>
              <p className="mt-2 text-sm text-[#7D1429]/80 max-w-md">
                Tap below to gently break the seal and unfold your letter.
              </p>

              <button
                type="button"
                onClick={() => setUnfolded(true)}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C62845] to-[#7D1429] px-7 py-3 text-sm font-medium text-[#FFF8F5] shadow-[0_12px_28px_-8px_rgba(125,20,41,0.6)] hover:scale-[1.03] transition-transform whitespace-nowrap shrink-0"
              >
                <Heart className="w-4 h-4 fill-[#FFF8F5]" />
                <span>Open Letter ♡</span>
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key="unfolded-letter"
                initial={{ opacity: 0, y: 24, scaleY: 0.94 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
                className="origin-top px-6 sm:px-14 py-10 sm:py-14 relative"
              >
                {/* Inner Burgundy Hairline Frame */}
                <div className="border border-[#7D1429]/25 rounded-2xl p-6 sm:p-10 bg-[#FFF8F5]/60">
                  <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-[#7D1429]/20">
                    <span className="font-script text-3xl text-[#C62845]">
                      For Bebe
                    </span>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E63956] to-[#7D1429] flex items-center justify-center shadow-sm">
                      <Heart className="w-4 h-4 text-[#FFF8F5] fill-[#FFF8F5]" />
                    </div>
                  </div>

                  <div className="font-display text-xl sm:text-[1.42rem] leading-[1.78] text-[#4A1020] whitespace-pre-line">
                    {LETTER_CONTENT}
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#7D1429]/15 flex items-center justify-between text-xs text-[#7D1429]/75">
                    <span>With love &amp; warm wishes</span>
                    <button
                      type="button"
                      onClick={() => setUnfolded(false)}
                      className="font-medium hover:text-[#4A1020] transition-colors"
                    >
                      Fold Letter
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};
