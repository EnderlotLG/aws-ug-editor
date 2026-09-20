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
  const stroke = dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.25)'
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
            stroke={stroke} strokeWidth={1} shapeRendering="crispEdges" />
          {/* horizontal line on bottom edge of cell */}
          <line x1={0} y1={cell} x2={cell} y2={cell}
            stroke={stroke} strokeWidth={1} shapeRendering="crispEdges" />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${pid})`} />
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

    const scale = useMemo(
      () => Math.min(1, MAX_PREVIEW / Math.max(width, height)),
      [width, height],
    )

    const cell = useMemo(
      () => Math.max(40, Math.round(Math.min(width, height) / 8)),
      [width, height],
    )

    const blocks    = useMemo(() => getBlocks(width, height, designPattern), [width, height, designPattern])
    const accentHex = getAccentHex(accentColor)
    const bg        = THEME_BACKGROUNDS[theme]
    const txt       = THEME_TEXT[theme]
    const isDark    = theme === 'dark'

    const layerOn = (id: string) => layers.find(l => l.id === id)?.isVisible ?? true

    const logoW   = Math.round(width * 0.13)
    const fsHead  = Math.round(Math.min(width, height) * 0.072)
    const fsSub   = Math.round(Math.min(width, height) * 0.034)
    const brandH  = Math.round(height * 0.095)
    // Community logo square = brandH × brandH
    const ugLogoSz = brandH

    return (
      <div style={{ width: width * scale, height: height * scale, flexShrink: 0 }}>
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

          {/* ── AWS logo – top-left ────────────────────────────────────────── */}
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

          {/* ── Brandmark bar ─────────────────────────────────────────────── */}
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
            }}>
              {/* Community logo – square on the left */}
              <div style={{
                width:           ugLogoSz,
                height:          ugLogoSz,
                flexShrink:      0,
                backgroundColor: isDark ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.25)',
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                overflow:        'hidden',
              }}>
                {customLogoBase64 ? (
                  <img
                    src={customLogoBase64}
                    alt="Community logo"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  /* Placeholder hint when no logo uploaded */
                  <span style={{
                    fontSize:  Math.round(ugLogoSz * 0.22),
                    color:     isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)',
                    textAlign: 'center',
                    lineHeight: 1.2,
                    padding:   4,
                    fontWeight: 600,
                  }}>
                    UG Logo
                  </span>
                )}
              </div>

              {/* UG name text */}
              <span style={{
                flex:          1,
                paddingLeft:   Math.round(width * 0.03),
                paddingRight:  Math.round(width * 0.03),
                color:         bg,
                fontSize:      Math.round(brandH * 0.34),
                fontWeight:    700,
                lineHeight:    1.25,
                overflow:      'hidden',
                textOverflow:  'ellipsis',
                whiteSpace:    'nowrap',
              }}>
                {ugName}
              </span>
            </div>
          )}
        </div>
      </div>
    )
  },
)
