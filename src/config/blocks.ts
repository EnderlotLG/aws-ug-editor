import type { BlockDef } from '../types'

/**
 * Ten named block patterns based on the reference PDF.
 * Each builder returns absolute-px BlockDef[] for any canvas size.
 * Cell unit = min(w,h)/8 — keeps proportions across all formats.
 */

export type PatternId =
  | 'staircase'
  | 'checkerboard'
  | 'corner-L'
  | 'diagonal'
  | 'scattered'
  | 'cross'
  | 'frame'
  | 'zigzag'
  | 'split'
  | 'border'

export const PATTERN_LABELS: Record<PatternId, string> = {
  staircase:    'Escalera',
  checkerboard: 'Tablero',
  'corner-L':   'Esquina L',
  diagonal:     'Diagonal',
  scattered:    'Disperso',
  cross:        'Cruz',
  frame:        'Marco',
  zigzag:       'Zigzag',
  split:        'División',
  border:       'Borde',
}

export const ALL_PATTERNS: PatternId[] = [
  'staircase', 'checkerboard', 'corner-L', 'diagonal', 'scattered',
  'cross', 'frame', 'zigzag', 'split', 'border',
]

// ─── Builders ────────────────────────────────────────────────────────────────

/** Left staircase – ascending column (PDF orange story) */
function patternStaircase(w: number, h: number): BlockDef[] {
  const c = Math.round(Math.min(w, h) / 8)
  return [
    { id: 'b1', x: 0, y: c * 0, width: c,     height: c },
    { id: 'b2', x: 0, y: c * 1, width: c * 2, height: c },
    { id: 'b3', x: 0, y: c * 3, width: c,     height: c },
    { id: 'b4', x: 0, y: c * 4, width: c * 2, height: c },
    { id: 'b5', x: 0, y: c * 6, width: c,     height: c },
  ]
}

/** Top-right + bottom-right clusters (PDF dark/green post) */
function patternCheckerboard(w: number, h: number): BlockDef[] {
  const c = Math.round(Math.min(w, h) / 8)
  return [
    { id: 'b1', x: w - c * 2, y: 0,            width: c,     height: c     },
    { id: 'b2', x: w - c,     y: 0,            width: c,     height: c * 2 },
    { id: 'b3', x: w - c * 3, y: h * 0.55,     width: c * 2, height: c     },
    { id: 'b4', x: w - c * 2, y: h * 0.55 + c, width: c,     height: c     },
    { id: 'b5', x: w - c,     y: h * 0.55 + c, width: c,     height: c     },
  ]
}

/** Big L top-right + accent bottom-left (PDF green story) */
function patternCornerL(w: number, h: number): BlockDef[] {
  const c = Math.round(Math.min(w, h) / 8)
  return [
    { id: 'b1', x: w - c * 2, y: 0,        width: c * 2, height: c     },
    { id: 'b2', x: w - c,     y: c,        width: c,     height: c * 2 },
    { id: 'b3', x: 0,         y: h - c * 3,width: c,     height: c     },
    { id: 'b4', x: 0,         y: h - c * 2,width: c * 2, height: c     },
    { id: 'b5', x: w - c,     y: h - c * 3,width: c,     height: c     },
  ]
}

/** Cascading diagonal from top-left to bottom-right */
function patternDiagonal(w: number, h: number): BlockDef[] {
  const c = Math.round(Math.min(w, h) / 8)
  return [
    { id: 'b1', x: 0,         y: 0,        width: c,     height: c     },
    { id: 'b2', x: c,         y: c,        width: c * 2, height: c * 2 },
    { id: 'b3', x: w - c * 2, y: c * 2,   width: c,     height: c     },
    { id: 'b4', x: c * 2,     y: c * 4,   width: c,     height: c     },
    { id: 'b5', x: w - c,     y: h * 0.6, width: c,     height: c * 2 },
  ]
}

/** Clusters in three corners, sparse feel */
function patternScattered(w: number, h: number): BlockDef[] {
  const c = Math.round(Math.min(w, h) / 8)
  return [
    { id: 'b1', x: w - c * 2, y: 0,          width: c * 2, height: c     },
    { id: 'b2', x: w - c,     y: c,          width: c,     height: c     },
    { id: 'b3', x: w - c * 2, y: c * 2,      width: c,     height: c     },
    { id: 'b4', x: 0,         y: c * 2,      width: c,     height: c     },
    { id: 'b5', x: w - c,     y: h - c * 3,  width: c,     height: c * 2 },
  ]
}

/** Symmetrical cross centred in the canvas */
function patternCross(w: number, h: number): BlockDef[] {
  const c = Math.round(Math.min(w, h) / 8)
  const cx = Math.round((w - c) / 2)
  const cy = Math.round((h - c) / 2)
  return [
    { id: 'b1', x: cx - c, y: cy,     width: c * 3, height: c },  // horizontal bar
    { id: 'b2', x: cx,     y: cy - c, width: c,     height: c * 3 }, // vertical bar
    { id: 'b3', x: 0,      y: 0,      width: c,     height: c }, // top-left accent
    { id: 'b4', x: w - c,  y: h - c,  width: c,     height: c }, // bottom-right accent
  ]
}

/** Partial frame – top bar + right column */
function patternFrame(w: number, h: number): BlockDef[] {
  const c = Math.round(Math.min(w, h) / 8)
  return [
    // top full bar
    { id: 'b1', x: 0,     y: 0,     width: w,     height: c     },
    // right partial column
    { id: 'b2', x: w - c, y: c,     width: c,     height: c * 3 },
    // bottom-left accent
    { id: 'b3', x: 0,     y: h - c, width: c * 2, height: c     },
  ]
}

/** Zigzag row of alternating offset squares */
function patternZigzag(w: number, h: number): BlockDef[] {
  const c = Math.round(Math.min(w, h) / 8)
  const mid = Math.round(h / 2) - c
  return [
    { id: 'b1', x: 0,         y: mid - c, width: c, height: c },
    { id: 'b2', x: c,         y: mid,     width: c, height: c },
    { id: 'b3', x: c * 2,     y: mid - c, width: c, height: c },
    { id: 'b4', x: c * 3,     y: mid,     width: c, height: c },
    { id: 'b5', x: w - c,     y: 0,       width: c, height: c * 2 },
    { id: 'b6', x: 0,         y: h - c,   width: c, height: c },
  ]
}

/** Canvas split: large block fills left third, accents on right */
function patternSplit(w: number, h: number): BlockDef[] {
  const c = Math.round(Math.min(w, h) / 8)
  return [
    // large left band (top portion)
    { id: 'b1', x: 0,         y: 0,        width: Math.round(w * 0.35), height: Math.round(h * 0.6) },
    // right accents
    { id: 'b2', x: w - c * 2, y: 0,        width: c * 2, height: c     },
    { id: 'b3', x: w - c,     y: c,        width: c,     height: c * 2 },
    { id: 'b4', x: w - c * 2, y: h - c,    width: c * 2, height: c     },
  ]
}

/** Two accent strips — top-right corner band + bottom-left corner band */
function patternBorder(w: number, h: number): BlockDef[] {
  const c = Math.round(Math.min(w, h) / 8)
  return [
    // top-right band
    { id: 'b1', x: Math.round(w * 0.5), y: 0,     width: Math.round(w * 0.5), height: c     },
    { id: 'b2', x: w - c,               y: c,     width: c,                   height: c * 2 },
    // bottom-left band
    { id: 'b3', x: 0,                   y: h - c, width: Math.round(w * 0.5), height: c     },
    { id: 'b4', x: 0,                   y: h - c * 3, width: c,               height: c * 2 },
  ]
}

// ─── Public API ───────────────────────────────────────────────────────────────

const BUILDERS: Record<PatternId, (w: number, h: number) => BlockDef[]> = {
  staircase:    patternStaircase,
  checkerboard: patternCheckerboard,
  'corner-L':   patternCornerL,
  diagonal:     patternDiagonal,
  scattered:    patternScattered,
  cross:        patternCross,
  frame:        patternFrame,
  zigzag:       patternZigzag,
  split:        patternSplit,
  border:       patternBorder,
}

export function getBlocks(
  width: number,
  height: number,
  pattern: PatternId = 'staircase',
): BlockDef[] {
  return BUILDERS[pattern](width, height)
}

export function randomPattern(): PatternId {
  return ALL_PATTERNS[Math.floor(Math.random() * ALL_PATTERNS.length)]
}
