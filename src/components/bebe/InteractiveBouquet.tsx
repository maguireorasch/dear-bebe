import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  RotateCcw,
  RotateCw,
  Sparkles,
  X,
} from 'lucide-react';
import { BOUQUET_GIFT_MESSAGE } from '../../lib/bebeContent';
import {
  BOUQUET_FLOWERS,
  DigitalBouquetArtwork,
  type BouquetFlowerMeta,
} from './DigitalBouquetArtwork';

export const InteractiveBouquet: React.FC = () => {
  const [bloomedCount, setBloomedCount] = useState<number>(6);
  const [bouncedFlowerId, setBouncedFlowerId] = useState<string | null>(null);
  const [rotateY, setRotateY] = useState<number>(0);
  const [rotateX, setRotateX] = useState<number>(2);
  const [activeNote, setActiveNote] = useState<string>(
    'Touch any rose, tulip, carnation, or drag left/right to rotate your bouquet ♡'
  );
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [fallingPetals, setFallingPetals] = useState<
    Array<{ id: number; x: number; color: string; delay: number }>
  >([]);
  const [giftedOpen, setGiftedOpen] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; startAngle: number } | null>(null);
  const bloomTimerRef = useRef<number | null>(null);

  const totalFlowers = BOUQUET_FLOWERS.length;

  const clearBloomSequence = () => {
    if (bloomTimerRef.current !== null) {
      window.clearInterval(bloomTimerRef.current);
      bloomTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearBloomSequence();
  }, []);

  const spawnSparklesAt = (xPct: number, yPct: number) => {
    const batch = Array.from({ length: 7 }, (_, idx) => ({
      id: Date.now() + idx + Math.random(),
      x: xPct + (Math.random() - 0.5) * 18,
      y: yPct + (Math.random() - 0.5) * 18,
    }));
    setSparkles((prev) => [...prev.slice(-20), ...batch]);
  };

  const spawnFallingPetals = (count = 5) => {
    const batch = Array.from({ length: count }, (_, idx) => ({
      id: Date.now() + idx + Math.random(),
      x: 18 + Math.random() * 64,
      color: idx % 3 === 0 ? '#E63956' : idx % 3 === 1 ? '#C62845' : '#F5B7C5',
      delay: idx * 0.06,
    }));
    setFallingPetals((prev) => [...prev.slice(-14), ...batch]);
  };

  const runBloomSequence = (startFrom = 0) => {
    clearBloomSequence();
    setBloomedCount(startFrom);
    let current = startFrom;
    bloomTimerRef.current = window.setInterval(() => {
      current += 1;
      setBloomedCount(current);
      if (current % 3 === 0) {
        spawnSparklesAt(25 + Math.random() * 50, 22 + Math.random() * 35);
      }
      if (current >= totalFlowers) {
        clearBloomSequence();
        spawnFallingPetals(7);
        setActiveNote('Every rose, tulip, carnation & blossom is in full bloom for Bebe ♡');
      }
    }, 170);
  };

  const handleMakeItBloom = () => {
    setActiveNote('Blooming one blossom at a time...');
    runBloomSequence(Math.min(bloomedCount, totalFlowers - 4));
  };

  const handleReplayAnimation = () => {
    setRotateY(0);
    setRotateX(2);
    setActiveNote('Replaying your bouquet bloom...');
    runBloomSequence(0);
  };

  const handleTouchFlower = (flower: BouquetFlowerMeta) => {
    setBouncedFlowerId(flower.id);
    setActiveNote(flower.note);
    const xPct = (flower.cx / 420) * 100;
    const yPct = (flower.cy / 500) * 100;
    spawnSparklesAt(xPct, yPct);
    spawnFallingPetals(4);
    window.setTimeout(() => setBouncedFlowerId(null), 650);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartRef.current = { x: e.clientX, startAngle: rotateY };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;
    const delta = e.clientX - dragStartRef.current.x;
    const nextAngle = Math.max(-34, Math.min(34, dragStartRef.current.startAngle + delta * 0.25));
    setRotateY(nextAngle);
  };

  const handlePointerUp = () => {
    dragStartRef.current = null;
  };

  const handleGiveToBebe = () => {
    runBloomSequence(totalFlowers);
    setGiftedOpen(true);
    spawnFallingPetals(10);
  };

  return (
    <section
      id="bouquet"
      className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <p className="font-script text-3xl sm:text-4xl text-[#F5B7C5]">
          Handcrafted Digital Bouquet
        </p>
        <h2 className="mt-1 font-display text-3xl sm:text-5xl font-semibold text-[#FFF8F5] tracking-tight">
          Flowers for the sweetest soul.
        </h2>
        <p className="mt-3 max-w-xl text-sm sm:text-base text-[#F1D6C8] leading-relaxed">
          These flowers may be digital, but the thought behind them is real.
        </p>

        {/* Interactive 3D Digital Bouquet Stage */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onMouseEnter={() => spawnFallingPetals(3)}
          className="relative mt-10 w-full max-w-[470px] mx-auto rounded-[2.25rem] glass-cherry px-4 py-6 sm:p-8 cursor-grab active:cursor-grabbing touch-pan-y"
        >
          {/* Falling Petals inside Bouquet Stage */}
          {fallingPetals.map((petal) => (
            <motion.span
              key={petal.id}
              initial={{ y: 40, opacity: 0.95, rotate: 0 }}
              animate={{ y: 420, opacity: 0, rotate: 240 }}
              transition={{ duration: 2.5, delay: petal.delay, ease: 'easeIn' }}
              className="pointer-events-none absolute top-0 w-3 h-4 rounded-tl-[72%] rounded-br-[72%] z-20"
              style={{ left: `${petal.x}%`, backgroundColor: petal.color }}
            />
          ))}

          {/* Interactive Sparkle Bursts */}
          {sparkles.map((sp) => (
            <motion.div
              key={sp.id}
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: 1.7, opacity: 0, y: -24 }}
              transition={{ duration: 0.85 }}
              className="pointer-events-none absolute z-30"
              style={{ left: `${sp.x}%`, top: `${sp.y}%` }}
            >
              <Sparkles className="w-4 h-4 text-[#F1D6C8]" />
            </motion.div>
          ))}

          <DigitalBouquetArtwork
            bloomedCount={bloomedCount}
            bouncedFlowerId={bouncedFlowerId}
            rotateY={rotateY}
            rotateX={rotateX}
            interactive
            onTouchFlower={handleTouchFlower}
          />

          {/* Interactive 3D Rotate Strip */}
          <div className="mt-4 pt-4 border-t border-[#F5B7C5]/15 flex items-center justify-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setRotateY((prev) => Math.max(-34, prev - 14))}
              className="inline-flex items-center gap-1 rounded-full bg-[#4A1020]/90 border border-[#F5B7C5]/25 px-3 py-1.5 text-xs text-[#FFF8F5] hover:bg-[#7D1429] transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#F5B7C5]" />
              <span>Turn Left</span>
            </button>

            <span className="text-[11px] text-[#F1D6C8]/80 tabular-nums px-1">
              {Math.round(rotateY)}°
            </span>

            <button
              type="button"
              onClick={() => setRotateY((prev) => Math.min(34, prev + 14))}
              className="inline-flex items-center gap-1 rounded-full bg-[#4A1020]/90 border border-[#F5B7C5]/25 px-3 py-1.5 text-xs text-[#FFF8F5] hover:bg-[#7D1429] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Turn Right</span>
              <RotateCw className="w-3.5 h-3.5 text-[#F5B7C5]" />
            </button>

            <button
              type="button"
              onClick={handleReplayAnimation}
              className="inline-flex items-center gap-1 rounded-full bg-[#4A1020]/90 border border-[#F5B7C5]/25 px-3 py-1.5 text-xs text-[#F5B7C5] hover:bg-[#7D1429] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Replay</span>
            </button>
          </div>
        </div>

        {/* Live Floral Whisper Note */}
        <p className="mt-5 min-h-[1.75rem] font-display italic text-lg sm:text-xl text-[#F5B7C5] max-w-lg">
          {activeNote}
        </p>

        {/* Primary Bouquet Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={handleMakeItBloom}
            className="inline-flex items-center gap-2 rounded-full bg-[#4A1020]/90 border border-[#F5B7C5]/40 px-6 py-3 text-sm font-medium text-[#FFF8F5] hover:bg-[#7D1429] hover:-translate-y-0.5 transition-all whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#F5B7C5]" />
            <span>Make It Bloom</span>
          </button>

          <button
            type="button"
            onClick={handleGiveToBebe}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C62845] via-[#E63956] to-[#C62845] border border-[#F5B7C5]/45 px-7 py-3 text-sm font-medium text-[#FFF8F5] shadow-[0_14px_32px_-8px_rgba(230,57,86,0.65)] hover:-translate-y-0.5 transition-all whitespace-nowrap shrink-0"
          >
            <Heart className="w-4 h-4 fill-[#FFF8F5]" />
            <span>Give This Bouquet to Bebe</span>
          </button>
        </div>
      </div>

      {/* Give This Bouquet Presentation Modal */}
      <AnimatePresence>
        {giftedOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGiftedOpen(false)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[#18040A]/80 backdrop-blur-md p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.78, y: 36, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 210 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full rounded-[2.25rem] glass-cherry border border-[#F5B7C5]/35 p-6 sm:p-8 text-center"
            >
              <button
                type="button"
                onClick={() => setGiftedOpen(false)}
                aria-label="Close bouquet presentation"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#4A1020] border border-[#F5B7C5]/30 flex items-center justify-center text-[#F5B7C5] hover:text-[#FFF8F5]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="max-w-[230px] mx-auto">
                <DigitalBouquetArtwork bloomedCount={totalFlowers} />
              </div>

              <div className="mt-4 font-display text-xl sm:text-2xl text-[#FFF8F5] leading-relaxed whitespace-pre-line">
                {BOUQUET_GIFT_MESSAGE}
              </div>

              <button
                type="button"
                onClick={() => setGiftedOpen(false)}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C62845] to-[#E63956] px-7 py-2.5 text-sm font-medium text-[#FFF8F5] shadow-md hover:opacity-95 whitespace-nowrap shrink-0"
              >
                <Heart className="w-4 h-4 fill-[#FFF8F5]" />
                <span>Keep This Close ♡</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
