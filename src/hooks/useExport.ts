import { useCallback, useState, type RefObject } from 'react'
import { toPng, toJpeg, toSvg } from 'html-to-image'
import { useEditorStore } from '../store/useEditorStore'
import { getPreset } from '../config/presets'

export type ExportFormat = 'png' | 'jpg' | 'svg'
export type ExportStatus = 'idle' | 'exporting' | 'success' | 'error'

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

/**
 * Temporarily strips the CSS transform from the canvas node so html-to-image
 * captures it at its true DOM dimensions (e.g. 1080×1080), then restores it.
 * Returns a cleanup function that MUST be called after capture.
 */
function prepareNodeForCapture(node: HTMLDivElement): () => void {
  const prev = node.style.transform
  const prevOrigin = node.style.transformOrigin
  node.style.transform = 'none'
  node.style.transformOrigin = 'top left'
  return () => {
    node.style.transform = prev
    node.style.transformOrigin = prevOrigin
  }
}

export function useExport(canvasRef: RefObject<HTMLDivElement | null>) {
  const { activePresetId } = useEditorStore()
  const preset = getPreset(activePresetId)

  const [status,     setStatus]     = useState<ExportStatus>('idle')
  const [errorMsg,   setErrorMsg]   = useState<string | null>(null)
  const [jpgQuality, setJpgQuality] = useState<number>(92)

  // Options passed to html-to-image — no pixelRatio scaling needed because
  // the node already IS the full-resolution element (1080×1080, etc.)
  const baseOptions = {
    width:     preset.width,
    height:    preset.height,
    pixelRatio: 1,   // node is already full-res; no extra scaling
    skipFonts: false,
    style: {
      transform:       'none',
      transformOrigin: 'top left',
    },
  }

  // ── Core export ────────────────────────────────────────────────────────────
  const exportAs = useCallback(
    async (format: ExportFormat) => {
      const node = canvasRef.current
      if (!node) return

      setStatus('exporting')
      setErrorMsg(null)

      const restore = prepareNodeForCapture(node)

      try {
        await document.fonts.ready

        let dataUrl: string

        switch (format) {
          case 'png':
            dataUrl = await toPng(node, { ...baseOptions })
            break
          case 'jpg':
            dataUrl = await toJpeg(node, {
              ...baseOptions,
              quality:         jpgQuality / 100,
              backgroundColor: '#000000',
            })
            break
          case 'svg':
            dataUrl = await toSvg(node, { ...baseOptions })
            break
          default:
            throw new Error(`Unknown format: ${format as string}`)
        }

        restore()
        triggerDownload(dataUrl, buildFilename(activePresetId, format))
        setStatus('success')
        setTimeout(() => setStatus('idle'), 2500)
      } catch (err) {
        restore()
        const msg = err instanceof Error ? err.message : 'Export failed'
        setErrorMsg(msg)
        setStatus('error')
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [canvasRef, activePresetId, preset, jpgQuality],
  )

  // ── Copy to clipboard ──────────────────────────────────────────────────────
  const copyToClipboard = useCallback(async () => {
    const node = canvasRef.current
    if (!node) return

    setStatus('exporting')
    setErrorMsg(null)

    const restore = prepareNodeForCapture(node)

    try {
      await document.fonts.ready
      const dataUrl = await toPng(node, { ...baseOptions })
      restore()

      const res  = await fetch(dataUrl)
      const blob = await res.blob()
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])

      setStatus('success')
      setTimeout(() => setStatus('idle'), 2500)
    } catch (err) {
      restore()
      const msg = err instanceof Error ? err.message : 'Clipboard write failed'
      setErrorMsg(msg)
      setStatus('error')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, activePresetId, preset])

  return { status, errorMsg, jpgQuality, setJpgQuality, exportAs, copyToClipboard }
}
