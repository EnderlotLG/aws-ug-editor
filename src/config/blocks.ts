import type { BlockDef } from '../types'

/**
 * Returns the decorative block definitions for a given canvas size.
 * Blocks are expressed in absolute px relative to the canvas top-left.
 * They adapt proportionally based on the canvas dimensions.
 */
export function getBlocks(width: number, height: number): BlockDef[] {
  const w = width
  const h = height

  return [
    // Large accent bar – top-right corner
    {
      id: 'block-tr',
      x: w * 0.72,
      y: 0,
      width: w * 0.28,
      height: h * 0.06,
      opacity: 1,
      radius: 0,
    },
    // Thick vertical stripe – right edge
    {
      id: 'block-right',
      x: w * 0.92,
      y: h * 0.06,
      width: w * 0.08,
      height: h * 0.55,
      opacity: 0.85,
      radius: 0,
    },
    // Small square accent – bottom-right
    {
      id: 'block-br-sm',
      x: w * 0.78,
      y: h * 0.88,
      width: w * 0.22,
      height: h * 0.12,
      opacity: 0.6,
      radius: 4,
    },
    // Horizontal bar – bottom-left
    {
      id: 'block-bl',
      x: 0,
      y: h * 0.92,
      width: w * 0.45,
      height: h * 0.08,
      opacity: 0.4,
      radius: 0,
    },
    // Small square – top-left accent
    {
      id: 'block-tl',
      x: 0,
      y: 0,
      width: w * 0.04,
      height: h * 0.12,
      opacity: 0.7,
      radius: 0,
    },
  ]
}
