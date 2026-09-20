import { forwardRef, useMemo } from 'react'
import { useEditorStore } from '../../store/useEditorStore'
import { getPreset } from '../../config/presets'
import { getBlocks } from '../../config/blocks'
import { getAccentHex, THEME_BACKGROUNDS, THEME_TEXT } from '../../config/colors'
import { AwsSmileLogo } from './AwsSmileLogo'

/** Maximum px the preview wrapper may occupy on screen */
const MAX_PREVIEW = 520

// ── Inline SVG grid background ────────────────────────────────────────────────
function GridBg({
  width, height, cell, dark,
}: { width: number; height: number; cell: number; dark: boolean }) {
  const stroke = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const pid = 'ug-grid'
  return (
    <svg
      width={width} height={height}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <defs>
        <pattern id={pid} width={cell} height={cell} patternUnits="userSpaceOnUse">
          {/* vertical line on right edge of cell */}
          <line x1={cell} y1={0} x2={cell} y2={cell}
            stroke={stroke} strokeWidth={1} />
          {/* horizontal line on bottom edge of cell */}
          <line x1={0} y1={cell} x2={cell} y2={cell}
            stroke={stroke} strokeWidth={1} />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${pid})`} />
    </svg>
  )
}

// ── Chip icon (inline SVG, no external resource) ──────────────────────────────
function ChipIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="7" y="7" width="10" height="10" rx="1.5"
        stroke={color} strokeWidth="1.8" />
      {[9, 12, 15].map(v => (
        <g key={v}>
          <line x1={v} y1={7}  x2={v} y2={4}  stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <line x1={v} y1={17} x2={v} y2={20} stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      ))}
      {[9, 12, 15].map(v => (
        <g key={v}>
          <line x1={7}  y1={v} x2={4}  y2={v} stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <line x1={17} y1={v} x2={20} y2={v} stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  )
}

// ── Main canvas component ─────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const TemplateCanvas = forwardRef<HTMLDivElement, object>(
  function TemplateCanvas(_props, ref) {
    const {
      activePresetId, theme, accentColor,
      layers, headline, speakerName, ugName,
      customLogoBase64, designPattern,
    } = useEditorStore()

    const preset            = getPreset(activePresetId)
    const { width, height } = preset

    // CSS scale factor for the preview wrapper
    const scale = useMemo(
      () => Math.min(1, MAX_PREVIEW / Math.max(width, height)),
      [width, height],
    )

    // Grid cell = 1/8 of the shorter side, min 40px
    const cell = useMemo(
      () => Math.max(40, Math.round(Math.min(width, height) / 8)),
      [width, height],
    )

    const blocks     = useMemo(() => getBlocks(width, height, designPattern), [width, height, designPattern])
    const accentHex  = getAccentHex(accentColor)
    const bg         = THEME_BACKGROUNDS[theme]
    const txt        = THEME_TEXT[theme]
    const isDark     = theme === 'dark'

    const layerOn = (id: string) => layers.find(l => l.id === id)?.isVisible ?? true

    // Responsive sizes relative to canvas width
    const logoW     = Math.round(width * 0.13)   // AWS logo width
    const fsHead    = Math.round(Math.min(width, height) * 0.072)
    const fsSub     = Math.round(Math.min(width, height) * 0.034)
    const brandH    = Math.round(height * 0.095)  // brandmark bar height
    const chipSize  = Math.round(brandH * 0.55)

    return (
      /* Outer wrapper – sized to the scaled dimensions */
      <div style={{ width: width * scale, height: height * scale, flexShrink: 0 }}>

        {/* Inner div – full resolution, CSS-scaled */}
        <div
          ref={ref}
          id="template-canvas"
          style={{
            position: 'relative',
            overflow: 'hidden',
            width, height,
            backgroundColor: bg,
            transformOrigin: 'top left',
            transform: `scale(${scale})`,
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          {/* ── Grid ──────────────────────────────────────────────────────── */}
          <GridBg width={width} height={height} cell={cell} dark={isDark} />

          {/* ── Accent blocks ─────────────────────────────────────────────── */}
          {layerOn('BOXES') && blocks.map(b => (
            <div key={b.id} style={{
              position: 'absolute',
              left: b.x, top: b.y,
              width: b.width, height: b.height,
              backgroundColor: accentHex,
              opacity: b.opacity ?? 1,
            }} />
          ))}

          {/* ── AWS logo – top-left, small and clean ──────────────────────── */}
          {layerOn('BRANDMARK') && (
            <div style={{
              position: 'absolute',
              top:  Math.round(height * 0.03),
              left: Math.round(width  * 0.04),
            }}>
              <AwsSmileLogo width={logoW} variant={isDark ? 'white' : 'color'} />
            </div>
          )}

          {/* ── Headline ──────────────────────────────────────────────────── */}
          {layerOn('HEADLINE') && (
            <div style={{
              position:  'absolute',
              left:      Math.round(width * 0.08),
              bottom:    brandH + Math.round(height * 0.18),
              maxWidth:  Math.round(width * 0.78),
              color:     txt.primary,
              fontSize:  fsHead,
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}>
              {headline}
            </div>
          )}

          {/* ── Speaker / body text ───────────────────────────────────────── */}
          {layerOn('TEXT_BOX') && (
            <div style={{
              position:  'absolute',
              left:      Math.round(width * 0.08),
              bottom:    brandH + Math.round(height * 0.10),
              maxWidth:  Math.round(width * 0.65),
              color:     txt.secondary,
              fontSize:  fsSub,
              fontWeight: 600,
            }}>
              {speakerName}
            </div>
          )}

          {/* ── Brandmark bar – bottom full width ─────────────────────────── */}
          {layerOn('BRANDMARK') && (
            <div style={{
              position:        'absolute',
              bottom:          0,
              left:            0,
              right:           0,
              height:          brandH,
              backgroundColor: accentHex,
              display:         'flex',
              alignItems:      'center',
              paddingLeft:     Math.round(width * 0.04),
              paddingRight:    Math.round(width * 0.04),
              gap:             Math.round(width * 0.02),
              overflow:        'hidden',
            }}>
              {/* Chip icon */}
              <ChipIcon size={chipSize} color={bg} />

              {/* UG name – takes remaining space, truncated */}
              <span style={{
                color:     bg,
                fontSize:  Math.round(brandH * 0.32),
                fontWeight: 700,
                lineHeight: 1.25,
                overflow:  'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flex: 1,
              }}>
                {ugName}
              </span>

              {/* Custom community logo – only shown when uploaded */}
              {customLogoBase64 && (
                <img
                  src={customLogoBase64}
                  alt="Community logo"
                  style={{
                    width:     Math.round(brandH * 0.85),
                    height:    Math.round(brandH * 0.85),
                    objectFit: 'contain',
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    )
  },
)
