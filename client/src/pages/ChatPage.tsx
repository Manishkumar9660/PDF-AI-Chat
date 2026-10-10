import { useEffect, useState, type FormEvent } from 'react'
import { AppHeader } from '../components/AppHeader'
import { ChatWorkspace } from '../components/ChatWorkspace'
import { DocumentSidebar } from '../components/DocumentSidebar'
import { askDocument, getDocumentHistory, getDocuments, uploadDocument } from '../services/api'
import type { Document, Message } from '../types'

export function ChatPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [conversationId, setConversationId] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [question, setQuestion] = useState('')
  const [uploading, setUploading] = useState(false)
  const [asking, setAsking] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getDocuments().then((items) => { setDocuments(items); if (items[0]) setSelectedId(items[0].id) }).catch(() => setError('The server is unavailable. Start the backend and try again.'))
  }, [])

  useEffect(() => {
    if (!selectedId) return
    setMessages([])
    setConversationId('')
    getDocumentHistory(selectedId)
      .then((history) => { setMessages(history.messages); setConversationId(history.conversationId || '') })
      .catch(() => setError('Could not load this document history.'))
  }, [selectedId])

  async function handleUpload(file: File) {
    setUploading(true); setError('')
    try {
      const document = await uploadDocument(file)
      setDocuments((current) => [...current, document]); setSelectedId(document.id); setConversationId(''); setMessages([])
    } catch (uploadError) { setError(uploadError instanceof Error ? uploadError.message : 'Upload failed.') } finally { setUploading(false) }
  }

  function handleSelect(documentId: string) { setSelectedId(documentId); setError('') }

  async function handleAsk(event: FormEvent) {
    event.preventDefault(); const value = question.trim()
    if (!value || !selectedId || asking) return
    const nextMessages = [...messages, { role: 'user' as const, content: value }]
    setMessages(nextMessages); setQuestion(''); setAsking(true); setError('')
    try {
      const data = await askDocument(value, selectedId, messages, conversationId || undefined)
      setConversationId(data.conversationId)
      setMessages([...nextMessages, { role: 'assistant', content: data.answer }])
    } catch (chatError) { setMessages(messages); setError(chatError instanceof Error ? chatError.message : 'Question failed.') } finally { setAsking(false) }
  }

  const selectedDocument = documents.find((document) => document.id === selectedId)
  return (
    <main className="app-shell">
      <AppHeader />
      <div className="workspace">
        <DocumentSidebar documents={documents} selectedId={selectedId} uploading={uploading} onUpload={handleUpload} onSelect={handleSelect} />
        <ChatWorkspace documentName={selectedDocument?.name} messages={messages} question={question} asking={asking} error={error} onQuestionChange={setQuestion} onAsk={handleAsk} onSuggestion={setQuestion} />
      </div>
    </main>
  )
}