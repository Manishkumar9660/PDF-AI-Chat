export type Document = {
	id: string
	name: string
	pages: number
	chunks: number
}

export type Message = {
	role: 'user' | 'assistant'
	content: string
}

export type ApiError = {
	error?: string
}
