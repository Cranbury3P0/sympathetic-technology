import { FooterCta, pageFont } from './InteriorFooter.jsx'
import SiteHeader from './SiteHeader.jsx'

const architectureRows = [
  {
    title: 'Local Inference',
    detail: 'The model layer',
    body:
      "An open-weight language model runs inside infrastructure your organization governs. Prompts and responses stay inside the system boundary. No data is routed through commercial platforms or used to improve a vendor's model.",
  },
  {
    title: 'Retrieval-Augmented Generation',
    detail: 'The knowledge layer',
    body:
      "Your organization's documents, board records, policy archives, and member communications connect to the model through a controlled retrieval system. The AI works from your knowledge base, not from generalized internet training. Responses are grounded in your materials and cite them.",
  },
  {
    title: 'Staff Interface',
    detail: 'The access layer',
    body:
      "Staff interact with the system through a purpose-built interface carrying your organization's identity rather than a vendor's brand. Access controls, role permissions, and audit logging are configured to match your governance structure and existing staff responsibilities.",
  },
  {
    title: 'Governance Framework',
    detail: 'The accountability layer',
    body:
      'Policy documentation, board briefing materials, staff guidelines, and a privacy impact assessment framework travel with the technical build. The system does not go live until the governance documentation is in place. The organization can explain what it built and why.',
  },
]

const comparisonRows = [
  {
    topic: 'Where it runs',
    consumer: 'Vendor servers',
    sovereign: 'Your infrastructure',
  },
  {
    topic: 'Who sees the prompts',
    consumer: 'The platform provider',
    sovereign: 'Your organization only',
  },
  {
    topic: 'Data retention',
    consumer: "Governed by vendor's terms",
    sovereign: 'Governed by your policies',
  },
  {
    topic: 'Training use',
    consumer: 'Varies by plan and terms',
    sovereign: 'None. Your data does not leave.',
  },
  {
    topic: 'Audit capability',
    consumer: 'None or limited',
    sovereign: 'Full. Every query is logged inside your system.',
  },
  {
    topic: 'Staff access controls',
    consumer: 'Account-level',
    sovereign: 'Role-based, matched to your organization structure',
  },
  {
    topic: 'Board accountability',
    consumer: '"We use public AI tools"',
    sovereign: '"Here is our AI policy and here is what the system does"',
  },
  {
    topic: 'Regulatory exposure',
    consumer: 'High. PIPEDA/PIPA compliance is on the organization to interpret.',
    sovereign: "Low. Data custody stays inside the organization's control.",
  },
  {
    topic: 'Cost model',
    consumer: 'Per-user subscriptions scaling with headcount',
    sovereign: 'Fixed infrastructure cost. No per-query or per-seat fees.',
  },
]

const principles = [
  {
    title: 'Governance before automation',
    body:
      'Institutional judgment stays with the people accountable for the work. AI supports staff decisions. It does not replace them.',
  },
  {
    title: 'Local control before convenience',
    body:
      'Sensitive knowledge stays inside boundaries the organization defines. Convenience that compromises custody is not convenience.',
  },
  {
    title: 'Translation before transformation',
    body:
      'The first task is understanding how the organization already works. Technology follows those realities rather than replacing them.',
  },
  {
    title: 'Explainability as a governance requirement',
    body:
      'If your board asked how your AI system works, what it has access to, and what your policies are, the answer should be immediate and complete. An organization that cannot explain its AI environment is not governing it.',
  },
]

const eyebrowClass =
  'text-[11px] font-medium uppercase tracking-[0.12em] text-[#999999]'

const bodyTextClass =
  'text-[17px] font-normal leading-[1.75] text-[#2b2e34]'

const sectionHeadlineClass =
  'text-[clamp(28px,3vw,42px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#111111]'

function ArchitectureRows() {
  return (
    <div>
      {architectureRows.map((item) => (
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

function ComparisonRows() {
  return (
    <div>
      <div className="hidden border-t border-[#e8e8e8] py-4 md:grid md:grid-cols-[0.28fr_0.36fr_0.36fr] md:gap-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#999999]">
          Measure
        </p>
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#999999]">
          Consumer AI
        </p>
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#999999]">
          Sovereign AI
        </p>
      </div>
      {comparisonRows.map((row) => (
        <article
          key={row.topic}
          className="grid gap-3 border-t border-[#e8e8e8] py-6 md:grid-cols-[0.28fr_0.36fr_0.36fr] md:gap-8"
        >
          <h3 className="text-[18px] font-bold leading-snug tracking-[-0.01em] text-[#111111]">
            {row.topic}
          </h3>
          <p className="text-[14px] leading-[1.75] text-[#2b2e34]">
            <span className="mb-1 block text-[11px] font-medium uppercase tracking-[0.12em] text-[#999999] md:hidden">
              Consumer AI
            </span>
            {row.consumer}
          </p>
          <p className="text-[14px] leading-[1.75] text-[#888888]">
            <span className="mb-1 block text-[11px] font-medium uppercase tracking-[0.12em] text-[#999999] md:hidden">
              Sovereign AI
            </span>
            {row.sovereign}
          </p>
        </article>
      ))}
    </div>
  )
}

function PrincipleRows() {
  return (
    <div>
      {principles.map((item) => (
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

export default function SovereignAIPage() {
  return (
    <div
      className="min-h-screen bg-white text-[#111111] antialiased"
      style={{ fontFamily: pageFont, WebkitFontSmoothing: 'antialiased' }}
    >
      <SiteHeader />

      <main className="bg-white">
        <section className="border-b border-[#e8e8e8] bg-white px-6 py-16 md:px-12 md:pb-20 md:pt-[120px]">
          <div className="mx-auto max-w-[1200px]">
            <p className={eyebrowClass}>Sovereign AI</p>
            <h1 className="mt-5 max-w-[900px] text-[clamp(40px,5vw,68px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#111111]">
              Your organization runs AI. Who governs it?
            </h1>
            <div className={`mt-8 max-w-[760px] space-y-4 ${bodyTextClass}`}>
              <p>
                Most organizations using AI today are doing it through tools built by
                someone else, running on infrastructure owned by someone else, under
                terms and conditions written to serve that company&apos;s interests rather
                than yours.
              </p>
              <p>
                Sovereign AI is a different arrangement. It means your organization
                runs its own AI environment inside infrastructure it controls, under
                policies it writes, with data that never leaves its custody.
              </p>
              <p>
                The technology is the same. What changes is who is accountable for it.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#111827] px-6 py-16 text-left text-white md:px-12 md:py-[100px]">
          <blockquote className="mx-auto max-w-[860px] text-left text-[clamp(24px,3vw,40px)] font-bold leading-[1.2] tracking-[-0.01em]">
            The point is not to make AI feel magical. The point is to make it
            governable.
          </blockquote>
        </section>

        <section className="border-b border-[#e8e8e8] bg-white px-6 py-12 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
            <div>
              <p className={eyebrowClass}>The Problem</p>
              <h2 className={`mt-4 ${sectionHeadlineClass}`}>
                When staff use public AI tools, the organization is not in the room.
              </h2>
            </div>
            <div className={`space-y-6 ${bodyTextClass}`}>
              <p>
                Every time a staff member opens ChatGPT, Claude, or Gemini and types in
                a member&apos;s name, a policy question, a board concern, or a draft
                advocacy letter, that information travels to a commercial server and
                becomes part of a transaction the organization did not authorize and
                cannot audit.
              </p>
              <p>
                Most organizations experimenting with AI right now are doing the work
                before they have the governance. Staff test public tools before
                policies exist. Sensitive information moves through platforms the
                organization does not control. Leaders inherit risk without a clear
                picture of how the tools are being used.
              </p>
              <p>
                This is not a hypothetical. It is already happening in your
                organization. Sovereign AI gives it a boundary.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[#e8e8e8] bg-white px-6 py-12 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
            <div>
              <p className={eyebrowClass}>What It Is</p>
              <h2 className={`mt-4 ${sectionHeadlineClass}`}>
                AI that lives inside your organization, not inside a vendor&apos;s
                platform.
              </h2>
            </div>
            <div className={`space-y-6 ${bodyTextClass}`}>
              <p>
                Open-weight AI models are publicly available, production-quality
                language models that any organization can download, host, and run on
                its own servers or private cloud. Models like Llama, Mistral, and Gemma
                are the same generation of technology as the commercial tools your
                staff are already using. The difference is where they run and who
                controls them.
              </p>
              <p>
                In a sovereign configuration, your organization installs the model
                inside its own infrastructure. Staff interact with it through an
                interface the organization controls. Queries stay inside the system.
                Records stay inside the system. The model does not phone home to an
                external platform or train on your organization&apos;s activity.
              </p>
              <p>
                The result is an AI environment your organization can audit, explain,
                and adjust. One that answers to your policies rather than a vendor&apos;s
                terms of service.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[#e8e8e8] bg-white px-6 py-12 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-[0.38fr_0.62fr] md:gap-20">
            <div>
              <p className={eyebrowClass}>The Architecture</p>
              <h2 className={`mt-4 ${sectionHeadlineClass}`}>
                Four layers of governed intelligence.
              </h2>
            </div>
            <ArchitectureRows />
          </div>
        </section>

        <section className="border-b border-[#e8e8e8] bg-white px-6 py-12 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-[0.38fr_0.62fr] md:gap-20">
            <div>
              <p className={eyebrowClass}>The Comparison</p>
              <h2 className={`mt-4 ${sectionHeadlineClass}`}>
                What changes when your organization governs the environment.
              </h2>
              <p className={`mt-8 ${bodyTextClass}`}>
                Consumer AI tools and sovereign AI environments are built on similar
                underlying technology. The difference is structural.
              </p>
            </div>
            <ComparisonRows />
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
            <PrincipleRows />
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
                Sovereign AI gives the organization a perimeter. People can
                investigate, draft, compare, monitor, and learn while keeping
                institutional knowledge inside a system the organization can audit,
                explain, and improve.
              </p>
              <p>
                That perimeter is not a restriction. It is the condition that makes
                responsible adoption possible.
              </p>
            </div>
          </div>
        </section>

        <FooterCta />
      </main>
    </div>
  )
}
