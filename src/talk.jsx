import { pageFont } from './InteriorFooter.jsx'
import SiteHeader from './SiteHeader.jsx'

const eyebrowClass =
  'text-[11px] font-medium uppercase tracking-[0.12em] text-[#999999]'

const bodyTextClass =
  'text-[17px] font-normal leading-[1.75] text-[#333333]'

const sectionHeadlineClass =
  'text-[clamp(28px,3vw,42px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#111111]'

export default function TalkPage() {
  return (
    <div
      className="min-h-screen bg-white text-[#111111] antialiased"
      style={{ fontFamily: pageFont, WebkitFontSmoothing: 'antialiased' }}
    >
      <SiteHeader />

      <main className="bg-white">
        <section className="border-b border-[#e8e8e8] bg-white px-6 py-16 md:px-12 md:pb-20 md:pt-[120px]">
          <div className="mx-auto max-w-[1200px]">
            <p className={eyebrowClass}>Let&apos;s Talk</p>
            <h1 className="mt-5 max-w-[980px] text-[clamp(40px,5vw,68px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#111111]">
              Most organizations know something needs to change. They just need
              someone to help them figure out what.
            </h1>
            <div className={`mt-8 max-w-[760px] space-y-4 ${bodyTextClass}`}>
              <p>That is the conversation we are good at.</p>
              <p>
                Not a sales call. Not a discovery session designed to produce a
                proposal. A real conversation about where your organization is, what
                pressure it is under, and whether there is work here worth doing
                together.
              </p>
              <p>
                If you are a nonprofit, a professional association, or an arts
                organization trying to think clearly about AI, privacy, communications,
                or organizational change, this is the right place to start.
              </p>
              <p>
                If you are not sure whether what you need is something we do, ask
                anyway. We will tell you honestly.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[#e8e8e8] bg-white px-6 py-12 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-[0.38fr_0.62fr] md:gap-20">
            <div>
              <p className={eyebrowClass}>Start Here</p>
              <h2 className={`mt-4 ${sectionHeadlineClass}`}>
                Send a note and we will take it from there.
              </h2>
            </div>
            <div>
              <div className="border-t border-[#e8e8e8] py-8">
                <p className={bodyTextClass}>
                  Contact form or calendar embed will live here. For now, start the
                  conversation by email.
                </p>
                <a
                  href="mailto:hello@sympathetictechnology.com"
                  className="mt-8 inline-block bg-[#111111] px-10 py-[18px] text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#333333]"
                >
                  Email Sympathetic Technology
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#e8e8e8] bg-white px-6 py-12 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
            <div>
              <p className={eyebrowClass}>What To Expect</p>
              <h2 className={`mt-4 ${sectionHeadlineClass}`}>
                Not sure what to say? Start anywhere.
              </h2>
            </div>
            <div className={`space-y-6 ${bodyTextClass}`}>
              <p>
                Tell us what is keeping you up at night organizationally. Tell us what
                your board keeps asking about. Tell us what your staff are already
                doing with AI tools and why that concerns you. Tell us you read
                something on this site and want to know more.
              </p>
              <p>
                We respond to every message. We do not pass inquiries to a sales
                process.
              </p>
              <p className="pt-2 text-[14px] leading-relaxed text-[#888888]">
                Based in Vancouver, BC. Working with organizations across Canada.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
