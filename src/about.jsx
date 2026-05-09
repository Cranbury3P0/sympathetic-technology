import {
  bodyTextClass,
  ctaClass,
  eyebrowClass,
  pageFont,
  sectionHeadlineClass,
} from './InteriorFooter.jsx'
import SiteHeader from './SiteHeader.jsx'

const credentials = [
  {
    title: 'Harvard Medical School Executive Education',
    detail: 'AI in Health Care · Leading Digital Transformation · Health Care Transformation',
  },
  {
    title: 'Director of Organizational Development',
    detail: 'Physiotherapy Association of British Columbia',
  },
  {
    title: 'Founding Member, BC+AI',
    detail: 'Grassroots community for responsible AI development in BC',
  },
  {
    title: "Real Vancouver Writers' Series",
    detail: 'Founder · Fifteen years',
  },
]

export default function AboutPage() {
  return (
    <div
      className="min-h-screen bg-white text-[#111111] antialiased"
      style={{ fontFamily: pageFont, WebkitFontSmoothing: 'antialiased' }}
    >
      <SiteHeader />

      <main>
        <section className="border-b border-[#e8e8e8] px-6 py-16 md:px-12 md:pb-20 md:pt-[120px]">
          <div className="mx-auto max-w-[1200px]">
            <p className={eyebrowClass}>About</p>
            <h1 className="mt-5 max-w-[900px] text-[clamp(40px,5vw,68px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#111111]">
              A governed AI infrastructure studio working with nonprofits, healthcare organizations, and cultural institutions
            </h1>
          </div>
        </section>

        <section className="border-b border-[#e8e8e8] px-6 py-12 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
            <div className={`space-y-8 ${bodyTextClass}`}>
              <section>
                <h2 className="mb-3 text-[17px] font-bold leading-snug tracking-[-0.01em] text-[#111111]">
                  Hi, I&apos;m Sean Cranbury.
                </h2>
                <p>
                  I lead Sympathetic Technology as Founder and CEO, but this is not a solo
                  practice. Every project is collaborative. I draw on a network of
                  experienced full-stack developers, designers, writers, and strategists
                  working across British Columbia, and I work in alliance with organizations
                  including Affinity Bridge and other trusted partners. That means we can
                  take on projects of any size or complexity without changing teams or losing
                  continuity from the first conversation through to a working system.
                </p>
              </section>
              <section>
                <h2 className="mb-3 text-[17px] font-bold leading-snug tracking-[-0.01em] text-[#111111]">
                  What We Do
                </h2>
                <p>
                  I work with healthcare organizations, member-based nonprofits, professional
                  associations, and arts and cultural institutions that are trying to adopt
                  AI thoughtfully while strengthening the human systems that support their
                  work.
                </p>
                <p className="mt-4">
                  Most of what I do sits at the intersection of governance, institutional
                  memory, and careful technology adoption. That means building tools and
                  workflows that fit the organization as it actually operates, not as an
                  external platform assumes it does. The work includes AI integration strategy
                  grounded in real governance constraints, secure organization-controlled
                  environments for working with AI, custom tools for internal use and member
                  services, and communications and change management that help teams adopt new
                  systems without losing their footing.
                </p>
              </section>
              <section>
                <h2 className="mb-3 text-[17px] font-bold leading-snug tracking-[-0.01em] text-[#111111]">
                  How We Work
                </h2>
                <p>
                  I treat AI adoption as an infrastructure decision, not a feature to be
                  added. That means working within the actual conditions of each organization:
                  board expectations and governance responsibilities, regulatory and privacy
                  obligations, staff capacity and organizational culture, and long-term budget
                  sustainability. The goal is adoption that holds, not transformation that
                  impresses for six months and then gets quietly abandoned.
                </p>
              </section>
              <section>
                <h2 className="mb-3 text-[17px] font-bold leading-snug tracking-[-0.01em] text-[#111111]">
                  Experience
                </h2>
                <p>
                  I hold three certifications from Harvard Medical School in AI in Healthcare,
                  Healthcare Transformation, and Leading Digital Transformation in Healthcare.
                  At the Physiotherapy Association of BC, I led the development of custom AI
                  tools for government advocacy and legislative analysis, built a
                  members-only communications platform, and developed the Controlled
                  Intelligence governance framework. That work happened inside real
                  institutional constraints, with regulatory requirements, member needs,
                  board expectations, and organizational capacity all operating at once. It
                  wasn&apos;t consulting from the outside. I was on the team.
                </p>
              </section>
              <section>
                <h2 className="mb-3 text-[17px] font-bold leading-snug tracking-[-0.01em] text-[#111111]">
                  Background
                </h2>
                <p>
                  I have been part of Vancouver&apos;s writing and publishing community for a
                  long time. I founded the Real Vancouver Writers&apos; Series in 2010 and ran it
                  for fifteen years. Before the internet reshaped publishing and bookselling, I
                  worked as an independent bookseller. I still carry something from that time:
                  a belief that the values and sensibilities that shaped the analog world
                  don&apos;t disappear when the tools change. They become more important.
                </p>
                <p className="mt-4">
                  Sympathetic Technology exists to help institutions adopt AI without losing
                  the qualities that made them worth building in the first place.
                </p>
              </section>
            </div>
            <div>
              <img
                src="/sean-cranbury-headshot.png"
                alt="Sean Cranbury"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#111827] px-6 py-16 text-left text-white md:px-12 md:py-[100px]">
          <blockquote className="mx-auto max-w-[860px] text-left text-[clamp(24px,3vw,40px)] font-bold leading-[1.2] tracking-[-0.01em]">
            Organizations already have the competencies to navigate AI. They need
            translation, not new skills.
          </blockquote>
        </section>

        <section className="border-b border-[#e8e8e8] px-6 py-12 md:px-12 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            <p className={eyebrowClass}>The Work</p>
            <h2 className={`mt-4 max-w-[760px] ${sectionHeadlineClass}`}>
              Inside experience. Not parachute consulting.
            </h2>
            <div className={`mt-8 max-w-[760px] space-y-6 ${bodyTextClass}`}>
              <p>
                At PABC, Sean built custom GPTs for government advocacy and legislative
                analysis, a members-only communications app, and the Controlled
                Intelligence governance framework. Real organizational constraints,
                board expectations, budget limits, staff capacity, and member
                skepticism all operating at once.
              </p>
              <p>
                That is the actual product being offered. Not theory. Not a framework
                developed at a distance. Navigation from inside.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[#e8e8e8] px-6 py-12 md:px-12 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            <p className={eyebrowClass}>Credentials</p>
            <div className="mt-8">
              {credentials.map((row) => (
                <div
                  key={row.title}
                  className="flex flex-col gap-2 border-t border-[#e8e8e8] py-7 md:flex-row md:items-baseline md:justify-between md:gap-10"
                >
                  <h3 className="flex-1 text-[18px] font-bold leading-snug tracking-[-0.01em] text-[#111111]">
                    {row.title}
                  </h3>
                  <p className="shrink-0 text-left text-[14px] leading-relaxed text-[#888888] md:text-right">
                    {row.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#e8e8e8] px-6 py-16 text-center md:px-12 md:py-[100px]">
          <div className="mx-auto max-w-[800px]">
            <h2 className="text-[clamp(28px,4vw,52px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#111111]">
              Mission-driven organizations shouldn&apos;t have to choose between
              progress and privacy.
            </h2>
            <a
              href="/talk"
              className={`mt-10 ${ctaClass}`}
            >
              Let&apos;s Talk
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
