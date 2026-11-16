import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Menu, Sparkles, X } from 'lucide-react';
import type { NavSectionId } from './types/bebe';
import {
  AUDIO_TRACK_PATH,
  loadMusicPreferences,
  saveMusicPreferences,
} from './lib/bebeContent';
import { LoadingFlowerOverlay } from './components/bebe/LoadingFlowerOverlay';
import { AmbientEffects } from './components/bebe/AmbientEffects';
import { OpeningEnvelope } from './components/bebe/OpeningEnvelope';
import { DigitalBouquetArtwork, BOUQUET_FLOWERS } from './components/bebe/DigitalBouquetArtwork';
import { InteractiveBouquet } from './components/bebe/InteractiveBouquet';
import { LoveLetterSection } from './components/bebe/LoveLetterSection';
import { SpecialReasonsSection } from './components/bebe/SpecialReasonsSection';
import { DigitalGardenSection } from './components/bebe/DigitalGardenSection';
import { FinalSurpriseSection } from './components/bebe/FinalSurpriseSection';
import { MusicPlayerWidget } from './components/bebe/MusicPlayerWidget';
import { CornerRoseSvg } from './components/bebe/FloralSvgIcons';

const NAV_ITEMS: Array<{ id: NavSectionId; label: string }> = [
  { id: 'home', label: 'HOME' },
  { id: 'bouquet', label: 'BOUQUET' },
  { id: 'letter', label: 'LETTER' },
  { id: 'little-things', label: 'LITTLE THINGS' },
  { id: 'garden', label: 'GARDEN' },
];

export function App() {
  const [loadingDone, setLoadingDone] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [activeNav, setActiveNav] = useState<NavSectionId>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showerActive, setShowerActive] = useState(false);

  // Subtle parallax for homepage bouquet preview
  const [heroTilt, setHeroTilt] = useState<{ x: number; y: number }>({ x: 2, y: -4 });

  // Singleton HTML5 Audio state for Cause You Have — LANY
  const initialPrefs = loadMusicPreferences();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const [audioAvailable, setAudioAvailable] = useState(false);
  const [customSourceName, setCustomSourceName] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(initialPrefs.muted);
  const [volume, setVolume] = useState(initialPrefs.volume);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Initialize singleton Audio element & honestly verify whether /assets/music/cause-you-have.mp3 exists
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.loop = true;
    audio.volume = initialPrefs.muted ? 0 : initialPrefs.volume;
    audioRef.current = audio;

    const onLoadedMeta = () => {
      if (Number.isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
      setAudioAvailable(true);
    };
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    const onError = () => {
      setAudioAvailable(false);
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', onLoadedMeta);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    // Verify content-type via HEAD so Vite's SPA HTML fallback isn't mistaken for an MP3
    let cancelled = false;
    fetch(AUDIO_TRACK_PATH, { method: 'HEAD' })
      .then((res) => {
        if (cancelled) return;
        const ct = res.headers.get('content-type') || '';
        if (res.ok && (ct.startsWith('audio/') || ct.includes('octet-stream'))) {
          audio.src = AUDIO_TRACK_PATH;
          audio.load();
        } else {
          setAudioAvailable(false);
        }
      })
      .catch(() => {
        if (!cancelled) setAudioAvailable(false);
      });

    return () => {
      cancelled = true;
      audio.pause();
      audio.removeEventListener('loadedmetadata', onLoadedMeta);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track active navigation section on scroll
  useEffect(() => {
    if (!envelopeOpened) return;
    const handleScroll = () => {
      const scrollY = window.scrollY + 140;
      let current: NavSectionId = 'home';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollY) {
          current = item.id;
        }
      }
      setActiveNav(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [envelopeOpened]);

  const handleLoadingComplete = useCallback(() => {
    setLoadingDone(true);
  }, []);

  const startPlaybackSafely = async () => {
    const audio = audioRef.current;
    if (!audio || !audioAvailable) return;
    if (!audio.paused) return;
    try {
      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  };

  const handleOpenStart = (shouldStartMusic: boolean) => {
    if (shouldStartMusic && audioAvailable) {
      void startPlaybackSafely();
    }
  };

  const handleOpeningComplete = () => {
    setEnvelopeOpened(true);
  };

  const handleTogglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !audioAvailable) return;
    if (audio.paused) {
      await startPlaybackSafely();
    } else {
      audio.pause();
    }
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    saveMusicPreferences({ volume, muted: nextMuted });
    if (audioRef.current) {
      audioRef.current.volume = nextMuted ? 0 : volume;
    }
  };

  const handleVolumeChange = (nextVol: number) => {
    setVolume(nextVol);
    const nextMuted = nextVol === 0 ? true : false;
    setIsMuted(nextMuted);
    saveMusicPreferences({ volume: nextVol, muted: nextMuted });
    if (audioRef.current) {
      audioRef.current.volume = nextMuted ? 0 : nextVol;
    }
  };

  const handleSeek = (timeSec: number) => {
    if (!audioRef.current || !audioAvailable) return;
    audioRef.current.currentTime = timeSec;
    setCurrentTime(timeSec);
  };

  const handleSelectLocalAudio = (file: File) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    audio.src = url;
    audio.load();
    setCustomSourceName(file.name);
    setAudioAvailable(true);
    audio.volume = isMuted ? 0 : volume;
    audio.play().catch(() => setIsPlaying(false));
  };

  const triggerPetalShower = () => {
    setShowerActive(false);
    window.requestAnimationFrame(() => {
      setShowerActive(true);
    });
    window.setTimeout(() => {
      setShowerActive(false);
    }, 6200);
  };

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroTilt({ x: -ny * 8, y: nx * 12 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4A1020] via-[#3A0B18] to-[#24060E] text-[#FFF8F5] relative">
      {!loadingDone && <LoadingFlowerOverlay onComplete={handleLoadingComplete} />}

      <AmbientEffects showerActive={showerActive} showChrome={envelopeOpened} />

      {!envelopeOpened ? (
        <OpeningEnvelope
          audioAvailable={audioAvailable}
          onOpenStart={handleOpenStart}
          onOpenComplete={handleOpeningComplete}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75 }}
        >
          {/* Minimalist 3-Zone Sticky Navigation */}
          <header className="sticky top-0 z-40 glass-burgundy border-b border-[#F5B7C5]/15">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
              {/* Zone 1: Brand Wordmark */}
              <a
                href="#home"
                className="font-display text-xl sm:text-2xl font-semibold tracking-wider text-[#FFF8F5] whitespace-nowrap shrink-0"
              >
                DEAR, BEBE ♡
              </a>

              {/* Zone 2: Concise Nav Links with Active Section Indicator */}
              <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Primary">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeNav === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`relative py-1 text-xs font-medium tracking-[0.15em] transition-colors whitespace-nowrap shrink-0 ${
                        isActive ? 'text-[#FFF8F5]' : 'text-[#F1D6C8]/75 hover:text-[#FFF8F5]'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <span className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[#E63956] to-[#F5B7C5]" />
                      )}
                    </a>
                  );
                })}
              </nav>

              {/* Zone 3: 1 Primary Action + Mobile Hamburger */}
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="#surprise"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#C62845] to-[#E63956] px-4 py-2 text-xs font-medium text-[#FFF8F5] shadow-sm hover:opacity-95 transition-opacity whitespace-nowrap shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Final Surprise</span>
                </a>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                  aria-label="Toggle navigation menu"
                  className="md:hidden w-10 h-10 rounded-full bg-[#4A1020] border border-[#F5B7C5]/30 flex items-center justify-center text-[#FFF8F5]"
                >
                  {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Mobile Hamburger Drawer */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="md:hidden overflow-hidden border-t border-[#F5B7C5]/15 bg-[#2B0712]/95 backdrop-blur-md"
                >
                  <nav className="flex flex-col px-6 py-4 space-y-3">
                    {NAV_ITEMS.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-xs font-medium tracking-[0.18em] py-1.5 ${
                          activeNav === item.id ? 'text-[#F5B7C5]' : 'text-[#FFF8F5]/85'
                        }`}
                      >
                        {item.label}
                      </a>
                    ))}
                    <a
                      href="#surprise"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C62845] to-[#E63956] px-4 py-2.5 text-xs font-medium text-[#FFF8F5]"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>One Last Surprise ♡</span>
                    </a>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </header>

          <main>
            {/* Section 3: Homepage Hero */}
            <section
              id="home"
              onMouseMove={handleHeroMouseMove}
              className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 overflow-hidden"
            >
              <CornerRoseSvg className="pointer-events-none absolute -top-12 -left-12 w-48 h-48 sm:w-64 sm:h-64 opacity-45" />
              <CornerRoseSvg className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 sm:w-64 sm:h-64 -scale-x-100 opacity-45" />
              <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[540px] h-[360px] rounded-full bg-[#C62845]/25 blur-[130px]" />

              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-8 relative z-10">
                <div className="lg:col-span-7 text-center lg:text-left">
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-script text-3xl sm:text-4xl text-[#F5B7C5]"
                  >
                    A little world, made just for you.
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.1 }}
                    className="mt-2 font-display text-5xl sm:text-7xl font-semibold tracking-tight text-[#FFF8F5]"
                  >
                    DEAR, BEBE ♡
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.2 }}
                    className="mt-4 text-base sm:text-lg text-[#F1D6C8] max-w-xl mx-auto lg:mx-0 leading-relaxed"
                  >
                    Some things are better expressed through little surprises.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.3 }}
                    className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3.5"
                  >
                    <a
                      href="#letter"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C62845] via-[#E63956] to-[#C62845] border border-[#F5B7C5]/45 px-7 py-3.5 text-sm font-medium text-[#FFF8F5] shadow-[0_14px_32px_-8px_rgba(230,57,86,0.7)] hover:scale-[1.03] transition-transform whitespace-nowrap shrink-0"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Discover Your Surprise</span>
                    </a>

                    <a
                      href="#bouquet"
                      className="inline-flex items-center gap-2 rounded-full bg-[#4A1020]/85 border border-[#F5B7C5]/35 px-7 py-3.5 text-sm font-medium text-[#FFF8F5] hover:bg-[#7D1429] transition-colors whitespace-nowrap shrink-0"
                    >
                      <Heart className="w-4 h-4 text-[#F5B7C5]" />
                      <span>Meet Your Bouquet</span>
                    </a>
                  </motion.div>
                </div>

                {/* Homepage Visual: Digital Bouquet Illustration */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.85, delay: 0.15 }}
                  className="lg:col-span-5"
                >
                  <div className="max-w-[320px] sm:max-w-[360px] mx-auto">
                    <DigitalBouquetArtwork
                      bloomedCount={BOUQUET_FLOWERS.length}
                      rotateX={heroTilt.x}
                      rotateY={heroTilt.y}
                    />
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Section 4: Interactive Digital Flower Bouquet */}
            <InteractiveBouquet />

            {/* Section 5: A Little Letter For Bebe */}
            <LoveLetterSection />

            {/* Section 6: Little Things That Make You Special */}
            <SpecialReasonsSection />

            {/* Section 7: Digital Red Flower Garden */}
            <DigitalGardenSection />

            {/* Section 9: One Last Surprise */}
            <FinalSurpriseSection onTriggerShower={triggerPetalShower} />
          </main>

          {/* Quiet Editorial Footer (extra bottom padding on mobile so fixed player never covers text) */}
          <footer className="pt-10 pb-28 sm:pb-12 px-4 text-center border-t border-[#F5B7C5]/15 bg-[#24060E]/75">
            <p className="font-script text-3xl text-[#F5B7C5]">DEAR, BEBE ♡</p>
            <p className="mt-1 text-xs text-[#F1D6C8]/75">
              A little world, made just for you.
            </p>
          </footer>
        </motion.div>
      )}

      {/* Section 8: Persistent Music Player (Cause You Have — LANY) */}
      {envelopeOpened && (
        <MusicPlayerWidget
          audioAvailable={audioAvailable}
          customSourceName={customSourceName}
          isPlaying={isPlaying}
          isMuted={isMuted}
          volume={volume}
          currentTime={currentTime}
          duration={duration}
          onTogglePlay={handleTogglePlay}
          onToggleMute={handleToggleMute}
          onVolumeChange={handleVolumeChange}
          onSeek={handleSeek}
          onSelectLocalAudio={handleSelectLocalAudio}
        />
      )}
    </div>
  );
}

export default App;
