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

const publicTools = [
  {
    title: 'Legislative monitoring',
    body:
      'Track bills and regulatory changes in real time, with alerts when proposed laws affect your profession.',
  },
  {
    title: 'Plain language translation',
    body:
      'Convert dense clinical guidelines and policy documents into member-facing communications anyone can read.',
  },
  {
    title: 'Consultation response drafting',
    body:
      "Draft professional submissions to government consultations that align with your organization's policy positions.",
  },
  {
    title: 'Member-facing AI assistants',
    body:
      'Custom tools trained on your own bylaws and policies that answer member questions accurately and on-brand.',
  },
  {
    title: 'Public awareness campaigns',
    body:
      'Identify rising misinformation about your profession and release evidence-based responses before rumors spread.',
  },
  {
    title: 'Stakeholder mapping',
    body:
      "Identify which lawmakers and industry leaders influence decisions that affect your members' scope of practice.",
  },
  {
    title: 'Crisis communication preparation',
    body:
      "Simulate worst-case scenarios and refine your organization's media response before a crisis happens.",
  },
  {
    title: 'Workforce analytics',
    body:
      'Aggregate member data on retirement, burnout, and recruitment to build the evidence base for government funding requests.',
  },
  {
    title: 'Member engagement bots',
    body:
      'Answer common questions about licensing, ethics, and continuing education through a branded member portal.',
  },
]

const secureTools = [
  {
    title: 'Local policy archive search',
    body:
      'Search decades of bylaws, board decisions, and policy papers instantly without any data leaving your network.',
  },
  {
    title: 'Daily legislative brief',
    body:
      'An automated morning summary of government activity filtered to what affects your profession, generated locally.',
  },
  {
    title: 'Sensitive document drafting',
    body:
      'A secure environment for strategy memos and opposition papers too sensitive for commercial AI tools.',
  },
  {
    title: 'Pre-publication compliance checking',
    body:
      'Run communications through an ethical guardrail before release to flag legal risk or policy contradictions.',
  },
  {
    title: 'Secure member data analysis',
    body:
      'Analyze membership trends, retention, and engagement without routing data through external platforms.',
  },
  {
    title: 'Internal HR and compliance assistant',
    body:
      'Answer staff questions about policies, procedures, and obligations using only your own approved documents.',
  },
  {
    title: 'Board governance support',
    body:
      'Summarize meeting materials, flag agenda items requiring policy review, and track decisions against strategic commitments.',
  },
  {
    title: 'Incident and grievance documentation',
    body:
      'Draft and organize sensitive member complaints and disciplinary records in a fully contained environment.',
  },
  {
    title: 'Staff onboarding and knowledge transfer',
    body:
      'Capture institutional knowledge and make it searchable for new staff without it ever touching a commercial platform.',
  },
]

function ServiceRows({ items }) {
  return (
    <div>
      {items.map((item) => (
        <article
          key={item.title}
          className="grid gap-3 border-t border-[#e8e8e8] py-7 md:grid-cols-[0.42fr_0.58fr] md:gap-10"
        >
          <h3 className="text-[18px] font-bold leading-snug tracking-[-0.01em] text-[#111111]">
            {item.title}
          </h3>
          <p className="text-[14px] leading-[1.75] text-[#888888] md:text-right">
            {item.body}
          </p>
        </article>
      ))}
    </div>
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
              Built on discovery, delivered with intention.
            </h1>
            <div className={`mt-8 max-w-[760px] space-y-4 ${bodyTextClass}`}>
              <p>
                Every engagement starts with understanding your organization&apos;s
                unique needs.
              </p>
              <p>
                No prefabricated packages. No microwaved roadmaps. Here are the types
                of projects, workflows, and tools that we can help you with.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[#e8e8e8] bg-white px-6 py-12 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-[0.38fr_0.62fr] md:gap-20">
            <div>
              <p className={eyebrowClass}>Public and member-facing tools</p>
              <h2 className={`mt-4 ${sectionHeadlineClass}`}>
                Safe AI tools that face your members and the public.
              </h2>
            </div>
            <ServiceRows items={publicTools} />
          </div>
        </section>

        <section className="border-b border-[#e8e8e8] bg-white px-6 py-12 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-[0.38fr_0.62fr] md:gap-20">
            <div>
              <p className={eyebrowClass}>Secure organizational tools</p>
              <h2 className={`mt-4 ${sectionHeadlineClass}`}>
                Secure AI tools that protect your organization.
              </h2>
            </div>
            <ServiceRows items={secureTools} />
          </div>
        </section>

        <section className="bg-[#0a0a0a] px-6 py-16 text-center text-white md:px-12 md:py-[100px]">
          <blockquote className="mx-auto max-w-[860px] text-[clamp(24px,3vw,40px)] font-bold leading-[1.2] tracking-[-0.01em]">
            An organization that can tell its members, its board, and its regulators
            that AI runs inside its infrastructure and member data never touches a
            commercial platform is showing institutional maturity through
            architecture.
          </blockquote>
        </section>

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
                <a
                  href="/talk"
                  className="inline-flex border-b border-[#111111] pb-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#111111] transition-colors hover:text-[#333333]"
                >
                  Let&apos;s Talk
                </a>
              </div>
            </div>
          </div>
        </section>

        <FooterCta />
      </main>
    </div>
  )
}
