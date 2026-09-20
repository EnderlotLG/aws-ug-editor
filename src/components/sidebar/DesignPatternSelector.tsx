import { Shuffle } from 'lucide-react'
import { useEditorStore } from '../../store/useEditorStore'
import { ALL_PATTERNS, PATTERN_LABELS } from '../../config/blocks'
import type { PatternId } from '../../config/blocks'
import type { GridSize } from '../../types'
import { SectionTitle } from './SectionTitle'

const GRID_OPTIONS: { size: GridSize; label: string }[] = [
  { size: 6,  label: 'XL' },
  { size: 8,  label: 'L'  },
  { size: 10, label: 'M'  },
  { size: 12, label: 'S'  },
]

export function DesignPatternSelector() {
  const { designPattern, setDesignPattern, gridSize, setGridSize, randomizePattern } =
    useEditorStore()

  return (
    <div className="flex flex-col gap-3">

      {/* ── Header row ────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <SectionTitle>Diseño de Bloques</SectionTitle>
        <button
          onClick={randomizePattern}
          title="Aleatorizar patrón y cuadrícula"
          className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-2.5 py-1 text-xs font-bold text-slate-900 hover:bg-amber-400 active:scale-95 transition-all"
        >
          <Shuffle size={12} />
          Aleatorizar
        </button>
      </div>

      {/* ── Block pattern chips ───────────────────────────────────────── */}
      <div className="flex flex-wrap gap-1.5">
        {ALL_PATTERNS.map((id: PatternId) => {
          const active = designPattern === id
          return (
            <button
              key={id}
              onClick={() => setDesignPattern(id)}
              aria-pressed={active}
              className={[
                'rounded-md px-2.5 py-1 text-xs font-medium transition-all border',
                active
                  ? 'bg-amber-500 text-slate-900 border-amber-500'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-slate-200',
              ].join(' ')}
            >
              {PATTERN_LABELS[id]}
            </button>
          )
        })}
      </div>

      {/* ── Grid size selector ────────────────────────────────────────── */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-slate-400">
          Tamaño de cuadrícula
        </span>
        <div className="flex gap-2">
          {GRID_OPTIONS.map(({ size, label }) => {
            const active = gridSize === size
            return (
              <button
                key={size}
                onClick={() => setGridSize(size)}
                aria-pressed={active}
                title={`Celda ${label}`}
                className={[
                  'flex-1 rounded-md py-1.5 text-xs font-bold transition-all border',
                  active
                    ? 'bg-slate-200 text-slate-900 border-slate-200'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-slate-200',
                ].join(' ')}
              >
                {label}
              </button>
            )
          })}
        </div>
        <p className="text-xs text-slate-600">
          XL = pocas celdas grandes · S = muchas celdas pequeñas
        </p>
      </div>

    </div>
  )
}
