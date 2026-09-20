/**
 * Full-canvas SVG grid that stays crisp at any zoom level.
 * Uses a <pattern> so it never loses resolution when the outer
 * wrapper is CSS-scaled for the preview.
 */
export function GridBackground({
  width,
  height,
  cellSize = 40,
  lineColor = 'rgba(255,255,255,0.045)',
}: {
  width: number
  height: number
  cellSize?: number
  lineColor?: string
}) {
  const patternId = 'ug-grid-pattern'

  return (
    <svg
      width={width}
      height={height}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          width={cellSize}
          height={cellSize}
          patternUnits="userSpaceOnUse"
        >
          {/* Vertical line */}
          <line
            x1={cellSize}
            y1="0"
            x2={cellSize}
            y2={cellSize}
            stroke={lineColor}
            strokeWidth="0.5"
          />
          {/* Horizontal line */}
          <line
            x1="0"
            y1={cellSize}
            x2={cellSize}
            y2={cellSize}
            stroke={lineColor}
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${patternId})`} />
    </svg>
  )
}
