import { FooterCta, pageFont } from './InteriorFooter.jsx'
import SiteHeader from './SiteHeader.jsx'

const eyebrowClass =
  'text-[11px] font-medium uppercase tracking-[0.12em] text-[#999999]'

const bodyTextClass =
  'text-[17px] font-normal leading-[1.75] text-[#2b2e34]'

const sectionHeadlineClass =
  'text-[clamp(28px,3vw,42px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#111111]'

/** Order: top of page = layer 04 → bottom = layer 01 (foundation). */
const architectureLayers = [
  {
    num: '04',
    variant: 'light',
    accent: 'slate',
    title: 'External Deployment',
    detail: 'Member and public interfaces',
    body:
      'Governed intelligence is extended outward through tools for members, partners, and the public.',
    icon: 'users',
  },
  {
    num: '03',
    variant: 'light',
    accent: 'blue',
    title: 'Professional Intelligence',
    detail: 'Monitoring and analysis',
    body:
      'Legislation, regulatory decisions, and sector signals are defined and tracked as part of a governed workflow.',
    icon: 'chart',
  },
  {
    num: '02',
    variant: 'light',
    accent: 'green',
    title: 'Internal Knowledge',
    detail: 'Document intelligence',
    body:
      'Board records, policies, and communications connect to tools that respect access controls and governance responsibilities.',
    icon: 'document',
  },
  {
    num: '01',
    variant: 'dark',
    accent: 'foundation',
    title: 'Sovereign AI',
    detail: 'Local inference layer',
    body:
      'Your organization runs open-weight models inside infrastructure it governs. Sensitive work stays inside a controlled environment.',
    icon: 'shield',
  },
]

function LayerIcon({ name, className = '' }) {
  const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }
  const c = `h-6 w-6 ${className}`
  switch (name) {
    case 'shield':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <path
            {...s}
            strokeLinejoin="round"
            d="M12 3l8 3v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-3z"
          />
          <rect x="9" y="11" width="6" height="5" rx="1" {...s} />
          <path {...s} d="M12 13v2" strokeLinecap="round" />
        </svg>
      )
    case 'document':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M7 3h10l3 3v15H7z" strokeLinejoin="round" />
          <path {...s} d="M14 3v4h4" strokeLinejoin="round" />
          <path {...s} d="M9 12h6M9 16h6" strokeLinecap="round" />
        </svg>
      )
    case 'chart':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M4 20V4M4 20h16" strokeLinecap="round" />
          <path {...s} d="M7 16V12M12 16V8M17 16v-5" strokeLinecap="round" />
        </svg>
      )
    case 'users':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <circle {...s} cx="9" cy="7" r="2.25" />
          <circle {...s} cx="16" cy="7" r="2.25" />
          <path
            {...s}
            strokeLinecap="round"
            d="M4 19c0-2.8 2.2-4 5-4M15 17c2.5.3 5 1.4 5 4"
          />
          <path {...s} strokeLinecap="round" d="M13 19c.8-1.5 2.5-2.5 4-2.7" />
        </svg>
      )
    default:
      return null
  }
}

function LayerConnector() {
  return (
    <div className="flex justify-center py-1" aria-hidden>
      <div className="flex flex-col items-center text-[#94a3b8]">
        <svg
          className="h-3.5 w-3.5 shrink-0 text-[#94a3b8]"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M6 2v7M3.5 4.5L6 2l2.5 2.5"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="mt-0.5 h-7 w-px shrink-0 border-l border-dashed border-current" />
      </div>
    </div>
  )
}

function LayerCard({ layer }) {
  const isDark = layer.variant === 'dark'

  const numRing = (() => {
    if (isDark)
      return 'bg-[#263342] text-white shadow-inner ring-1 ring-white/10'
    if (layer.accent === 'green')
      return 'bg-emerald-100 text-emerald-900 ring-1 ring-emerald-200/80'
    if (layer.accent === 'blue')
      return 'bg-sky-100 text-sky-900 ring-1 ring-sky-200/80'
    return 'bg-slate-200 text-slate-800 ring-1 ring-slate-300/80'
  })()

  const iconRing = (() => {
    if (isDark) return 'bg-white/15 text-white ring-1 ring-white/25'
    if (layer.accent === 'green')
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
    if (layer.accent === 'blue')
      return 'bg-sky-50 text-sky-700 ring-1 ring-sky-200'
    return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200'
  })()

  const detailClass = (() => {
    if (isDark) return 'text-white/75'
    if (layer.accent === 'green') return 'text-emerald-700'
    if (layer.accent === 'blue') return 'text-sky-700'
    return 'text-slate-600'
  })()

  const bodyClass = isDark ? 'text-white/90' : 'text-[#4b5563]'

  const cardBg = isDark
    ? 'bg-[#3d4f66] text-white shadow-lg ring-1 ring-[#2d3d52]/30'
    : 'bg-[#f4f7fb] text-[#111111] ring-1 ring-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.06)]'

  const dividerClass = isDark ? 'border-white/15' : 'border-slate-200/90'

  return (
    <article
      className={`rounded-2xl px-5 py-6 md:px-8 md:py-7 ${cardBg}`}
      aria-label={`Layer ${layer.num}: ${layer.title}`}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:gap-0">
        <div
          className={`flex shrink-0 items-center gap-3 md:w-[120px] md:flex-col md:items-center md:justify-center md:gap-4 md:border-r md:border-solid md:pr-6 ${dividerClass}`}
        >
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[13px] font-bold tabular-nums ${numRing}`}
          >
            {layer.num}
          </span>
          <span
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${iconRing}`}
          >
            <LayerIcon name={layer.icon} />
          </span>
        </div>

        <div className="min-w-0 md:flex md:flex-1 md:gap-8 md:gap-8 lg:gap-12">
          <div
            className={`md:w-[min(100%,220px)] md:shrink-0 md:border-r md:border-solid md:pr-8 lg:pr-10 ${dividerClass}`}
          >
            <h3
              className={`text-[18px] font-bold leading-snug tracking-[-0.01em] md:text-[19px] ${
                isDark ? 'text-white' : 'text-[#111111]'
              }`}
            >
              {layer.title}
            </h3>
            <p className={`mt-1.5 text-[13px] font-medium leading-snug md:text-[14px] ${detailClass}`}>
              {layer.detail}
            </p>
          </div>
          <p
            className={`mt-4 text-[14px] leading-[1.65] md:mt-0 md:flex-1 md:text-[15px] md:leading-[1.7] ${bodyClass}`}
          >
            {layer.body}
          </p>
        </div>
      </div>
    </article>
  )
}

function ArchitectureSection() {
  return (
    <section className="border-b border-[#e8e8e8] bg-white px-6 py-12 md:px-12 md:py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:items-start lg:gap-16 xl:gap-[4.5rem]">
          <div className="lg:sticky lg:top-28 lg:max-w-[300px]">
            <p className={eyebrowClass}>The Architecture</p>
            <h2 className={`mt-4 ${sectionHeadlineClass}`}>
              Four layers of governed activity.
            </h2>
            <div className="mt-5 h-0.5 w-12 rounded-full bg-blue-600" aria-hidden />
            <p className={`mt-6 ${bodyTextClass}`}>
              Each layer builds on the one beneath it. Nothing skips the system.
            </p>
          </div>
          <div className="min-w-0">
            {architectureLayers.map((layer, i) => (
              <div key={layer.num}>
                {i > 0 ? <LayerConnector /> : null}
                <LayerCard layer={layer} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PrincipleIcon({ name, className = '' }) {
  const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }
  const c = `h-6 w-6 ${className}`
  switch (name) {
    case 'governance':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <path
            {...s}
            strokeLinejoin="round"
            d="M12 3l8 3v5.5a8.5 8.5 0 01-8 8c-4.5-.7-8-4-8-8V6l8-3z"
          />
          <circle cx="12" cy="10" r="2.25" {...s} />
          <path {...s} strokeLinecap="round" d="M9.5 17c.8-2 1.8-3 2.5-3s1.7 1 2.5 3" />
        </svg>
      )
    case 'lock':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <rect x="6" y="11" width="12" height="10" rx="1" {...s} />
          <path {...s} d="M8 10V8a4 4 0 118 0v2" />
        </svg>
      )
    case 'searchDoc':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <path {...s} d="M5 4h8l3 3v11H5z" strokeLinejoin="round" />
          <path {...s} d="M11 4v4h3" strokeLinejoin="round" />
          <path {...s} d="M8 13h3M8 16h4" strokeLinecap="round" />
          <circle cx="16" cy="16" r="2.75" {...s} />
          <path {...s} strokeLinecap="round" d="M18 18l2.5 2.5" />
        </svg>
      )
    case 'group':
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden>
          <circle {...s} cx="9" cy="8" r="2.25" />
          <circle {...s} cx="16" cy="8" r="2.25" />
          <path {...s} strokeLinecap="round" d="M4 19c0-2.8 2.5-4 5-4M15 17.5c2.8.2 5 1.5 5 3.5" />
          <path {...s} strokeLinecap="round" d="M12.5 19.5c1-1.8 2.6-3 4-3.2" />
        </svg>
      )
    default:
      return null
  }
}

const principleThemes = {
  blue: {
    bar: 'bg-blue-600',
    num: 'text-blue-600',
    iconWrap: 'bg-blue-50 text-blue-600 ring-blue-200/60',
    underline: 'bg-blue-600',
  },
  green: {
    bar: 'bg-emerald-700',
    num: 'text-emerald-700',
    iconWrap: 'bg-emerald-50 text-emerald-700 ring-emerald-200/70',
    underline: 'bg-emerald-700',
  },
  purple: {
    bar: 'bg-violet-700',
    num: 'text-violet-700',
    iconWrap: 'bg-violet-50 text-violet-700 ring-violet-200/70',
    underline: 'bg-violet-700',
  },
  teal: {
    bar: 'bg-teal-600',
    num: 'text-teal-600',
    iconWrap: 'bg-teal-50 text-teal-600 ring-teal-200/70',
    underline: 'bg-teal-600',
  },
}

const principles = [
  {
    num: '01',
    theme: 'blue',
    icon: 'governance',
    title: 'Governance before automation',
    detail:
      'Institutional judgment stays with the people accountable for the work.',
  },
  {
    num: '02',
    theme: 'green',
    icon: 'lock',
    title: 'Local control before convenience',
    detail: 'Sensitive knowledge stays inside boundaries the organization defines.',
  },
  {
    num: '03',
    theme: 'purple',
    icon: 'searchDoc',
    title: 'Translation before transformation',
    detail: 'The first task is understanding how the organization already works.',
  },
  {
    num: '04',
    theme: 'teal',
    icon: 'group',
    title: 'Accountability before adoption',
    detail:
      'Boards, staff, members, and regulators need systems they can examine.',
  },
]

function PrincipleCard({ item, theme }) {
  return (
    <article className="relative z-10 flex overflow-hidden rounded-xl border border-[#e8e8e8] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div className={`w-1 shrink-0 ${theme.bar}`} aria-hidden />
      <div className="flex min-w-0 flex-1 flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:gap-6 md:px-7 md:py-6">
        <div className="flex shrink-0 items-center gap-5 sm:gap-6">
          <span
            className={`w-9 text-center text-[17px] font-bold tabular-nums sm:w-10 ${theme.num}`}
          >
            {item.num}
          </span>
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-2 ring-white">
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-slate-300 bg-white md:block"
              aria-hidden
            />
            <div
              className={`relative z-[1] flex h-14 w-14 items-center justify-center rounded-full ring-2 ${theme.iconWrap}`}
            >
              <PrincipleIcon name={item.icon} />
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="min-w-0 md:max-w-[280px]">
            <h3 className="text-[17px] font-bold leading-snug tracking-[-0.01em] text-[#111111] md:text-[18px]">
              {item.title}
            </h3>
            <div className={`mt-2.5 h-0.5 w-10 rounded-full ${theme.underline}`} aria-hidden />
          </div>
          <p className="text-[14px] leading-[1.65] text-[#6b7280] md:max-w-[340px] md:text-right md:text-[15px] md:leading-[1.7]">
            {item.detail}
          </p>
        </div>
      </div>
    </article>
  )
}

function PrinciplesSection() {
  return (
    <section className="border-b border-[#e8e8e8] bg-white px-6 py-12 md:px-12 md:py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:items-start lg:gap-16 xl:gap-[4.5rem]">
          <div className="lg:sticky lg:top-28 lg:max-w-[320px]">
            <p className={eyebrowClass}>Principles</p>
            <h2 className={`mt-4 ${sectionHeadlineClass}`}>
              The system follows the organization.
            </h2>
            <div className="mt-5 h-0.5 w-12 rounded-full bg-blue-600" aria-hidden />
            <p className="mt-6 text-[16px] leading-[1.7] text-[#5c6169] md:text-[17px] md:leading-[1.75]">
              Our principles ensure technology strengthens your judgment, respects your
              boundaries, and supports the people responsible for the work.
            </p>
          </div>
          <div className="relative min-w-0 space-y-5 md:space-y-6">
            <div
              className="pointer-events-none absolute bottom-10 left-[6.75rem] top-10 z-0 hidden border-l-2 border-dashed border-slate-200 md:left-[7.75rem] md:block"
              aria-hidden
            />
            {principles.map((item) => (
              <PrincipleCard
                key={item.title}
                item={item}
                theme={principleThemes[item.theme]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function OurApproachPage() {
  return (
    <div
      className="min-h-screen bg-white text-[#111111] antialiased"
      style={{ fontFamily: pageFont, WebkitFontSmoothing: 'antialiased' }}
    >
      <SiteHeader />

      <main className="bg-white">
        <section className="border-b border-[#e8e8e8] bg-white px-6 py-16 md:px-12 md:pb-20 md:pt-[120px]">
          <div className="mx-auto max-w-[1200px]">
            <p className={eyebrowClass}>Our Approach</p>
            <h1 className="mt-5 max-w-[900px] text-[clamp(40px,5vw,68px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#111111]">
              Controlled Intelligence is a framework for organizations that govern what
              they build.
            </h1>
            <div className={`mt-8 max-w-[760px] space-y-4 ${bodyTextClass}`}>
              <p>
                Controlled Intelligence does not automate institutional judgment. It
                clarifies where that judgment lives, how it moves, and what it depends
                on.
              </p>
              <p>
                It gives organizations a way to work with AI without stepping outside
                their own responsibilities, records, and governance structures.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#111827] px-6 py-16 text-left text-white md:px-12 md:py-[100px]">
          <div className="mx-auto max-w-[860px] space-y-6 text-left text-[clamp(24px,3vw,40px)] font-bold leading-[1.2] tracking-[-0.01em]">
            <p>
              We design AI systems that work inside your organization, not outside it.
            </p>
            <p>
              Your data stays under your control. Your policies still apply. Your team
              gets a clearer view of what&apos;s happening across the organization, so
              decisions are faster, better informed, and easier to stand behind.
            </p>
          </div>
        </section>

        <ArchitectureSection />

        <section className="border-b border-[#e8e8e8] bg-white px-6 py-12 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
            <div>
              <p className={eyebrowClass}>The Reason</p>
              <h2 className={`mt-4 ${sectionHeadlineClass}`}>
                Adoption without governance creates institutional risk.
              </h2>
            </div>
            <div className={`space-y-6 ${bodyTextClass}`}>
              <p>
                Most organizations are already using AI before they are ready for it.
                Staff test ChatGPT, Claude, Gemini, and other public tools before
                policies exist. Teams paste sensitive information into platforms the
                organization does not control. Leaders inherit the risk without a clear
                view of what is being used, where information is going, or who is
                responsible.
              </p>
              <p>
                Controlled Intelligence gives the organization a secure perimeter for
                AI adoption. People can investigate, draft, compare, monitor, and learn
                while keeping institutional knowledge inside systems the organization
                can govern, audit, explain, and improve.
              </p>
            </div>
          </div>
        </section>

        <PrinciplesSection />

        <section className="border-b border-[#e8e8e8] bg-white px-6 py-12 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
            <div>
              <p className={eyebrowClass}>A note on these systems</p>
              <h2 className={`mt-4 ${sectionHeadlineClass}`}>
                Responsible adoption starts with honest accounting.
              </h2>
            </div>
            <div className={`space-y-6 ${bodyTextClass}`}>
              <p>
                Contemporary AI systems are built on writing, research, and cultural
                knowledge created by many communities. Most of that work was used
                without consent or compensation. That is a real harm.
              </p>
              <p>
                These systems also carry environmental costs. Large-scale infrastructure
                consumes energy and water at levels that are rarely visible to the
                organizations using it.
              </p>
              <p>
                In Canada, institutional AI use operates within legal and ethical
                obligations that carry real weight. Privacy law, Indigenous data
                sovereignty principles such as OCAP®, and the stewardship of health and
                member records all shape what responsible use looks like.
              </p>
              <p>
                Our approach reflects this reality. AI should be used within clear
                governance boundaries, with an honest understanding of what it depends
                on, and in systems that keep organizational knowledge inside environments
                you control.
              </p>
            </div>
          </div>
        </section>

        <FooterCta />
      </main>
    </div>
  )
}