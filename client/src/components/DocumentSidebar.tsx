import type { ChangeEvent } from 'react'
import type { Document } from '../types'

type DocumentSidebarProps = {
  documents: Document[]
  selectedId: string
  uploading: boolean
  onUpload: (file: File) => void
  onSelect: (documentId: string) => void
}

export function DocumentSidebar({ documents, selectedId, uploading, onUpload, onSelect }: DocumentSidebarProps) {
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) onUpload(file)
    event.target.value = ''
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-heading"><span>Library</span><span className="count">{documents.length.toString().padStart(2, '0')}</span></div>
      <label className="upload-zone">
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <span className="upload-icon">+</span>
        <strong>{uploading ? 'Indexing PDF...' : 'Add a PDF'}</strong>
        <small>Drop a paper or browse</small>
      </label>
      <div className="document-list">
        {documents.map((document) => (
          <button className={`document ${document.id === selectedId ? 'selected' : ''}`} key={document.id} onClick={() => onSelect(document.id)}>
            <span className="file-icon">PDF</span>
            <span><strong>{document.name}</strong><small>{document.pages} pages · {document.chunks} sections</small></span>
          </button>
        ))}
        {!documents.length && <p className="empty-library">Your uploaded papers will appear here.</p>}
      </div>
    </aside>
  )
}