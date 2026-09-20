import { Sun, Moon } from 'lucide-react'
import { useEditorStore } from '../../store/useEditorStore'
import { SectionTitle } from './SectionTitle'

export function ThemeSelector() {
  const { theme, setTheme } = useEditorStore()

  const options = [
    { id: 'dark'  as const, label: 'Dark',  Icon: Moon },
    { id: 'light' as const, label: 'Light', Icon: Sun  },
  ]

  return (
    <div>
      <SectionTitle>Background</SectionTitle>
      <div className="flex gap-2">
        {options.map(({ id, label, Icon }) => {
          const active = theme === id
          return (
            <button
              key={id}
              onClick={() => setTheme(id)}
              aria-pressed={active}
              className={[
                'flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all',
                active
                  ? 'bg-slate-100 text-slate-900 shadow'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200',
              ].join(' ')}
            >
              <Icon size={13} />
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
