import type { FormatPreset, Platform } from '../types'

export const PRESETS: FormatPreset[] = [
  // ── Instagram ─────────────────────────────────────────────────────────
  { id: 'ig-post',      label: 'Instagram Post',     platform: 'Instagram', width: 1080, height: 1080 },
  { id: 'ig-story',     label: 'Instagram Story / Reel', platform: 'Instagram', width: 1080, height: 1920 },
  { id: 'ig-portrait',  label: 'Instagram Portrait', platform: 'Instagram', width: 1080, height: 1380 },

  // ── Facebook ──────────────────────────────────────────────────────────
  { id: 'fb-cover',     label: 'Cover Profile',      platform: 'Facebook',  width: 851,  height: 315  },

  // ── LinkedIn ──────────────────────────────────────────────────────────
  { id: 'li-portrait',  label: 'Post Portrait',      platform: 'LinkedIn',  width: 1080, height: 1350 },
  { id: 'li-landscape', label: 'Post Landscape',     platform: 'LinkedIn',  width: 1200, height: 627  },
  { id: 'li-square',    label: 'Post Square',        platform: 'LinkedIn',  width: 1200, height: 1200 },
  { id: 'li-company',   label: 'Cover Company Page', platform: 'LinkedIn',  width: 1128, height: 191  },
  { id: 'li-profile',   label: 'Cover Profile',      platform: 'LinkedIn',  width: 1584, height: 396  },

  // ── X / Twitter ───────────────────────────────────────────────────────
  { id: 'x-square',     label: 'Post Square',        platform: 'X',         width: 1080, height: 1080 },
  { id: 'x-cover',      label: 'Cover Profile',      platform: 'X',         width: 1500, height: 500  },
  { id: 'x-landscape',  label: 'Post Landscape',     platform: 'X',         width: 1200, height: 675  },

  // ── Web ───────────────────────────────────────────────────────────────
  { id: 'web-narrow',   label: 'Narrow Banner',      platform: 'Web',       width: 300,  height: 600  },
  { id: 'web-meetup',   label: 'Cover Photo for Meetup or Builder Center', platform: 'Web', width: 1200, height: 675 },

  // ── Print ─────────────────────────────────────────────────────────────
  { id: 'print-us-land',label: 'US Letter (8.5″ × 11″) Landscape', platform: 'Print', width: 3300, height: 2550 },
  { id: 'print-cert',   label: 'Certificate',        platform: 'Print',     width: 3300, height: 2550 },
  { id: 'print-us-port',label: 'US Letter (8.5″ × 11″)', platform: 'Print', width: 2550, height: 3300 },
]

export const PLATFORMS: Platform[] = ['Instagram', 'Facebook', 'LinkedIn', 'X', 'Web', 'Print']

export function getPreset(id: string): FormatPreset {
  return PRESETS.find(p => p.id === id) ?? PRESETS[0]
}

export function getPresetsByPlatform(platform: Platform): FormatPreset[] {
  return PRESETS.filter(p => p.platform === platform)
}
