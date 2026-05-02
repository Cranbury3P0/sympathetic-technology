import Anthropic from '@anthropic-ai/sdk'
import PDFDocument from 'pdfkit'
import nodemailer from 'nodemailer'
import { createClient } from '@supabase/supabase-js'
import { buildSystemPrompt } from '../src/systemPrompt.js'

const MODEL = 'claude-sonnet-4-6'
const BRAND_DARK = '#111827'
const BODY_TEXT = '#2b2e34'
const MUTED_TEXT = '#6b7280'
const RULE = '#e5e7eb'

function requireEnv(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function normalizeFormData(formData = {}) {
  return {
    name: String(formData.name || '').trim(),
    email: normalizeEmail(formData.email),
    organization_name: String(formData.organization_name || formData.organization || '').trim(),
    sector: String(formData.sector || formData.industry || '').trim(),
    role_title: String(formData.role_title || formData.role || '').trim(),
    newsletter_opt_in: Boolean(formData.newsletter_opt_in ?? formData.newsletter),
  }
}

function serializeMessages(messages = []) {
  return messages
    .filter((message) => message?.role && typeof message.content === 'string')
    .map(({ role, content }) => ({ role, content }))
}

function getFinalAssistantMessage(messages = []) {
  return [...messages].reverse().find((message) => message?.role === 'assistant' && message.content)?.content || ''
}

function parseDimensionScores(summary = '') {
  const scoreMap = {
    data_infrastructure: /Data\s*&\s*Infrastructure:\s*([1-5])\/5/i,
    leadership_culture: /Leadership\s*&\s*Culture:\s*([1-5])\/5/i,
    mission_alignment: /Mission\s*Alignment:\s*([1-5])\/5/i,
    ethics_governance: /Ethics\s*&\s*Governance:\s*([1-5])\/5/i,
  }

  return Object.fromEntries(
    Object.entries(scoreMap)
      .map(([key, regex]) => [key, Number(summary.match(regex)?.[1])])
      .filter(([, value]) => Number.isFinite(value))
  )
}

async function generateAssessmentSummary({ formData, messages }) {
  const client = new Anthropic({ apiKey: requireEnv('ANTHROPIC_API_KEY') })
  const serializedMessages = serializeMessages(messages)
  const conversation = serializedMessages.length
    ? serializedMessages
    : [{ role: 'user', content: '[ASSESSMENT INITIATED]' }]

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1800,
    system: buildSystemPrompt(formData),
    messages: [
      ...conversation,
      {
        role: 'user',
        content: 'Please produce the final AI Readiness Assessment report now using the required final report format.',
      },
    ],
  })

  return response.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('\n')
    .trim()
}

function formatScoreLabel(key) {
  return key
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace('And', '&')
}

function writeWrappedText(doc, text, x, y, options = {}) {
  doc.text(String(text || ''), x, y, {
    width: options.width || 480,
    lineGap: options.lineGap || 4,
    ...options,
  })
}

function generateAssessmentPdfBuffer({ contactInput, aiSummary, dimensionScores }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'LETTER', margin: 56 })
    const chunks = []

    doc.on('data', (chunk) => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    doc.rect(0, 0, doc.page.width, 112).fill(BRAND_DARK)
    doc
      .fillColor('#ffffff')
      .font('Helvetica-Bold')
      .fontSize(11)
      .text('SYMPATHETIC TECHNOLOGY', 56, 38, { characterSpacing: 1.8 })
      .fontSize(24)
      .text('AI Readiness Assessment', 56, 62)

    doc
      .fillColor(BODY_TEXT)
      .font('Helvetica')
      .fontSize(11)
      .text(contactInput.name || 'Assessment participant', 56, 140)
      .fillColor(MUTED_TEXT)
      .text(contactInput.organization_name || '', 56, 158)
      .text(contactInput.email || '', 56, 176)

    const scoreEntries = Object.entries(dimensionScores || {})
    if (scoreEntries.length) {
      doc
        .moveTo(56, 214)
        .lineTo(556, 214)
        .strokeColor(RULE)
        .stroke()
        .fillColor(BODY_TEXT)
        .font('Helvetica-Bold')
        .fontSize(13)
        .text('Pillar Scores', 56, 236)

      let y = 266
      scoreEntries.forEach(([key, value]) => {
        doc
          .font('Helvetica')
          .fontSize(11)
          .fillColor(BODY_TEXT)
          .text(formatScoreLabel(key), 56, y)
          .font('Helvetica-Bold')
          .text(`${value}/5`, 470, y, { width: 80, align: 'right' })
        y += 22
      })
    }

    doc
      .moveTo(56, 360)
      .lineTo(556, 360)
      .strokeColor(RULE)
      .stroke()
      .fillColor(BODY_TEXT)
      .font('Helvetica-Bold')
      .fontSize(13)
      .text('Assessment Report', 56, 384)
      .font('Helvetica')
      .fontSize(11)
      .fillColor(BODY_TEXT)

    writeWrappedText(doc, aiSummary, 56, 414, { width: 500, lineGap: 5 })

    doc.end()
  })
}

function createEmailTransport() {
  return nodemailer.createTransport({
    host: requireEnv('SMTP_HOST'),
    port: Number(requireEnv('SMTP_PORT')),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: requireEnv('SMTP_USER'),
      pass: requireEnv('SMTP_PASS'),
    },
  })
}

async function sendAssessmentEmail({ contactInput, pdfBuffer }) {
  const transport = createEmailTransport()

  await transport.sendMail({
    from: requireEnv('ASSESSMENT_FROM_EMAIL'),
    to: contactInput.email,
    replyTo: process.env.ASSESSMENT_REPLY_TO_EMAIL || process.env.ASSESSMENT_FROM_EMAIL,
    subject: 'Your Sympathetic Technology AI Readiness Assessment',
    text: [
      `Hi ${contactInput.name || 'there'},`,
      '',
      'Your AI Readiness Assessment report is attached as a PDF.',
      '',
      'Sympathetic Technology',
    ].join('\n'),
    attachments: [
      {
        filename: 'sympathetic-technology-ai-readiness-assessment.pdf',
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  })
}

export async function submitAssessment(payload = {}) {
  const contactInput = normalizeFormData(payload.formData)
  const messages = serializeMessages(payload.messages)
  const privacyAcknowledgedAt = payload.privacy_acknowledged_at || null

  if (!contactInput.email) {
    return { ok: false, status: 400, error: 'Email is required.' }
  }

  const supabase = createClient(
    requireEnv('SUPABASE_URL'),
    requireEnv('SUPABASE_SERVICE_ROLE_KEY'),
    { auth: { persistSession: false } }
  )

  const now = new Date().toISOString()
  const { data: existingContact, error: contactLookupError } = await supabase
    .from('contacts')
    .select('id, assessment_count, newsletter_opt_in, newsletter_consent_at')
    .eq('email', contactInput.email)
    .maybeSingle()

  if (contactLookupError) {
    throw contactLookupError
  }

  const contactPayload = {
    name: contactInput.name,
    email: contactInput.email,
    organization_name: contactInput.organization_name,
    sector: contactInput.sector,
    role_title: contactInput.role_title,
    privacy_acknowledged_at: privacyAcknowledgedAt,
    assessment_count: existingContact ? (existingContact.assessment_count || 0) + 1 : 1,
  }

  if (contactInput.newsletter_opt_in || !existingContact?.newsletter_opt_in) {
    contactPayload.newsletter_opt_in = contactInput.newsletter_opt_in
    contactPayload.newsletter_consent_at = contactInput.newsletter_opt_in
      ? existingContact?.newsletter_consent_at || now
      : null
  }

  const { data: contact, error: contactError } = await supabase
    .from('contacts')
    .upsert(contactPayload, { onConflict: 'email' })
    .select('id')
    .single()

  if (contactError) {
    throw contactError
  }

  const aiSummary = String(payload.ai_summary || getFinalAssistantMessage(messages) || '').trim()
    || await generateAssessmentSummary({ formData: contactInput, messages })
  const dimensionScores = payload.dimension_scores_json || parseDimensionScores(aiSummary)

  const { data: assessment, error: assessmentError } = await supabase
    .from('assessments')
    .insert({
      contact_id: contact.id,
      answers_json: {
        formData: contactInput,
        messages,
      },
      ai_summary: aiSummary,
      dimension_scores_json: dimensionScores,
      pdf_status: 'pending',
      assessment_version: 'v1',
    })
    .select('id')
    .single()

  if (assessmentError) {
    throw assessmentError
  }

  const pdfBuffer = await generateAssessmentPdfBuffer({ contactInput, aiSummary, dimensionScores })

  const { error: generatedError } = await supabase
    .from('assessments')
    .update({ pdf_status: 'generated' })
    .eq('id', assessment.id)

  if (generatedError) {
    throw generatedError
  }

  // Future storage hook: upload pdfBuffer to Supabase Storage and persist a report URL here.
  await sendAssessmentEmail({ contactInput, pdfBuffer })

  const pdfSentAt = new Date().toISOString()
  const { error: sentError } = await supabase
    .from('assessments')
    .update({ pdf_status: 'sent', pdf_sent_at: pdfSentAt })
    .eq('id', assessment.id)

  if (sentError) {
    throw sentError
  }

  return {
    ok: true,
    status: 200,
    contact_id: contact.id,
    assessment_id: assessment.id,
    pdf_status: 'sent',
    pdf_sent_at: pdfSentAt,
  }
}
