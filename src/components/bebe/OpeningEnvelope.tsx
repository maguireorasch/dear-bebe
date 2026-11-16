import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Heart, Music, Sparkles } from 'lucide-react';
import { CornerRoseSvg } from './FloralSvgIcons';

interface OpeningEnvelopeProps {
  audioAvailable: boolean;
  onOpenStart?: (startMusic: boolean) => void;
  onOpenComplete: () => void;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({
  audioAvailable,
  onOpenStart,
  onOpenComplete,
}) => {
  const [opening, setOpening] = useState(false);
  const [playThemeOnOpen, setPlayThemeOnOpen] = useState(true);
  const [burstPetals, setBurstPetals] = useState<
    Array<{ id: number; tx: number; ty: number; rot: number; color: string; size: number }>
  >([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const cardPeekRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.opening-envelope-stage', {
        y: 28,
        opacity: 0,
        duration: 0.95,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    onOpenStart?.(audioAvailable && playThemeOnOpen);

    const spawned = Array.from({ length: 36 }, (_, i) => {
      const angle = (i / 36) * Math.PI * 2;
      const dist = 120 + (i % 5) * 48;
      return {
        id: i,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist - 40,
        rot: (i * 51) % 360,
        color:
          i % 3 === 0 ? '#E63956' : i % 3 === 1 ? '#C62845' : '#F5B7C5',
        size: 11 + (i % 4) * 3,
      };
    });
    setBurstPetals(spawned);

    const tl = gsap.timeline({
      onComplete: () => {
        onOpenComplete();
      },
    });

    if (flapRef.current) {
      tl.to(flapRef.current, {
        rotateX: 180,
        duration: 0.65,
        ease: 'power2.inOut',
      });
    }
    if (cardPeekRef.current) {
      tl.to(
        cardPeekRef.current,
        {
          y: -58,
          opacity: 1,
          duration: 0.55,
          ease: 'back.out(1.4)',
        },
        '-=0.25'
      );
    }
    if (containerRef.current) {
      tl.to(
        containerRef.current,
        {
          opacity: 0,
          scale: 1.04,
          duration: 0.65,
          ease: 'power2.inOut',
        },
        '+=0.32'
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#4A1020] via-[#7D1429] to-[#24060E] px-5 py-8"
    >
      {/* Subtle Ambient Aura Behind Envelope */}
      <div className="pointer-events-none absolute w-[420px] h-[420px] rounded-full bg-[#E63956]/25 blur-[90px]" />

      {/* Corner Roses */}
      <CornerRoseSvg className="pointer-events-none absolute -top-6 -left-6 w-40 h-40 sm:w-56 sm:h-56 opacity-80" />
      <CornerRoseSvg className="pointer-events-none absolute -top-6 -right-6 w-40 h-40 sm:w-56 sm:h-56 -scale-x-100 opacity-80" />
      <CornerRoseSvg className="pointer-events-none absolute -bottom-6 -left-6 w-40 h-40 sm:w-56 sm:h-56 -scale-y-100 opacity-70" />
      <CornerRoseSvg className="pointer-events-none absolute -bottom-6 -right-6 w-40 h-40 sm:w-56 sm:h-56 scale-[-1] opacity-70" />

      {/* Soft Glowing Particles */}
      {[
        { top: '18%', left: '20%', delay: '0s' },
        { top: '22%', right: '22%', delay: '0.8s' },
        { bottom: '20%', left: '16%', delay: '1.3s' },
        { bottom: '24%', right: '18%', delay: '0.4s' },
      ].map((sp, i) => (
        <Sparkles
          key={i}
          className="animate-sparkle-glow pointer-events-none absolute w-5 h-5 text-[#F1D6C8]/75"
          style={{ ...sp, animationDelay: sp.delay }}
        />
      ))}

      <div className="opening-envelope-stage relative z-10 flex flex-col items-center text-center max-w-md w-full">
        {/* Burst Petals */}
        {burstPetals.map((p) => (
          <span
            key={p.id}
            className="pointer-events-none absolute left-1/2 top-1/2 rounded-tl-[75%] rounded-br-[75%] rounded-tr-[20%] rounded-bl-[20%] transition-all duration-1000 ease-out"
            style={{
              width: p.size,
              height: p.size * 1.25,
              backgroundColor: p.color,
              transform: `translate(${p.tx}px, ${p.ty}px) rotate(${p.rot}deg)`,
              opacity: 0,
            }}
          />
        ))}

        {/* Elegant Red Envelope with Champagne Satin Ribbon */}
        <div className="relative mb-9 w-64 sm:w-76 h-44 sm:h-48 perspective-1200">
          {/* Cream Card Peeking Inside */}
          <div
            ref={cardPeekRef}
            className="absolute inset-x-4 top-4 h-32 rounded-xl cream-stationery border border-[#F1D6C8] shadow-md flex flex-col items-center justify-center px-4 opacity-95"
          >
            <p className="font-script text-2xl text-[#7D1429]">Just for you</p>
            <Heart className="w-4 h-4 text-[#C62845] fill-[#E63956] mt-1" />
          </div>

          {/* Red Velvet Envelope Body */}
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#C62845] to-[#7D1429] shadow-[0_28px_65px_-14px_rgba(0,0,0,0.8)] border border-[#F5B7C5]/35 overflow-hidden">
            <div
              className="absolute inset-0 bg-[#8F1931]/80"
              style={{ clipPath: 'polygon(0 0, 50% 56%, 0 100%)' }}
            />
            <div
              className="absolute inset-0 bg-[#8F1931]/75"
              style={{ clipPath: 'polygon(100% 0, 50% 56%, 100% 100%)' }}
            />
            <div
              className="absolute inset-0 bg-[#A91D3A]/90"
              style={{ clipPath: 'polygon(0 100%, 50% 48%, 100% 100%)' }}
            />

            {/* Champagne Satin Ribbon */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-5 bg-gradient-to-r from-[#D5B2A1] via-[#FFF8F5] to-[#D5B2A1] opacity-85" />
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-4 bg-gradient-to-b from-[#D5B2A1] via-[#FFF8F5] to-[#D5B2A1] opacity-80" />
          </div>

          {/* 3D Flap */}
          <div
            ref={flapRef}
            className="absolute inset-x-0 top-0 h-24 origin-top preserve-3d z-20"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              background: 'linear-gradient(180deg, #E63956 0%, #C62845 100%)',
              filter: 'drop-shadow(0 8px 14px rgba(0,0,0,0.35))',
            }}
          />

          {/* Crimson Wax Seal */}
          <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#E63956] to-[#7D1429] border-2 border-[#F1D6C8]/85 shadow-[0_8px_22px_rgba(0,0,0,0.5)]">
            <Heart className="w-6 h-6 text-[#FFF8F5] fill-[#FFF8F5]" />
          </div>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#FFF8F5] tracking-tight">
          Hey, Bebe! ♡
        </h1>
        <p className="mt-2.5 text-base sm:text-lg text-[#F5B7C5]">
          I made something special just for you.
        </p>

        {audioAvailable && (
          <button
            type="button"
            onClick={() => setPlayThemeOnOpen((prev) => !prev)}
            className="mt-5 inline-flex items-center gap-2 text-xs sm:text-sm text-[#F1D6C8] hover:text-[#FFF8F5] transition-colors py-1.5 px-3 rounded-lg"
          >
            <span
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                playThemeOnOpen
                  ? 'bg-[#E63956] border-[#F5B7C5] text-[#FFF8F5]'
                  : 'bg-[#4A1020] border-[#F5B7C5]/40'
              }`}
            >
              {playThemeOnOpen && <Heart className="w-2.5 h-2.5 fill-[#FFF8F5]" />}
            </span>
            <Music className="w-3.5 h-3.5 text-[#F5B7C5]" />
            <span>Play theme song (&ldquo;Cause You Have&rdquo;) when opening</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleOpen}
          disabled={opening}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C62845] via-[#E63956] to-[#C62845] border border-[#F5B7C5]/45 px-8 py-4 text-base font-medium text-[#FFF8F5] shadow-[0_14px_36px_-6px_rgba(230,57,86,0.65)] hover:scale-[1.03] active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
        >
          <span>{opening ? 'Opening Your Surprise...' : 'Open Your Little Surprise ♡'}</span>
        </button>
      </div>
    </div>
  );
};
