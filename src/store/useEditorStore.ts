import { create } from 'zustand'
import type { EditorState, LayerId, DesignPattern, GridSize } from '../types'
import { randomPattern } from '../config/blocks'

const DEFAULT_LAYERS = [
  { id: 'BOXES'     as LayerId, label: 'Boxes',     isVisible: true },
  { id: 'TEXT_BOX'  as LayerId, label: 'Text Box',  isVisible: true },
  { id: 'HEADLINE'  as LayerId, label: 'Headline',  isVisible: true },
  { id: 'BRANDMARK' as LayerId, label: 'Brandmark', isVisible: true },
]

const GRID_SIZES: GridSize[] = [6, 8, 10, 12]

function randomGridSize(): GridSize {
  return GRID_SIZES[Math.floor(Math.random() * GRID_SIZES.length)]
}

export const useEditorStore = create<EditorState>((set) => ({
  // ── Default state ─────────────────────────────────────────────────────────
  activePresetId:   'ig-post',
  theme:            'dark',
  accentColor:      'orange',
  layers:           DEFAULT_LAYERS,
  headline:         "Programmers' Day: IA Aplicada",
  speakerName:      'Fernando Gutiérrez',
  ugName:           "AWS User Group Mariachi Builder's",
  customLogoBase64: null,
  designPattern:    'staircase',
  gridSize:         8,

  // ── Actions ───────────────────────────────────────────────────────────────
  setPreset:        (id)                    => set({ activePresetId: id }),
  setTheme:         (theme)                 => set({ theme }),
  setAccentColor:   (accentColor)           => set({ accentColor }),
  setHeadline:      (headline)              => set({ headline }),
  setSpeakerName:   (speakerName)           => set({ speakerName }),
  setUgName:        (ugName)                => set({ ugName }),
  setCustomLogo:    (customLogoBase64)      => set({ customLogoBase64 }),
  setDesignPattern: (designPattern: DesignPattern) => set({ designPattern }),
  setGridSize:      (gridSize: GridSize)    => set({ gridSize }),

  // Randomizes both the block pattern AND the grid cell size for unique combos
  randomizePattern: () => set({
    designPattern: randomPattern(),
    gridSize:      randomGridSize(),
  }),

  toggleLayer: (id: LayerId) =>
    set((state) => ({
      layers: state.layers.map((l) =>
        l.id === id ? { ...l, isVisible: !l.isVisible } : l,
      ),
    })),
}))
