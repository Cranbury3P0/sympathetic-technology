import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Anthropic from '@anthropic-ai/sdk'
import { buildSystemPrompt } from './src/systemPrompt.js'
import { submitAssessment } from './server/assessmentSubmission.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

app.post('/api/chat', async (req, res) => {
  const { formData = {}, messages = [] } = req.body

  const system = buildSystemPrompt(formData)

  // Seed the conversation with a hidden trigger if no messages yet
  const apiMessages = messages.length === 0
    ? [{ role: 'user', content: '[ASSESSMENT INITIATED]' }]
    : messages

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  try {
    const stream = client.messages.stream({
      model: 'claude-sonnet-4-6',
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
    console.error('Stream error:', err.message)
    res.write(`data: ${JSON.stringify({ type: 'error', message: 'Something went wrong. Please try again.' })}\n\n`)
  } finally {
    res.end()
  }
})

app.post('/api/submit-assessment', async (req, res) => {
  try {
    const result = await submitAssessment(req.body)

    if (!result.ok) {
      return res.status(result.status).json({ ok: false, error: result.error })
    }

    return res.status(200).json({
      ok: true,
      contact_id: result.contact_id,
      assessment_id: result.assessment_id,
      pdf_status: result.pdf_status,
      pdf_sent_at: result.pdf_sent_at,
    })
  } catch (err) {
    console.error('Assessment submission error:', err)
    return res.status(500).json({
      ok: false,
      error: 'Unable to save assessment right now.',
    })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`)
})
