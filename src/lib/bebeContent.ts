import type { MusicPreferences, SpecialCardItem } from '../types/bebe';

export const AUDIO_TRACK_PATH =
  '/assets/aistudio/LANY_-__Cause_You_Have_To__Official_Lyric_Video__d52a7379.mp3';

const MUSIC_PREFS_KEY = 'dear_bebe_music_prefs_v1';

export const DEFAULT_MUSIC_PREFS: MusicPreferences = {
  volume: 0.75,
  muted: false,
};

export function loadMusicPreferences(): MusicPreferences {
  try {
    const raw = localStorage.getItem(MUSIC_PREFS_KEY);
    if (!raw) return DEFAULT_MUSIC_PREFS;
    const parsed = JSON.parse(raw) as Partial<MusicPreferences>;
    return {
      volume:
        typeof parsed.volume === 'number' && parsed.volume >= 0 && parsed.volume <= 1
          ? parsed.volume
          : DEFAULT_MUSIC_PREFS.volume,
      muted: typeof parsed.muted === 'boolean' ? parsed.muted : DEFAULT_MUSIC_PREFS.muted,
    };
  } catch {
    return DEFAULT_MUSIC_PREFS;
  }
}

export function saveMusicPreferences(prefs: MusicPreferences): void {
  try {
    localStorage.setItem(MUSIC_PREFS_KEY, JSON.stringify(prefs));
  } catch {
    // ignore storage errors
  }
}

export const BOUQUET_GIFT_MESSAGE = `Dear Bebe,

If I could, I would give you an endless garden filled with beautiful roses.

But for now, here's a little digital bouquet made especially for you.

I hope it makes you smile. ♡`;

export const LETTER_CONTENT = `Dear Bebe,

I made this little corner of the internet just for you.

It's not a big gift, but I hope it brings a little happiness to your day.

You deserve beautiful things, gentle moments, endless happiness, and all the little reasons to smile.

Never forget how special you are.

Thank you for being you.

Keep blooming, Bebe.

With love,
Someone who made this just for you ♡`;

export const SPECIAL_CARDS: SpecialCardItem[] = [
  {
    id: 'smile',
    cardNumber: '01',
    title: 'YOUR SMILE',
    message: 'Because it makes ordinary days feel brighter.',
    motif: 'rose',
  },
  {
    id: 'kindness',
    cardNumber: '02',
    title: 'YOUR KINDNESS',
    message: 'You have a beautiful way of making people feel appreciated.',
    motif: 'tulip',
  },
  {
    id: 'personality',
    cardNumber: '03',
    title: 'YOUR PERSONALITY',
    message: "There's something special about the way you are.",
    motif: 'carnation',
  },
  {
    id: 'energy',
    cardNumber: '04',
    title: 'YOUR ENERGY',
    message: 'You bring your own kind of sunshine.',
    motif: 'spark',
  },
  {
    id: 'heart',
    cardNumber: '05',
    title: 'YOUR HEART',
    message: 'Keep being the wonderful person you are.',
    motif: 'heart',
  },
  {
    id: 'simply-you',
    cardNumber: '06',
    title: 'SIMPLY YOU',
    message: "You don't need to be anyone else to be special.",
    motif: 'blossom',
  },
];

export const FINAL_SURPRISE_MESSAGE = `Hey Bebe,

I hope you always find little reasons to smile, beautiful moments to remember, and happiness in the simplest things.

You deserve all the wonderful things this world has to offer.

No matter how ordinary a day feels, I hope something beautiful always finds its way to you.

Keep blooming, Bebe.

This little world was made just for you. ♡`;
