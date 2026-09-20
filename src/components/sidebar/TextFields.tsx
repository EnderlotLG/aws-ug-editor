import { useEditorStore } from '../../store/useEditorStore'
import { SectionTitle } from './SectionTitle'

interface FieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  multiline?: boolean
  maxLength?: number
}

function Field({ label, value, onChange, placeholder, multiline, maxLength }: FieldProps) {
  const shared =
    'w-full rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-xs placeholder-slate-600 px-3 py-2 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-colors resize-none'

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-400">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={3}
          className={shared}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className={shared}
        />
      )}
      {maxLength && (
        <span className="text-right text-xs text-slate-600">
          {value.length}/{maxLength}
        </span>
      )}
    </div>
  )
}

export function TextFields() {
  const { headline, speakerName, ugName, setHeadline, setSpeakerName, setUgName } =
    useEditorStore()

  return (
    <div className="flex flex-col gap-3">
      <SectionTitle>Text Content</SectionTitle>

      <Field
        label="Headline"
        value={headline}
        onChange={setHeadline}
        placeholder="Event title or topic…"
        multiline
        maxLength={120}
      />

      <Field
        label="Speaker / Role"
        value={speakerName}
        onChange={setSpeakerName}
        placeholder="Name · Role"
        maxLength={80}
      />

      <Field
        label="User Group Name"
        value={ugName}
        onChange={setUgName}
        placeholder="AWS User Group …"
        maxLength={80}
      />
    </div>
  )
}
