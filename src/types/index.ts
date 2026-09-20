// ─── Format Presets ──────────────────────────────────────────────────────────

export type Platform = 'Instagram' | 'Facebook' | 'LinkedIn' | 'X' | 'Web' | 'Print'

export interface FormatPreset {
  id: string
  label: string
  platform: Platform
  width: number
  height: number
}

// ─── Theme & Colors ───────────────────────────────────────────────────────────

export type Theme = 'dark' | 'light'

export type AccentColor = 'orange' | 'green' | 'blue' | 'pink' | 'purple'

export interface AccentPalette {
  id: AccentColor
  label: string
  hex: string
  tailwind: string
}

// ─── Layers ──────────────────────────────────────────────────────────────────

export type LayerId = 'BOXES' | 'TEXT_BOX' | 'HEADLINE' | 'BRANDMARK'

export interface Layer {
  id: LayerId
  label: string
  isVisible: boolean
}

// ─── Block geometry (per-format) ─────────────────────────────────────────────

export interface BlockDef {
  id: string
  x: number
  y: number
  width: number
  height: number
  opacity?: number
  radius?: number
}

// ─── Design pattern ───────────────────────────────────────────────────────────

export type DesignPattern =
  | 'staircase' | 'checkerboard' | 'corner-L' | 'diagonal' | 'scattered'
  | 'cross' | 'frame' | 'zigzag' | 'split' | 'border'

// ─── Global editor state ─────────────────────────────────────────────────────

export interface EditorState {
  activePresetId: string
  theme: Theme
  accentColor: AccentColor
  layers: Layer[]
  headline: string
  speakerName: string
  ugName: string
  customLogoBase64: string | null
  designPattern: DesignPattern

  // Actions
  setPreset: (id: string) => void
  setTheme: (theme: Theme) => void
  setAccentColor: (color: AccentColor) => void
  toggleLayer: (id: LayerId) => void
  setHeadline: (v: string) => void
  setSpeakerName: (v: string) => void
  setUgName: (v: string) => void
  setCustomLogo: (base64: string | null) => void
  setDesignPattern: (pattern: DesignPattern) => void
  randomizePattern: () => void
}
