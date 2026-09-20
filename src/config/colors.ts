import type { AccentPalette } from '../types'

export const ACCENT_PALETTES: AccentPalette[] = [
  { id: 'orange', label: 'Orange', hex: '#FF9900', tailwind: 'bg-orange-400' },
  { id: 'green',  label: 'Green',  hex: '#22c55e', tailwind: 'bg-green-500'  },
  { id: 'blue',   label: 'Blue',   hex: '#3b82f6', tailwind: 'bg-blue-500'   },
  { id: 'pink',   label: 'Pink',   hex: '#ec4899', tailwind: 'bg-pink-500'   },
  { id: 'purple', label: 'Purple', hex: '#a855f7', tailwind: 'bg-purple-500' },
]

export const THEME_BACKGROUNDS: Record<'dark' | 'light', string> = {
  dark:  '#0f172a',
  light: '#f8fafc',
}

export const THEME_TEXT: Record<'dark' | 'light', { primary: string; secondary: string }> = {
  dark:  { primary: '#f1f5f9', secondary: '#94a3b8' },
  light: { primary: '#0f172a', secondary: '#475569' },
}

export function getAccentHex(id: string): string {
  return ACCENT_PALETTES.find(p => p.id === id)?.hex ?? '#FF9900'
}
