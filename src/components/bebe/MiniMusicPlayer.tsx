import React from 'react';
import { Disc3, Pause, Play, Volume2, VolumeX } from 'lucide-react';

interface MiniMusicPlayerProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onVolumeChange: (next: number) => void;
}

export const MiniMusicPlayer: React.FC<MiniMusicPlayerProps> = ({
  isPlaying,
  isMuted,
  volume,
  onTogglePlay,
  onToggleMute,
  onVolumeChange,
}) => {
  return (
    <div
      className="fixed bottom-5 right-4 sm:right-6 z-50 flex items-center gap-3 rounded-full bg-[#FFF9F7]/90 border border-[#F8C8DC] px-3.5 py-2 shadow-[0_14px_34px_-10px_rgba(217,139,170,0.65)] backdrop-blur-md"
      aria-label="Romantic Music Mini Player"
    >
      {/* Spinning Vinyl Disc */}
      <div
        className={`relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-[#EFA6C1] via-[#F8C8DC] to-[#FFE4EC] border border-[#FFF9F7] shadow-inner shrink-0 ${
          isPlaying ? 'animate-vinyl' : ''
        }`}
      >
        <Disc3 className="w-5 h-5 text-[#FFF9F7]" />
      </div>

      <div className="hidden sm:flex flex-col min-w-[92px]">
        <span className="text-[11px] font-medium text-[#4A2E3B] leading-tight">
          Pink Waltz
        </span>
        <span className="text-[10px] text-[#8C5B70] leading-tight">
          {isPlaying ? 'Soft Piano Playing' : 'Paused'}
        </span>
      </div>

      {/* Play / Pause */}
      <button
        type="button"
        onClick={onTogglePlay}
        aria-label={isPlaying ? 'Pause romantic music' : 'Play romantic music'}
        className="w-8 h-8 rounded-full bg-gradient-to-r from-[#EFA6C1] to-[#D98BAA] text-[#FFF9F7] flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity shrink-0"
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
      </button>

      {/* Mute */}
      <button
        type="button"
        onClick={onToggleMute}
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        className="w-7 h-7 rounded-full text-[#7D5D6C] hover:text-[#4A2E3B] flex items-center justify-center shrink-0"
      >
        {isMuted || volume === 0 ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </button>

      {/* Volume Slider */}
      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={isMuted ? 0 : volume}
        onChange={(e) => onVolumeChange(Number(e.target.value))}
        aria-label="Music volume"
        className="w-16 sm:w-20 accent-[#D98BAA] cursor-pointer"
      />
    </div>
  );
};
