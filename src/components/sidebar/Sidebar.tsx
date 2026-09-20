import { ThemeSelector }          from './ThemeSelector'
import { AccentColorSelector }    from './AccentColorSelector'
import { DesignPatternSelector }  from './DesignPatternSelector'
import { LogoUploader }           from './LogoUploader'
import { LayersPanel }            from './LayersPanel'
import { TextFields }             from './TextFields'

function Divider() {
  return <hr className="border-slate-800" />
}

export function Sidebar() {
  return (
    <aside
      className="flex flex-col gap-5 overflow-y-auto bg-slate-950 border-r border-slate-800 px-4 py-5"
      style={{ width: 264, minWidth: 264 }}
      aria-label="Editor controls"
    >
      {/* Header */}
      <div className="flex items-center gap-2 pb-1">
        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
          UG Editor
        </span>
        <span className="ml-auto rounded bg-amber-500/20 px-1.5 py-0.5 text-xs font-bold text-amber-400">
          AWS
        </span>
      </div>

      <Divider />
      <ThemeSelector />

      <Divider />
      <AccentColorSelector />

      {/* ── Design randomizer ── */}
      <Divider />
      <DesignPatternSelector />

      <Divider />
      <LogoUploader />

      <Divider />
      <LayersPanel />

      <Divider />
      <TextFields />
    </aside>
  )
}
