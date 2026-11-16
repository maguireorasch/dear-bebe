export type NavSectionId = 'home' | 'bouquet' | 'letter' | 'little-things' | 'garden';

export interface SpecialCardItem {
  id: string;
  cardNumber: string;
  title: string;
  message: string;
  motif: 'rose' | 'tulip' | 'carnation' | 'blossom' | 'heart' | 'spark';
}

export interface GardenFlowerNode {
  id: string;
  kind: 'red-rose' | 'white-tulip' | 'red-carnation';
  x: number;
  y: number;
  scale: number;
  bloomed: boolean;
  swayDelay: string;
}

export interface GardenButterflyNode {
  id: string;
  x: number;
  y: number;
  tint: string;
}

export interface MusicPreferences {
  volume: number;
  muted: boolean;
}
