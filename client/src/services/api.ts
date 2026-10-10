import type { ApiError, Document, Message } from '../types'

const API_BASE_URL = 'https://pdf-ai-chat-mb8g.onrender.com/api';

async function parseResponse<T>(response: Response): Promise<T> {
  const data = await response.json() as T & ApiError
  if (!response.ok) throw new Error(data.error || 'Request failed.')
  return data
}

export async function getDocuments(): Promise<Document[]> {
  return parseResponse<Document[]>(await fetch(`${API_BASE_URL}/documents`))
}

export async function getDocumentHistory(documentId: string): Promise<{ conversationId: string | null; messages: Message[] }> {
  return parseResponse<{ conversationId: string | null; messages: Message[] }>(await fetch(`${API_BASE_URL}/documents/${documentId}/history`))
}

export async function uploadDocument(file: File): Promise<Document> {
  const body = new FormData()
  body.append('file', file)
  return parseResponse<Document>(await fetch(`${API_BASE_URL}/documents`, { method: 'POST', body }))
}


export async function askDocument(
  question: string,
  documentId: string,
  history: Message[],
  conversationId?: string
): Promise<{ answer: string; conversationId: string }> {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, documentId, history, conversationId }),
  })

  return parseResponse<{ answer: string; conversationId: string }>(response)
}
