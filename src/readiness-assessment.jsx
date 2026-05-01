import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SiteHeader from './SiteHeader.jsx'
import { FooterCta, pageFont } from './InteriorFooter.jsx'

// ─── Design tokens (page-specific light palette) ──────────────────────────────
// Sage background: #EFF5EF  |  Douglas Fir: #2A4A2E  |  Terracotta: #C27059
// White cards float on sage. Chat is white interior. Form overlay is sage-frosted.

const SAGE = '#EFF5EF'
const FIR = '#2A4A2E'
const TERRA = '#C27059'

// ─── Pillar icons ────────────────────────────────────────────────────────────

function IconData() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <ellipse cx="16" cy="8" rx="10" ry="3.5" />
      <path d="M6 8v16" />
      <path d="M26 8v16" />
      <path d="M6 13.5 Q16 17 26 13.5" />
      <path d="M6 19 Q16 22.5 26 19" />
      <ellipse cx="16" cy="24" rx="10" ry="3.5" />
    </svg>
  )
}

function IconLeadership() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="16" cy="16" r="12" />
      <line x1="16" y1="4" x2="16" y2="7.5" />
      <line x1="16" y1="24.5" x2="16" y2="28" />
      <line x1="4" y1="16" x2="7.5" y2="16" />
      <line x1="24.5" y1="16" x2="28" y2="16" />
      {/* North needle — filled */}
      <path d="M16 8 L18.5 16 L16 13.5 L13.5 16 Z" fill="currentColor" stroke="none" />
      {/* South needle — outline only */}
      <path d="M16 24 L13.5 16 L16 18.5 L18.5 16 Z" />
      <circle cx="16" cy="16" r="2" fill="white" stroke="currentColor" />
    </svg>
  )
}

function IconMission() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="16" cy="12" r="7" />
      <circle cx="10.5" cy="21" r="7" />
      <circle cx="21.5" cy="21" r="7" />
    </svg>
  )
}

// ─── Meta + trust icons ───────────────────────────────────────────────────────

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

function IconChat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-5" />
    </svg>
  )
}

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="11" width="14" height="11" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

function IconBuilding() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <rect x="9" y="14" width="6" height="7" />
    </svg>
  )
}

function IconEthics() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 3 L27 7.5 L27 16.5 C27 22.5 22 27.5 16 29.5 C10 27.5 5 22.5 5 16.5 L5 7.5 Z" />
      <polyline points="11,16.5 14.5,20 21,13" />
    </svg>
  )
}

// ─── Constants ────────────────────────────────────────────────────────────────

const INDUSTRY_OPTIONS = [
  '',
  'Nonprofit / Charitable Organization',
  'Arts & Culture',
  'Healthcare Association',
  'Professional Association',
  'Government / Public Sector',
  'Education / Academic',
  'Social Services',
  'Environmental / Conservation',
  'Philanthropy / Foundation',
  'Other',
]

const PILLARS = [
  {
    number: '01',
    title: 'Data & Infrastructure',
    desc: 'The quality, accessibility, and governance of your organizational data and existing technology stack.',
    icon: <IconData />,
  },
  {
    number: '02',
    title: 'Leadership & Culture',
    desc: "Your team's AI literacy, risk tolerance, and readiness to lead through meaningful change.",
    icon: <IconLeadership />,
  },
  {
    number: '03',
    title: 'Mission Alignment',
    desc: 'Where AI tools can genuinely serve your mission — and where they risk quietly undermining it.',
    icon: <IconMission />,
  },
  {
    number: '04',
    title: 'Ethics & Governance',
    desc: 'The policies, protocols, and ethical frameworks your organization needs before deploying anything.',
    icon: <IconEthics />,
  },
]

// ─── Form helpers ─────────────────────────────────────────────────────────────

function FormField({ label, required, error, children }) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#3A4A3A]">
        {label}
        {required && <span className="ml-1 text-[#C27059]">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-[11px] text-[#C27059]" role="alert">{error}</p>
      )}
    </div>
  )
}

// ─── Chat components ──────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1.5 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full bg-[#2A4A2E]/30"
          style={{ animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </span>
  )
}

function AssistantMessage({ content, streaming }) {
  if (streaming && !content) return (
    <div className="flex gap-4">
      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2A4A2E]/10" aria-hidden>
        <div className="h-2 w-2 rounded-full bg-[#2A4A2E]" />
      </div>
      <TypingDots />
    </div>
  )

  const isReport = content.includes('AI Readiness Assessment') && content.includes('Overall readiness level:')

  return (
    <div className="flex gap-4">
      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2A4A2E]/10" aria-hidden>
        <div className="h-2 w-2 rounded-full bg-[#2A4A2E]" />
      </div>
      {isReport ? (
        <ReportBlock content={content} />
      ) : (
        <div className="max-w-[640px] text-[15px] leading-[1.8] text-[#1A2A1A] whitespace-pre-wrap">
          {content}
          {streaming && (
            <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-[#2A4A2E]/50 align-middle" />
          )}
        </div>
      )}
    </div>
  )
}

function UserMessage({ content }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[540px] bg-[#E2EEE2] px-4 py-3 text-[15px] leading-[1.7] text-[#1A2A1A]">
        {content}
      </div>
    </div>
  )
}

function ReportBlock({ content }) {
  const lines = content.split('\n')
  return (
    <div className="w-full max-w-[680px]">
      <div className="border border-[#2A4A2E]/20 bg-[#2A4A2E]/8 px-6 py-5 mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2A4A2E]">
          Assessment Complete
        </p>
        <p className="mt-1 text-[13px] text-[#4A6A4A]">
          Your AI readiness report is below.
        </p>
      </div>
      <div className="border border-[#D0DDD0] bg-[#F8FCF8] px-6 py-6 text-[13px] leading-[1.9] text-[#1A2A1A] whitespace-pre-wrap font-mono">
        {lines.filter((l) => l !== '---').join('\n').trim()}
      </div>
      <div className="mt-6 border-t border-[#D0DDD0] pt-6">
        <p className="text-[13px] leading-[1.65] text-[#555555] mb-4">
          Want to walk through these results with someone who knows this terrain?
        </p>
        <Link
          to="/talk"
          className="inline-block bg-[#111111] px-8 py-[14px] text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#2A4A2E]"
        >
          Book a Debrief with Sympathetic Technology
        </Link>
      </div>
    </div>
  )
}

// ─── Chat interface ───────────────────────────────────────────────────────────

function ChatInterface({ formData }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState(null)
  const messagesContainerRef = useRef(null)
  const inputRef = useRef(null)
  const hasStarted = useRef(false)

  const scrollToBottom = useCallback(() => {
    const el = messagesContainerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, scrollToBottom])

  const callApi = useCallback(async (conversationMessages) => {
    setIsStreaming(true)
    setError(null)
    setMessages((prev) => [...prev, { role: 'assistant', content: '', streaming: true }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, messages: conversationMessages }),
      })
      if (!res.ok) throw new Error(`Server error ${res.status}`)

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const lines = decoder.decode(value, { stream: true }).split('\n')
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          let parsed
          try { parsed = JSON.parse(line.slice(6)) } catch { continue }

          if (parsed.type === 'delta') {
            accumulated += parsed.text
            setMessages((prev) =>
              prev.map((m, i) => i === prev.length - 1 ? { ...m, content: accumulated } : m)
            )
          } else if (parsed.type === 'done') {
            setMessages((prev) =>
              prev.map((m, i) => i === prev.length - 1 ? { ...m, streaming: false } : m)
            )
            if (accumulated.includes('AI Readiness Assessment') && accumulated.includes('Overall readiness level:')) {
              setIsComplete(true)
            }
          } else if (parsed.type === 'error') {
            throw new Error(parsed.message)
          }
        }
      }
    } catch {
      setMessages((prev) => prev.slice(0, -1))
      setError('Connection issue. Please try again.')
    } finally {
      setIsStreaming(false)
      inputRef.current?.focus()
    }
  }, [formData])

  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true
    callApi([])
  }, [callApi])

  const handleSend = () => {
    const text = input.trim()
    if (!text || isStreaming) return
    const updated = [...messages, { role: 'user', content: text }]
    setMessages(updated)
    setInput('')
    callApi(updated.map(({ role, content }) => ({ role, content })))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  return (
    <div
      className="flex flex-col bg-white border border-[#D0DDD0] shadow-sm"
      style={{ height: '680px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#D0DDD0] bg-[#F4FAF4] px-6 py-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className={`h-2 w-2 rounded-full bg-[#2A4A2E] ${isStreaming ? 'animate-pulse' : ''}`} aria-hidden />
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4A6A4A]">
            AI Readiness Assessment
            {isComplete && <span className="ml-2 text-[#2A4A2E]">Complete</span>}
          </p>
        </div>
        {formData.name && (
          <p className="text-[11px] text-[#888888]">{formData.name}</p>
        )}
      </div>

      {/* Messages */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto space-y-8 px-6 py-8 bg-white">
        {messages.map((msg, i) =>
          msg.role === 'user'
            ? <UserMessage key={i} content={msg.content} />
            : <AssistantMessage key={i} content={msg.content} streaming={msg.streaming} />
        )}
        {error && (
          <div className="flex justify-center">
            <div className="border border-[#C27059]/30 bg-[#C27059]/5 px-4 py-3 text-[13px] text-[#C27059]">
              {error}
              <button
                onClick={() => { setError(null); callApi(messages.map(({ role, content }) => ({ role, content }))) }}
                className="ml-3 underline hover:no-underline"
              >
                Retry
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      {!isComplete && (
        <div className="border-t border-[#D0DDD0] bg-[#F8FCF8] px-6 py-4 shrink-0">
          <div className="flex gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isStreaming}
              placeholder={isStreaming ? 'Waiting for response...' : 'Type your response — press Enter to send'}
              rows={2}
              className="flex-1 resize-none border border-[#C8D8C8] bg-white px-4 py-3 text-[14px] text-[#1A2A1A] placeholder-[#AABCAA] outline-none transition-colors focus:border-[#2A4A2E]/50 disabled:opacity-50"
              aria-label="Your response"
            />
            <button
              onClick={handleSend}
              disabled={isStreaming || !input.trim()}
              className="shrink-0 self-end bg-[#C27059] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#b06248] disabled:opacity-35 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
          <p className="mt-2 text-[11px] text-[#AABCAA]">Shift + Enter for a new line</p>
        </div>
      )}
    </div>
  )
}

// ─── Intake gate ──────────────────────────────────────────────────────────────

function IntakeGate({ onSubmit }) {
  const [form, setForm] = useState({
    name: '', email: '', organization: '', industry: '', role: '', newsletter: false,
  })
  const [errors, setErrors] = useState({})

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) {
      e.email = 'Organizational email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email address'
    }
    if (!form.newsletter) e.newsletter = 'Newsletter signup is required to access the tool'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSubmit(form)
  }

  const inputClass = (hasError) =>
    `w-full border ${hasError ? 'border-[#C27059]/70' : 'border-[#C8D8C8]'} bg-[#F8FCF8] px-4 py-3 text-[14px] text-[#111111] placeholder-[#AABCAA] outline-none transition-colors duration-200 focus:border-[#2A4A2E]/60`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 flex items-center justify-center px-4 py-8"
      style={{ background: 'rgba(215, 232, 215, 0.88)', backdropFilter: 'blur(6px)' }}
    >
      <div
        className="w-full max-w-[560px] bg-white p-8 shadow-xl md:p-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gate-heading"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2A4A2E]">
          Access the Tool
        </p>
        <h3 id="gate-heading" className="mt-3 text-[22px] font-extrabold leading-[1.15] tracking-[-0.01em] text-[#111111]">
          Before we begin
        </h3>
        <p className="mt-2 text-[14px] leading-[1.65] text-[#555555]">
          Tell us a little about yourself and your organization. Name and organizational email are required.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
          <FormField label="Your Name" required error={errors.name}>
            <input type="text" placeholder="Full name" value={form.name} onChange={update('name')}
              className={inputClass(!!errors.name)} autoComplete="name" />
          </FormField>

          <FormField label="Organizational Email" required error={errors.email}>
            <input type="email" placeholder="you@yourorganization.org" value={form.email} onChange={update('email')}
              className={inputClass(!!errors.email)} autoComplete="email" />
          </FormField>

          <FormField label="Organization Name">
            <input type="text" placeholder="Optional" value={form.organization} onChange={update('organization')}
              className={inputClass(false)} autoComplete="organization" />
          </FormField>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField label="Industry / Sector">
              <div className="relative">
                <select value={form.industry} onChange={update('industry')}
                  className="w-full appearance-none border border-[#C8D8C8] bg-[#F8FCF8] px-4 py-3 text-[14px] text-[#111111] outline-none transition-colors focus:border-[#2A4A2E]/60 cursor-pointer">
                  {INDUSTRY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt || 'Select (optional)'}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-[#888888]" aria-hidden>▾</div>
              </div>
            </FormField>

            <FormField label="Your Role / Title">
              <input type="text" placeholder="Optional" value={form.role} onChange={update('role')}
                className={inputClass(false)} />
            </FormField>
          </div>

          <div className="border-t border-[#E0EAE0] pt-5">
            <label className="flex cursor-pointer items-start gap-3">
              <div className="relative mt-0.5 shrink-0">
                <input type="checkbox" checked={form.newsletter} onChange={update('newsletter')} className="sr-only" />
                <div className={`flex h-5 w-5 items-center justify-center border transition-colors duration-200 ${
                  form.newsletter ? 'border-[#C27059] bg-[#C27059]' : errors.newsletter ? 'border-[#C27059]/60' : 'border-[#C8D8C8]'
                }`} aria-hidden>
                  {form.newsletter && (
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-[13px] leading-[1.6] text-[#444444]">
                Sign me up for the Sympathetic Technology newsletter — thoughtful perspectives on AI, organizational change, and mission-driven work.
                <span className="ml-1 text-[#C27059]">*</span>
              </span>
            </label>
            {errors.newsletter && (
              <p className="mt-2 pl-8 text-[11px] text-[#C27059]" role="alert">{errors.newsletter}</p>
            )}
          </div>

          <button type="submit"
            className="mt-2 w-full bg-[#C27059] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:bg-[#b06248]">
            Begin Assessment →
          </button>

          <p className="text-center text-[11px] leading-[1.65] text-[#AABCAA]">
            Used only to personalize your assessment and deliver our newsletter. We never share or sell your data.
          </p>
        </form>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReadinessAssessmentPage() {
  const [formData, setFormData] = useState(null)

  return (
    <div
      className="min-h-screen antialiased"
      style={{ fontFamily: pageFont, WebkitFontSmoothing: 'antialiased', backgroundColor: SAGE }}
    >
      <SiteHeader />
      <main>

        {/* ── Hero ── */}
        <section className="px-6 py-16 md:px-12 md:pb-24 md:pt-[100px]" style={{ backgroundColor: SAGE }}>
          <div className="mx-auto max-w-[1200px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: FIR }}>
              AI Organizational Readiness Assessment
            </p>
            <h1 className="mt-6 max-w-[860px] text-[clamp(36px,4.5vw,62px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#111111]">
              Understand where your organization stands — before you leap.
            </h1>
            <p className="mt-8 max-w-[560px] text-[17px] font-normal leading-[1.75] text-[#445544]">
              A guided conversation that maps your AI readiness, surfaces real risks, and identifies
              where thoughtful technology can serve your mission.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              {[
                { icon: <IconClock />, label: '15–20 minutes' },
                { icon: <IconChat />,  label: 'No technical expertise required' },
                { icon: <IconCheck />, label: 'Free to complete' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-[#889988]">
                  <span className="block h-3.5 w-3.5 shrink-0 text-[#2A4A2E]">{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Four Pillars ── */}
        <section className="border-t border-b border-[#D8E8D8] bg-white px-6 py-16 md:px-12 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#888888]">
              What You&apos;ll Discover
            </p>
            <h2 className="mt-5 max-w-[640px] text-[clamp(26px,3vw,40px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#111111]">
              Four dimensions. One honest picture.
            </h2>
            <p className="mt-5 max-w-[520px] text-[17px] leading-[1.75] text-[#555555]">
              Most AI readiness frameworks focus on technology. This one starts with your organization.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PILLARS.map((p) => (
                <div key={p.number} className="border border-[#E0EAE0] bg-white px-6 py-8 shadow-sm">
                  <div className="mb-5 h-9 w-9 text-[#2A4A2E]">{p.icon}</div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C27059]">{p.number}</p>
                  <h3 className="mt-3 text-[16px] font-bold leading-[1.35] tracking-[-0.01em] text-[#111111]">{p.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-[#666666]">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why This Matters ── */}
        <section className="border-b border-[#D8E8D8] px-6 py-16 md:px-12 md:py-20" style={{ backgroundColor: SAGE }}>
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 md:grid-cols-[1fr_1fr] md:gap-20">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: FIR }}>
                Built for Mission-Driven Organizations
              </p>
              <h2 className="mt-5 text-[clamp(24px,2.5vw,36px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#111111]">
                Not all AI readiness frameworks are created equal.
              </h2>
              <div className="mt-6 space-y-4 text-[16px] leading-[1.75] text-[#445544]">
                <p>
                  Generic assessments assume unlimited budgets, dedicated technical teams, and tolerance for risk.
                  Nonprofits, associations, and arts organizations operate under very different conditions.
                </p>
                <p>
                  This tool is built specifically for mission-driven organizations — with the constraints,
                  values, and responsibilities you actually carry.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              {[
                {
                  title: 'Receive a scored readiness report',
                  body: 'A clear breakdown across all four dimensions, with specific gaps identified.',
                },
                {
                  title: 'Get tailored next-step recommendations',
                  body: 'Concrete actions matched to where your organization actually is — not where a generic framework assumes you are.',
                },
                {
                  title: 'Inform your AI strategy',
                  body: 'Use your results to guide board conversations, budget decisions, and vendor evaluations.',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C27059]" aria-hidden />
                  <div>
                    <p className="text-[15px] font-semibold text-[#111111]">{item.title}</p>
                    <p className="mt-1 text-[14px] leading-[1.7] text-[#445544]">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sector Stats ── */}
        {/* SOURCE NEEDED: Replace placeholder figures with verified data from
            TechSoup Digital Adoption Report, NTEN Nonprofit Technology Survey,
            Salesforce Nonprofit Trends Report, or similar sector research     */}
        <section className="border-b border-[#D8E8D8] bg-white px-6 py-16 md:px-12 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#888888]">
              The State of AI in the Sector
            </p>
            <div className="mt-10 grid grid-cols-1 gap-px bg-[#E8F0E8] sm:grid-cols-2 lg:grid-cols-4">

              {/* Stat 1 */}
              <div className="bg-white px-8 py-10">
                <p className="text-[clamp(42px,5vw,64px)] font-extrabold leading-none tracking-[-0.03em] text-[#2A4A2E]">
                  27<span className="text-[0.55em]">%</span>
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C27059]">
                  Have a Formal AI Strategy
                </p>
                <p className="mt-3 text-[14px] leading-[1.7] text-[#555555]">
                  Fewer than one in three nonprofits has a written policy or strategy guiding how AI tools can be used.
                </p>
              </div>

              {/* Stat 2 */}
              <div className="bg-white px-8 py-10">
                <p className="text-[clamp(42px,5vw,64px)] font-extrabold leading-none tracking-[-0.03em] text-[#2A4A2E]">
                  74<span className="text-[0.55em]">%</span>
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C27059]">
                  Cite Capacity as the Barrier
                </p>
                <p className="mt-3 text-[14px] leading-[1.7] text-[#555555]">
                  Of sector leaders say limited staff capacity — not budget — is their biggest obstacle to responsible AI adoption.
                </p>
              </div>

              {/* Stat 3 */}
              <div className="bg-white px-8 py-10">
                <p className="text-[clamp(42px,5vw,64px)] font-extrabold leading-none tracking-[-0.03em] text-[#2A4A2E]">
                  1<span className="text-[0.45em] font-bold"> in 5</span>
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C27059]">
                  Reviewed Data Governance
                </p>
                <p className="mt-3 text-[14px] leading-[1.7] text-[#555555]">
                  Mission-driven organizations that have reviewed their data governance practices in the past two years.
                </p>
              </div>

              {/* Stat 4 */}
              <div className="bg-white px-8 py-10">
                <p className="text-[clamp(42px,5vw,64px)] font-extrabold leading-none tracking-[-0.03em] text-[#2A4A2E]">
                  3<span className="text-[0.55em]">×</span>
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C27059]">
                  Better Implementation Rate
                </p>
                <p className="mt-3 text-[14px] leading-[1.7] text-[#555555]">
                  Organizations that assess readiness before adopting AI tools report three times the successful implementation rate.
                </p>
              </div>

            </div>
            <p className="mt-5 text-[11px] text-[#AABCAA]">
              Sources: TechSoup Digital Adoption Report, NTEN Nonprofit Technology Survey, Salesforce Nonprofit Trends — figures are illustrative placeholders pending verification.
            </p>
          </div>
        </section>

        {/* ── Tools Grid ── */}
        <section className="border-b border-[#D8E8D8] px-6 py-16 md:px-12 md:py-20" style={{ backgroundColor: SAGE }}>
          <div className="mx-auto max-w-[1200px]">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#888888]">
              The Tools in Your World
            </p>
            <h2 className="mt-4 max-w-[680px] text-[clamp(24px,2.5vw,36px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#111111]">
              We know the tools your organization already runs on.
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {[
                { name: 'Salesforce NPSP',    category: 'CRM & Fundraising'    },
                { name: 'Raiser\'s Edge',     category: 'CRM & Fundraising'    },
                { name: 'Bloomerang',         category: 'CRM & Fundraising'    },
                { name: 'DonorPerfect',       category: 'CRM & Fundraising'    },
                { name: 'Microsoft 365',      category: 'Productivity'         },
                { name: 'Google Workspace',   category: 'Productivity'         },
                { name: 'Slack',              category: 'Communications'       },
                { name: 'Zoom',               category: 'Communications'       },
                { name: 'Mailchimp',          category: 'Marketing'            },
                { name: 'WordPress',          category: 'Web & Content'        },
                { name: 'Asana',              category: 'Project Management'   },
                { name: 'QuickBooks',         category: 'Finance'              },
                { name: 'Sage Intacct',       category: 'Finance'              },
                { name: 'Canva',              category: 'Design & Content'     },
                { name: 'Eventbrite',         category: 'Events'               },
                { name: 'Submittable',        category: 'Grants Management'    },
              ].map((tool) => (
                <div
                  key={tool.name}
                  className="border border-[#D8E8D8] bg-white px-5 py-5 transition-colors duration-150 hover:border-[#2A4A2E]/30 hover:bg-[#F4FAF4]"
                >
                  <p className="text-[15px] font-semibold leading-snug text-[#111111]">{tool.name}</p>
                  <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-[#889988]">{tool.category}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Gated Assessment ── */}
        <section className="bg-white px-6 py-16 md:px-12 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: FIR }}>
              The Assessment
            </p>
            <h2 className="mt-4 max-w-[600px] text-[clamp(24px,2.5vw,36px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#111111]">
              Begin your readiness conversation
            </h2>

            <div className="mt-10">
              {formData ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <ChatInterface formData={formData} />
                </motion.div>
              ) : (
                <div className="relative h-[680px]">
                  {/* Blurred placeholder */}
                  <div className="h-full opacity-30 blur-sm pointer-events-none" aria-hidden>
                    <div className="flex h-full flex-col bg-white border border-[#D0DDD0]">
                      <div className="flex items-center gap-3 border-b border-[#D0DDD0] bg-[#F4FAF4] px-6 py-4">
                        <div className="h-2 w-2 rounded-full bg-[#2A4A2E]" />
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4A6A4A]">AI Readiness Assessment</p>
                      </div>
                      <div className="flex-1 px-6 py-8 space-y-5">
                        <div className="h-3.5 w-3/4 bg-[#D8E8D8] rounded" />
                        <div className="h-3.5 w-1/2 bg-[#D8E8D8] rounded" />
                        <div className="h-3.5 w-5/6 bg-[#D8E8D8] rounded" />
                        <div className="mt-6 h-3.5 w-2/3 bg-[#E2EEE2] rounded" />
                      </div>
                    </div>
                  </div>
                  {/* Gate overlay */}
                  <IntakeGate onSubmit={(data) => setFormData(data)} />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Trust strip ── */}
        <section className="border-t border-[#D8E8D8] px-6 py-14 md:px-12" style={{ backgroundColor: SAGE }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
              <p className="max-w-[480px] text-center text-[15px] leading-[1.7] text-[#445544] md:text-left">
                Developed by Sympathetic Technology from years of hands-on work with nonprofits,
                associations, and arts organizations navigating AI adoption.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:justify-end">
                {[
                  { icon: <IconHeart />,    label: 'Mission-Aligned' },
                  { icon: <IconLock />,     label: 'Privacy-First' },
                  { icon: <IconBuilding />, label: 'Sector-Specific' },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#889988]">
                    <span className="block h-4 w-4 shrink-0 text-[#2A4A2E]">{icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      <FooterCta />
    </div>
  )
}
