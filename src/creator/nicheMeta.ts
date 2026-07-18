import {
  Drama,
  Laugh,
  Mic,
  MonitorPlay,
  Music,
  Speech,
  type LucideIcon,
} from 'lucide-react';
import type { Niche } from '@/types';

/**
 * PWA-02 niche grid (US-1): Core 4 + Extended, niche-agnostic and welcoming.
 * The "Comedian / Compère" card stores 'comedian'; the compère refinement lives
 * in profile settings later.
 */
export interface NicheOption {
  value: Niche;
  label: string;
  copy: string;
  icon: LucideIcon;
}

export const NICHE_OPTIONS: readonly NicheOption[] = [
  { value: 'actor', label: 'Actor', copy: 'Monologues, screen & stage', icon: Drama },
  { value: 'vo_artist', label: 'VO Artist', copy: 'Voice demos & studio reads', icon: Mic },
  { value: 'comedian', label: 'Comedian / Compère', copy: 'Sets, hosting & live rooms', icon: Laugh },
  { value: 'speaker_pastor', label: 'Speaker / Pastor', copy: 'Keynotes & congregations', icon: Speech },
  { value: 'musician', label: 'Musician', copy: 'Live sets & sessions', icon: Music },
  { value: 'content_creator', label: 'Content Creator / Streamer', copy: 'Appearances & collabs', icon: MonitorPlay },
];

export const NICHE_LABELS: Record<Niche, string> = {
  actor: 'Actor',
  vo_artist: 'VO Artist',
  comedian: 'Comedian / Compère',
  compere: 'Compère',
  speaker_pastor: 'Speaker / Pastor',
  musician: 'Musician',
  content_creator: 'Content Creator / Streamer',
};

/** Thespian AI mock output per niche — style/vibe only, never identity. */
export const MOCK_STYLE_TAGS: Record<Niche, string[]> = {
  actor: ['Dramatic', 'Grounded', 'Screen-ready'],
  vo_artist: ['Warm Texture', 'Conversational', 'Expressive'],
  comedian: ['High Energy', 'Crowd Work', 'Quick-witted'],
  compere: ['High Energy', 'Crowd Work', 'Polished'],
  speaker_pastor: ['Uplifting', 'Commanding', 'Warm'],
  musician: ['Soulful', 'Live-ready', 'Versatile'],
  content_creator: ['Relatable', 'High Energy', 'Quick-cut'],
};
