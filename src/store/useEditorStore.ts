import { create } from 'zustand'
import type { EditorState, Theme, AccentColor, LayerId } from '../types'

const DEFAULT_LAYERS = [
  { id: 'BOXES'    as LayerId, label: 'Boxes',      isVisible: true },
  { id: 'TEXT_BOX' as LayerId, label: 'Text Box',   isVisible: true },
  { id: 'HEADLINE' as LayerId, label: 'Headline',   isVisible: true },
  { id: 'BRANDMARK'as LayerId, label: 'Brandmark',  isVisible: true },
]

export const useEditorStore = create<EditorState>((set) => ({
  // ── Default state (as spec) ──────────────────────────────────────────────
  activePresetId:  'ig-post',
  theme:           'dark',
  accentColor:     'orange',
  layers:          DEFAULT_LAYERS,
  headline:        "Programmers' Day: IA Aplicada",
  speakerName:     'Fernando Gutiérrez',
  ugName:          "AWS User Group Mariachi Builder's",
  customLogoBase64: null,

  // ── Actions ───────────────────────────────────────────────────────────────
  setPreset:      (id)           => set({ activePresetId: id }),
  setTheme:       (theme)        => set({ theme }),
  setAccentColor: (accentColor)  => set({ accentColor }),

  toggleLayer: (id: LayerId) =>
    set((state) => ({
      layers: state.layers.map((l) =>
        l.id === id ? { ...l, isVisible: !l.isVisible } : l,
      ),
    })),

  setHeadline:    (headline)    => set({ headline }),
  setSpeakerName: (speakerName) => set({ speakerName }),
  setUgName:      (ugName)      => set({ ugName }),
  setCustomLogo:  (customLogoBase64) => set({ customLogoBase64 }),
}))
