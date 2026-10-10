type ChatHeaderProps = { documentName?: string }

export function ChatHeader({ documentName }: ChatHeaderProps) {
  return (
    <div className="chat-header">
      <div><p className="eyebrow">{documentName ? 'CURRENT DOCUMENT' : 'DOCUMENT CHAT'}</p><h2>{documentName || 'What’s on your mind today?'}</h2>{documentName && <p className="chat-context">Answers are grounded in the indexed text of this document.</p>}</div>
      {documentName && <span className="indexed-tag">INDEXED</span>}
    </div>
  )
}