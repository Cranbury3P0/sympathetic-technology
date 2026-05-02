import { submitAssessment } from '../server/assessmentSubmission.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed.' })
  }

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
}
