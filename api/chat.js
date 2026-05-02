import Anthropic from '@anthropic-ai/sdk'
import { buildSystemPrompt } from '../src/systemPrompt.js'

const MODEL = 'claude-sonnet-4-6'

function getAnthropicClient() {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('Missing required environment variable: ANTHROPIC_API_KEY')
  }

  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ type: 'error', message: 'Method not allowed.' })
  }

  const { formData = {}, messages = [] } = req.body || {}
  const system = buildSystemPrompt(formData)
  const apiMessages = messages.length === 0
    ? [{ role: 'user', content: '[ASSESSMENT INITIATED]' }]
    : messages

  // The assessment frontend reads Server-Sent Events where each line is
  // `data: { type, text }`, so this endpoint mirrors the local Express handler.
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  try {
    const stream = getAnthropicClient().messages.stream({
      model: MODEL,
      max_tokens: 1500,
      system,
      messages: apiMessages,
    })

    for await (const event of stream) {
      if (
        event.type === 'content_block_delta' &&
        event.delta.type === 'text_delta'
      ) {
        res.write(`data: ${JSON.stringify({ type: 'delta', text: event.delta.text })}\n\n`)
      }
    }

    res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`)
  } catch (err) {
    console.error('Chat stream error:', err)
    res.write(`data: ${JSON.stringify({ type: 'error', message: 'Something went wrong. Please try again.' })}\n\n`)
  } finally {
    res.end()
  }
}
