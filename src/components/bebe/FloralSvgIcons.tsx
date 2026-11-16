import React from 'react';

export const CornerRoseSvg: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
    {/* Deep botanical leaves */}
    <path d="M18 96C42 64 78 66 94 90C72 108 42 110 18 96Z" fill="#2A4A36" opacity="0.85" />
    <path d="M96 18C66 44 68 80 90 96C108 74 110 44 96 18Z" fill="#365E45" opacity="0.82" />
    <path d="M40 142C62 110 98 108 112 132C92 150 62 154 40 142Z" fill="#254230" opacity="0.78" />
    {/* Outer Burgundy & Deep Cherry Petals */}
    <circle cx="80" cy="80" r="42" fill="#4A1020" />
    <ellipse cx="56" cy="74" rx="26" ry="22" transform="rotate(-18 56 74)" fill="#7D1429" />
    <ellipse cx="102" cy="70" rx="26" ry="22" transform="rotate(22 102 70)" fill="#7D1429" />
    <ellipse cx="80" cy="104" rx="28" ry="22" fill="#C62845" opacity="0.92" />
    {/* Mid & Inner Rose Layers */}
    <circle cx="80" cy="78" r="24" fill="#C62845" />
    <ellipse cx="70" cy="76" rx="14" ry="16" fill="#E63956" opacity="0.85" />
    <path
      d="M70 78C70 68 82 63 90 70C98 78 90 90 79 90C68 90 63 78 70 68"
      stroke="#F5B7C5"
      strokeWidth="2.4"
      strokeLinecap="round"
      opacity="0.88"
    />
    {/* Secondary rosebud */}
    <circle cx="132" cy="50" r="15" fill="#7D1429" />
    <circle cx="132" cy="50" r="9" fill="#E63956" />
    <circle cx="46" cy="126" r="12" fill="#C62845" />
    <circle cx="46" cy="126" r="6" fill="#F5B7C5" opacity="0.8" />
  </svg>
);

export const RedRoseSvg: React.FC<{ className?: string; bloomed?: boolean }> = ({
  className = 'w-14 h-14',
  bloomed = true,
}) => (
  <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
    <defs>
      <radialGradient id="roseCoreGrad" cx="42%" cy="38%" r="60%">
        <stop offset="0%" stopColor="#F5B7C5" />
        <stop offset="35%" stopColor="#E63956" />
        <stop offset="75%" stopColor="#C62845" />
        <stop offset="100%" stopColor="#4A1020" />
      </radialGradient>
    </defs>
    {/* Stem & veined leaves */}
    <path d="M40 74V42" stroke="#365E45" strokeWidth="3" strokeLinecap="round" />
    <path d="M40 62C28 57 22 48 26 42C34 44 39 52 40 62Z" fill="#427253" />
    <path d="M40 56C52 51 58 43 54 37C46 39 41 47 40 56Z" fill="#2E543C" />
    {/* Outer petals */}
    <g
      style={{
        transform: bloomed ? 'scale(1)' : 'scale(0.76)',
        transformOrigin: '40px 28px',
        transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <circle cx="40" cy="29" r="20" fill="#7D1429" />
      <ellipse cx="28" cy="28" rx="11" ry="14" transform="rotate(-14 28 28)" fill="#C62845" />
      <ellipse cx="52" cy="28" rx="11" ry="14" transform="rotate(14 52 28)" fill="#C62845" />
      <ellipse cx="40" cy="39" rx="14" ry="10" fill="#A91D3A" />
      <circle cx="40" cy="27" r="13.5" fill="url(#roseCoreGrad)" />
      {/* Detailed petal folds */}
      <path
        d="M32 27C32 20 42 18 46 23C50 28 45 35 38 35C32 35 29 29 33 23"
        stroke="#FFF8F5"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.72"
      />
      <path
        d="M36 27C36 24 41 23 43 26C45 29 41 31 38 30"
        stroke="#F1D6C8"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.85"
      />
    </g>
  </svg>
);

export const WhiteTulipSvg: React.FC<{ className?: string; bloomed?: boolean }> = ({
  className = 'w-14 h-14',
  bloomed = true,
}) => (
  <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
    <path d="M40 74V40" stroke="#3B664B" strokeWidth="2.8" strokeLinecap="round" />
    <path d="M40 67C27 59 23 44 28 34C35 42 38 55 40 67Z" fill="#467859" />
    <path d="M40 65C52 58 55 46 51 36C45 43 42 54 40 65Z" fill="#325940" />
    <g
      style={{
        transform: bloomed ? 'scale(1)' : 'scale(0.8)',
        transformOrigin: '40px 30px',
        transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <path
        d="M25 24C25 14 33 11 40 22C47 11 55 14 55 24C55 36 48 42 40 42C32 42 25 36 25 24Z"
        fill="#F1D6C8"
      />
      <path
        d="M32 20C32 12 40 9 40 9C40 9 48 12 48 20C48 32 45 41 40 42C35 41 32 32 32 20Z"
        fill="#FFF8F5"
      />
      <path
        d="M27 25C29 33 34 40 40 41"
        stroke="#F5B7C5"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </g>
  </svg>
);

export const RedCarnationSvg: React.FC<{ className?: string; bloomed?: boolean }> = ({
  className = 'w-14 h-14',
  bloomed = true,
}) => (
  <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
    <path d="M40 74V42" stroke="#365E45" strokeWidth="2.8" strokeLinecap="round" />
    <path d="M40 58L28 48M40 54L52 45" stroke="#457557" strokeWidth="2.4" strokeLinecap="round" />
    <g
      style={{
        transform: bloomed ? 'scale(1)' : 'scale(0.75)',
        transformOrigin: '40px 28px',
        transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, idx) => (
        <ellipse
          key={deg}
          cx="40"
          cy="17"
          rx="6.2"
          ry="12"
          fill={idx % 2 === 0 ? '#C62845' : '#E63956'}
          transform={`rotate(${deg} 40 28)`}
        />
      ))}
      <circle cx="40" cy="28" r="10" fill="#7D1429" />
      <circle cx="40" cy="28" r="5.5" fill="#F5B7C5" opacity="0.75" />
    </g>
  </svg>
);

export const BabysBreathSvg: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
    <path d="M32 58V32M32 39L19 23M32 35L46 21M32 31L28 14" stroke="#457557" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="19" cy="22" r="4.2" fill="#FFF8F5" />
    <circle cx="46" cy="20" r="4.5" fill="#FFF8F5" />
    <circle cx="28" cy="14" r="4" fill="#FFF8F5" />
    <circle cx="38" cy="27" r="3.5" fill="#F1D6C8" />
    <circle cx="24" cy="29" r="3.2" fill="#F5B7C5" />
  </svg>
);

export const ButterflySvg: React.FC<{ tint?: string; className?: string }> = ({
  tint = '#F5B7C5',
  className = 'w-11 h-11',
}) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
    <g className="animate-butterfly-wings">
      <path d="M31 32C20 13 5 16 9 30C12 36 23 36 31 32Z" fill={tint} opacity="0.92" />
      <path d="M33 32C44 13 59 16 55 30C52 36 41 36 33 32Z" fill={tint} opacity="0.92" />
      <path d="M31 33C20 35 13 46 21 51C27 54 31 44 31 33Z" fill="#E63956" opacity="0.85" />
      <path d="M33 33C44 35 51 46 43 51C37 54 33 44 33 33Z" fill="#E63956" opacity="0.85" />
      <circle cx="19" cy="26" r="2.2" fill="#FFF8F5" opacity="0.9" />
      <circle cx="45" cy="26" r="2.2" fill="#FFF8F5" opacity="0.9" />
    </g>
    <rect x="30.8" y="23" width="2.4" height="18" rx="1.2" fill="#FFF8F5" />
    <path d="M31.5 23C29 18 26 17 24 18" stroke="#FFF8F5" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M32.5 23C35 18 38 17 40 18" stroke="#FFF8F5" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);
