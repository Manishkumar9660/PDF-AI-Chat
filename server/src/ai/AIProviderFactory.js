const OpenAI = require('openai')
const { GoogleGenerativeAI } = require('@google/generative-ai')
const { aiProvider, geminiApiKey, chatModel, embeddingModel, openAiApiKey, openAiChatModel, openAiEmbeddingModel } = require('../config/env')
const { LocalEmbeddingProvider } = require('./embeddings/localEmbeddingProvider')
const { GeminiEmbeddingProvider } = require('./embeddings/geminiEmbeddingProvider')
const { LocalLlmProvider } = require('./llm/localLlmProvider')
const { GeminiLlmProvider } = require('./llm/geminiLlmProvider')
const { OpenAiEmbeddingProvider } = require('./embeddings/openAiEmbeddingProvider')
const { OpenAiLlmProvider } = require('./llm/openAiLlmProvider')

function createAiProviders() {
  if (aiProvider === 'openai' && openAiApiKey) {
    const client = new OpenAI({ apiKey: openAiApiKey })
    return {
      embeddings: new OpenAiEmbeddingProvider(client, openAiEmbeddingModel),
      llm: new OpenAiLlmProvider(client, openAiChatModel),
      aiEnabled: true,
      provider: 'openai',
    }
  }
  if (aiProvider === 'gemini' && geminiApiKey) {
    const client = new GoogleGenerativeAI(geminiApiKey)
    return {
      embeddings: new GeminiEmbeddingProvider(client, embeddingModel),
      llm: new GeminiLlmProvider(client, chatModel),
      aiEnabled: true,
      provider: 'gemini',
    }
  }
  return {
    embeddings: new LocalEmbeddingProvider(),
    llm: new LocalLlmProvider(),
    aiEnabled: false,
    provider: 'local',
  }
}

module.exports = { createAiProviders }
