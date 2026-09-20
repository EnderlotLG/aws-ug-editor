import { forwardRef, useMemo } from 'react'
import { forwardRef, useMemo } from 'react'
import { useEditorStore } from '../../store/useEditorStore'
import { getPreset } from '../../config/presets'
import { getBlocks } from '../../config/blocks'
import { getAccentHex, THEME_BACKGROUNDS, THEME_TEXT } from '../../config/colors'
import { GridBackground } from './GridBackground'
import { AwsSmileLogo } from './AwsSmileLogo'

const MAX_PREVIEW_SIZE = 540

export const TemplateCanvas = forwardRef<HTMLDivElement, Record<string, never>>(
  function TemplateCanvas(_props, ref) {
    const {
      activePresetId,
      theme,
      accentColor,
      layers,
      headline,
      speakerName,
      ugName,
      customLogoBase64,
    } = useEditorStore()

    const preset             = getPreset(activePresetId)
    const { width, height }  = preset

    const scaleFactor = useMemo(() => {
      const maxDim = Math.max(width, height)
      return Math.min(1, MAX_PREVIEW_SIZE / maxDim)
    }, [width, height])

    const blocks     = useMemo(() => getBlocks(width, height), [width, height])
    const accentHex  = getAccentHex(accentColor)
    const bgColor    = THEME_BACKGROUNDS[theme]
    const textColors = THEME_TEXT[theme]

    const layerOn = (id: string) =>
      layers.find(l => l.id === id)?.isVisible ?? true

    // Grid cell unit — 1/8 of the shorter side
    const cell = Math.round(Math.min(width, height) / 8)

    // Responsive font sizes
    const fsHeadline = Math.round(Math.min(width, height) * 0.07)
    const fsBody     = Math.round(Math.min(width, height) * 0.032)
    const fsUg       = Math.round(Math.min(width, height) * 0.026)
    const logoW      = Math.round(width * 0.12)

    // Brandmark bar height
    const brandH = Math.round(height * 0.1)

    return (
      /* Outer wrapper – CSS-scaled for preview */
      <div
        className="canvas-wrapper"
        style={{ width: width * scaleFactor, height: height * scaleFactor, flexShrink: 0 }}
      >
        {/* Inner canvas – full resolution, scaled via CSS */}
        <div
          ref={ref}
          id="template-canvas"
          style={{
            width,
            height,
            position:        'relative',
            overflow:        'hidden',
            backgroundColor: bgColor,
            transformOrigin: 'top left',
            transform:       `scale(${scaleFactor})`,
            fontFamily:      "'Inter', system-ui, sans-serif",
          }}
        >
          {/* ── Grid ───────────────────────────────────────────────────── */}
          <GridBackground
            width={width}
            height={height}
            lineColor={theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}
            cellSize={cell}
          />

          {/* ── Decorative accent blocks ────────────────────────────────── */}
          {layerOn('BOXES') && blocks.map(b => (
            <div
              key={b.id}
              style={{
                position:        'absolute',
                left:            b.x,
                top:             b.y,
                width:           b.width,
                height:          b.height,
                backgroundColor: accentHex,
              }}
            />
          ))}

          {/* ── Headline + body text ─────────────────────────────────────── */}
          {layerOn('HEADLINE') && (
            <div
              style={{
                position:   'absolute',
                left:       cell * 1.5,
                top:        height * 0.30,
                maxWidth:   width * 0.72,
              }}
            >
              <div style={{
                color:         textColors.primary,
                fontSize:      fsHeadline,
                fontWeight:    900,
                lineHeight:    1.1,
                letterSpacing: '-0.02em',
                marginBottom:  fsBody * 0.8,
              }}>
                {headline}
              </div>
              <div style={{
                color:      textColors.secondary,
                fontSize:   fsBody,
                fontWeight: 700,
              }}>
                {speakerName}
              </div>
            </div>
          )}

          {/* ── Brandmark bar (bottom) ───────────────────────────────────── */}
          {layerOn('BRANDMARK') && (
            <div
              style={{
                position:        'absolute',
                bottom:          0,
                left:            cell,           // starts after left column blocks
                right:           cell,           // leaves room before custom logo square
                height:          brandH,
                backgroundColor: accentHex,
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                gap:             Math.round(width * 0.02),
              }}
            >
              {/* Chip icon */}
              <svg
                width={brandH * 0.5}
                height={brandH * 0.5}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <rect x="7" y="7" width="10" height="10" rx="1"
                  stroke={bgColor} strokeWidth="1.5" fill="none" />
                <line x1="9" y1="7" x2="9" y2="4"   stroke={bgColor} strokeWidth="1.5" strokeLinecap="round" />
                <line x1="12" y1="7" x2="12" y2="4"  stroke={bgColor} strokeWidth="1.5" strokeLinecap="round" />
                <line x1="15" y1="7" x2="15" y2="4"  stroke={bgColor} strokeWidth="1.5" strokeLinecap="round" />
                <line x1="9" y1="17" x2="9" y2="20"  stroke={bgColor} strokeWidth="1.5" strokeLinecap="round" />
                <line x1="12" y1="17" x2="12" y2="20" stroke={bgColor} strokeWidth="1.5" strokeLinecap="round" />
                <line x1="15" y1="17" x2="15" y2="20" stroke={bgColor} strokeWidth="1.5" strokeLinecap="round" />
                <line x1="7" y1="9" x2="4" y2="9"   stroke={bgColor} strokeWidth="1.5" strokeLinecap="round" />
                <line x1="7" y1="12" x2="4" y2="12"  stroke={bgColor} strokeWidth="1.5" strokeLinecap="round" />
                <line x1="7" y1="15" x2="4" y2="15"  stroke={bgColor} strokeWidth="1.5" strokeLinecap="round" />
                <line x1="17" y1="9" x2="20" y2="9"  stroke={bgColor} strokeWidth="1.5" strokeLinecap="round" />
                <line x1="17" y1="12" x2="20" y2="12" stroke={bgColor} strokeWidth="1.5" strokeLinecap="round" />
                <line x1="17" y1="15" x2="20" y2="15" stroke={bgColor} strokeWidth="1.5" strokeLinecap="round" />
              </svg>

              {/* UG name */}
              <div style={{
                color:      bgColor,
                fontSize:   fsUg,
                fontWeight: 600,
                textAlign:  'center',
                lineHeight: 1.3,
              }}>
                {ugName}
              </div>
            </div>
          )}

          {/* ── AWS logo – top-left ──────────────────────────────────────── */}
          {layerOn('BRANDMARK') && (
            <div style={{
              position: 'absolute',
              top:      Math.round(height * 0.03),
              left:     Math.round(width  * 0.04),
            }}>
              <AwsSmileLogo width={logoW} variant={theme === 'dark' ? 'white' : 'color'} />
            </div>
          )}

          {/* ── Community logo placeholder / upload ─────────────────────── */}
          {layerOn('BRANDMARK') && (
            <div
              style={{
                position:        'absolute',
                bottom:          0,
                right:           0,
                width:           cell,
                height:          brandH,
                backgroundColor: '#ffffff',
                border:          '2px solid rgba(150,100,255,0.5)',
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                overflow:        'hidden',
              }}
            >
              {customLogoBase64 ? (
                <img
                  src={customLogoBase64}
                  alt="Community logo"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : null}
            </div>
          )}

          {/* ── TEXT_BOX layer (body / secondary text) ─────────────────── */}
          {layerOn('TEXT_BOX') && (
            <div style={{
              position:  'absolute',
              left:      cell * 1.5,
              top:       height * 0.22,
              color:     textColors.secondary,
              fontSize:  fsBody,
              fontWeight: 600,
              opacity:   0.7,
            }}>
              {/* Extra body slot – left empty by default, user fills via editor */}
            </div>
          )}
        </div>
      </div>
    )
  },
)
