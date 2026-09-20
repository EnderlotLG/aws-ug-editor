import { Shuffle } from 'lucide-react'
import { useEditorStore } from '../../store/useEditorStore'
import { ALL_PATTERNS, PATTERN_LABELS } from '../../config/blocks'
import type { PatternId } from '../../config/blocks'
import { SectionTitle } from './SectionTitle'

export function DesignPatternSelector() {
  const { designPattern, setDesignPattern, randomizePattern } = useEditorStore()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <SectionTitle>Diseño de Bloques</SectionTitle>
        <button
          onClick={randomizePattern}
          title="Aleatorizar diseño"
          className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-2.5 py-1 text-xs font-bold text-slate-900 hover:bg-amber-400 transition-colors"
        >
          <Shuffle size={12} />
          Aleatorizar
        </button>
      </div>

      {/* Pattern chips */}
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

      {/* Mini preview of the active pattern name */}
      <p className="text-xs text-slate-600 italic">
        Activo: <span className="text-slate-400 not-italic font-medium">{PATTERN_LABELS[designPattern as PatternId]}</span>
      </p>
    </div>
  )
}
