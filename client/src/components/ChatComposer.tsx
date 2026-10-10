import type { FormEvent, KeyboardEvent } from 'react'

type ChatComposerProps = { question: string; disabled: boolean; hasDocument: boolean; onChange: (value: string) => void; onSubmit: (event: FormEvent) => void }

export function ChatComposer({ question, disabled, hasDocument, onChange, onSubmit }: ChatComposerProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); onSubmit(event) }
  }

  return (
    <form className="composer" onSubmit={onSubmit}>
      <textarea value={question} onChange={(event) => onChange(event.target.value)} disabled={disabled || !hasDocument} placeholder={hasDocument ? 'Ask a question about this paper...' : 'Upload a PDF to unlock questions'} rows={1} onKeyDown={handleKeyDown} />
      <button type="submit" disabled={disabled || !question.trim() || !hasDocument} aria-label="Send question">↑</button>
      <small>ENTER TO SEND · SHIFT + ENTER FOR A NEW LINE</small>
    </form>
  )
}