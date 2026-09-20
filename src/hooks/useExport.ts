import { useCallback, useState, type RefObject } from 'react'
import { toPng, toJpeg, toSvg } from 'html-to-image'
import { useEditorStore } from '../store/useEditorStore'
import { getPreset } from '../config/presets'

export type ExportFormat = 'png' | 'jpg' | 'svg'
export type ExportStatus = 'idle' | 'exporting' | 'success' | 'error'

const PIXEL_RATIO = 2 // Retina / High-DPI

function buildFilename(presetId: string, format: ExportFormat): string {
  const ts = new Date().toISOString().slice(0, 10)
  return `aws-ug-${presetId}-${ts}.${format === 'jpg' ? 'jpg' : format}`
}

function triggerDownload(dataUrl: string, filename: string) {
  const a = document.createElement('a')
  a.href = filename.endsWith('.svg')
    ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(dataUrl)}`
    : dataUrl
  a.download = filename
  a.click()
}

export function useExport(canvasRef: RefObject<HTMLDivElement | null>) {
  const { activePresetId } = useEditorStore()
  const preset = getPreset(activePresetId)

  const [status, setStatus]       = useState<ExportStatus>('idle')
  const [errorMsg, setErrorMsg]   = useState<string | null>(null)
  const [jpgQuality, setJpgQuality] = useState<number>(92)

  // ── Shared options ──────────────────────────────────────────────────────
  const baseOptions = {
    pixelRatio: PIXEL_RATIO,
    width:      preset.width,
    height:     preset.height,
    // Inline all fonts so the exported image is self-contained
    skipFonts: false,
  }

  // ── Core export function ────────────────────────────────────────────────
  const exportAs = useCallback(
    async (format: ExportFormat) => {
      const node = canvasRef.current
      if (!node) return

      setStatus('exporting')
      setErrorMsg(null)

      try {
        // Wait for all web fonts to be loaded before capturing
        await document.fonts.ready

        let dataUrl: string

        switch (format) {
          case 'png':
            dataUrl = await toPng(node, { ...baseOptions })
            break
          case 'jpg':
            dataUrl = await toJpeg(node, {
              ...baseOptions,
              quality: jpgQuality / 100,
              backgroundColor: '#000000', // JPG has no transparency
            })
            break
          case 'svg':
            dataUrl = await toSvg(node, { ...baseOptions })
            break
          default:
            throw new Error(`Unknown format: ${format as string}`)
        }

        triggerDownload(dataUrl, buildFilename(activePresetId, format))
        setStatus('success')
        setTimeout(() => setStatus('idle'), 2500)
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Export failed'
        setErrorMsg(msg)
        setStatus('error')
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [canvasRef, activePresetId, preset, jpgQuality],
  )

  // ── Copy to clipboard (PNG only) ────────────────────────────────────────
  const copyToClipboard = useCallback(async () => {
    const node = canvasRef.current
    if (!node) return

    setStatus('exporting')
    setErrorMsg(null)

    try {
      await document.fonts.ready
      const dataUrl = await toPng(node, { ...baseOptions })

      // Convert data-URL → Blob → ClipboardItem
      const res   = await fetch(dataUrl)
      const blob  = await res.blob()
      const item  = new ClipboardItem({ 'image/png': blob })
      await navigator.clipboard.write([item])

      setStatus('success')
      setTimeout(() => setStatus('idle'), 2500)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Clipboard write failed'
      setErrorMsg(msg)
      setStatus('error')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, activePresetId, preset])

  return {
    status,
    errorMsg,
    jpgQuality,
    setJpgQuality,
    exportAs,
    copyToClipboard,
  }
}
