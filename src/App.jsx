import { useEffect } from 'react'
import { Link, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import AboutPage from './about.jsx'
import ServicesPage from './services.jsx'
import OurApproachPage from './our-approach.jsx'
import SovereignAIPage from './sovereign-ai.jsx'
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

const outlineButtonClass =
  'inline-block rounded-none border border-[#111827] bg-transparent px-8 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#111827] transition-colors duration-300 hover:bg-[#111827] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111827]'

/* ─── Routing column (home — Variant 1 editorial cards) ───────────── */

function RoutingColumn({ index, headline, description, examples, cta, ctaHref, ctaNote }) {
  const numLabel = String(index).padStart(2, '0')

  return (
    <article className="routing-card-v1 relative flex h-full flex-col rounded-md p-8 md:p-10 lg:p-11">
      <span
        className="pointer-events-none absolute left-7 top-5 select-none font-serif text-[3.25rem] font-light leading-none tracking-tight text-neutral-200 md:left-9 md:top-6 md:text-[4rem] lg:text-[4.25rem]"
        aria-hidden
      >
        {numLabel}
      </span>

      <div className="mt-12 flex flex-col gap-8 md:mt-14 md:grid md:flex-1 md:grid-cols-[minmax(0,1fr)_auto] md:items-stretch md:gap-8 lg:gap-10">
        <div className="flex min-h-0 flex-col pt-1 md:min-h-full">
          <h3 className="font-serif text-[1.375rem] font-semibold leading-snug tracking-tight text-neutral-900 md:text-[1.5rem] lg:text-[1.625rem]">
            {headline}
          </h3>
          <p className="mt-4 font-sans text-base font-normal leading-relaxed text-neutral-700">
            {description}
          </p>
          <div className="mt-8 md:mt-auto md:pt-10">
            <Link
              to={ctaHref}
              className="inline-block font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-900 underline-offset-[6px] decoration-neutral-900/20 transition-colors duration-200 hover:decoration-neutral-900/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-800"
            >
              {cta}
            </Link>
            {ctaNote && (
              <p className="mt-2 font-sans text-[11px] font-normal leading-relaxed text-neutral-500">
                {ctaNote}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-neutral-200 pt-8 md:flex-row md:gap-8 md:border-l md:border-t-0 md:pl-8 md:pt-0 lg:pl-10">
          <ul className="space-y-2.5 font-sans text-sm font-normal leading-relaxed text-neutral-600 md:min-w-[10rem] lg:min-w-[11rem]">
            {examples.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
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

/* ─── Phone mockups (Proof of Work) ──────────────────────────────── */

function PhonePlaceholder({ label, src, alt }) {
  const imgAlt = alt ?? label
  const resolvedSrc =
    src && src.startsWith('/') ? `${import.meta.env.BASE_URL}${src.slice(1)}` : src

  return (
    <div className="flex shrink-0 flex-col items-center">
      <div
        className="relative h-[300px] w-[142px] shrink-0 overflow-hidden rounded-[22px] border-[5px] border-neutral-900 bg-neutral-900 shadow-[0_18px_50px_-15px_rgba(15,23,42,0.55)] ring-2 ring-white transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_28px_60px_-18px_rgba(15,23,42,0.45)] sm:h-[329px] sm:w-[156px] sm:rounded-[24px] sm:border-[6px] md:h-[359px] md:w-[170px] lg:h-[380px] lg:w-[180px]"
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
        {/* Notch */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 z-10 h-4 w-20 -translate-x-1/2 rounded-b-xl bg-neutral-900"
          aria-hidden
        />
      </div>
    </div>
  )
}

/* ─── Home page ──────────────────────────────────────────────────── */

const recentPosts = journalPosts.slice(0, 3)

function HomePage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-[100vh] w-full overflow-hidden"
      >
        <SiteHeader overlay />

        {/* Fallback background */}
        <div className="absolute inset-0 z-0 bg-[#111827]" aria-hidden />

        {/* Video — hidden on mobile, replaced by poster bg */}
        <video
          className="absolute inset-0 z-[1] hidden h-full min-h-full w-full min-w-full object-cover object-center md:block"
          src="/Sympathetic_Vancouver.mp4"
          poster="/og-image.png"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />

        {/* Mobile poster frame */}
        <div
          className="absolute inset-0 z-[1] block bg-cover bg-center md:hidden"
          style={{ backgroundImage: "url('/og-image.png')" }}
          aria-hidden
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-[2] bg-gradient-to-t from-black/85 via-black/30 to-black/10"
          aria-hidden
        />

        {/* Hero text — bottom left */}
        <div className="absolute bottom-[105px] left-[210px] right-6 z-10 pb-14 md:right-12 md:pb-16 lg:right-16 lg:pb-20">
          <div className="max-w-[960px]">
            <h1 className="text-shadow-hero font-sans text-[36px] font-bold leading-[1.18] tracking-tight text-white sm:text-[40px] md:text-[46px] lg:text-[52px]">
              Organizational guidance for
              <br />
              nonprofits, healthcare
              <br />
              associations and arts
              <br />
              organizations navigating AI.
            </h1>
            <p className="text-shadow-hero mt-5 max-w-[620px] font-sans text-base font-normal leading-relaxed text-white/85 md:text-lg">
              From a two-hour briefing to a full governance infrastructure, we work
              at whatever scale actually fits.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 md:gap-4">
              <Link
                to="/talk"
                className="inline-block rounded-none bg-white px-7 py-3.5 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#111827] transition-colors duration-300 hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Book a Conversation
              </Link>
              <Link
                to="/readiness-assessment"
                className="inline-block rounded-none border border-white/80 bg-transparent px-7 py-3.5 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Take the Readiness Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROUTING SECTION ──────────────────────────────────────── */}
      <section className="border-t border-neutral-200 bg-white px-6 py-20 md:px-12 md:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center font-serif text-[1.75rem] font-semibold leading-tight tracking-tight text-neutral-900 md:mb-16 md:text-[2rem] lg:text-[2.125rem]">
            What kind of help are you looking for?
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6 lg:gap-8">
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
              ctaNote="These engagements start at $500."
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
                'Governance framework',
                'PIPEDA compliance',
                'Board-ready documentation',
              ]}
              cta="Our Approach to Sovereign AI →"
              ctaHref="/sovereign-ai"
            />
          </div>
        </div>
      </section>

      {/* ── PROOF OF WORK ────────────────────────────────────────── */}
      <section className="border-t border-neutral-200 bg-white px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">

            {/* Left: text */}
            <div className="flex flex-col justify-center rounded-xl border border-neutral-200/90 bg-gradient-to-b from-neutral-50 to-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.06)] ring-1 ring-neutral-900/[0.04] md:p-10">
              <p className={`${sectionLabelClass} mb-5`}>Proof of Work</p>
              <h2 className="font-sans text-3xl font-bold leading-tight tracking-tight text-neutral-900 md:text-4xl">
                Physiotherapy Association of BC: Member App
              </h2>
              <div className="mt-6 space-y-4 font-sans text-base font-normal leading-relaxed text-neutral-600">
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
              <div className="mt-8">
                <Link
                  to="/services"
                  className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-900 underline-offset-[6px] decoration-neutral-900/25 transition-all hover:opacity-80 hover:decoration-neutral-900/50"
                >
                  View the Full Case Study →
                </Link>
              </div>
            </div>

            {/* Right: phone screenshots */}
            <div className="flex w-full flex-col items-stretch md:min-w-[min(100%,360px)]">
              <div className="rounded-2xl border border-neutral-200/90 bg-gradient-to-br from-neutral-100 via-neutral-50 to-white p-8 shadow-inner shadow-neutral-900/[0.03] ring-1 ring-neutral-900/[0.04] md:p-10">
                <div className="flex w-full max-w-full flex-nowrap items-end justify-center gap-4 overflow-x-auto overflow-y-visible py-4 [scrollbar-width:thin] sm:gap-5 md:gap-6">
                  <PhonePlaceholder
                    src="/images/proof/pabc-screen-welcome.png"
                    alt="PABC member app screenshot: Indigenous Education article"
                    label="Welcome screen"
                  />
                  <PhonePlaceholder
                    src="/images/proof/pabc-screen-updates.png"
                    alt="PABC member app screenshot: ICBC Recovery Network article"
                    label="Updates feed"
                  />
                  <PhonePlaceholder
                    src="/images/proof/pabc-screen-resources.png"
                    alt="PABC member app screenshot: Advocacy hot topics"
                    label="Resources"
                  />
                </div>
                <p className="mt-8 w-full text-center font-sans text-[11px] font-normal tracking-wide text-neutral-500">
                  Built for members. Owned by the association. Designed for trust.
                </p>
              </div>
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
                  I've been navigating these kinds of organizational transitions from
                  the inside for twenty years.
                </p>
                <p>
                  The work isn't about technology adoption. It's about helping
                  institutions think clearly under pressure and move at a pace they
                  can sustain.
                </p>
                <p>
                  I work with people who care about their mission, their members, and
                  their people. My job is to help them make better decisions with
                  better information and build systems that actually support the work.
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
      <section className="border-t border-neutral-200 bg-white px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 font-sans text-2xl font-bold tracking-tight text-neutral-900 md:mb-16 md:text-3xl">
            Who I work with
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8 lg:gap-12">
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
              <div
                key={heading}
                className="group flex h-full flex-col rounded-xl border border-neutral-200/90 bg-gradient-to-b from-neutral-50 to-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.06)] ring-1 ring-neutral-900/[0.04] transition-all duration-300 hover:border-neutral-300 hover:shadow-[0_12px_40px_-12px_rgba(15,23,42,0.12)] md:p-8"
              >
                <span
                  className="mb-4 block h-1 w-8 rounded-full bg-[#0B111E]/85 transition-[width] duration-300 group-hover:w-11"
                  aria-hidden
                />
                <h3 className="font-sans text-base font-bold leading-snug tracking-tight text-neutral-900">
                  {heading}
                </h3>
                <p className="mt-3 font-sans text-sm font-normal leading-relaxed text-neutral-600">
                  {body}
                </p>
              </div>
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
        <Route path="/sovereign-ai" element={<SovereignAIPage />} />
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
