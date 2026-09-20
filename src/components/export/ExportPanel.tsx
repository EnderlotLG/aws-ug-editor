import { Download, Copy, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import type { RefObject } from 'react'
import { useExport, type ExportFormat } from '../../hooks/useExport'
import { useEditorStore } from '../../store/useEditorStore'
import { getPreset } from '../../config/presets'

interface Props {
  canvasRef: RefObject<HTMLDivElement | null>
}

const FORMAT_BUTTONS: { format: ExportFormat; label: string }[] = [
  { format: 'png', label: 'PNG' },
  { format: 'jpg', label: 'JPG' },
  { format: 'svg', label: 'SVG' },
]

export function ExportPanel({ canvasRef }: Props) {
  const { activePresetId } = useEditorStore()
  const preset = getPreset(activePresetId)

  const {
    status,
    errorMsg,
    jpgQuality,
    setJpgQuality,
    exportAs,
    copyToClipboard,
  } = useExport(canvasRef)

  const busy    = status === 'exporting'
  const success = status === 'success'
  const error   = status === 'error'

  return (
    <div
      className="flex items-center gap-3 px-4 py-2 bg-slate-950 border-t border-slate-800 flex-wrap"
      aria-label="Export controls"
    >
      {/* Canvas dimensions badge */}
      <span className="text-xs text-slate-500 font-mono tabular-nums shrink-0">
        {preset.width} × {preset.height} px
        <span className="ml-1 text-slate-700">@2×</span>
      </span>

      <div className="h-4 w-px bg-slate-800 shrink-0" aria-hidden="true" />

      {/* JPG quality slider */}
      <div className="flex items-center gap-2 shrink-0">
        <label className="text-xs text-slate-500 whitespace-nowrap">
          JPG quality
        </label>
        <input
          type="range"
          min={10}
          max={100}
          step={1}
          value={jpgQuality}
          onChange={(e) => setJpgQuality(Number(e.target.value))}
          className="w-20 accent-amber-500"
          aria-label="JPG quality"
        />
        <span className="text-xs text-slate-400 font-mono w-7 text-right">
          {jpgQuality}%
        </span>
      </div>

      <div className="h-4 w-px bg-slate-800 shrink-0" aria-hidden="true" />

      {/* Download buttons – PNG / JPG / SVG */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {FORMAT_BUTTONS.map(({ format, label }) => (
          <button
            key={format}
            onClick={() => exportAs(format)}
            disabled={busy}
            className={[
              'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
              busy
                ? 'cursor-not-allowed bg-slate-800 text-slate-600'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white',
            ].join(' ')}
            aria-label={`Download as ${label}`}
          >
            {busy
              ? <Loader2 size={12} className="animate-spin" />
              : <Download size={12} />}
            {label}
          </button>
        ))}
      </div>

      {/* Copy to clipboard */}
      <button
        onClick={copyToClipboard}
        disabled={busy}
        className={[
          'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ml-auto',
          busy
            ? 'cursor-not-allowed bg-slate-800 text-slate-600'
            : 'bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 hover:text-amber-300 border border-amber-500/20',
        ].join(' ')}
        aria-label="Copy to clipboard as PNG"
      >
        {busy
          ? <Loader2 size={12} className="animate-spin" />
          : <Copy size={12} />}
        Copy PNG
      </button>

      {/* Status feedback */}
      {success && (
        <span className="flex items-center gap-1 text-xs text-emerald-400 animate-fade-in">
          <CheckCircle2 size={13} /> Done
        </span>
      )}
      {error && (
        <span
          className="flex items-center gap-1 text-xs text-red-400 max-w-xs truncate"
          title={errorMsg ?? ''}
        >
          <AlertCircle size={13} />
          {errorMsg ?? 'Export failed'}
        </span>
      )}
    </div>
  )
}
