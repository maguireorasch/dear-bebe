import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Flower2, Heart, Sparkles } from 'lucide-react';
import type { GardenButterflyNode, GardenFlowerNode } from '../../types/bebe';
import {
  ButterflySvg,
  RedCarnationSvg,
  RedRoseSvg,
  WhiteTulipSvg,
} from './FloralSvgIcons';

const INITIAL_GARDEN_FLOWERS: GardenFlowerNode[] = [
  { id: 'rg-1', kind: 'red-rose', x: 12, y: 68, scale: 1.05, bloomed: true, swayDelay: '0s' },
  { id: 'rg-2', kind: 'white-tulip', x: 24, y: 74, scale: 1.0, bloomed: false, swayDelay: '0.6s' },
  { id: 'rg-3', kind: 'red-carnation', x: 37, y: 65, scale: 1.08, bloomed: true, swayDelay: '1.1s' },
  { id: 'rg-4', kind: 'red-rose', x: 50, y: 75, scale: 1.12, bloomed: true, swayDelay: '0.4s' },
  { id: 'rg-5', kind: 'white-tulip', x: 64, y: 66, scale: 1.04, bloomed: false, swayDelay: '1.5s' },
  { id: 'rg-6', kind: 'red-rose', x: 76, y: 73, scale: 1.05, bloomed: true, swayDelay: '0.9s' },
  { id: 'rg-7', kind: 'red-carnation', x: 88, y: 67, scale: 0.98, bloomed: false, swayDelay: '1.8s' },
];

const INITIAL_BUTTERFLIES: GardenButterflyNode[] = [
  { id: 'rb-1', x: 24, y: 34, tint: '#F5B7C5' },
  { id: 'rb-2', x: 56, y: 24, tint: '#FFF8F5' },
  { id: 'rb-3', x: 78, y: 40, tint: '#F1D6C8' },
];

export const DigitalGardenSection: React.FC = () => {
  const [flowers, setFlowers] = useState<GardenFlowerNode[]>(INITIAL_GARDEN_FLOWERS);
  const [butterflies, setButterflies] = useState<GardenButterflyNode[]>(INITIAL_BUTTERFLIES);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleGardenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const burst = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i + Math.random(),
      x: x + (Math.random() - 0.5) * 9,
      y: y + (Math.random() - 0.5) * 9,
    }));
    setSparkles((prev) => [...prev.slice(-22), ...burst]);
  };

  const handleBloomFlower = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlowers((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, bloomed: true, scale: Math.min(1.4, f.scale + 0.14) }
          : f
      )
    );
  };

  const handleFlyButterfly = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setButterflies((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              x: 12 + Math.random() * 76,
              y: 16 + Math.random() * 44,
            }
          : b
      )
    );
  };

  const handleGrowMoreFlowers = () => {
    const kinds: GardenFlowerNode['kind'][] = ['red-rose', 'white-tulip', 'red-carnation'];
    const nextBatch: GardenFlowerNode[] = Array.from({ length: 3 }, (_, idx) => ({
      id: `rg-new-${Date.now()}-${idx}`,
      kind: kinds[(flowers.length + idx) % kinds.length],
      x: 10 + Math.random() * 80,
      y: 58 + Math.random() * 24,
      scale: 0.94 + Math.random() * 0.28,
      bloomed: true,
      swayDelay: `${(idx * 0.5).toFixed(1)}s`,
    }));
    setFlowers((prev) => [...prev.slice(-24), ...nextBatch]);
  };

  const renderGardenNode = (item: GardenFlowerNode) => {
    const cls = item.bloomed ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-11 h-11 sm:w-12 sm:h-12';
    switch (item.kind) {
      case 'red-rose':
        return <RedRoseSvg className={cls} bloomed={item.bloomed} />;
      case 'white-tulip':
        return <WhiteTulipSvg className={cls} bloomed={item.bloomed} />;
      case 'red-carnation':
        return <RedCarnationSvg className={cls} bloomed={item.bloomed} />;
    }
  };

  return (
    <section id="garden" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="font-script text-3xl sm:text-4xl text-[#F5B7C5]">
            A Magical Little World
          </p>
          <h2 className="mt-1 font-display text-3xl sm:text-5xl font-semibold text-[#FFF8F5]">
            Digital Red Flower Garden
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#F1D6C8]">
            Tap flowers to make them bloom, click butterflies to let them flutter, or touch anywhere for sparkles.
          </p>
        </div>

        {/* Magical Burgundy & Deep Cherry Garden Canvas */}
        <div
          onClick={handleGardenClick}
          className="relative w-full h-[380px] sm:h-[440px] rounded-[2.25rem] overflow-hidden border border-[#F5B7C5]/25 bg-gradient-to-b from-[#2B0712] via-[#591125] to-[#1B2B20] shadow-[0_28px_70px_-18px_rgba(0,0,0,0.8)] cursor-pointer select-none"
        >
          {/* Magical Moonlit / Crimson Glow */}
          <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[380px] h-[260px] rounded-full bg-[#E63956]/25 blur-[90px]" />

          {/* Sparkling Particles */}
          {[
            { top: '14%', left: '20%', delay: '0s' },
            { top: '22%', left: '48%', delay: '0.8s' },
            { top: '16%', left: '76%', delay: '1.4s' },
            { top: '34%', left: '34%', delay: '0.4s' },
            { top: '30%', left: '88%', delay: '1.9s' },
          ].map((sp, i) => (
            <Sparkles
              key={i}
              className="animate-sparkle-glow pointer-events-none absolute w-4 h-4 text-[#F1D6C8]/80"
              style={{ ...sp, animationDelay: sp.delay }}
            />
          ))}

          {/* Floating Tiny Hearts */}
          <Heart className="animate-tiny-heart pointer-events-none absolute left-[38%] top-[46%] w-4 h-4 text-[#F5B7C5]/60 fill-[#E63956]/55" />
          <Heart
            className="animate-tiny-heart pointer-events-none absolute left-[68%] top-[50%] w-3.5 h-3.5 text-[#F1D6C8]/65 fill-[#C62845]/55"
            style={{ animationDelay: '2.1s' }}
          />

          {/* Layered Lush Botanical Meadow Hills */}
          <div className="pointer-events-none absolute -bottom-16 -left-12 right-1/3 h-48 rounded-[100%] bg-[#1F3A29]/90" />
          <div className="pointer-events-none absolute -bottom-20 left-1/4 -right-12 h-52 rounded-[100%] bg-[#284A35]/85" />

          {/* Click Sparkle Bursts */}
          {sparkles.map((sp) => (
            <motion.div
              key={sp.id}
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: 1.75, opacity: 0, y: -22 }}
              transition={{ duration: 0.85 }}
              className="pointer-events-none absolute z-30"
              style={{ left: `${sp.x}%`, top: `${sp.y}%` }}
            >
              <Sparkles className="w-5 h-5 text-[#F1D6C8]" />
            </motion.div>
          ))}

          {/* Butterflies */}
          {butterflies.map((bf) => (
            <motion.button
              key={bf.id}
              type="button"
              onClick={(e) => handleFlyButterfly(bf.id, e)}
              aria-label="Tap butterfly to flutter"
              animate={{ left: `${bf.x}%`, top: `${bf.y}%` }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              whileHover={{ scale: 1.18 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 p-1"
            >
              <ButterflySvg tint={bf.tint} className="w-11 h-11 drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]" />
            </motion.button>
          ))}

          {/* Garden Roses, Tulips & Carnations with Gentle Wind Sway */}
          {flowers.map((fl) => (
            <motion.button
              key={fl.id}
              type="button"
              onClick={(e) => handleBloomFlower(fl.id, e)}
              aria-label={`Bloom ${fl.kind}`}
              initial={{ scale: 0, y: 24, opacity: 0 }}
              animate={{ scale: fl.scale, y: 0, opacity: 1 }}
              whileHover={{ scale: fl.scale * 1.14, y: -4 }}
              transition={{ type: 'spring', stiffness: 220, damping: 16 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 animate-wind-sway"
              style={{ left: `${fl.x}%`, top: `${fl.y}%`, animationDelay: fl.swayDelay }}
            >
              {renderGardenNode(fl)}
            </motion.button>
          ))}
        </div>

        {/* Garden Footer & Grow More Button */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display italic text-xl sm:text-2xl text-[#F1D6C8] text-center sm:text-left">
            &ldquo;May your life bloom with beautiful moments.&rdquo;
          </p>

          <button
            type="button"
            onClick={handleGrowMoreFlowers}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C62845] to-[#E63956] border border-[#F5B7C5]/40 px-6 py-3 text-sm font-medium text-[#FFF8F5] shadow-[0_12px_28px_-8px_rgba(230,57,86,0.65)] hover:scale-[1.03] transition-transform whitespace-nowrap shrink-0"
          >
            <Flower2 className="w-4 h-4" />
            <span>Grow More Flowers</span>
          </button>
        </div>
      </div>
    </section>
  );
};
