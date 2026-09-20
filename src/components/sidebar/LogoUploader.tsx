import { useRef } from 'react'
import { Upload, X } from 'lucide-react'
import { useEditorStore } from '../../store/useEditorStore'
import { SectionTitle } from './SectionTitle'

export function LogoUploader() {
  const { customLogoBase64, setCustomLogo } = useEditorStore()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Convert to Base64 via FileReader to avoid CORS / tainted-canvas issues
    const reader = new FileReader()
    reader.onload = (evt) => {
      const result = evt.target?.result
      if (typeof result === 'string') {
        setCustomLogo(result)
      }
    }
    reader.readAsDataURL(file)

    // Reset input so the same file can be re-selected if needed
    e.target.value = ''
  }

  return (
    <div>
      <SectionTitle>Community Logo</SectionTitle>

      {/* Hidden native file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        aria-label="Upload community logo"
      />

      {customLogoBase64 ? (
        <div className="flex items-center gap-3">
          <img
            src={customLogoBase64}
            alt="Community logo preview"
            className="w-12 h-12 rounded-lg object-contain bg-slate-700 p-1"
          />
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => inputRef.current?.click()}
              className="text-xs text-slate-300 hover:text-white transition-colors underline underline-offset-2"
            >
              Replace
            </button>
            <button
              onClick={() => setCustomLogo(null)}
              className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
            >
              <X size={12} /> Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-600 px-4 py-3 text-xs font-medium text-slate-400 hover:border-slate-400 hover:text-slate-200 transition-colors"
        >
          <Upload size={14} />
          Upload PNG / SVG / JPG
        </button>
      )}
    </div>
  )
}
