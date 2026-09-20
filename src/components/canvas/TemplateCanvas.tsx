import { forwardRef, useMemo } from 'react'
import { useEditorStore } from '../../store/useEditorStore'
import { getPreset } from '../../config/presets'
import { getBlocks } from '../../config/blocks'
import { getAccentHex, THEME_BACKGROUNDS, THEME_TEXT } from '../../config/colors'
import { GridBackground } from './GridBackground'
import { AwsSmileLogo } from './AwsSmileLogo'

/** Max pixel dimension the preview wrapper may occupy (px). */
const MAX_PREVIEW_SIZE = 520

interface Props {
  /** Scale factor for CSS preview; real DOM dimensions stay at full resolution. */
  scale?: number
}

export const TemplateCanvas = forwardRef<HTMLDivElement, Props>(
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

    const preset   = getPreset(activePresetId)
    const { width, height } = preset

    // CSS scale so the full-res canvas fits inside the preview column
    const scaleFactor = useMemo(() => {
      const maxDim = Math.max(width, height)
      return Math.min(1, MAX_PREVIEW_SIZE / maxDim)
    }, [width, height])

    const blocks     = useMemo(() => getBlocks(width, height), [width, height])
    const accentHex  = getAccentHex(accentColor)
    const bgColor    = THEME_BACKGROUNDS[theme]
    const textColors = THEME_TEXT[theme]

    // Layer visibility lookup
    const layerVisible = (id: string) =>
      layers.find((l) => l.id === id)?.isVisible ?? true

    // Dynamic font sizes relative to canvas width
    const fontHeadline   = Math.round(width * 0.055)
    const fontSub        = Math.round(width * 0.028)
    const fontUg         = Math.round(width * 0.022)
    const logoSize       = Math.round(width * 0.1)

    return (
      /* Outer wrapper – CSS-scaled for the preview */
      <div
        className="canvas-wrapper"
        style={{
          width:  width  * scaleFactor,
          height: height * scaleFactor,
          flexShrink: 0,
        }}
      >
        {/* Inner canvas – real resolution, scaled via CSS transform */}
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
          {/* ── Grid background (SVG pattern, always visible) ─────────── */}
          <GridBackground
            width={width}
            height={height}
            lineColor={
              theme === 'dark'
                ? 'rgba(255,255,255,0.045)'
                : 'rgba(0,0,0,0.06)'
            }
          />

          {/* ── Decorative accent blocks ──────────────────────────────── */}
          {layerVisible('BOXES') &&
            blocks.map((b) => (
              <div
                key={b.id}
                style={{
                  position:        'absolute',
                  left:            b.x,
                  top:             b.y,
                  width:           b.width,
                  height:          b.height,
                  backgroundColor: accentHex,
                  opacity:         b.opacity ?? 1,
                  borderRadius:    b.radius ?? 0,
                }}
              />
            ))}

          {/* ── Text box (speaker / role) ─────────────────────────────── */}
          {layerVisible('TEXT_BOX') && (
            <div
              style={{
                position: 'absolute',
                left:     width * 0.06,
                bottom:   height * 0.18,
                maxWidth: width * 0.6,
              }}
            >
              <div
                style={{
                  display:         'inline-block',
                  backgroundColor: accentHex,
                  color:           '#fff',
                  fontSize:        fontSub,
                  fontWeight:      700,
                  padding:         `${height * 0.008}px ${width * 0.02}px`,
                  borderRadius:    4,
                  letterSpacing:   '0.04em',
                  textTransform:   'uppercase',
                  marginBottom:    height * 0.012,
                }}
              >
                AWS User Group
              </div>
              <div
                style={{
                  color:      textColors.secondary,
                  fontSize:   fontSub,
                  fontWeight: 500,
                  marginTop:  height * 0.008,
                }}
              >
                {speakerName}
              </div>
            </div>
          )}

          {/* ── Headline ─────────────────────────────────────────────── */}
          {layerVisible('HEADLINE') && (
            <div
              style={{
                position:   'absolute',
                left:       width * 0.06,
                bottom:     height * 0.28,
                maxWidth:   width * 0.78,
                color:      textColors.primary,
                fontSize:   fontHeadline,
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              {headline}
            </div>
          )}

          {/* ── Brandmark (logos) ─────────────────────────────────────── */}
          {layerVisible('BRANDMARK') && (
            <>
              {/* AWS smile – fixed asset, inline SVG */}
              <div
                style={{
                  position: 'absolute',
                  top:      height * 0.05,
                  left:     width  * 0.06,
                }}
              >
                <AwsSmileLogo size={logoSize} color={accentHex} />
              </div>

              {/* UG name text under logo */}
              <div
                style={{
                  position:   'absolute',
                  top:        height * 0.05 + logoSize + height * 0.015,
                  left:       width  * 0.06,
                  color:      textColors.secondary,
                  fontSize:   fontUg,
                  fontWeight: 600,
                  maxWidth:   width * 0.55,
                  lineHeight: 1.3,
                }}
              >
                {ugName}
              </div>

              {/* Custom community logo (Base64 upload) */}
              {customLogoBase64 && (
                <img
                  src={customLogoBase64}
                  alt="Community logo"
                  style={{
                    position:    'absolute',
                    top:         height * 0.04,
                    right:       width  * 0.14,
                    width:       logoSize * 1.4,
                    height:      logoSize * 1.4,
                    objectFit:   'contain',
                    borderRadius: 8,
                  }}
                />
              )}
            </>
          )}

          {/* ── Bottom accent line ────────────────────────────────────── */}
          <div
            style={{
              position:        'absolute',
              bottom:          0,
              left:            0,
              right:           0,
              height:          height * 0.005,
              backgroundColor: accentHex,
            }}
          />
        </div>
      </div>
    )
  },
)
