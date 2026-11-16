import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUp, Heart } from 'lucide-react';

interface AmbientEffectsProps {
  showerActive?: boolean;
  showChrome?: boolean;
}

export const AmbientEffects: React.FC<AmbientEffectsProps> = ({
  showerActive = false,
  showChrome = true,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number; visible: boolean }>({
    x: -100,
    y: -100,
    visible: false,
  });

  const ambientPetals = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: `${(i * 6.4 + 2) % 97}%`,
        delay: `${(i * 1.1) % 10}s`,
        duration: `${10 + (i % 5) * 2.2}s`,
        size: 10 + (i % 4) * 3,
        color: i % 3 === 0 ? '#C62845' : i % 3 === 1 ? '#E63956' : '#7D1429',
      })),
    []
  );

  const showerPetals = useMemo(
    () =>
      Array.from({ length: 110 }, (_, i) => ({
        id: i,
        left: `${(i * 3.9 + (i % 7) * 2.2) % 99}%`,
        delay: `${(i % 22) * 0.11}s`,
        duration: `${3.8 + (i % 6) * 0.45}s`,
        swayX: `${(i % 2 === 0 ? 1 : -1) * (24 + (i % 38))}px`,
        size: 10 + (i % 5) * 3,
        color:
          i % 4 === 0
            ? '#C62845'
            : i % 4 === 1
              ? '#E63956'
              : i % 4 === 2
                ? '#F5B7C5'
                : '#7D1429',
      })),
    []
  );

  const floatingHearts = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: `${8 + i * 12}%`,
        bottom: `${6 + (i % 3) * 15}%`,
        delay: `${i * 1.3}s`,
        duration: `${6.2 + (i % 3) * 1.4}s`,
      })),
    []
  );

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)) : 0;
      setScrollProgress(pct);
      setShowBackToTop(window.scrollY > 420);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches) return;

    document.body.classList.add('bebe-red-cursor');
    const onMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY, visible: true });
    const onLeave = () => setCursorPos((prev) => ({ ...prev, visible: false }));

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.body.classList.remove('bebe-red-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      {showChrome && (
        <div
          className="fixed top-0 left-0 right-0 h-[3px] z-[70] pointer-events-none bg-[#4A1020]/60"
          aria-hidden="true"
        >
          <div
            className="h-full bg-gradient-to-r from-[#C62845] via-[#E63956] to-[#F5B7C5] transition-[width] duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      {/* Ambient Falling Red Rose Petals & Tiny Hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-20" aria-hidden="true">
        {ambientPetals.map((petal) => (
          <span
            key={petal.id}
            className="animate-rose-petal absolute -top-6 rounded-tl-[72%] rounded-br-[72%] rounded-tr-[20%] rounded-bl-[20%] opacity-80"
            style={{
              left: petal.left,
              width: `${petal.size}px`,
              height: `${petal.size * 1.25}px`,
              backgroundColor: petal.color,
              animationDelay: petal.delay,
              ['--dur' as string]: petal.duration,
              boxShadow: '0 2px 8px rgba(10, 2, 5, 0.45)',
            }}
          />
        ))}

        {floatingHearts.map((heart) => (
          <Heart
            key={heart.id}
            className="animate-tiny-heart absolute text-[#F5B7C5]/40 fill-[#E63956]/35"
            style={{
              left: heart.left,
              bottom: heart.bottom,
              width: 14,
              height: 14,
              animationDelay: heart.delay,
              ['--dur' as string]: heart.duration,
            }}
          />
        ))}
      </div>

      {/* Surprise Shower of 110 Red Rose Petals */}
      {showerActive && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[65]" aria-hidden="true">
          {showerPetals.map((petal) => (
            <span
              key={petal.id}
              className="animate-petal-shower absolute -top-8 rounded-tl-[75%] rounded-br-[75%] rounded-tr-[22%] rounded-bl-[22%]"
              style={{
                left: petal.left,
                width: `${petal.size}px`,
                height: `${petal.size * 1.3}px`,
                backgroundColor: petal.color,
                animationDelay: petal.delay,
                ['--dur' as string]: petal.duration,
                ['--sway-x' as string]: petal.swayX,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.35)',
              }}
            />
          ))}
        </div>
      )}

      {/* Custom Small Heart Cursor on Desktop */}
      {cursorPos.visible && (
        <div
          className="fixed z-[110] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
          style={{ left: cursorPos.x, top: cursorPos.y }}
          aria-hidden="true"
        >
          <Heart className="w-4 h-4 text-[#F5B7C5] fill-[#E63956] drop-shadow-[0_2px_8px_rgba(230,57,86,0.75)]" />
        </div>
      )}

      {/* Back to Top */}
      {showChrome && showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-5 left-4 z-40 flex items-center gap-1.5 rounded-full px-3.5 py-2.5 bg-[#4A1020]/90 border border-[#F5B7C5]/30 text-[#FFF8F5] shadow-[0_12px_30px_-8px_rgba(0,0,0,0.75)] backdrop-blur-md hover:bg-[#7D1429] hover:-translate-y-0.5 transition-all whitespace-nowrap shrink-0 text-xs font-medium"
        >
          <ArrowUp className="w-3.5 h-3.5 text-[#F5B7C5]" />
          <span className="hidden sm:inline">Top</span>
        </button>
      )}
    </>
  );
};
