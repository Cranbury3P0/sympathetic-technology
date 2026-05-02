import { FooterCta, pageFont } from './InteriorFooter.jsx'
import SiteHeader from './SiteHeader.jsx'

const layers = [
  {
    title: 'Sovereign AI',
    detail: 'Local inference layer',
    body:
      'Your organization runs open-weight models inside infrastructure it governs. People do the work inside a controlled environment instead of routing sensitive prompts and records through commercial platforms.',
  },
  {
    title: 'Internal Knowledge',
    detail: 'Document intelligence',
    body:
      'Your team connects board records, member communications, policy archives, and institutional documents to tools that respect existing access controls and governance responsibilities.',
  },
  {
    title: 'Professional Intelligence',
    detail: 'Monitoring and analysis',
    body:
      'Your staff define the professional signals that matter. Legislative changes, regulatory decisions, sector guidance, and public communications become part of a governed intelligence workflow.',
  },
  {
    title: 'External Deployment',
    detail: 'Member and public interfaces',
    body:
      'Your organization extends governed intelligence outward through deliberate tools for members, partners, and the public. The governance framework remains the foundation.',
  },
]

const principles = [
  {
    title: 'Governance before automation',
    detail: 'Institutional judgment stays with the people accountable for the work.',
  },
  {
    title: 'Local control before convenience',
    detail: 'Sensitive knowledge stays inside boundaries the organization defines.',
  },
  {
    title: 'Translation before transformation',
    detail: 'The first task is understanding how the organization already works.',
  },
  {
    title: 'Accountability before adoption',
    detail: 'Boards, staff, members, and regulators need systems they can examine.',
  },
]

const eyebrowClass =
  'text-[11px] font-medium uppercase tracking-[0.12em] text-[#999999]'

const bodyTextClass =
  'text-[17px] font-normal leading-[1.75] text-[#2b2e34]'

const sectionHeadlineClass =
  'text-[clamp(28px,3vw,42px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#111111]'

function RowList({ items }) {
  return (
    <div>
      {items.map((item) => (
        <article
          key={item.title}
          className="grid gap-3 border-t border-[#e8e8e8] py-7 md:grid-cols-[0.42fr_0.58fr] md:gap-10"
        >
          <div>
            <h3 className="text-[18px] font-bold leading-snug tracking-[-0.01em] text-[#111111]">
              {item.title}
            </h3>
            <p className="mt-1 text-[14px] leading-relaxed text-[#888888]">
              {item.detail}
            </p>
          </div>
          <p className="text-[14px] leading-[1.75] text-[#888888] md:text-right">
            {item.body}
          </p>
        </article>
      ))}
    </div>
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
              Controlled Intelligence for organizations that govern what they build.
            </h1>
            <div className={`mt-8 max-w-[760px] space-y-4 ${bodyTextClass}`}>
              <p>
                Controlled Intelligence does not automate institutional judgment. It
                strengthens the environments where institutional judgment operates.
              </p>
              <p>
                The work starts with your organization&apos;s responsibilities, records,
                people, and governance habits. The technology follows those realities
                instead of replacing them.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#111827] px-6 py-16 text-center text-white md:px-12 md:py-[100px]">
          <blockquote className="mx-auto max-w-[860px] text-[clamp(24px,3vw,40px)] font-bold leading-[1.2] tracking-[-0.01em]">
            The point is not to make AI feel magical. The point is to make it
            governable.
          </blockquote>
        </section>

        <section className="border-b border-[#e8e8e8] bg-white px-6 py-12 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-[0.38fr_0.62fr] md:gap-20">
            <div>
              <p className={eyebrowClass}>The Architecture</p>
              <h2 className={`mt-4 ${sectionHeadlineClass}`}>
                Four layers of governed activity.
              </h2>
            </div>
            <RowList items={layers} />
          </div>
        </section>

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
                Most organizations experimenting with AI are doing the work before
                they are ready. Staff test public tools before policies exist. Teams
                route sensitive information through platforms the organization does not
                control. Leaders inherit risk without a clear view of how the tools are
                being used.
              </p>
              <p>
                Controlled Intelligence gives the organization a perimeter. People can
                investigate, draft, compare, monitor, and learn while keeping
                institutional knowledge inside a system the organization can audit,
                explain, and improve.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[#e8e8e8] bg-white px-6 py-12 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-[0.38fr_0.62fr] md:gap-20">
            <div>
              <p className={eyebrowClass}>Principles</p>
              <h2 className={`mt-4 ${sectionHeadlineClass}`}>
                The system follows the organization.
              </h2>
            </div>
            <div>
              {principles.map((item) => (
                <article
                  key={item.title}
                  className="flex flex-col gap-2 border-t border-[#e8e8e8] py-7 md:flex-row md:items-baseline md:justify-between md:gap-10"
                >
                  <h3 className="flex-1 text-[18px] font-bold leading-snug tracking-[-0.01em] text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="shrink-0 text-left text-[14px] leading-relaxed text-[#888888] md:max-w-[420px] md:text-right">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#e8e8e8] bg-white px-6 py-12 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
            <div>
              <p className={eyebrowClass}>A Note On These Systems</p>
              <h2 className={`mt-4 ${sectionHeadlineClass}`}>
                Responsible adoption starts with honest accounting.
              </h2>
            </div>
            <div className={`space-y-6 ${bodyTextClass}`}>
              <p>
                Contemporary AI systems were built on the writing, research, artistic
                production, and cultural knowledge of many communities. Many of those
                communities had no say in how their work was used and have not been
                compensated for it. That is a real harm.
              </p>
              <p>
                These systems also carry environmental costs. Large-scale inference
                infrastructure consumes energy and water at a scale that is rarely made
                visible to the organizations adopting the products built on top of it.
              </p>
              <p>
                In the Canadian context, institutional AI use takes place within legal
                and ethical obligations that carry real weight. Reconciliation
                commitments, Indigenous data sovereignty principles such as OCAP®,
                privacy frameworks under PIPEDA and provincial equivalents, and the
                stewardship responsibilities around health information and member
                records all shape responsible adoption.
              </p>
              <p>
                Our approach reflects the view that organizations using these systems
                should do so with clear governance boundaries, honest accounting of
                what they rely on, and architecture that keeps organizational knowledge
                within environments they control.
              </p>
            </div>
          </div>
        </section>

        <FooterCta />
      </main>
    </div>
  )
}