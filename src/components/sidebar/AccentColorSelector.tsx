import { Check } from 'lucide-react'
import { useEditorStore } from '../../store/useEditorStore'
import { ACCENT_PALETTES } from '../../config/colors'
import { SectionTitle } from './SectionTitle'

export function AccentColorSelector() {
  const { accentColor, setAccentColor } = useEditorStore()

  return (
    <div>
      <SectionTitle>Secondary Color</SectionTitle>
      <div className="flex gap-2 flex-wrap">
        {ACCENT_PALETTES.map(({ id, label, hex }) => {
          const active = accentColor === id
          return (
            <button
              key={id}
              onClick={() => setAccentColor(id)}
              title={label}
              aria-label={label}
              aria-pressed={active}
              className="relative w-8 h-8 rounded-full transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ backgroundColor: hex }}
            >
              {active && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Check size={14} color="#fff" strokeWidth={3} />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
