/**
 * AWS logomark – inline SVG replica of the official wordmark + smile.
 * Rendered inline so it NEVER taints the export canvas (no external URLs).
 */
export function AwsSmileLogo({
  size = 64,
  smileColor = '#FF9900',
}: {
  size?: number
  smileColor?: string
}) {
  // The viewBox is 80×40 – matches the ~2:1 ratio of the real AWS wordmark
  return (
    <svg
      width={size}
      height={size * 0.5}
      viewBox="0 0 80 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AWS"
    >
      {/* ── "AWS" letterforms (simplified bold sans) ── */}
      {/* A */}
      <path
        d="M4 28 L9 8 L14 28 M6 21 H12"
        stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"
        fill="none"
      />
      {/* W */}
      <path
        d="M17 8 L21 24 L25 13 L29 24 L33 8"
        stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"
        fill="none"
      />
      {/* S */}
      <path
        d="M46 11 C46 9 44 8 41 8 C38 8 36 9.5 36 12 C36 15 39 16 42 17.5 C45 19 47 21 47 24 C47 27 44.5 28.5 41 28.5 C37.5 28.5 35 27 35 25"
        stroke="white" strokeWidth="2.8" strokeLinecap="round"
        fill="none"
      />

      {/* ── Smile arc ── */}
      <path
        d="M6 34 Q25 42 52 34"
        stroke={smileColor} strokeWidth="2.5" strokeLinecap="round"
        fill="none"
      />
      {/* Arrow tip at right of smile */}
      <path
        d="M48 31 L52 34 L48 36.5"
        stroke={smileColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
