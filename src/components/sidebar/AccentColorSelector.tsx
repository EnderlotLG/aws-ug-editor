import { Check } from 'lucide-react'
import { useEditorStore } from '../../store/useEditorStore'
import { ACCENT_PALETTES } from '../../config/colors'
import { SectionTitle } from './SectionTitle'

export function AccentColorSelector() {
  const { accentColor, setAccentColor } = useEditorStore()

  return (
    <div>
      <SectionTitle>Secondary Color</SectionTitle>

      {/* 3 × 3 grid matching the palette PDF layout */}
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}
      >
        {ACCENT_PALETTES.map(({ id, label, hex }) => {
          const active = accentColor === id
          // White swatch needs a border so it's visible against the dark sidebar
          const needsBorder = hex === '#ffffff' || hex === '#f8fafc'

          return (
            <button
              key={id}
              onClick={() => setAccentColor(id)}
              title={label}
              aria-label={label}
              aria-pressed={active}
              className="relative flex flex-col items-center gap-1 group focus:outline-none"
            >
              {/* Colour swatch */}
              <span
                className={[
                  'w-full rounded-md transition-transform group-hover:scale-105',
                  active ? 'ring-2 ring-offset-2 ring-offset-slate-950 ring-white scale-105' : '',
                  needsBorder ? 'border border-slate-600' : '',
                ].join(' ')}
                style={{ backgroundColor: hex, height: 36 }}
              >
                {active && (
                  <span className="flex h-full items-center justify-center">
                    <Check
                      size={14}
                      color={needsBorder ? '#0f172a' : '#fff'}
                      strokeWidth={3}
                    />
                  </span>
                )}
              </span>

              {/* Label */}
              <span className="text-center text-slate-500 group-hover:text-slate-300 transition-colors"
                style={{ fontSize: 9, lineHeight: 1.2 }}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
