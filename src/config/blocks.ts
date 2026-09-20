import type { BlockDef } from '../types'

/**
 * Five named block patterns extracted from the reference PDF.
 * Each pattern is a function of canvas (width, height) → BlockDef[].
 * Blocks are square cells of size = min(w,h)/8.
 */

export type PatternId = 'staircase' | 'checkerboard' | 'corner-L' | 'diagonal' | 'scattered'

export const PATTERN_LABELS: Record<PatternId, string> = {
  'staircase':    'Escalera',
  'checkerboard': 'Tablero',
  'corner-L':     'Esquina L',
  'diagonal':     'Diagonal',
  'scattered':    'Disperso',
}

export const ALL_PATTERNS: PatternId[] = [
  'staircase', 'checkerboard', 'corner-L', 'diagonal', 'scattered',
]

// ─── Pattern builders ────────────────────────────────────────────────────────

/** PDF page 5 – orange story: staircase on left column */
function patternStaircase(w: number, h: number): BlockDef[] {
  const c = Math.round(Math.min(w, h) / 8)
  return [
    { id: 'b1', x: 0,    y: c * 0, width: c,     height: c },
    { id: 'b2', x: 0,    y: c * 1, width: c * 2, height: c },
    { id: 'b3', x: 0,    y: c * 3, width: c,     height: c },
    { id: 'b4', x: 0,    y: c * 4, width: c * 2, height: c },
    { id: 'b5', x: 0,    y: c * 6, width: c,     height: c },
  ]
}

/** PDF page 3 – dark/green post: two large squares bottom-right + small top-right */
function patternCheckerboard(w: number, h: number): BlockDef[] {
  const c = Math.round(Math.min(w, h) / 8)
  return [
    // top-right area
    { id: 'b1', x: w - c * 2, y: 0,        width: c,     height: c },
    { id: 'b2', x: w - c,     y: 0,        width: c,     height: c * 2 },
    // bottom-right stair
    { id: 'b3', x: w - c * 3, y: h * 0.55, width: c * 2, height: c },
    { id: 'b4', x: w - c * 2, y: h * 0.55 + c, width: c, height: c },
    { id: 'b5', x: w - c,     y: h * 0.55 + c, width: c, height: c },
  ]
}

/** PDF page 8 – dark/green story: big squares top-right + small bottom-left */
function patternCornerL(w: number, h: number): BlockDef[] {
  const c = Math.round(Math.min(w, h) / 8)
  return [
    // top-right big L
    { id: 'b1', x: w - c * 2, y: 0,    width: c * 2, height: c },
    { id: 'b2', x: w - c,     y: c,    width: c,     height: c * 2 },
    // bottom-left
    { id: 'b3', x: 0,         y: h - c * 3, width: c, height: c },
    { id: 'b4', x: 0,         y: h - c * 2, width: c * 2, height: c },
    { id: 'b5', x: w - c,     y: h - c * 3, width: c, height: c },
  ]
}

/** PDF page 20/25 – pink/green post: blocks scattered diagonally */
function patternDiagonal(w: number, h: number): BlockDef[] {
  const c = Math.round(Math.min(w, h) / 8)
  return [
    { id: 'b1', x: 0,        y: 0,        width: c,     height: c     },
    { id: 'b2', x: c,        y: c,        width: c * 2, height: c * 2 },
    { id: 'b3', x: w - c * 2,y: c * 2,   width: c,     height: c     },
    { id: 'b4', x: c * 2,    y: c * 4,   width: c,     height: c     },
    { id: 'b5', x: w - c,    y: h * 0.6, width: c,     height: c * 2 },
  ]
}

/** PDF page 26/27 – blue post: top-right cluster + bottom-left accent */
function patternScattered(w: number, h: number): BlockDef[] {
  const c = Math.round(Math.min(w, h) / 8)
  return [
    // top-right
    { id: 'b1', x: w - c * 2, y: 0,    width: c * 2, height: c },
    { id: 'b2', x: w - c,     y: c,    width: c,     height: c },
    { id: 'b3', x: w - c * 2, y: c * 2,width: c,     height: c },
    // left accent
    { id: 'b4', x: 0,         y: c * 2, width: c,    height: c },
    // bottom-right
    { id: 'b5', x: w - c,     y: h - c * 3, width: c, height: c * 2 },
  ]
}

// ─── Public API ───────────────────────────────────────────────────────────────

const BUILDERS: Record<PatternId, (w: number, h: number) => BlockDef[]> = {
  staircase:    patternStaircase,
  checkerboard: patternCheckerboard,
  'corner-L':   patternCornerL,
  diagonal:     patternDiagonal,
  scattered:    patternScattered,
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
