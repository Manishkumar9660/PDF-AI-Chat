import type { FormEvent } from 'react'
import type { Message } from '../types'
import { ChatComposer } from './ChatComposer'
import { ChatHeader } from './ChatHeader'
import { ChatMessages } from './ChatMessages'

type ChatWorkspaceProps = { documentName?: string; messages: Message[]; question: string; asking: boolean; error: string; onQuestionChange: (value: string) => void; onAsk: (event: FormEvent) => void; onSuggestion: (question: string) => void }

export function ChatWorkspace({ documentName, messages, question, asking, error, onQuestionChange, onAsk, onSuggestion }: ChatWorkspaceProps) {
  return (
    <section className="chat-panel">
      <ChatHeader documentName={documentName} />
      <ChatMessages messages={messages} asking={asking} onSuggestion={onSuggestion} />
      {error && <p className="error-message">{error}</p>}
      <ChatComposer question={question} disabled={asking} hasDocument={Boolean(documentName)} onChange={onQuestionChange} onSubmit={onAsk} />
    </section>
  )
}