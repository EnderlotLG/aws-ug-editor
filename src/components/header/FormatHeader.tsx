import { useState } from 'react'
import { Monitor, Instagram, Facebook, Linkedin, Twitter, Printer } from 'lucide-react'
import { useEditorStore } from '../../store/useEditorStore'
import { PLATFORMS, getPresetsByPlatform } from '../../config/presets'
import type { Platform } from '../../types'

const PLATFORM_ICONS: Record<Platform, React.ReactNode> = {
  Instagram: <Instagram size={13} />,
  Facebook:  <Facebook  size={13} />,
  LinkedIn:  <Linkedin  size={13} />,
  X:         <Twitter   size={13} />,
  Web:       <Monitor   size={13} />,
  Print:     <Printer   size={13} />,
}

export function FormatHeader() {
  const { activePresetId, setPreset } = useEditorStore()
  const [activePlatform, setActivePlatform] = useState<Platform>('Instagram')

  const presetsForPlatform = getPresetsByPlatform(activePlatform)

  return (
    <header
      className="flex flex-col gap-0 border-b border-slate-800 bg-slate-950 select-none"
      aria-label="Format selector"
    >
      {/* Top bar – app name + platform tabs */}
      <div className="flex items-center gap-4 px-4 h-12 border-b border-slate-800/60">
        {/* Brand */}
        <div className="flex items-center gap-2 mr-4 shrink-0">
          <span className="rounded bg-amber-500 px-1.5 py-0.5 text-xs font-black text-slate-900 leading-none">
            AWS
          </span>
          <span className="text-xs font-semibold text-slate-300 hidden sm:inline">
            User Group Visual Editor
          </span>
        </div>

        {/* Platform tabs */}
        <nav className="flex gap-0.5 overflow-x-auto" role="tablist" aria-label="Platform">
          {PLATFORMS.map((p) => {
            const active = activePlatform === p
            return (
              <button
                key={p}
                role="tab"
                aria-selected={active}
                onClick={() => setActivePlatform(p)}
                className={[
                  'flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                  active
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300',
                ].join(' ')}
              >
                {PLATFORM_ICONS[p]}
                {p}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Preset chips row */}
      <div
        className="flex items-center gap-2 px-4 h-10 overflow-x-auto"
        role="tabpanel"
        aria-label={`${activePlatform} formats`}
      >
        {presetsForPlatform.map((preset) => {
          const active = activePresetId === preset.id
          return (
            <button
              key={preset.id}
              onClick={() => setPreset(preset.id)}
              aria-pressed={active}
              className={[
                'flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all',
                active
                  ? 'bg-amber-500 text-slate-900 shadow shadow-amber-500/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200',
              ].join(' ')}
            >
              <span
                className="inline-block rounded-sm shrink-0"
                style={{
                  width:  preset.width > preset.height ? 14 : 10,
                  height: preset.height > preset.width ? 14 : 10,
                  background: active ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.15)',
                }}
                aria-hidden="true"
              />
              {preset.label}
            </button>
          )
        })}
      </div>
    </header>
  )
}
