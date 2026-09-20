/**
 * AWS "smile" logomark – rendered as inline SVG so it never
 * crosses origins and never taints the export canvas.
 */
export function AwsSmileLogo({
  size = 48,
  color = '#FF9900',
}: {
  size?: number
  color?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AWS logo"
    >
      {/* Wordmark letters – simplified "AWS" */}
      <text
        x="50"
        y="52"
        textAnchor="middle"
        fontFamily="'Inter', sans-serif"
        fontWeight="900"
        fontSize="36"
        fill="#ffffff"
        letterSpacing="-1"
      >
        AWS
      </text>
      {/* Smile arc */}
      <path
        d="M22 68 Q50 88 78 68"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right arrow tip of smile */}
      <path
        d="M72 62 L78 68 L70 70"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
