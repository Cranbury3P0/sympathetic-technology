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

function cleanMarkdown(text = '') {
  return String(text)
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/^---+$/gm, '')
    .replace(/^\s*[-*]\s+/gm, '• ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

// Strip the recommendations + red-flags section from the summary body so it
// isn't rendered twice (once as plain text, once as the styled section below).
function truncateSummaryBody(text = '') {
  const lines = text.split('\n')
  const cutIdx = lines.findIndex((l) =>
    /^(Three prioritized recommendations|Red flags to watch)/i.test(l.trim())
  )
  return cutIdx !== -1 ? lines.slice(0, cutIdx).join('\n').trim() : text
}

function addPageBackground(doc) {
  doc.save()
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(PAGE_BACKGROUND)
  doc.restore()
}

function addInteriorPageSetup(doc, date) {
  // Zero out bottom margin so footer text placed near the physical bottom
  // does not trigger a recursive pageAdded loop. Restored after setup.
  doc.page.margins.bottom = 0

  addPageBackground(doc)

  doc.save()
  doc.rect(0, 0, doc.page.width, 30).fill(BRAND_DARK)
  doc.restore()
  doc.save()
  doc.rect(0, 0, doc.page.width, 3).fill(ACCENT_GREEN)
  doc.restore()

  doc
    .font('Helvetica-Bold')
    .fontSize(6)
    .fillColor('#FFFFFF')
    .text('SYMPATHETIC TECHNOLOGY  |  SEAN CRANBURY  |  HELLO@SYMPATHETICTECHNOLOGY.COM', 56, 11, {
      characterSpacing: 1.2,
      width: 500,
    })

  const fy = doc.page.height - 44
  doc.save()
  doc
    .moveTo(56, fy)
    .lineTo(doc.page.width - 56, fy)
    .strokeColor(ACCENT_GREEN_MUTED)
    .lineWidth(0.5)
    .stroke()
  doc.restore()

  doc
    .font('Helvetica')
    .fontSize(7)
    .fillColor(MUTED_TEXT)
    .text('Sympathetic Technology · AI Readiness Assessment Report', 56, fy + 7, { width: 500 })

  // Restore bottom margin: auto-flow now stops at 724 (above footer at 748).
  doc.page.margins.bottom = 68
  doc.y = 54
}

function sectionTitle(doc, title, x, y, width = 500) {
  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .fillColor(BRAND_DARK)
    .text(title.toUpperCase(), x, y, { characterSpacing: 1.5, width })

  const ruleY = y + 16
  doc.save()
  doc
    .moveTo(x, ruleY)
    .lineTo(x + width, ruleY)
    .strokeColor(ACCENT_GREEN_MUTED)
    .lineWidth(0.5)
    .stroke()
  doc.restore()

  doc.y = ruleY + 14
  return ruleY + 14
}

function paragraph(doc, text, x, y, options = {}) {
  doc
    .font(options.font || 'Helvetica')
    .fontSize(options.size || 10.5)
    .fillColor(options.color || BODY_TEXT)
    .text(String(text || ''), x, y, {
      width: options.width || 500,
      lineGap: options.lineGap || 5,
      paragraphGap: options.paragraphGap || 9,
    })
  return doc.y
}


function drawScoreDots(doc, score, cardX, cardY, cardWidth, cardHeight) {
  const n = 5
  const r = 3.5
  const gap = 12
  const totalWidth = (n - 1) * gap
  const startX = cardX + cardWidth - 24 - totalWidth
  const dotCY = cardY + cardHeight / 2 - 4

  for (let i = 0; i < n; i++) {
    const cx = startX + i * gap
    doc.save()
    if (score !== null && i < score) {
      doc.circle(cx, dotCY, r).fill(ACCENT_GREEN)
    } else {
      doc.circle(cx, dotCY, r).fillAndStroke('#EEF4EE', ACCENT_GREEN_MUTED)
    }
    doc.restore()
  }

  const caption = score !== null ? `${score} of 5` : '—'
  doc
    .font('Helvetica')
    .fontSize(7)
    .fillColor(MUTED_TEXT)
    .text(caption, startX - r, dotCY + r + 5, {
      width: totalWidth + r * 2 + 4,
      align: 'center',
    })
}

export function generateAssessmentPdfBuffer({ contactInput, aiSummary, dimensionScores }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'LETTER',
      margins: { top: 56, bottom: 68, left: 56, right: 56 },
    })
    const chunks = []
    const assessmentDate = formatDate()
    const nextSteps = extractPracticalNextSteps(aiSummary)
    const cleanedSummary = cleanMarkdown(aiSummary)
    let coverComplete = false

    doc.on('data', (chunk) => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    // Interior pages (all pages after the cover) are set up automatically.
    // pageAdded fires for every doc.addPage() call and for PDFKit auto-flow page breaks.
    doc.on('pageAdded', () => {
      if (coverComplete) {
        addInteriorPageSetup(doc, assessmentDate)
      } else {
        addPageBackground(doc)
      }
    })

    // ── PAGE 1: COVER ──────────────────────────────────────────────────────────
    // First page is created in the PDFDocument constructor before our listener
    // is registered, so we call addPageBackground manually here.
    addPageBackground(doc)

    doc.save()
    doc.rect(0, 0, doc.page.width, 148).fill(BRAND_DARK)
    doc.restore()
    doc.save()
    doc.rect(0, 0, doc.page.width, 4).fill(ACCENT_GREEN)
    doc.restore()

    doc
      .font('Helvetica-Bold')
      .fontSize(7.5)
      .fillColor('#FFFFFF')
      .text('SYMPATHETIC TECHNOLOGY  |  SEAN CRANBURY  |  HELLO@SYMPATHETICTECHNOLOGY.COM', 56, 24, { characterSpacing: 1.5 })

    doc
      .font('Helvetica-Bold')
      .fontSize(24)
      .fillColor('#FFFFFF')
      .text('AI Readiness', 56, 50)

    doc
      .font('Helvetica')
      .fontSize(24)
      .fillColor('#D0DDD0')
      .text('Assessment Report', 56, 78)

    doc
      .font('Helvetica')
      .fontSize(8)
      .fillColor('#D0DDD0')
      .text(assessmentDate, 56, 124, { width: 500, align: 'right' })

    // ── Assessment Details (2-column compact layout) ──────────────────────────
    let y = 174
    y = sectionTitle(doc, 'Assessment Details', 56, y)

    const metaItems = [
      ['Organization', contactInput.organization_name || 'Not provided'],
      ['Contact', contactInput.name || 'Not provided'],
      ['Sector', contactInput.sector],
      ['Role', contactInput.role_title],
    ].filter(([, val]) => val)

    let lY = y
    let rY = y
    metaItems.forEach(([label, value], i) => {
      const x = i % 2 === 0 ? 56 : 316
      const cy = i % 2 === 0 ? lY : rY
      doc
        .font('Helvetica')
        .fontSize(7.5)
        .fillColor(MUTED_TEXT)
        .text(label.toUpperCase(), x, cy, { width: 230, characterSpacing: 0.6 })
      doc
        .font('Helvetica')
        .fontSize(10)
        .fillColor(BODY_TEXT)
        .text(String(value), x, cy + 14, { width: 230 })
      if (i % 2 === 0) lY += 38
      else rY += 38
    })
    y = Math.max(lY, rY) + 16

    // ── Readiness Dimensions ──────────────────────────────────────────────────
    y = sectionTitle(doc, 'Readiness Dimensions', 56, y)

    const CARD_H = 66
    const CARD_GAP = 10

    DIMENSIONS.forEach((dimension) => {
      const score = getDimensionScore(dimensionScores, dimension.key, dimension.label)

      doc.save()
      doc.roundedRect(56, y, 500, CARD_H, 3).fillAndStroke('#FFFFFF', RULE)
      doc.restore()
      doc.save()
      doc.rect(56, y, 6, CARD_H).fill(ACCENT_GREEN)
      doc.restore()

      doc
        .font('Helvetica-Bold')
        .fontSize(11)
        .fillColor(BODY_TEXT)
        .text(dimension.label, 76, y + 13, { width: 320 })

      doc
        .font('Helvetica')
        .fontSize(8.5)
        .fillColor(MUTED_TEXT)
        .text(dimension.note, 76, y + 31, { width: 320 })

      drawScoreDots(doc, score, 56, y, 500, CARD_H)

      y += CARD_H + CARD_GAP
    })

    // Cover is done — all new pages from here get the interior layout
    coverComplete = true

    // ── PAGE 2: DIAGNOSTIC SUMMARY ────────────────────────────────────────────
    doc.addPage()
    // pageAdded fires → addInteriorPageSetup → background + thin header + footer + doc.y = 54

    y = sectionTitle(doc, 'Diagnostic Summary', 56, doc.y)
    doc
      .font('Helvetica')
      .fontSize(10.5)
      .fillColor(BODY_TEXT)
      .text(truncateSummaryBody(cleanedSummary), 56, y, { width: 500, lineGap: 5, paragraphGap: 10 })
    // If the summary overflows, PDFKit auto-flows to new pages.
    // Each new page triggers pageAdded → interior setup → doc.y = 54,
    // so text continuation starts below the thin header strip.

    // ── Recommended Next Steps ────────────────────────────────────────────────
    if (doc.y + 170 > doc.page.height - 68) {
      doc.addPage()
    } else {
      doc.y += 24
    }

    y = sectionTitle(doc, 'Recommended Next Steps', 56, doc.y)

    nextSteps.forEach((step, index) => {
      if (doc.y + 52 > doc.page.height - 68) {
        doc.addPage()
      }

      const stepY = doc.y
      doc.save()
      doc.circle(67, stepY + 8, 8).fill(ACCENT_GREEN)
      doc.restore()
      doc
        .font('Helvetica-Bold')
        .fontSize(7.5)
        .fillColor('#FFFFFF')
        .text(String(index + 1), 63.5, stepY + 3.5, { width: 7, align: 'center' })

      doc
        .font('Helvetica')
        .fontSize(10.5)
        .fillColor(BODY_TEXT)
        .text(step, 88, stepY, { width: 448, lineGap: 4 })
      doc.y += 12
    })

    // ── About ─────────────────────────────────────────────────────────────────
    if (doc.y + 190 > doc.page.height - 68) {
      doc.addPage()
    } else {
      doc.y += 24
    }

    y = sectionTitle(doc, 'About Sympathetic Technology', 56, doc.y)

    doc
      .font('Helvetica')
      .fontSize(10)
      .fillColor(MUTED_TEXT)
      .text(
        "I'm Sean Cranbury. I work with mission-driven organizations including nonprofits, arts and culture organizations, healthcare associations, small businesses, and social enterprises to adopt AI in thoughtful and practical ways.",
        56,
        y,
        { width: 500, lineGap: 4.5 }
      )

    doc.y += 10

    doc
      .font('Helvetica')
      .fontSize(10)
      .fillColor(MUTED_TEXT)
      .text(
        "My focus is on building systems people can actually use, supporting staff confidence, and helping organizations make technology decisions they can explain clearly and honestly to the communities they serve.",
        56,
        doc.y,
        { width: 500, lineGap: 4.5 }
      )

    doc.y += 14

    doc
      .font('Helvetica-Bold')
      .fontSize(10.5)
      .fillColor(BODY_TEXT)
      .text("Let's talk about what comes next.", 56, doc.y, { width: 500 })

    doc.y += 10

    doc
      .font('Helvetica')
      .fontSize(10)
      .fillColor(MUTED_TEXT)
      .text(
        "If you are thinking about how AI fits into your organization, how it can benefit your members, community, staff, or leadership, I'm happy to have a conversation.",
        56,
        doc.y,
        { width: 500, lineGap: 4.5 }
      )

    doc.y += 10

    doc
      .font('Helvetica')
      .fontSize(10)
      .fillColor(MUTED_TEXT)
      .text(
        "You can email, text, or call me using the information below. I review every assessment so we can talk directly about where you're at and where you're going.",
        56,
        doc.y,
        { width: 500, lineGap: 4.5 }
      )

    doc.y += 14

    doc
      .font('Helvetica')
      .fontSize(10)
      .fillColor(MUTED_TEXT)
      .text('Thanks,', 56, doc.y, { width: 500 })

    doc.y += 14

    doc
      .font('Helvetica-Bold')
      .fontSize(10)
      .fillColor(BODY_TEXT)
      .text('Sean Cranbury', 56, doc.y, { width: 500 })

    doc.y += 2

    doc
      .font('Helvetica')
      .fontSize(9.5)
      .fillColor(MUTED_TEXT)
      .text('Principal, CEO', 56, doc.y, { width: 500 })

    doc.y += 2

    doc
      .font('Helvetica')
      .fontSize(9.5)
      .fillColor(MUTED_TEXT)
      .text('Sympathetic Technology', 56, doc.y, { width: 500 })

    doc.y += 2

    doc
      .font('Helvetica')
      .fontSize(9.5)
      .fillColor(MUTED_TEXT)
      .text('hello@sympathetictechnology.com', 56, doc.y, { width: 500 })

    doc.y += 2

    doc
      .font('Helvetica')
      .fontSize(9.5)
      .fillColor(MUTED_TEXT)
      .text('778-987-8774', 56, doc.y, { width: 500 })

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
      'Thank you for requesting an AI Readiness Assessment. Your report is attached as a PDF below.',
      '',
      'If anything in the assessment raises questions or sparks curiosity for you or your organization, please feel free to reply directly to this email.',
      '',
      'I would be happy to set up time by phone or video call to talk through the report, answer questions about what AI adoption might look like in your context, or discuss practical next steps if that would be helpful.',
      '',
      'Thanks again for your time,',
      '',
      'Sean Cranbury',
      'Principal and CEO',
      'Sympathetic Technology',
      'hello@sympathetictechnology.com',
      '778-987-8774',
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
