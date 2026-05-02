import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
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

function SectionDivider() {
  return <div className="h-px w-full bg-neutral-200" aria-hidden />
}

function ScrollToRoutePosition() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    window.requestAnimationFrame(() => {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ block: 'start', behavior: 'auto' })
      }
    })
  }, [pathname, hash])

  return null
}

const sectionYMobile = 'py-[80px]'
const sectionYDesktop = 'md:py-[150px] lg:py-[180px]'
const sectionPad = `px-6 ${sectionYMobile} ${sectionYDesktop}`

const CRAFT_PLACEHOLDER_CAPTION =
  'Macro photo of physical craft: architectural paper, ink on vellum, or heavy bookbinding.'

function CraftPlaceholder({
  className = '',
  imageSrc = null,
  imageObjectPosition,
  punchyMono = false,
  punchyContrast125 = false,
}) {
  const objectPos = imageObjectPosition ?? 'object-center'
  const imgTone = punchyContrast125
    ? 'grayscale contrast-125'
    : punchyMono
      ? 'grayscale contrast-[1.1]'
      : ''
  return (
    <figure className={`w-full ${className}`}>
      <div className="aspect-[4/5] w-full overflow-hidden bg-gray-100">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt=""
            className={`h-full w-full object-cover ${objectPos} ${imgTone}`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            role="img"
            aria-label={CRAFT_PLACEHOLDER_CAPTION}
            className="h-full w-full bg-gray-100"
          />
        )}
      </div>
      {!imageSrc && (
        <figcaption className="mt-3 text-left font-sans text-[10px] leading-snug text-neutral-400 md:text-[11px]">
          {CRAFT_PLACEHOLDER_CAPTION}
        </figcaption>
      )}
    </figure>
  )
}

const LABEL_SAND = 'text-[#C2B2A3]'

/** Work case studies use the same body scale as the manifesto sections. */
const workSectionBodyClass =
  'font-sans text-lg font-normal leading-relaxed text-neutral-600 antialiased md:text-xl'

const WORK_UNITS = [
  {
    label: 'A',
    title: 'Local, secure infrastructure',
    textAlign: 'left',
    imageSrc: '/images/sovereign-infrastructure.png',
    imageObjectPosition: 'object-top',
    bodyParagraphs: [
      <>
        <span className="font-semibold text-neutral-800">
          Controlled Intelligence
        </span>{' '}
        is designed for nonprofits, professional associations, arts
        organizations, and mission-driven institutions that need modern AI
        capability without surrendering governance control.
      </>,
      'Private, secure AI environments protect sensitive and copyrighted work while supporting accurate legislative and policy analysis. Model frameworks and workflows stay aligned with your institutional responsibilities rather than external platform defaults.',
      'Briefings, drafts, and comparisons remain yours to audit, cite, and correct. Model selection, knowledge access, and workflow automation remain accountable to your organization, not to the platforms that built them.',
    ],
  },
  {
    label: 'B',
    title: 'Organizational translation',
    textAlign: 'right',
    imageSrc: '/images/organizational-translation-orcas.png',
    imageObjectPosition: 'object-center',
    punchyContrast125: true,
    bodyParagraphs: [
      'We help organizations anchor AI decisions in what their people already do well, rather than following vendor roadmaps or generic best practices. The people who know your workflows, your members, and your institutional culture are the ones who shape how these tools get used.',
      'This means readiness mapping, workflow observation, pilot selection, governance alignment, and confidence-building at a pace your team sets. Your staff, board, and institutional history are the foundation. Governance habits, communications patterns, and operational rhythms become the basis for AI-supported work rather than being replaced by it.',
    ],
  },
  {
    label: 'C',
    title: 'Modest solutions',
    textAlign: 'left',
    imageSrc: '/images/modest-solutions-lighthouse.png',
    imageObjectPosition: 'object-center',
    punchyMono: true,
    bodyParagraphs: [
      'Our work is made to measure. No unnecessary scaling, no inappropriate tools, no fashionable gadgetry. Just what your organization can actually use and sustain.',
      'We design pilot projects that help organizations learn something about their own workflows as well as the technology itself. Early work focuses on clarity, stability, and confidence rather than speed or scale.',
      'The goal is steady progress that strengthens what already works, rather than introducing systems that require permanent external support.',
    ],
  },
  {
    label: 'D',
    title: 'Strategic communications',
    textAlign: 'right',
    /** Keep image/text alternation; body reads left like other blocks. */
    bodyTextAlign: 'left',
    imageSrc: '/images/strategic-communications-goodrich.png',
    imageObjectPosition: 'object-[50%_42%]',
    punchyContrast125: true,
    bodyParagraphs: [
      'The communications environment has changed. Social media platforms have become algorithmically unpredictable and audiences have fragmented across channels in ways that make consistent member engagement genuinely difficult. We help organizations strengthen their communications without surrendering institutional voice or reach.',
      'This work includes aligning messaging with AI adoption realities, preparing members and leadership for change, reducing internal friction during rollout, and maintaining continuity of tone across AI-assisted workflows.',
      'Human intent provides the direction. The tools provide the support.',
    ],
  },
]

const ctaButtonClass =
  'rounded-none border border-transparent bg-[#111827] px-10 py-4 font-sans text-sm font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-[#1f2937] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111827]'

function WorkUnit({ unit, idx }) {
  const textRight = unit.textAlign === 'right'
  const bodyLeft = unit.bodyTextAlign === 'left'
  const textColAlignClass =
    textRight && !bodyLeft
      ? 'text-left md:ml-auto md:text-right'
      : textRight && bodyLeft
        ? 'text-left md:ml-auto'
        : 'text-left'
  const textCol = (
    <div
      className={`min-w-0 w-full max-w-[36rem] md:flex-[6] md:self-center ${textColAlignClass}`}
    >
      <h3 className="font-sans text-balance text-3xl font-bold leading-tight tracking-tight text-ink">
        {unit.title}
      </h3>
      <div
        className={`my-8 h-px w-12 bg-neutral-200 ${
          textRight && !bodyLeft ? 'md:ml-auto' : ''
        }`}
        aria-hidden
      />
      <div
        className={`text-pretty space-y-5 md:space-y-6 ${
          textRight ? 'md:ml-auto' : ''
        }`}
      >
        {unit.bodyParagraphs.map((para, pIdx) => (
          <p key={pIdx} className={workSectionBodyClass}>
            {para}
          </p>
        ))}
      </div>
    </div>
  )
  const mediaCol = unit.imageSrc ? (
    <div className="w-full min-w-0 shrink-0 md:flex-[4]">
      <CraftPlaceholder
        imageSrc={unit.imageSrc}
        imageObjectPosition={unit.imageObjectPosition}
        punchyMono={unit.punchyMono}
        punchyContrast125={unit.punchyContrast125}
      />
    </div>
  ) : (
    <div
      className="hidden md:block md:flex-[4] md:self-stretch"
      aria-hidden
    />
  )

  return (
    <div
      className={`flex flex-col gap-8 md:flex-row md:items-center ${
        idx === 0 ? 'md:gap-12 lg:gap-20' : 'md:gap-10 lg:gap-16'
      }`}
    >
      {textRight ? (
        <>
          {mediaCol}
          {textCol}
        </>
      ) : (
        <>
          {textCol}
          {mediaCol}
        </>
      )}
    </div>
  )
}

function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero - full-screen video background */}
      <section
        id="hero"
        className="relative min-h-dvh min-h-[100svh] w-full overflow-hidden"
      >
        <SiteHeader overlay />

        <div className="absolute inset-0 z-0 bg-[#111827]" aria-hidden />
        <video
          className="absolute inset-0 z-[1] h-full min-h-full w-full min-w-full object-cover object-center"
          src="/Sympathetic_Vancouver.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />

        {/* Center headline */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
          <div className="flex max-w-[95vw] translate-y-[50px] flex-col items-center text-center">
            <h1 className="text-shadow-hero text-balance text-4xl font-extrabold uppercase leading-[1.02] tracking-[0.14em] text-white sm:text-5xl sm:leading-[1.03] sm:tracking-[0.16em] md:text-6xl md:leading-[1.04] md:tracking-[0.2em] lg:text-9xl lg:leading-[1.05] lg:tracking-[0.24em]">
              Controlled Intelligence
            </h1>
            <h2 className="text-shadow-hero mt-6 max-w-3xl text-balance font-sans text-xl font-semibold leading-snug text-white sm:text-2xl md:mt-8 md:text-3xl">
              Sovereign AI for organizations that govern what they build.
            </h2>
            <a
              href="/talk"
              className="mt-8 inline-flex rounded-none border border-white/90 bg-transparent px-7 py-3 font-sans text-sm font-bold uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:border-white/70 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:mt-10"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>

      </section>

      <section className="bg-[#111827] px-6 py-16 text-left text-white md:px-12 md:py-[100px]">
        <p className="mx-auto max-w-[860px] text-[clamp(24px,3vw,40px)] font-bold leading-[1.2] tracking-[-0.01em]">
          We work with nonprofit and mission-based organizations to design secure AI
          environments, align governance with adoption decisions, and implement
          practical workflows that keep institutional knowledge inside boundaries they
          define.
        </p>
      </section>

      {/* Section A - Sovereignty (white, left-aligned) */}
      <section
        id="manifesto"
        className="border-t border-neutral-100 bg-[#FFFFFF] px-6 py-[180px]"
      >
        <div className="mx-auto max-w-6xl text-left">
          <h2 className="font-sans flex flex-col gap-0 font-bold text-5xl tracking-tight leading-tight text-ink md:text-6xl">
            <span className="block">Sovereign AI.</span>
            <span className="block">Intentional Integration.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-pretty font-sans text-lg font-normal leading-relaxed text-neutral-800 md:mt-10 md:text-xl">
            Consumer tools like ChatGPT, Claude, and Gemini are built for speed.
            We build for sovereignty. Your digital environment stays within secure
            boundaries that you define and govern. Our strategy delivers the
            immediacy of modern AI models while keeping your data, workflows, and
            institutional knowledge inside a private perimeter that meets PIPEDA
            and sector-specific compliance requirements.
          </p>
        </div>
      </section>

      {/* Section B - Total Context (off-white, right-aligned) */}
      <section
        id="total-context"
        className="border-t border-neutral-100 bg-[#FBFBFB] px-6 py-[180px]"
      >
        <div className="mx-auto flex max-w-6xl justify-end">
          <div className="w-full max-w-2xl text-right">
            <h2 className="font-sans flex flex-col items-end gap-0 font-bold text-5xl tracking-tight leading-tight text-ink md:text-6xl">
              <span className="block">Data security.</span>
              <span className="block">Custom workflows.</span>
            </h2>
            <p className="mt-8 text-pretty font-sans text-lg font-normal leading-relaxed text-neutral-800 md:mt-10 md:text-xl">
              AI is most useful when it operates inside a well-defined local
              environment built around your work. Properly configured local models
              are capable of sophisticated investigation and analysis of your
              current and historical knowledge, surfacing new ideas and
              perspectives that generic tools simply cannot reach. Whether it is
              copyrighted IP, private member data, or proprietary organizational
              knowledge, we build the private infrastructure needed to protect your
              craft while adopting the tools that serve it.
            </p>
          </div>
        </div>
      </section>

      {/* The Work - 60/40 split, timeline path, craft placeholders */}
      <section
        id="work"
        className="border-t border-neutral-200 bg-white px-6 py-[180px] antialiased"
      >
        <div className="mx-auto max-w-7xl">
          <header className="max-w-2xl">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-neutral-400">
              The work
            </p>
            <h2 className="mt-3 font-sans text-balance text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              Sovereign and sympathetic, in theory and practice
            </h2>
          </header>

          <div className="relative mt-16 md:mt-24">
            <div
              className="pointer-events-none absolute bottom-0 left-[15px] top-0 w-[0.5px] bg-neutral-300 sm:left-[17px]"
              aria-hidden
            />
            <div className="relative space-y-32 md:space-y-40 lg:space-y-48">
              {WORK_UNITS.map((unit, idx) => (
                <article
                  key={unit.label}
                  className={
                    idx === 0
                      ? 'relative pt-2'
                      : 'relative border-t border-neutral-200 pt-32 md:pt-40'
                  }
                >
                  <span
                    className={`absolute left-[15px] z-10 -translate-x-1/2 bg-white px-1 font-sans text-[10px] font-normal uppercase tracking-[0.22em] sm:left-[17px] sm:text-[11px] ${LABEL_SAND} ${
                      idx === 0 ? 'top-0' : 'top-10 md:top-12'
                    }`}
                  >
                    {unit.label}
                  </span>
                  <div className="pl-8 sm:pl-10 md:pl-14">
                    <WorkUnit unit={unit} idx={idx} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Proof of Concept — full-bleed hero, fixed mountain field */}
      <section
        id="proof"
        className="relative isolate overflow-hidden border-t border-neutral-200 px-6 py-[180px]"
      >
        <div
          className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat bg-scroll grayscale md:bg-fixed"
          style={{
            backgroundImage: "url('/images/proof-mountains.png')",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[#111827]/50"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="max-w-xl text-left">
            <h2 className="font-sans text-4xl font-bold leading-tight tracking-tight text-white">
              Proof of Concept.
            </h2>
            <div
              className="mt-6 w-12 border-t border-white/30"
              aria-hidden
            />
            <div className="text-shadow-hero mt-8 space-y-6 text-pretty font-sans text-xl font-normal leading-relaxed text-white">
              <p>
                My first real job was at an independent bookshop in a small town. The
                only piece of technology we owned that wasn&apos;t strictly analog was
                a pocket calculator powered by the sun. Also, there were two shop cats
                and a turtle who lived in a pond out front.
              </p>
              <p>
                A lot has changed since then, but I still carry a fairly stubborn
                worldview from those days: that the values and sensibilities that made
                the world work in the era of paper, ink, and rotary dial phones are
                just as important today.
              </p>
              <p>
                Books and writing are pronounced dead on a near-weekly basis, yet they
                continue to survive because they inform and inspire people over time.
                Why would we even call the black mirrors we keep on silent in our
                pockets &quot;phones&quot; if it didn&apos;t serve some need to humanize
                their presence in our daily lives?
              </p>
              <p>
                Technology rolls on and the internet continues to color outside the
                lines of our expectations and comfort zones. But we can learn it and
                we can control it. We can&apos;t change how we got here, but we can
                determine where it is that we&apos;re going.
              </p>
              <p>
                I have long navigated these types of technological and organizational
                disruptions from the inside. I know what it takes to move a traditional
                organization toward new tools without breaking what already works.
              </p>
              <p className="pt-2 font-semibold">
                - Sean Cranbury, Founder, Principal
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Close */}
      <section
        id="contact"
        className="border-t border-neutral-200 bg-[#FFFFFF] px-6 py-[180px] text-center"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="font-sans text-balance text-5xl font-bold leading-tight tracking-tight text-ink md:text-6xl">
            Mission-driven organizations shouldn&apos;t have to choose between
            progress and privacy.
          </h2>
          <a
            href="/talk"
            className={`mt-12 inline-block md:mt-14 ${ctaButtonClass}`}
          >
            Let&apos;s Talk
          </a>
        </div>
      </section>
    </main>
  )
}

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
        <Route
          path="/contact"
          element={<Navigate to="/talk" replace />}
        />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <SiteFooter />
      <CookieBanner />
    </>
  )
}
