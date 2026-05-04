import { Link } from 'react-router-dom'
import {
  FooterCta,
  bodyTextClass,
  ctaClass,
  eyebrowClass,
  pageFont,
  sectionHeadlineClass,
} from './InteriorFooter.jsx'
import SiteHeader from './SiteHeader.jsx'

const iconWrap =
  'flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-white'

/** Minimal 24×24 stroke icons for service cards */
function ServiceIcon({ id }) {
  const c = 'h-[22px] w-[22px]'
  const s = { strokeWidth: 1.5, stroke: 'currentColor', fill: 'none' }
  switch (id) {
    case 'legislative':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M12 3v18M8 21h8M6 6h12M6 10h12M9 6V4h6v2" />
          <path {...s} d="M7 14h10v4H7z" />
        </svg>
      )
    case 'translate':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <text x="4" y="15" fontSize="9" fill="currentColor" stroke="none">
            文
          </text>
          <text x="14" y="15" fontSize="9" fill="currentColor" stroke="none">
            A
          </text>
          <path {...s} d="M11 7h6M11 17h6M14 4v3M14 17v3" />
        </svg>
      )
    case 'consultation':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M7 4h10a2 2 0 012 2v12l-4-2H7a2 2 0 01-2-2V6a2 2 0 012-2z" />
          <path {...s} d="M9 8h6M9 12h4" />
          <path {...s} d="M14 15l3 3" strokeLinecap="round" />
        </svg>
      )
    case 'assistant':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <path
            {...s}
            d="M6 10c0-3 2.5-5 6-5s6 2 6 5v2H6v-2zM8 20h8M12 14v2"
            strokeLinecap="round"
          />
          <circle cx="9" cy="9" r="0.75" fill="currentColor" />
          <circle cx="15" cy="9" r="0.75" fill="currentColor" />
        </svg>
      )
    case 'misinformation':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M10 9v6M12 21a7 7 0 007-7h-4l-4-2V5a7 7 0 00-7 7v7l4-2" />
        </svg>
      )
    case 'stakeholders':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <circle {...s} cx="9" cy="7" r="2.5" />
          <path {...s} d="M4 19c0-3 2.5-4 5-4M15 7a2.5 2.5 0 110 5 2.5 2.5 0 010-5z" />
          <path {...s} d="M14 19h6v-.5c0-2-1.5-3.5-4-3.5" />
        </svg>
      )
    case 'media':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M4 6h16v12H4zM8 18V6M4 10h16" />
          <path {...s} d="M7 13h5M7 16h3" strokeLinecap="round" />
        </svg>
      )
    case 'sentiment':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M4 19V5M4 19h16M8 15v-3M12 15V9M16 15v-5M20 11v2" />
        </svg>
      )
    case 'crisis':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M12 4l8 4v6c0 5-3.5 8-8 8s-8-3-8-8V8l8-4z" />
          <path {...s} d="M12 9v4M12 17h.01" strokeLinecap="round" />
        </svg>
      )
    case 'event':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <rect {...s} x="3" y="5" width="18" height="16" rx="2" />
          <path {...s} d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
        </svg>
      )
    case 'credential':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <rect {...s} x="5" y="6" width="14" height="12" rx="2" />
          <circle {...s} cx="12" cy="11" r="2" />
          <path {...s} d="M8 16h8" strokeLinecap="round" />
        </svg>
      )
    case 'publicGuidance':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <circle {...s} cx="8" cy="9" r="2" />
          <circle {...s} cx="16" cy="9" r="2" />
          <circle {...s} cx="12" cy="16" r="2" />
          <path {...s} d="M6 20c1-2 2.5-3 6-3s5 1 6 3" />
        </svg>
      )
    case 'policySearch':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M4 7h7v10H4zM14 7h6v4h-6z" />
          <circle {...s} cx="16.5" cy="16.5" r="3.5" />
          <path {...s} d="M19 19l2.5 2.5" strokeLinecap="round" />
        </svg>
      )
    case 'legislativeBrief':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M7 3h10v18H7zM10 3v3h4V3" />
          <path {...s} d="M9 10h6M9 14h6M9 18h4" strokeLinecap="round" />
        </svg>
      )
    case 'padlock':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <rect {...s} x="6" y="11" width="12" height="10" rx="1" />
          <path {...s} d="M8 8a4 4 0 018 0v3H8V8z" />
        </svg>
      )
    case 'compliance':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M12 3l7 4v5c0 5-3 9-7 10-4-1-7-5-7-10V7l7-4z" />
          <path {...s} d="M9 12l2 2 4-4" strokeLinecap="round" />
        </svg>
      )
    case 'dataAnalysis':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M4 20V4M4 20h16M7 16v-5M12 16V8M17 16v-8" />
        </svg>
      )
    case 'hr':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <circle {...s} cx="12" cy="8" r="3.5" />
          <path {...s} d="M5 20c0-4 3.5-6 7-6s7 2 7 6" />
        </svg>
      )
    case 'board':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <ellipse {...s} cx="12" cy="14" rx="8" ry="3" />
          <circle {...s} cx="7" cy="8" r="2" />
          <circle {...s} cx="12" cy="7" r="2" />
          <circle {...s} cx="17" cy="8" r="2" />
        </svg>
      )
    case 'incident':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M8 4h8l1 4H7l1-4zM6 9h12v12H6z" />
          <path {...s} d="M12 13v3M12 17h.01" strokeLinecap="round" />
        </svg>
      )
    case 'onboarding':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M4 5h16v14H4zM4 9h16" />
          <path {...s} d="M8 13h4M8 16h8" strokeLinecap="round" />
        </svg>
      )
    case 'riskFlag':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M7 3h10v14H7zM5 17h14" />
          <circle {...s} cx="15" cy="8" r="2.5" />
          <path {...s} d="M17 10l2 2" strokeLinecap="round" />
        </svg>
      )
    case 'versionControl':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <path
            {...s}
            d="M17 3v6h-6M7 21v-6h6M21 7l-4-4-4 4M3 17l4 4 4-4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'knowledgeGraph':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <circle {...s} cx="12" cy="5" r="2" />
          <circle {...s} cx="6" cy="17" r="2" />
          <circle {...s} cx="18" cy="17" r="2" />
          <path {...s} d="M11 6.5L7 15M13 6.5l4 8.5M9 17h6" />
        </svg>
      )
    default:
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <circle {...s} cx="12" cy="12" r="8" />
        </svg>
      )
  }
}

const publicTools = [
  {
    icon: 'legislative',
    title: 'Legislative monitoring',
    body:
      'Track bills and regulatory changes in real time, with alerts when proposed laws affect your profession.',
  },
  {
    icon: 'translate',
    title: 'Plain language translation',
    body:
      'Convert dense clinical guidelines and policy documents into member-facing communications that people can actually read and use.',
  },
  {
    icon: 'consultation',
    title: 'Consultation response drafting',
    body:
      "Draft submissions to government consultations that reflect your organization's established positions and prior advocacy work.",
  },
  {
    icon: 'assistant',
    title: 'Member-facing AI assistants',
    body:
      'Provide accurate answers to member questions using your bylaws, policies, and approved documents.',
  },
  {
    icon: 'misinformation',
    title: 'Misinformation response',
    body:
      'Identify emerging misinformation about your profession and prepare evidence-based responses before it spreads.',
  },
  {
    icon: 'stakeholders',
    title: 'Stakeholder mapping',
    body:
      'Understand which policymakers, regulators, and industry actors influence decisions that affect your members.',
  },
  {
    icon: 'media',
    title: 'Media response drafting',
    body:
      "Prepare consistent, on-record responses for media inquiries using your organization's approved language and history.",
  },
  {
    icon: 'sentiment',
    title: 'Member sentiment tracking',
    body:
      'Surface patterns in member questions, complaints, and feedback to understand where pressure is building.',
  },
  {
    icon: 'crisis',
    title: 'Crisis communication preparation',
    body:
      'Simulate realistic scenarios and refine how your organization would respond before a situation unfolds.',
  },
  {
    icon: 'event',
    title: 'Event and conference assistant',
    body:
      'Support members and attendees with schedules, session context, and clear information through a simple interface.',
  },
  {
    icon: 'credential',
    title: 'Credentialing and licensing assistant',
    body:
      'Answer common questions about registration, scope, and requirements using only verified regulatory information.',
  },
  {
    icon: 'publicGuidance',
    title: 'Public guidance tools',
    body:
      'Offer clear, trustworthy answers to public questions about your profession without exposing internal systems.',
  },
]

const secureTools = [
  {
    icon: 'policySearch',
    title: 'Local policy archive search',
    body:
      'Search bylaws, board decisions, and policy documents instantly without any data leaving your environment.',
  },
  {
    icon: 'legislativeBrief',
    title: 'Daily legislative brief',
    body:
      "Generate a focused morning summary of relevant government activity based on your organization's priorities.",
  },
  {
    icon: 'padlock',
    title: 'Sensitive document drafting',
    body:
      'Work on strategy documents, briefing notes, and internal papers in a fully contained environment.',
  },
  {
    icon: 'compliance',
    title: 'Pre-publication compliance checking',
    body:
      'Review communications before release to identify legal risk, policy conflicts, or unintended claims.',
  },
  {
    icon: 'dataAnalysis',
    title: 'Secure member data analysis',
    body:
      'Analyze membership trends, retention, and engagement without routing data through external platforms.',
  },
  {
    icon: 'hr',
    title: 'Internal HR and compliance assistant',
    body:
      'Support staff with accurate answers about policies and procedures using only approved internal documentation.',
  },
  {
    icon: 'board',
    title: 'Board governance support',
    body:
      'Summarize board materials, track decisions, and connect actions to strategic commitments over time.',
  },
  {
    icon: 'incident',
    title: 'Incident and grievance documentation',
    body:
      'Draft and organize sensitive complaints and disciplinary records within a controlled system.',
  },
  {
    icon: 'onboarding',
    title: 'Staff onboarding and knowledge transfer',
    body:
      'Capture institutional knowledge and make it accessible to new staff without relying on external tools.',
  },
  {
    icon: 'riskFlag',
    title: 'Regulatory risk flagging',
    body:
      'Scan internal documents and communications to identify language that could create compliance exposure.',
  },
  {
    icon: 'versionControl',
    title: 'Policy version control and traceability',
    body:
      'Track how policies change over time, including approvals, edits, and rationale.',
  },
  {
    icon: 'knowledgeGraph',
    title: 'Secure knowledge graph',
    body:
      'Map relationships between policies, committees, decisions, and stakeholders to make institutional knowledge usable.',
  },
]

function ServiceCard({ item, variant }) {
  const ring =
    variant === 'public'
      ? `${iconWrap} border-indigo-200 text-indigo-700`
      : `${iconWrap} border-emerald-200 text-emerald-800`

  return (
    <article className="flex gap-4 rounded-xl border border-[#e8e8e8] bg-white p-5 shadow-[0_1px_3px_rgba(17,24,39,0.06)] md:gap-5 md:p-6">
      <div className={ring} aria-hidden>
        <ServiceIcon id={item.icon} />
      </div>
      <div className="min-w-0">
        <h3 className="text-[16px] font-bold leading-snug tracking-[-0.01em] text-[#111111] md:text-[17px]">
          {item.title}
        </h3>
        <p className="mt-2 text-[14px] leading-[1.65] text-[#5c6169] md:text-[15px] md:leading-[1.7]">
          {item.body}
        </p>
      </div>
    </article>
  )
}

function ServiceCardSection({ eyebrow, headline, items, variant }) {
  const bg = variant === 'public' ? 'bg-[#f6f7fb]' : 'bg-[#f4f9f6]'
  const eyebrowBase =
    'text-[11px] font-semibold uppercase tracking-[0.14em]'
  const eyebrowTint =
    variant === 'public' ? 'text-indigo-900/55' : 'text-emerald-900/55'
  const headlineClass =
    variant === 'public'
      ? 'font-serif text-[clamp(28px,3.2vw,44px)] font-bold leading-[1.12] tracking-[-0.02em] text-[#1e3a5f]'
      : 'font-serif text-[clamp(28px,3.2vw,44px)] font-bold leading-[1.12] tracking-[-0.02em] text-[#14532d]'

  return (
    <section className={`border-b border-[#e8e8e8] ${bg}`}>
      <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-12 md:py-20">
        <p className={`${eyebrowBase} ${eyebrowTint}`}>{eyebrow}</p>
        <h2 className={`mt-4 max-w-[920px] ${headlineClass}`}>{headline}</h2>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {items.map((item) => (
            <ServiceCard key={item.title} item={item} variant={variant} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  return (
    <div
      className="min-h-screen bg-white text-[#111111] antialiased"
      style={{ fontFamily: pageFont, WebkitFontSmoothing: 'antialiased' }}
    >
      <SiteHeader />

      <main className="bg-white">
        <section className="border-b border-[#e8e8e8] bg-white px-6 py-16 md:px-12 md:pb-20 md:pt-[120px]">
          <div className="mx-auto max-w-[1200px]">
            <p className={eyebrowClass}>Services</p>
            <h1 className="mt-5 max-w-[900px] text-[clamp(40px,5vw,68px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#111111]">
              What can AI actually do for an organization like yours?
            </h1>
            <div className={`mt-8 max-w-[760px] space-y-4 ${bodyTextClass}`}>
              <p>
                &quot;It can do anything&quot; is neither accurate nor helpful. What you
                need are specifics: what does it look like day-to-day inside an actual
                governance structure? How does it support staff and members in
                practical, concrete ways?
              </p>
              <p>
                The tools below are examples, not a fixed menu. Most of them can be
                built or adapted to reflect your industry, your profession, and the
                problems your organization is actually dealing with.
              </p>
            </div>
          </div>
        </section>

        <ServiceCardSection
          eyebrow="Secure organizational tools"
          headline="Secure AI tools that protect your organization"
          items={secureTools}
          variant="secure"
        />

        <section className="bg-[#111827] px-6 py-16 text-left text-white md:px-12 md:py-[100px]">
          <blockquote className="mx-auto max-w-[860px] text-left text-[clamp(24px,3vw,40px)] font-bold leading-[1.2] tracking-[-0.01em]">
            An organization that can tell its members, its board, and its regulators
            that AI runs inside its infrastructure and member data never touches a
            commercial platform is showing institutional maturity through
            architecture.
          </blockquote>
        </section>

        <ServiceCardSection
          eyebrow="Public and member-facing tools"
          headline="Safe AI tools that face your members and the public"
          items={publicTools}
          variant="public"
        />

        <section className="border-b border-[#e8e8e8] bg-white px-6 py-12 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
            <div>
              <p className={eyebrowClass}>The Governance Layer</p>
              <h2 className={`mt-4 ${sectionHeadlineClass}`}>
                When your board needs to be able to stand behind it.
              </h2>
            </div>
            <div>
              <p className={bodyTextClass}>
                Controlled Intelligence is our governance-first framework for
                organizations that need more than tools. A complete system of local
                infrastructure, policy documentation, staff onboarding, and quarterly
                oversight that your board can brief, your members can trust, and your
                regulators can examine.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                <Link to="/#work" className={ctaClass}>
                  Learn about Controlled Intelligence
                </Link>
                <Link
                  to="/talk"
                  className="inline-flex border-b border-[#111111] pb-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#111111] transition-colors hover:text-[#2b2e34]"
                >
                  Let&apos;s Talk
                </Link>
              </div>
            </div>
          </div>
        </section>

        <FooterCta />
      </main>
    </div>
  )
}
