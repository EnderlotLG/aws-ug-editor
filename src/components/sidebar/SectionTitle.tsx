import type { ReactNode } from 'react'

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2 mt-1">
      {children}
    </h3>
  )
}
