import type { AccentPalette } from '../types'

/**
 * Official AWS brand palette extracted from "Palette (CYMK).svg"
 * RGB values converted from the CSS fills in that file.
 *
 * #f4991a  – Amazon Orange  (cls-6)   CMYK 0,37,89,4   Pantone 1375 C
 * #5bade1  – Amazon Blue    (cls-5)   CMYK 60,23,0,12  Pantone 2915 C
 * #171e27  – Squid Ink      (cls-1)   CMYK 41,23,0,85  Pantone 7547 C
 * #c16da9  – AWS Pink       (cls-9)   CMYK 0,44,12,24  Pantone 2060 C
 * #5db676  – AWS Green      (cls-2)   CMYK 49,0,35,29  Pantone 6170 C
 * #7f62a7  – AWS Purple     (cls-10)  CMYK 24,41,0,35  Pantone 7676 C
 * #666972  – Cool Gray      (cls-11)  CMYK 11,8,0,56   Cool Gray 10 C
 */

export const ACCENT_PALETTES: AccentPalette[] = [
  { id: 'orange', label: 'Amazon Orange', hex: '#f4991a', tailwind: 'bg-orange-400' },
  { id: 'blue',   label: 'Amazon Blue',   hex: '#5bade1', tailwind: 'bg-sky-400'    },
  { id: 'green',  label: 'AWS Green',     hex: '#5db676', tailwind: 'bg-green-500'  },
  { id: 'pink',   label: 'AWS Pink',      hex: '#c16da9', tailwind: 'bg-pink-400'   },
  { id: 'purple', label: 'AWS Purple',    hex: '#7f62a7', tailwind: 'bg-purple-500' },
]

/** AWS Squid Ink – the official dark background color */
export const AWS_SQUID_INK = '#171e27'

export const THEME_BACKGROUNDS: Record<'dark' | 'light', string> = {
  dark:  AWS_SQUID_INK,   // official AWS dark bg
  light: '#f8fafc',
}

export const THEME_TEXT: Record<'dark' | 'light', { primary: string; secondary: string }> = {
  dark:  { primary: '#ffffff',  secondary: '#aab4c4' },
  light: { primary: '#0f172a',  secondary: '#475569' },
}

export function getAccentHex(id: string): string {
  return ACCENT_PALETTES.find(p => p.id === id)?.hex ?? '#f4991a'
}
