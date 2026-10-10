import type { Message } from '../types'

type ChatMessagesProps = { messages: Message[]; asking: boolean; onSuggestion: (question: string) => void }

export function ChatMessages({ messages, asking, onSuggestion }: ChatMessagesProps) {
  return (
    <div className="messages">
      {!messages.length && <div className="welcome"><span className="welcome-number">01 / START HERE</span><h3>Read closer.<br /><em>Ask anything.</em></h3><p>Upload a PDF, then ask questions grounded in its actual text. PaperTrail searches the indexed sections and keeps the conversation tied to your source.</p><div className="welcome-notes"><span><strong>01</strong>Find key claims</span><span><strong>02</strong>Compare sections</span><span><strong>03</strong>Summarize clearly</span></div><div className="suggestions"><button onClick={() => onSuggestion('What is the main argument of this paper?')}>What is the main argument?</button><button onClick={() => onSuggestion('Summarize the key findings.')}>Summarize the key findings</button></div></div>}
      {messages.map((message, index) => <article className={`message ${message.role}`} key={`${message.role}-${index}`}><span className="message-label">{message.role === 'user' ? 'YOU' : 'PAPERTRAIL'}</span><p>{message.content}</p></article>)}
      {asking && <article className="message assistant"><span className="message-label">PAPERTRAIL</span><p className="thinking">Searching the indexed sections<span>...</span></p></article>}
    </div>
  )
}