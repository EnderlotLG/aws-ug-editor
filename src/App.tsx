import { useRef } from 'react'
import { FormatHeader }   from './components/header/FormatHeader'
import { Sidebar }        from './components/sidebar/Sidebar'
import { TemplateCanvas } from './components/canvas/TemplateCanvas'
import { ExportPanel }    from './components/export/ExportPanel'

export default function App() {
  // Ref passed to both TemplateCanvas (render target) and ExportPanel (capture source)
  const canvasRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="flex flex-col"
      style={{ height: '100dvh', overflow: 'hidden', background: '#080d1a' }}
    >
      {/* ── Top: platform + format selector ────────────────────────────── */}
      <FormatHeader />

      {/* ── Middle: sidebar + canvas area ──────────────────────────────── */}
      <div className="flex flex-1 min-h-0">

        {/* Left sidebar */}
        <Sidebar />

        {/* Canvas stage – scrollable if canvas is larger than viewport */}
        <main
          className="flex flex-1 items-center justify-center overflow-auto bg-[#0d1324] p-6"
          aria-label="Canvas preview"
        >
          {/* Subtle outer glow / shadow around the canvas */}
          <div
            className="rounded-sm"
            style={{
              boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 24px 80px rgba(0,0,0,0.6)',
            }}
          >
            <TemplateCanvas ref={canvasRef} />
          </div>
        </main>
      </div>

      {/* ── Bottom: export controls ─────────────────────────────────────── */}
      <ExportPanel canvasRef={canvasRef} />
    </div>
  )
}
