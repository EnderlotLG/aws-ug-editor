import type { FormatPreset, Platform } from '../types'

export const PRESETS: FormatPreset[] = [
  // Instagram
  { id: 'ig-post',    label: 'Post 1080×1080',    platform: 'Instagram', width: 1080, height: 1080 },
  { id: 'ig-story',   label: 'Story 1080×1920',   platform: 'Instagram', width: 1080, height: 1920 },
  { id: 'ig-reel',    label: 'Reel 1080×1920',    platform: 'Instagram', width: 1080, height: 1920 },
  // Facebook
  { id: 'fb-post',    label: 'Post 1200×630',     platform: 'Facebook',  width: 1200, height: 630  },
  { id: 'fb-cover',   label: 'Cover 820×312',     platform: 'Facebook',  width: 820,  height: 312  },
  { id: 'fb-story',   label: 'Story 1080×1920',   platform: 'Facebook',  width: 1080, height: 1920 },
  // LinkedIn
  { id: 'li-post',    label: 'Post 1200×627',     platform: 'LinkedIn',  width: 1200, height: 627  },
  { id: 'li-banner',  label: 'Banner 1584×396',   platform: 'LinkedIn',  width: 1584, height: 396  },
  // X (Twitter)
  { id: 'x-post',     label: 'Post 1600×900',     platform: 'X',         width: 1600, height: 900  },
  { id: 'x-header',   label: 'Header 1500×500',   platform: 'X',         width: 1500, height: 500  },
  // Web
  { id: 'web-banner', label: 'Banner 1920×600',   platform: 'Web',       width: 1920, height: 600  },
  { id: 'web-thumb',  label: 'Thumbnail 1280×720',platform: 'Web',       width: 1280, height: 720  },
  // Print
  { id: 'print-a4',   label: 'A4 2480×3508',      platform: 'Print',     width: 2480, height: 3508 },
  { id: 'print-flyer',label: 'Flyer 1275×1650',   platform: 'Print',     width: 1275, height: 1650 },
]

export const PLATFORMS: Platform[] = ['Instagram', 'Facebook', 'LinkedIn', 'X', 'Web', 'Print']

export function getPreset(id: string): FormatPreset {
  return PRESETS.find(p => p.id === id) ?? PRESETS[0]
}

export function getPresetsByPlatform(platform: Platform): FormatPreset[] {
  return PRESETS.filter(p => p.platform === platform)
}
