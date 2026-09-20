import type { ReactNode } from 'react'
import { Eye, EyeOff, Box, Type, Heading1, Bookmark } from 'lucide-react'
import { useEditorStore } from '../../store/useEditorStore'
import { SectionTitle } from './SectionTitle'
import type { LayerId } from '../../types'

const LAYER_ICONS: Record<LayerId, ReactNode> = {
  BOXES:     <Box      size={13} />,
  TEXT_BOX:  <Type     size={13} />,
  HEADLINE:  <Heading1 size={13} />,
  BRANDMARK: <Bookmark size={13} />,
}

export function LayersPanel() {
  const { layers, toggleLayer } = useEditorStore()

  return (
    <div>
      <SectionTitle>Layers</SectionTitle>
      <ul className="flex flex-col gap-1" role="list">
        {layers.map((layer) => (
          <li
            key={layer.id}
            className={[
              'flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors',
              layer.isVisible
                ? 'bg-slate-800 text-slate-200'
                : 'bg-slate-900 text-slate-600',
            ].join(' ')}
          >
            <span className="flex items-center gap-2">
              <span className="text-slate-500">
                {LAYER_ICONS[layer.id]}
              </span>
              {layer.label}
            </span>
            <button
              onClick={() => toggleLayer(layer.id)}
              aria-label={`${layer.isVisible ? 'Hide' : 'Show'} ${layer.label}`}
              className="text-slate-500 hover:text-slate-200 transition-colors p-0.5 rounded"
            >
              {layer.isVisible
                ? <Eye    size={14} />
                : <EyeOff size={14} />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
