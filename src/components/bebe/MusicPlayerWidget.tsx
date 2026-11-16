import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Disc3,
  FolderOpen,
  Info,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

interface MusicPlayerWidgetProps {
  audioAvailable: boolean;
  customSourceName: string | null;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onVolumeChange: (vol: number) => void;
  onSeek: (timeSec: number) => void;
  onSelectLocalAudio: (file: File) => void;
}

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const mins = Math.floor(sec / 60);
  const secs = Math.floor(sec % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export const MusicPlayerWidget: React.FC<MusicPlayerWidgetProps> = ({
  audioAvailable,
  customSourceName,
  isPlaying,
  isMuted,
  volume,
  currentTime,
  duration,
  onTogglePlay,
  onToggleMute,
  onVolumeChange,
  onSeek,
  onSelectLocalAudio,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (audioAvailable) {
      setShowSetupGuide(false);
    }
  }, [audioAvailable]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSelectLocalAudio(file);
    }
    e.target.value = '';
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-6 z-40 flex flex-col items-end gap-2.5 max-w-[calc(100vw-2rem)]">
      {/* Setup Guide Popover when audio file hasn't been added yet */}
      <AnimatePresence>
        {showSetupGuide && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            className="w-80 rounded-2xl glass-burgundy p-4 text-xs text-[#FFF8F5] shadow-2xl"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold text-[#F5B7C5]">Add Official Audio File</p>
              <button
                type="button"
                onClick={() => setShowSetupGuide(false)}
                aria-label="Close audio guide"
                className="text-[#F1D6C8] hover:text-[#FFF8F5]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="mt-1.5 text-[#F1D6C8] leading-relaxed">
              Place your legal MP3 file at{' '}
              <code className="text-[#FFF8F5] bg-[#2B0712]/70 px-1 py-0.5 rounded">
                public/assets/music/cause-you-have.mp3
              </code>{' '}
              so it loads automatically as <strong className="text-[#FFF8F5]">Cause You Have — LANY</strong>.
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#C62845] to-[#E63956] px-3 py-2 text-xs font-medium text-[#FFF8F5] hover:opacity-95 transition-opacity"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Or Select Legal Audio File Now</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Burgundy Glassmorphism Player */}
      <div className="glass-burgundy rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 w-auto sm:w-[320px] transition-all">
        <div className="flex items-center gap-3">
          {/* Circular Music Disc */}
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-label="Toggle music player controls"
            className={`relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#7D1429] via-[#C62845] to-[#E63956] border border-[#F5B7C5]/50 flex items-center justify-center shrink-0 shadow-md ${
              isPlaying ? 'animate-disc-spin' : ''
            }`}
          >
            <Disc3 className="w-5 h-5 text-[#FFF8F5]" />
          </button>

          {/* Song Metadata + Equalizer */}
          <div
            onClick={() => setExpanded((prev) => !prev)}
            className="min-w-0 flex-1 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <p className="text-xs sm:text-sm font-semibold text-[#FFF8F5] truncate">
                Cause You Have
              </p>
              {/* Real Animated Equalizer (animates only when genuinely playing) */}
              <div className="flex items-end gap-[2px] h-3 shrink-0" aria-hidden="true">
                {[0.55, 0.8, 0.65].map((dur, i) => (
                  <span
                    key={i}
                    className={`w-[2.5px] rounded-full bg-[#F5B7C5] ${
                      isPlaying ? 'animate-eq-bar h-3' : 'h-1 opacity-55'
                    }`}
                    style={{ ['--dur' as string]: `${dur}s`, animationDelay: `${i * 0.14}s` }}
                  />
                ))}
              </div>
            </div>
            <p className="text-[11px] text-[#F1D6C8]/85 truncate">
              LANY · Our Little Soundtrack ♡
            </p>
            {!audioAvailable && (
              <p className="text-[10px] text-[#F5B7C5] truncate">
                Audio not yet added
              </p>
            )}
            {customSourceName && audioAvailable && (
              <p className="text-[10px] text-[#F5B7C5]/90 truncate">
                Loaded: {customSourceName}
              </p>
            )}
          </div>

          {/* Play / Pause OR Setup Prompt */}
          {audioAvailable ? (
            <button
              type="button"
              onClick={onTogglePlay}
              aria-label={isPlaying ? 'Pause Cause You Have' : 'Play Cause You Have'}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-[#C62845] to-[#E63956] text-[#FFF8F5] flex items-center justify-center shadow-md hover:opacity-95 transition-opacity shrink-0"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowSetupGuide((prev) => !prev)}
              aria-label="Audio file setup instructions"
              className="w-9 h-9 rounded-full bg-[#7D1429] border border-[#F5B7C5]/35 text-[#F5B7C5] flex items-center justify-center hover:text-[#FFF8F5] shrink-0"
            >
              <Info className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Expanded Seekbar, Time & Volume Controls (or visible on desktop when expanded / audio ready) */}
        {(expanded || audioAvailable) && (
          <div className="mt-2.5 pt-2 border-t border-[#F5B7C5]/15 space-y-2">
            {/* Progress Bar + Timestamps */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#F1D6C8] tabular-nums w-8">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.5}
                disabled={!audioAvailable || duration === 0}
                value={Math.min(currentTime, duration || 0)}
                onChange={(e) => onSeek(Number(e.target.value))}
                aria-label="Song progress"
                className="flex-1 h-1 accent-[#E63956] cursor-pointer disabled:opacity-40"
              />
              <span className="text-[10px] text-[#F1D6C8] tabular-nums w-8 text-right">
                {formatTime(duration)}
              </span>
            </div>

            {/* Volume, Mute & Local File Loader */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={onToggleMute}
                  aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                  className="text-[#F5B7C5] hover:text-[#FFF8F5] p-1"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => onVolumeChange(Number(e.target.value))}
                  aria-label="Audio volume"
                  className="w-20 h-1 accent-[#F5B7C5] cursor-pointer"
                />
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1 text-[10px] text-[#F1D6C8] hover:text-[#FFF8F5] whitespace-nowrap shrink-0"
              >
                <FolderOpen className="w-3 h-3" />
                <span>{audioAvailable ? 'Change MP3' : 'Load MP3'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
