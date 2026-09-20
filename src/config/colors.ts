import type { AccentPalette } from '../types'

/**
 * Complete AWS brand palette from "Palette (CYMK).svg"
 *
 * Row 1:  Amazon Orange #f4991a · Amazon Blue #5bade1 · Squid Ink #171e27
 * Row 2:  AWS Pink      #c16da9 · AWS Green   #5db676 · AWS Purple #7f62a7
 * Row 3:  Cool Gray     #666972 · White       #ffffff · Black      #1d1d1b
 */
export const ACCENT_PALETTES: AccentPalette[] = [
  // Row 1
  { id: 'orange', label: 'Amazon Orange', hex: '#f4991a' },
  { id: 'blue',   label: 'Amazon Blue',   hex: '#5bade1' },
  { id: 'squid',  label: 'Squid Ink',     hex: '#171e27' },
  // Row 2
  { id: 'pink',   label: 'AWS Pink',      hex: '#c16da9' },
  { id: 'green',  label: 'AWS Green',     hex: '#5db676' },
  { id: 'purple', label: 'AWS Purple',    hex: '#7f62a7' },
  // Row 3
  { id: 'gray',   label: 'Cool Gray',     hex: '#666972' },
  { id: 'white',  label: 'White',         hex: '#ffffff' },
  { id: 'black',  label: 'Black',         hex: '#1d1d1b' },
]

/** AWS Squid Ink – official dark background */
export const AWS_SQUID_INK = '#171e27'

export const THEME_BACKGROUNDS: Record<'dark' | 'light', string> = {
  dark:  AWS_SQUID_INK,
  light: '#f8fafc',
}

export const THEME_TEXT: Record<'dark' | 'light', { primary: string; secondary: string }> = {
  dark:  { primary: '#ffffff', secondary: '#aab4c4' },
  light: { primary: '#0f172a', secondary: '#475569' },
}

export function getAccentHex(id: string): string {
  return ACCENT_PALETTES.find(p => p.id === id)?.hex ?? '#f4991a'
}
