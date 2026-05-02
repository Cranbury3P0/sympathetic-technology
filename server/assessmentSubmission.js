import Anthropic from '@anthropic-ai/sdk'
import PDFDocument from 'pdfkit'
import nodemailer from 'nodemailer'
import { createClient } from '@supabase/supabase-js'
import { buildSystemPrompt } from '../src/systemPrompt.js'

const MODEL = 'claude-sonnet-4-6'
const BRAND_DARK = '#111827'
const ACCENT_GREEN = '#2A4A2E'
const ACCENT_GREEN_MUTED = '#D0DDD0'
const PAGE_BACKGROUND = '#FAFBFA'
const BODY_TEXT = '#2b2e34'
const MUTED_TEXT = '#6b7280'
const RULE = '#e5e7eb'
const TALK_URL = process.env.ASSESSMENT_TALK_URL || 'https://sympathetictechnology.com/talk'
const DIMENSIONS = [
  {
    key: 'data_infrastructure',
    label: 'Data & Infrastructure',
    note: 'How information is collected, governed, stored, connected, and made usable.',
  },
  {
    key: 'leadership_culture',
    label: 'Leadership & Culture',
    note: 'How leadership appetite, staff confidence, and change capacity support adoption.',
  },
  {
    key: 'mission_alignment',
    label: 'Mission Alignment',
    note: 'How clearly AI use connects to the organization mission and service obligations.',
  },
  {
    key: 'ethics_governance',
    label: 'Ethics & Governance',
    note: 'How privacy, risk, accountability, and decision rights are handled.',
  },
]

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

function formatDate(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

function getDimensionScore(dimensionScores = {}, key, label) {
  const possibleKeys = [
    key,
    label,
    label.toLowerCase(),
    label.toLowerCase().replace(/\s*&\s*/g, '_').replace(/\s+/g, '_'),
  ]

  for (const possibleKey of possibleKeys) {
    const value = dimensionScores[possibleKey]
    if (Number.isFinite(Number(value))) return Number(value)
  }

  return null
}

function extractPracticalNextSteps(aiSummary = '') {
  const lines = String(aiSummary)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const start = lines.findIndex((line) => /^Three prioritized recommendations:?$/i.test(line))
  if (start !== -1) {
    const recommendations = []

    for (const line of lines.slice(start + 1)) {
      if (/^(Red flags|---)/i.test(line)) break
      const cleaned = line.replace(/^\d+\.\s*/, '').trim()
      if (cleaned) recommendations.push(cleaned)
      if (recommendations.length === 3) break
    }

    if (recommendations.length) return recommendations
  }

  return [
    'Review the lowest-scoring readiness dimension and identify the smallest policy, workflow, or data improvement that would reduce risk.',
    'Choose one high-value AI use case that can be piloted without exposing sensitive information or disrupting frontline work.',
    'Book a follow-up conversation with Sympathetic Technology to translate the diagnostic into a practical implementation path.',
  ]
}

function addPageBackground(doc) {
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(PAGE_BACKGROUND)
}

function addFooter(doc) {
  doc
    .font('Helvetica')
    .fontSize(8)
    .fillColor(MUTED_TEXT)
    .text('Sympathetic Technology | AI Readiness Diagnostic', 56, doc.page.height - 44, {
      width: 300,
    })
    .text(TALK_URL, 356, doc.page.height - 44, {
      width: 200,
      align: 'right',
    })
}

function ensureSpace(doc, currentY, neededHeight) {
  if (currentY + neededHeight < doc.page.height - 72) return currentY

  addFooter(doc)
  doc.addPage()
  addPageBackground(doc)
  return 64
}

function sectionTitle(doc, title, x, y) {
  doc
    .font('Helvetica-Bold')
    .fontSize(12)
    .fillColor(ACCENT_GREEN)
    .text(title.toUpperCase(), x, y, { characterSpacing: 1.2 })

  return y + 22
}

function paragraph(doc, text, x, y, options = {}) {
  doc
    .font(options.font || 'Helvetica')
    .fontSize(options.size || 10.5)
    .fillColor(options.color || BODY_TEXT)
    .text(String(text || ''), x, y, {
      width: options.width || 500,
      lineGap: options.lineGap || 4,
      paragraphGap: options.paragraphGap || 8,
    })

  return doc.y
}

function writeMetadataLine(doc, label, value, x, y) {
  if (!value) return y

  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .fillColor(MUTED_TEXT)
    .text(label.toUpperCase(), x, y, { width: 120, characterSpacing: 0.8 })
    .font('Helvetica')
    .fontSize(10)
    .fillColor(BODY_TEXT)
    .text(value, x + 130, y, { width: 260 })

  return y + 18
}

function generateAssessmentPdfBuffer({ contactInput, aiSummary, dimensionScores }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'LETTER', margin: 56 })
    const chunks = []
    const assessmentDate = formatDate()
    const nextSteps = extractPracticalNextSteps(aiSummary)

    doc.on('data', (chunk) => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    addPageBackground(doc)

    doc
      .rect(0, 0, doc.page.width, 156)
      .fill(BRAND_DARK)
      .fillColor('#ffffff')
      .font('Helvetica-Bold')
      .fontSize(11)
      .text('SYMPATHETIC TECHNOLOGY', 56, 38, { characterSpacing: 1.8 })
      .fontSize(30)
      .text('AI Readiness Diagnostic Report', 56, 70, {
        width: 420,
        lineGap: 2,
      })
      .font('Helvetica')
      .fontSize(10)
      .fillColor('#D0DDD0')
      .text('A practical report for planning governed, mission-aligned AI adoption.', 56, 118, {
        width: 430,
      })

    let y = 190
    y = sectionTitle(doc, 'Assessment Details', 56, y)
    y = writeMetadataLine(doc, 'Organization', contactInput.organization_name || 'Not provided', 56, y)
    y = writeMetadataLine(doc, 'Contact', contactInput.name || 'Not provided', 56, y)
    y = writeMetadataLine(doc, 'Sector', contactInput.sector, 56, y)
    y = writeMetadataLine(doc, 'Role', contactInput.role_title, 56, y)
    y = writeMetadataLine(doc, 'Assessment Date', assessmentDate, 56, y)
    y += 24

    y = ensureSpace(doc, y, 210)
    y = sectionTitle(doc, 'Readiness Dimensions', 56, y)
    DIMENSIONS.forEach((dimension) => {
      const score = getDimensionScore(dimensionScores, dimension.key, dimension.label)
      const rowHeight = 54
      y = ensureSpace(doc, y, rowHeight + 12)

      doc
        .roundedRect(56, y, 500, rowHeight, 2)
        .fillAndStroke('#ffffff', RULE)
        .rect(56, y, 5, rowHeight)
        .fill(ACCENT_GREEN_MUTED)
        .font('Helvetica-Bold')
        .fontSize(11)
        .fillColor(BODY_TEXT)
        .text(dimension.label, 76, y + 12, { width: 300 })
        .font('Helvetica')
        .fontSize(9)
        .fillColor(MUTED_TEXT)
        .text(dimension.note, 76, y + 29, { width: 350 })
        .font('Helvetica-Bold')
        .fontSize(18)
        .fillColor(ACCENT_GREEN)
        .text(score ? `${score}/5` : 'N/A', 464, y + 17, { width: 64, align: 'right' })

      y += rowHeight + 12
    })

    y += 10
    y = ensureSpace(doc, y, 220)
    y = sectionTitle(doc, 'Diagnostic Summary', 56, y)
    y = paragraph(doc, aiSummary, 56, y, { width: 500, size: 10.5, lineGap: 4 }) + 26

    y = ensureSpace(doc, y, 150)
    y = sectionTitle(doc, 'Practical Next Steps', 56, y)
    nextSteps.forEach((step, index) => {
      y = ensureSpace(doc, y, 44)
      doc
        .circle(64, y + 7, 8)
        .fill(ACCENT_GREEN)
        .font('Helvetica-Bold')
        .fontSize(8)
        .fillColor('#ffffff')
        .text(String(index + 1), 61, y + 2, { width: 6, align: 'center' })

      y = paragraph(doc, step, 84, y, { width: 456, size: 10, lineGap: 3 }) + 10
    })

    y += 8
    y = ensureSpace(doc, y, 145)
    y = sectionTitle(doc, 'About Sympathetic Technology', 56, y)
    y = paragraph(
      doc,
      'Sympathetic Technology helps mission-driven organizations adopt AI with clarity, privacy, and governance. Our work focuses on practical systems, staff confidence, responsible data practices, and technology decisions that can be explained to boards, members, funders, and the communities an organization serves.',
      56,
      y,
      { width: 500, size: 10.5, lineGap: 4 }
    ) + 22

    y = ensureSpace(doc, y, 90)
    doc
      .roundedRect(56, y, 500, 74, 2)
      .fillAndStroke(BRAND_DARK, BRAND_DARK)
      .font('Helvetica-Bold')
      .fontSize(15)
      .fillColor('#ffffff')
      .text('Book a follow-up conversation', 80, y + 18, { width: 320 })
      .font('Helvetica')
      .fontSize(9.5)
      .fillColor('#D0DDD0')
      .text(TALK_URL, 80, y + 42, { width: 320 })
      .font('Helvetica')
      .fontSize(9)
      .fillColor('#ffffff')
      .text('Use this diagnostic as the starting point for a clear, governed AI plan.', 368, y + 20, {
        width: 150,
        lineGap: 2,
      })

    addFooter(doc)
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

async function updatePdfStatus(supabase, assessmentId, statusPatch) {
  const { error } = await supabase
    .from('assessments')
    .update(statusPatch)
    .eq('id', assessmentId)

  if (error) {
    throw error
  }
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

  try {
    // PDF generation and email delivery happen only after the database row exists.
    // This keeps credentials server-side and lets Supabase record the delivery state.
    const pdfBuffer = await generateAssessmentPdfBuffer({ contactInput, aiSummary, dimensionScores })

    await updatePdfStatus(supabase, assessment.id, { pdf_status: 'generated' })

    // Future storage hook: upload pdfBuffer to Supabase Storage and persist a report URL here.
    await sendAssessmentEmail({ contactInput, pdfBuffer })

    const pdfSentAt = new Date().toISOString()
    await updatePdfStatus(supabase, assessment.id, {
      pdf_status: 'sent',
      pdf_sent_at: pdfSentAt,
    })

    return {
      ok: true,
      status: 200,
      contact_id: contact.id,
      assessment_id: assessment.id,
      pdf_status: 'sent',
      pdf_sent_at: pdfSentAt,
    }
  } catch (err) {
    try {
      await updatePdfStatus(supabase, assessment.id, { pdf_status: 'failed' })
    } catch (statusError) {
      console.error('Unable to mark assessment PDF delivery as failed:', statusError)
    }

    throw err
  }
}
