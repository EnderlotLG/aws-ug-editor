import type { BlockDef } from '../types'

/**
 * Generates decorative square blocks that match the reference design.
 * All blocks are square cells sized to 1/8 of the smaller canvas dimension.
 * Patterns are adapted per aspect ratio (square, landscape, portrait).
 */
export function getBlocks(width: number, height: number): BlockDef[] {
  const cell = Math.round(Math.min(width, height) / 8)
  const aspect = width / height

  if (aspect > 1.4) {
    // ── Landscape ─────────────────────────────────────────────────────
    return [
      // Top-right corner cluster
      { id: 'b1', x: width - cell * 2, y: 0,            width: cell, height: cell },
      { id: 'b2', x: width - cell,     y: 0,            width: cell, height: cell },
      { id: 'b3', x: width - cell,     y: cell,         width: cell, height: cell },
      // Mid-right accent
      { id: 'b4', x: width - cell * 2, y: cell * 2,     width: cell, height: cell },
      // Bottom-left corner cluster
      { id: 'b5', x: 0,                y: height - cell,width: cell, height: cell },
    ]
  }

  if (aspect < 0.7) {
    // ── Portrait ──────────────────────────────────────────────────────
    return [
      // Top-right corner
      { id: 'b1', x: width - cell * 2, y: 0,             width: cell * 2, height: cell },
      { id: 'b2', x: width - cell,     y: cell,          width: cell,     height: cell },
      // Left staircase (descending)
      { id: 'b3', x: 0,               y: cell * 2,       width: cell,     height: cell },
      { id: 'b4', x: 0,               y: cell * 4,       width: cell,     height: cell },
      { id: 'b5', x: 0,               y: cell * 5,       width: cell,     height: cell },
      // Bottom-right small accent
      { id: 'b6', x: width - cell,     y: height - cell * 3, width: cell, height: cell },
    ]
  }

  // ── Square ────────────────────────────────────────────────────────────
  // Matches the orange Story/Post reference: staircase on left + bottom bar
  return [
    // Left column staircase
    { id: 'b1', x: 0,        y: 0,              width: cell,     height: cell     },
    { id: 'b2', x: 0,        y: cell,           width: cell * 2, height: cell     },
    { id: 'b3', x: 0,        y: cell * 3,       width: cell,     height: cell     },
    { id: 'b4', x: 0,        y: cell * 4,       width: cell * 2, height: cell     },
    { id: 'b5', x: 0,        y: cell * 6,       width: cell,     height: cell     },
    // Bottom row
    { id: 'b6', x: 0,        y: height - cell,  width: cell,     height: cell     },
  ]
}
