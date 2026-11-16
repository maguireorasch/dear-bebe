import React from 'react';

export interface BouquetFlowerMeta {
  id: string;
  label: string;
  note: string;
  cx: number;
  cy: number;
}

export const BOUQUET_FLOWERS: BouquetFlowerMeta[] = [
  { id: 'rose-center', label: 'Center Red Rose', note: 'The heart of the bouquet — timeless warmth & affection ♡', cx: 210, cy: 185 },
  { id: 'rose-left', label: 'Crimson Rose', note: 'A deep red rose for every quiet, lovely moment ♡', cx: 148, cy: 196 },
  { id: 'rose-right', label: 'Velvet Rose', note: 'A velvet rose glowing just as brightly as your smile ♡', cx: 272, cy: 194 },
  { id: 'rose-top-left', label: 'Garden Rose', note: 'Blooming gently for sweet mornings ahead ♡', cx: 174, cy: 138 },
  { id: 'rose-top-right', label: 'Cherry Rose', note: 'Picked with warmth and endless appreciation ♡', cx: 246, cy: 138 },
  { id: 'tulip-left', label: 'White Tulip', note: 'A pure cream tulip for calm and peaceful days ♡', cx: 112, cy: 152 },
  { id: 'tulip-top', label: 'Ivory Tulip', note: 'Tall ivory petals reaching for warm sunlight ♡', cx: 210, cy: 100 },
  { id: 'tulip-right', label: 'Pearl Tulip', note: 'Soft white tulip petals symbolizing gentle grace ♡', cx: 308, cy: 150 },
  { id: 'carnation-left', label: 'Red Carnation', note: 'Ruffled crimson petals full of joy & charm ♡', cx: 132, cy: 242 },
  { id: 'carnation-mid', label: 'Scarlet Carnation', note: 'Delicate scarlet layers crafted just for Bebe ♡', cx: 210, cy: 244 },
  { id: 'carnation-right', label: 'Rose Carnation', note: 'Bright carnations bringing warmth to every day ♡', cx: 288, cy: 242 },
  { id: 'breath-left', label: "Baby's Breath", note: "Airy baby's breath for little everyday wonders ♡", cx: 98, cy: 204 },
  { id: 'breath-right', label: "Baby's Breath", note: "Tiny white blossoms sprinkling soft magic ♡", cx: 322, cy: 204 },
];

interface DigitalBouquetArtworkProps {
  bloomedCount: number; // 0..13
  bouncedFlowerId?: string | null;
  rotateY?: number;
  rotateX?: number;
  interactive?: boolean;
  onTouchFlower?: (flower: BouquetFlowerMeta) => void;
  className?: string;
}

export const DigitalBouquetArtwork: React.FC<DigitalBouquetArtworkProps> = ({
  bloomedCount,
  bouncedFlowerId = null,
  rotateY = 0,
  rotateX = 0,
  interactive = false,
  onTouchFlower,
  className = 'w-full max-w-[430px] mx-auto',
}) => {
  const isFlowerBloomed = (index: number) => bloomedCount > index;

  const getFlowerTransformStyle = (index: number, id: string, cx: number, cy: number): React.CSSProperties => {
    const bloomed = isFlowerBloomed(index);
    const bounced = bouncedFlowerId === id;
    const scale = bounced ? 1.22 : bloomed ? 1.04 : 0.62;
    const rot = bounced ? -6 : bloomed ? 0 : -12;
    return {
      transform: `scale(${scale}) rotate(${rot}deg)`,
      transformOrigin: `${cx}px ${cy}px`,
      transition: 'transform 0.62s cubic-bezier(0.22, 1, 0.36, 1)',
      cursor: interactive ? 'pointer' : 'default',
    };
  };

  const renderLayeredRose = (cx: number, cy: number, r: number, index: number, id: string) => {
    const meta = BOUQUET_FLOWERS.find((f) => f.id === id)!;
    return (
      <g
        key={id}
        style={getFlowerTransformStyle(index, id, cx, cy)}
        onClick={(e) => {
          if (!interactive || !onTouchFlower) return;
          e.stopPropagation();
          onTouchFlower(meta);
        }}
      >
        <circle cx={cx} cy={cy} r={r + 5} fill="#2B0712" opacity="0.28" />
        <circle cx={cx} cy={cy} r={r} fill="#7D1429" />
        <ellipse cx={cx - r * 0.48} cy={cy - r * 0.1} rx={r * 0.62} ry={r * 0.72} transform={`rotate(-18 ${cx} ${cy})`} fill="#A91D3A" />
        <ellipse cx={cx + r * 0.48} cy={cy - r * 0.1} rx={r * 0.62} ry={r * 0.72} transform={`rotate(18 ${cx} ${cy})`} fill="#B5223E" />
        <ellipse cx={cx} cy={cy + r * 0.42} rx={r * 0.76} ry={r * 0.56} fill="#C62845" />
        <ellipse cx={cx} cy={cy - r * 0.4} rx={r * 0.7} ry={r * 0.52} fill="#D92D4E" />
        <circle cx={cx} cy={cy} r={r * 0.66} fill="#E63956" />
        <circle cx={cx - r * 0.1} cy={cy - r * 0.1} r={r * 0.44} fill="#C62845" />
        {/* Delicate swirl highlights */}
        <path
          d={`M${cx - r * 0.35} ${cy} C${cx - r * 0.35} ${cy - r * 0.38} ${cx + r * 0.28} ${cy - r * 0.42} ${cx + r * 0.36} ${cy - r * 0.08} C${cx + r * 0.42} ${cy + r * 0.28} ${cx - r * 0.12} ${cy + r * 0.4} ${cx - r * 0.28} ${cy + r * 0.12}`}
          stroke="#F5B7C5"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.82"
        />
        <path
          d={`M${cx - r * 0.14} ${cy} C${cx - r * 0.14} ${cy - r * 0.16} ${cx + r * 0.14} ${cy - r * 0.18} ${cx + r * 0.16} ${cy} C${cx + r * 0.16} ${cy + r * 0.14} ${cx - r * 0.04} ${cy + r * 0.16} ${cx - r * 0.08} ${cy + r * 0.05}`}
          stroke="#FFF8F5"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
      </g>
    );
  };

  const renderWhiteTulip = (cx: number, cy: number, scale: number, rotDeg: number, index: number, id: string) => {
    const meta = BOUQUET_FLOWERS.find((f) => f.id === id)!;
    return (
      <g
        key={id}
        transform={`rotate(${rotDeg} ${cx} ${cy})`}
      >
        <g
          style={getFlowerTransformStyle(index, id, cx, cy)}
          onClick={(e) => {
            if (!interactive || !onTouchFlower) return;
            e.stopPropagation();
            onTouchFlower(meta);
          }}
        >
          {/* Tulip stem */}
          <path d={`M${cx} ${cy + 14} Q${cx - 3} ${cy + 58} ${cx} ${cy + 100}`} stroke="#3B684B" strokeWidth="4.2" strokeLinecap="round" fill="none" />
          {/* Cup petals */}
          <path
            d={`M${cx - 21 * scale} ${cy - 4 * scale} C${cx - 23 * scale} ${cy - 24 * scale} ${cx - 8 * scale} ${cy - 30 * scale} ${cx} ${cy - 12 * scale} C${cx + 8 * scale} ${cy - 30 * scale} ${cx + 23 * scale} ${cy - 24 * scale} ${cx + 21 * scale} ${cy - 4 * scale} C${cx + 21 * scale} ${cy + 16 * scale} ${cx + 11 * scale} ${cy + 24 * scale} ${cx} ${cy + 24 * scale} C${cx - 11 * scale} ${cy + 24 * scale} ${cx - 21 * scale} ${cy + 16 * scale} ${cx - 21 * scale} ${cy - 4 * scale} Z`}
            fill="#F1D6C8"
          />
          <path
            d={`M${cx - 11 * scale} ${cy - 8 * scale} C${cx - 11 * scale} ${cy - 24 * scale} ${cx} ${cy - 32 * scale} ${cx} ${cy - 32 * scale} C${cx} ${cy - 32 * scale} ${cx + 11 * scale} ${cy - 24 * scale} ${cx + 11 * scale} ${cy - 8 * scale} C${cx + 11 * scale} ${cy + 12 * scale} ${cx + 6 * scale} ${cy + 23 * scale} ${cx} ${cy + 24 * scale} C${cx - 6 * scale} ${cy + 23 * scale} ${cx - 11 * scale} ${cy + 12 * scale} ${cx - 11 * scale} ${cy - 8 * scale} Z`}
            fill="#FFF8F5"
          />
          <path
            d={`M${cx - 16 * scale} ${cy - 2 * scale} Q${cx - 12 * scale} ${cy + 16 * scale} ${cx} ${cy + 22 * scale}`}
            stroke="#F5B7C5"
            strokeWidth="1.4"
            fill="none"
            opacity="0.7"
          />
        </g>
      </g>
    );
  };

  const renderRedCarnation = (cx: number, cy: number, r: number, index: number, id: string) => {
    const meta = BOUQUET_FLOWERS.find((f) => f.id === id)!;
    return (
      <g
        key={id}
        style={getFlowerTransformStyle(index, id, cx, cy)}
        onClick={(e) => {
          if (!interactive || !onTouchFlower) return;
          e.stopPropagation();
          onTouchFlower(meta);
        }}
      >
        <circle cx={cx} cy={cy + 3} r={r} fill="#2B0712" opacity="0.24" />
        {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((deg, idx) => (
          <ellipse
            key={deg}
            cx={cx}
            cy={cy - r * 0.45}
            rx={r * 0.28}
            ry={r * 0.56}
            fill={idx % 3 === 0 ? '#C62845' : idx % 3 === 1 ? '#E63956' : '#A91D3A'}
            transform={`rotate(${deg} ${cx} ${cy})`}
          />
        ))}
        <circle cx={cx} cy={cy} r={r * 0.42} fill="#7D1429" />
        <circle cx={cx} cy={cy} r={r * 0.22} fill="#F5B7C5" opacity="0.78" />
      </g>
    );
  };

  const renderBabysBreathCluster = (cx: number, cy: number, flipX: number, index: number, id: string) => {
    const meta = BOUQUET_FLOWERS.find((f) => f.id === id)!;
    return (
      <g
        key={id}
        style={getFlowerTransformStyle(index, id, cx, cy)}
        onClick={(e) => {
          if (!interactive || !onTouchFlower) return;
          e.stopPropagation();
          onTouchFlower(meta);
        }}
      >
        <path
          d={`M${cx} ${cy + 38} L${cx} ${cy} M${cx} ${cy + 18} L${cx + 18 * flipX} ${cy - 8} M${cx} ${cy + 10} L${cx - 15 * flipX} ${cy - 14}`}
          stroke="#4F7F60"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {[
          { dx: 0, dy: -2, r: 4.5, c: '#FFF8F5' },
          { dx: 18 * flipX, dy: -9, r: 4.8, c: '#FFF8F5' },
          { dx: -15 * flipX, dy: -15, r: 4.2, c: '#F1D6C8' },
          { dx: 10 * flipX, dy: -22, r: 3.8, c: '#FFF8F5' },
          { dx: -6 * flipX, dy: 6, r: 3.6, c: '#F5B7C5' },
          { dx: 23 * flipX, dy: 4, r: 3.4, c: '#FFF8F5' },
        ].map((dot, idx) => (
          <g key={idx}>
            <circle cx={cx + dot.dx} cy={cy + dot.dy} r={dot.r + 1.4} fill="#F5B7C5" opacity="0.35" />
            <circle cx={cx + dot.dx} cy={cy + dot.dy} r={dot.r} fill={dot.c} />
          </g>
        ))}
      </g>
    );
  };

  return (
    <div
      className={`perspective-1200 select-none ${className}`}
      aria-label="Interactive Digital Red Rose, White Tulip, and Carnation Bouquet"
    >
      <div
        className="preserve-3d transition-transform duration-300 ease-out"
        style={{
          transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
        }}
      >
        <svg viewBox="0 0 420 500" fill="none" className="w-full h-auto overflow-visible drop-shadow-[0_28px_48px_rgba(0,0,0,0.58)]">
          <defs>
            <linearGradient id="wrapBurgundyOuter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7D1429" />
              <stop offset="55%" stopColor="#4A1020" />
              <stop offset="100%" stopColor="#2B0712" />
            </linearGradient>
            <linearGradient id="wrapBurgundyFront" x1="20%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#941B35" />
              <stop offset="50%" stopColor="#5C1327" />
              <stop offset="100%" stopColor="#350A16" />
            </linearGradient>
            <linearGradient id="wrapChampagneLining" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8F5" />
              <stop offset="100%" stopColor="#F1D6C8" />
            </linearGradient>
            <linearGradient id="satinRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5B7C5" />
              <stop offset="28%" stopColor="#E63956" />
              <stop offset="70%" stopColor="#C62845" />
              <stop offset="100%" stopColor="#7D1429" />
            </linearGradient>
            <radialGradient id="bouquetHalo" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#E63956" stopOpacity="0.34" />
              <stop offset="70%" stopColor="#7D1429" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#2B0712" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Soft Studio Lighting Behind Bouquet */}
          <circle cx="210" cy="215" r="195" fill="url(#bouquetHalo)" />

          {/* Back Burgundy Wrapping Cone + Champagne Inner Lining */}
          <path d="M58 212 L210 56 L362 212 L252 436 L168 436 Z" fill="url(#wrapBurgundyOuter)" />
          <path d="M80 206 L210 74 L340 206 L246 410 L174 410 Z" fill="url(#wrapChampagneLining)" opacity="0.92" />

          {/* Back Green Botanical Foliage */}
          <g className="animate-wind-sway">
            <path d="M135 215 C84 174 62 126 78 96 C112 114 134 156 135 215 Z" fill="#2A4D38" />
            <path d="M285 215 C336 174 358 126 342 96 C308 114 286 156 285 215 Z" fill="#2E543C" />
            <path d="M168 188 C130 120 128 66 156 44 C180 78 182 132 168 188 Z" fill="#3B684B" />
            <path d="M252 188 C290 120 292 66 264 44 C240 78 238 132 252 188 Z" fill="#355E44" />
            <path d="M210 190 C196 116 196 60 210 34 C224 60 224 116 210 190 Z" fill="#467859" />
            {/* Eucalyptus sprigs */}
            <g fill="#558768" opacity="0.9">
              <circle cx="88" cy="144" r="9" />
              <circle cx="75" cy="164" r="8" />
              <circle cx="96" cy="178" r="8.5" />
              <circle cx="332" cy="144" r="9" />
              <circle cx="345" cy="164" r="8" />
              <circle cx="324" cy="178" r="8.5" />
            </g>
          </g>

          {/* Natural Stems Peeking Near Base */}
          <g stroke="#325940" strokeWidth="4.5" strokeLinecap="round" opacity="0.88">
            <line x1="196" y1="365" x2="188" y2="465" />
            <line x1="205" y1="365" x2="203" y2="474" />
            <line x1="215" y1="365" x2="217" y2="474" />
            <line x1="224" y1="365" x2="232" y2="465" />
          </g>

          {/* White Tulips Layer */}
          {renderWhiteTulip(112, 152, 0.96, -18, 5, 'tulip-left')}
          {renderWhiteTulip(210, 100, 1.05, 0, 6, 'tulip-top')}
          {renderWhiteTulip(308, 150, 0.96, 18, 7, 'tulip-right')}

          {/* Baby's Breath Sprigs */}
          {renderBabysBreathCluster(98, 204, -1, 11, 'breath-left')}
          {renderBabysBreathCluster(322, 204, 1, 12, 'breath-right')}

          {/* Upper Red Roses */}
          {renderLayeredRose(174, 138, 28, 3, 'rose-top-left')}
          {renderLayeredRose(246, 138, 28, 4, 'rose-top-right')}

          {/* Mid Hero Red Roses */}
          {renderLayeredRose(148, 196, 31, 1, 'rose-left')}
          {renderLayeredRose(272, 194, 31, 2, 'rose-right')}
          {renderLayeredRose(210, 185, 36, 0, 'rose-center')}

          {/* Front Red Carnations */}
          {renderRedCarnation(132, 242, 26, 8, 'carnation-left')}
          {renderRedCarnation(210, 244, 28, 9, 'carnation-mid')}
          {renderRedCarnation(288, 242, 26, 10, 'carnation-right')}

          {/* Front Folded Burgundy Wrapping Paper */}
          <path
            d="M72 228 L208 320 L176 436 L142 390 Z"
            fill="url(#wrapBurgundyFront)"
            stroke="#F5B7C5"
            strokeOpacity="0.18"
          />
          <path
            d="M348 228 L212 320 L244 436 L278 390 Z"
            fill="#4A1020"
            stroke="#F5B7C5"
            strokeOpacity="0.18"
          />
          <path
            d="M94 252 L210 338 L326 252 L248 432 L172 432 Z"
            fill="url(#wrapBurgundyFront)"
          />
          {/* Subtle highlight fold edge */}
          <path
            d="M94 252 L210 338 L326 252"
            stroke="#F1D6C8"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            fill="none"
          />

          {/* Elegant Red Satin Ribbon & Flowing Tails */}
          <g className="animate-ribbon-wave">
            {/* Ribbon Band Around Waist */}
            <rect x="172" y="346" width="76" height="16" rx="6" fill="url(#satinRibbonGrad)" />
            {/* Flowing Ribbon Tails */}
            <path
              d="M204 358 C186 392 162 426 146 468 L168 462 C182 428 198 394 210 362 Z"
              fill="url(#satinRibbonGrad)"
            />
            <path
              d="M216 358 C234 392 258 426 274 468 L252 462 C238 428 222 394 210 362 Z"
              fill="url(#satinRibbonGrad)"
            />
            {/* Satin Loops */}
            <path
              d="M206 352 C170 326 140 342 156 368 C168 386 196 368 206 356 Z"
              fill="url(#satinRibbonGrad)"
            />
            <path
              d="M214 352 C250 326 280 342 264 368 C252 386 224 368 214 356 Z"
              fill="url(#satinRibbonGrad)"
            />
            {/* Satin Highlights */}
            <path d="M164 353 C178 344 192 348 202 353" stroke="#FFF8F5" strokeWidth="1.4" strokeOpacity="0.55" fill="none" />
            <path d="M256 353 C242 344 228 348 218 353" stroke="#FFF8F5" strokeWidth="1.4" strokeOpacity="0.55" fill="none" />
            {/* Center Satin Knot */}
            <rect x="200" y="344" width="20" height="20" rx="7" fill="#E63956" stroke="#F5B7C5" strokeOpacity="0.45" />
          </g>
        </svg>
      </div>
    </div>
  );
};
