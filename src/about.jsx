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
              Twenty years inside organizations that were trying to change.
            </h1>
          </div>
        </section>

        <section className="border-b border-[#e8e8e8] px-6 py-12 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
            <div>
              <img
                src="/sean-cranbury-headshot.png"
                alt="Sean Cranbury"
                className="aspect-[4/5] w-full object-cover grayscale"
              />
            </div>
            <div className={`space-y-6 ${bodyTextClass}`}>
              <p>
                Vancouver-based consultant working with healthcare organizations,
                member-based nonprofits, professional associations, and arts and
                cultural institutions.
              </p>
              <p>
                I help institutions adopt AI thoughtfully and responsibly while
                strengthening the human systems that surround the work. Most of what I
                do sits at the intersection of governance, institutional memory, and
                careful technology adoption. Finding the pace and shape that actually
                fits the organization, not the vendor.
              </p>
              <p>
                I hold three certifications from Harvard Medical School in AI in
                Healthcare, Healthcare Transformation, and Leading Digital
                Transformation in Healthcare. At the Physiotherapy Association of BC, I
                built custom AI tools for government advocacy and legislative analysis,
                a members-only communications app, and the Controlled Intelligence
                governance framework. Real organizational constraints, board
                expectations, budget limits, and staff capacity all operating at once.
              </p>
              <p>
                I have been part of Vancouver&apos;s writing and publishing community for a
                long time, including founding the Real Vancouver Writers&apos; Series in
                2010 and running it for fifteen years. I worked as an independent
                bookseller before the internet reshaped publishing and bookselling, and
                I carry a fairly stubborn worldview from those days: that the values and
                sensibilities that made the world work in the era of paper, ink, and
                rotary dial phones are just as important today.
              </p>
              <p>
                I live and work on the unceded traditional territories of the
                xʷməθkʷəy̓əm (Musqueam), Skwxwú7mesh (Squamish), and səlilwətaɬ
                (Tsleil-Waututh) Nations.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#111827] px-6 py-16 text-center text-white md:px-12 md:py-[100px]">
          <blockquote className="mx-auto max-w-[860px] text-[clamp(24px,3vw,40px)] font-bold leading-[1.2] tracking-[-0.01em]">
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
