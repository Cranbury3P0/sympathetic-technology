import { useEffect } from 'react'
import { Link, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import AboutPage from './about.jsx'
import ServicesPage from './services.jsx'
import OurApproachPage from './our-approach.jsx'
import ControlledIntelligencePage from './controlled-intelligence.jsx'
import { JournalIndexPage, JournalPostPage } from './Journal.jsx'
import TalkPage from './talk.jsx'
import ReadinessAssessmentPage from './readiness-assessment.jsx'
import PrivacyPage from './privacy.jsx'
import CookieBanner from './CookieBanner.jsx'
import SiteFooter from './SiteFooter.jsx'
import SiteHeader from './SiteHeader.jsx'
import { journalPosts } from './journalData.js'

function ScrollToRoutePosition() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }
    window.requestAnimationFrame(() => {
      const target = document.getElementById(hash.slice(1))
      if (target) target.scrollIntoView({ block: 'start', behavior: 'auto' })
    })
  }, [pathname, hash])

  return null
}

/* ─── Shared style tokens ─────────────────────────────────────────── */

const sectionLabelClass =
  'font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-400'

const primaryButtonClass =
  'inline-block rounded-none bg-[#111827] px-8 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-[#1f2937] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111827]'

const routingCardCtaClass =
  'block w-full rounded-none bg-[#5f695c] px-5 py-3.5 text-center font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-[#525d52] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5f695c]'

/* ─── Routing column (home — help tier cards) ─────────────────────── */

function RoutingExampleBullets({ items }) {
  return (
    <ul className="space-y-2 font-sans text-[13px] font-normal leading-relaxed text-neutral-700">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-3.5 before:absolute before:left-0 before:top-[0.55em] before:h-[3px] before:w-[3px] before:rounded-full before:bg-neutral-400 before:content-['']"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

function RoutingColumn({ index, headline, description, examples, cta, ctaHref }) {
  const numLabel = String(index).padStart(2, '0')
  const splitAt = Math.ceil(examples.length / 2)
  const examplesLeft = examples.slice(0, splitAt)
  const examplesRight = examples.slice(splitAt)

  return (
    <article className="routing-card-v1 relative flex h-full flex-col overflow-hidden rounded-lg">
      {/* Top olive accent — matches mock strip */}
      <div className="h-[3px] w-full shrink-0 bg-[#5f695c]" aria-hidden />

      <div className="relative flex min-h-0 flex-1 flex-col px-7 pb-9 pt-8 md:px-9 md:pb-10 md:pt-9 lg:px-10 lg:pb-11 lg:pt-10">
        <span
          className="pointer-events-none absolute left-7 top-[2.85rem] select-none font-sans text-[3rem] font-light leading-none tracking-tight text-neutral-200 md:left-9 md:top-[3.15rem] md:text-[3.5rem] lg:left-10 lg:text-[3.65rem]"
          aria-hidden
        >
          {numLabel}
        </span>

        <div className="mt-[3.35rem] flex min-h-0 flex-1 flex-col md:mt-[3.65rem] lg:mt-[3.85rem]">
          <h3 className="font-sans text-[1.375rem] font-semibold leading-snug tracking-tight text-neutral-900 md:text-[1.5rem] lg:text-[1.625rem]">
            {headline}
          </h3>
          <p className="mt-4 font-sans text-[15px] font-normal leading-relaxed text-neutral-900 md:text-base">
            {description}
          </p>

          <div className="mt-8 border-t border-neutral-200 pt-8">
            <div className="grid grid-cols-2 gap-x-5 gap-y-1 sm:gap-x-8">
              <RoutingExampleBullets items={examplesLeft} />
              <RoutingExampleBullets items={examplesRight} />
            </div>
          </div>

          <div className="mt-auto pt-10">
            <Link to={ctaHref} className={routingCardCtaClass}>
              {cta}
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

/* ─── Journal card ───────────────────────────────────────────────── */

function JournalCard({ post }) {
  return (
    <article className="flex flex-col">
      <Link to={post.href} className="group block overflow-hidden">
        <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100">
          <img
            src={post.cover_image}
            alt={post.cover_alt || ''}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>
      </Link>
      <div className="mt-5 flex flex-col flex-1">
        <p className={`${sectionLabelClass} text-neutral-400`}>{post.category}</p>
        <h3 className="mt-3 font-sans text-xl font-bold leading-snug tracking-tight text-neutral-900">
          <Link
            to={post.href}
            className="transition-opacity hover:opacity-70"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 font-sans text-sm font-normal leading-relaxed text-neutral-500 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-5">
          <Link
            to={post.href}
            className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-900 underline-offset-4 transition-opacity hover:opacity-60"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  )
}

/* ─── Proof of Work phone frames ──────────────────────────────────── */

function ProofPhoneFrame({ label, src, alt, className }) {
  const imgAlt = alt ?? label
  const resolvedSrc =
    src && src.startsWith('/') ? `${import.meta.env.BASE_URL}${src.slice(1)}` : src

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-[22px] border-[5px] border-neutral-900 bg-neutral-900 shadow-[0_22px_45px_-12px_rgba(15,23,42,0.42)] ring-[3px] ring-white sm:rounded-[24px] sm:border-[6px] ${className}`}
    >
      {src ? (
        <img
          src={resolvedSrc}
          alt={imgAlt}
          className="pointer-events-none absolute inset-0 block h-full w-full object-cover object-top"
          loading="eager"
          decoding="async"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-neutral-100 via-neutral-200 to-neutral-300">
          <span className="px-3 text-center font-sans text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-500">
            {label}
          </span>
        </div>
      )}
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-10 h-4 w-20 -translate-x-1/2 rounded-b-xl bg-neutral-900"
        aria-hidden
      />
    </div>
  )
}

function ProofPhoneCluster({ phones }) {
  const [left, center, right] = phones

  return (
    <div className="relative mx-auto aspect-[16/11] w-full max-w-[540px] sm:aspect-[18/11] md:max-w-[560px]">
      {/* Side phones sit slightly behind the hero */}
      <div className="absolute bottom-[8%] left-[0%] z-[2] sm:left-[4%] md:bottom-[10%] md:left-[6%]">
        <ProofPhoneFrame
          {...left}
          className="h-[248px] w-[118px] origin-bottom -rotate-[10deg] scale-[0.92] sm:h-[268px] sm:w-[126px] md:h-[286px] md:w-[134px] md:-rotate-[8deg]"
        />
      </div>
      <div className="absolute bottom-[8%] right-[0%] z-[2] sm:right-[4%] md:bottom-[10%] md:right-[6%]">
        <ProofPhoneFrame
          {...right}
          className="h-[248px] w-[118px] origin-bottom rotate-[10deg] scale-[0.92] sm:h-[268px] sm:w-[126px] md:h-[286px] md:w-[134px] md:rotate-[8deg]"
        />
      </div>
      {/* Center phone — largest, forward */}
      <div className="absolute bottom-[4%] left-1/2 z-[8] -translate-x-1/2 sm:bottom-[6%] md:bottom-[7%]">
        <ProofPhoneFrame
          {...center}
          className="!shadow-[0_32px_70px_-14px_rgba(15,23,42,0.48)] h-[292px] w-[138px] sm:h-[322px] sm:w-[152px] md:h-[352px] md:w-[166px]"
        />
      </div>
    </div>
  )
}

/* ─── Home page ──────────────────────────────────────────────────── */

const recentPosts = journalPosts.slice(0, 3)

/** Plain poster so the hero never flashes the old OG artwork (CI / Sovereign tagline baked into og-image.png). */
const HERO_VIDEO_POSTER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='100%25' height='100%25' fill='%23111827'/%3E%3C/svg%3E"

function HomePage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-[100svh] w-full overflow-hidden md:min-h-[100vh]"
      >
        <SiteHeader overlay />

        {/* Fallback background */}
        <div className="absolute inset-0 z-0 bg-[#111827]" aria-hidden />

        {/* Video — full bleed (mobile + desktop) */}
        <video
          className="absolute inset-0 z-[1] h-full w-full object-cover object-center brightness-[1.08] contrast-[1.02]"
          src="/stanley-park.mp4"
          poster={HERO_VIDEO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />

        {/* Gentle vignette so hero stays cohesive behind overlays */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_100%_75%_at_50%_36%,rgba(17,24,39,0.42),transparent_70%)]"
          aria-hidden
        />

        {/* Readability gradient — bottom-weighted for headline + CTAs */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/58 via-black/22 to-black/5"
          aria-hidden
        />

        {/* Hero text — mobile: smaller type + tighter rhythm so fold fits phones; md+: prior scale */}
        <div className="relative z-10 px-5 pb-[calc(4rem+env(safe-area-inset-bottom))] pt-[calc(7rem+env(safe-area-inset-top))] sm:px-6 md:absolute md:bottom-[105px] md:left-20 md:right-12 md:pb-16 md:pt-0 lg:left-[210px] lg:right-16 lg:pb-20">
          <div className="max-w-[960px]">
            <h1 className="text-shadow-hero font-sans text-[26px] font-bold leading-[1.12] tracking-tight text-white sm:text-[30px] sm:leading-[1.14] md:text-[46px] md:leading-[1.18] lg:text-[52px]">
              Organizational guidance for
              <br />
              nonprofits, healthcare
              <br />
              associations and arts
              <br />
              organizations navigating AI.
            </h1>
            <p className="text-shadow-hero mt-3 max-w-[620px] font-sans text-[13px] font-normal leading-[1.55] text-white/85 sm:mt-4 sm:text-[14px] sm:leading-[1.6] md:mt-5 md:text-lg md:leading-relaxed">
              From AI adoption strategy to custom tools to full governance infrastructure, we advise and build
              according to what your organization actually needs.
            </p>
            <div className="mt-5 flex max-w-full flex-col gap-2 sm:mt-6 sm:gap-2.5 sm:flex-row sm:flex-wrap md:mt-8 md:gap-4">
              <Link
                to="/talk"
                className="inline-block w-full max-w-full rounded-none bg-white px-5 py-2.5 text-center font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#111827] transition-colors duration-300 hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:px-6 sm:py-3 sm:text-[11px] sm:tracking-[0.2em] sm:text-left md:px-7 md:py-3.5 md:tracking-[0.22em]"
              >
                Book a Conversation
              </Link>
              <Link
                to="/readiness-assessment"
                className="inline-block w-full max-w-full rounded-none border border-white/80 bg-transparent px-5 py-2.5 text-center font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:px-6 sm:py-3 sm:text-[11px] sm:tracking-[0.2em] sm:text-left md:px-7 md:py-3.5 md:tracking-[0.22em]"
              >
                Take the Readiness Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROUTING SECTION ──────────────────────────────────────── */}
      <section className="border-t border-neutral-200/80 bg-[#f4f4f1] px-6 py-20 md:px-12 md:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center font-sans text-[1.75rem] font-semibold leading-tight tracking-tight text-neutral-900 md:mb-16 md:text-[2rem] lg:text-[2.125rem]">
            What kind of help are you looking for?
          </h2>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-3 md:items-stretch md:gap-6 lg:gap-8">
            <RoutingColumn
              index={1}
              headline="I need clarity before I commit to anything."
              description="You're not ready for a project yet. You need straight answers, options, and a plan that makes sense for your organization."
              examples={[
                'Advisory calls',
                'Board briefings',
                'Staff workshops',
                'AI literacy sessions',
              ]}
              cta="Let's Talk →"
              ctaHref="/talk"
            />
            <RoutingColumn
              index={2}
              headline="I have a specific project in mind."
              description="You know what you need to build or improve. You're looking for the right partner to get it done."
              examples={[
                'Member platforms',
                'Communications strategy',
                'Custom AI tools',
                'Policy documents',
              ]}
              cta="Explore Services →"
              ctaHref="/services"
            />
            <RoutingColumn
              index={3}
              headline="I need serious AI governance infrastructure."
              description="Your organization needs secure, governed AI systems with compliance documentation and long-term oversight."
              examples={[
                'Controlled Intelligence',
                'Local model deployment',
                'PIPEDA compliance',
                'Governance framework',
                'Board-ready documentation',
              ]}
              cta="Our Approach to Controlled Intelligence →"
              ctaHref="/controlled-intelligence"
            />
          </div>
        </div>
      </section>

      {/* ── PROOF OF WORK ────────────────────────────────────────── */}
      <section className="border-t border-neutral-200/70 bg-[#f9f9f9] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-16 lg:gap-20">

            {/* Left: editorial text */}
            <div className="mx-auto flex max-w-xl flex-col justify-center md:mx-0 lg:max-w-none lg:pr-4">
              <p className={`${sectionLabelClass} mb-5`}>Proof of Work</p>
              <h2 className="font-sans text-[1.875rem] font-semibold leading-[1.15] tracking-tight text-neutral-900 md:text-[2.125rem] lg:text-[2.25rem]">
                Physiotherapy Association of BC: Member App
              </h2>
              <div className="mt-7 space-y-5 font-sans text-[15px] font-normal leading-relaxed text-neutral-600 md:text-base">
                <p>
                  We built a custom mobile communications app for the Physiotherapy
                  Association of BC to strengthen member engagement, improve retention,
                  and create a trusted channel for advocacy, updates, and professional
                  resources.
                </p>
                <p>
                  The app has become a central member benefit and a reliable platform
                  for timely information that members use and trust.
                </p>
              </div>
              <div className="mt-10">
                <Link
                  to="/services"
                  className="inline-block border-b border-neutral-900 pb-2 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-900 transition-opacity duration-200 hover:opacity-65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-800"
                >
                  View the Full Case Study →
                </Link>
              </div>
            </div>

            {/* Right: overlapping phones */}
            <div className="flex w-full flex-col items-center md:items-center">
              <ProofPhoneCluster
                phones={[
                  {
                    src: '/images/proof/pabc-screen-welcome.png',
                    alt: 'PABC member app screenshot: Indigenous Education article',
                    label: 'Welcome screen',
                  },
                  {
                    src: '/images/proof/pabc-screen-updates.png',
                    alt: 'PABC member app screenshot: ICBC Recovery Network article',
                    label: 'Updates feed',
                  },
                  {
                    src: '/images/proof/pabc-screen-resources.png',
                    alt: 'PABC member app screenshot: Advocacy hot topics',
                    label: 'Resources',
                  },
                ]}
              />
              <p className="mt-10 max-w-md text-center font-sans text-[11px] font-normal tracking-wide text-neutral-500 md:mt-12">
                Built for members. Owned by the association. Designed for trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT THE WORK ───────────────────────────────────────── */}
      <section className="border-t border-neutral-200 bg-white px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">

            {/* Left: portrait */}
            <div className="flex items-start">
              <div className="w-full overflow-hidden bg-neutral-100">
                <img
                  src="/sean-cranbury-headshot.png"
                  alt="Sean Cranbury"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Right: copy */}
            <div className="flex flex-col justify-center">
              <p className={`${sectionLabelClass} mb-6`}>About the Work</p>
              <div className="space-y-5 font-sans text-lg font-normal leading-relaxed text-neutral-700">
                <p>
                  I&apos;m Sean Cranbury. For twenty years I&apos;ve worked inside
                  healthcare associations, nonprofits, and arts organizations. On staff,
                  in the rooms, serving vital communities, navigating budget limits, and
                  building culture across diverse teams.
                </p>
                <p>
                  The work of development and change in the age of AI is less about
                  technology adoption than it is about organizational clarity. Helping
                  people think clearly about what they do, why they do it, and what they
                  actually need to do it better.
                </p>
                <p>
                  I work with people who care about their mission, their members, and
                  their teams. My job is to help them make better decisions with better
                  information and build systems that actually support their intentions.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  to="/approach"
                  className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-900 underline-offset-4 transition-opacity hover:opacity-60"
                >
                  Read More About My Approach →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHO I WORK WITH ──────────────────────────────────────── */}
      <section className="border-t border-neutral-200/80 bg-[#f4f4f1] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 font-sans text-[1.75rem] font-semibold leading-tight tracking-tight text-neutral-900 md:mb-14 md:text-[2rem] lg:text-[2.0625rem]">
            Who I work with
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
            {[
              {
                heading: 'Healthcare organizations',
                body: "Your staff are already using consumer AI tools. Your board doesn't have a policy. Your member data is moving through platforms your organization doesn't control. We help you get ahead of that before it becomes a governance problem.",
              },
              {
                heading: 'Nonprofits and associations',
                body: "Small teams, limited budgets, and board expectations that don't always match organizational capacity. We work at the scale you can actually sustain, not the scale a vendor wants to sell you.",
              },
              {
                heading: 'Arts and cultural organizations',
                body: "The tension between adopting new tools and protecting the creative and institutional work that defines you is real. We help you navigate it without pretending it isn't complicated.",
              },
              {
                heading: 'Publishers and creative teams',
                body: 'Workflows are changing faster than most teams can absorb. We help you find the tools that actually serve the work rather than the ones that just look like progress.',
              },
            ].map(({ heading, body }) => (
              <article key={heading} className="audience-card-v1 flex h-full flex-col overflow-hidden rounded-lg">
                <div className="h-[3px] w-full shrink-0 bg-[#5f695c]" aria-hidden />
                <div className="flex flex-1 flex-col p-8 md:p-9 lg:p-10">
                  <h3 className="font-sans text-[1.25rem] font-semibold leading-snug tracking-tight text-neutral-900 md:text-[1.375rem] lg:text-[1.4375rem]">
                    {heading}
                  </h3>
                  <p className="mt-4 max-w-[54ch] font-sans text-[15px] font-normal leading-relaxed text-neutral-600 md:text-base">
                    {body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FROM THE JOURNAL ─────────────────────────────────────── */}
      {recentPosts.length > 0 && (
        <section className="border-t border-neutral-200 bg-white px-6 py-20 md:px-12 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex items-baseline justify-between">
              <p className={sectionLabelClass}>From the Journal</p>
              <Link
                to="/journal"
                className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-900 underline-offset-4 transition-opacity hover:opacity-60"
              >
                View All Articles →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:gap-10">
              {recentPosts.map((post) => (
                <JournalCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER CTA ───────────────────────────────────────────── */}
      <section className="bg-[#111827] px-6 py-20 text-center md:py-28">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-sans text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-[42px]">
            Mission-driven organizations shouldn&apos;t have to choose between
            progress and privacy.
          </h2>
          <div className="mt-10">
            <Link
              to="/talk"
              className="inline-block rounded-none bg-white px-10 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#111827] transition-colors duration-300 hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Book a Conversation
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}

/* ─── App shell ──────────────────────────────────────────────────── */

export default function App() {
  return (
    <>
      <ScrollToRoutePosition />
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/approach" element={<OurApproachPage />} />
        <Route
          path="/controlled-intelligence"
          element={<ControlledIntelligencePage />}
        />
        <Route
          path="/sovereign-ai"
          element={<Navigate to="/controlled-intelligence" replace />}
        />
        <Route path="/journal" element={<JournalIndexPage />} />
        <Route path="/journal/:slug" element={<JournalPostPage />} />
        <Route path="/talk" element={<TalkPage />} />
        <Route path="/readiness-assessment" element={<ReadinessAssessmentPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route
          path="/our-approach"
          element={<Navigate to={{ pathname: '/approach' }} replace />}
        />
        <Route
          path="/start-here"
          element={<Navigate to={{ pathname: '/', hash: 'manifesto' }} replace />}
        />
        <Route path="/contact" element={<Navigate to="/talk" replace />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <SiteFooter />
      <CookieBanner />
    </>
  )
}
