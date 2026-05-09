import SiteHeader from './SiteHeader.jsx'
import { FooterCta, pageFont } from './InteriorFooter.jsx'

function Divider() {
  return <hr className="border-0 border-t border-neutral-200" />
}

function PolicyList({ items }) {
  return (
    <ul className="mt-3 space-y-1 pl-5 font-sans text-[17px] leading-relaxed text-[#2b2e34]">
      {items.map((item, i) => (
        <li key={i} className="list-disc">{item}</li>
      ))}
    </ul>
  )
}

export default function PrivacyPage() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: pageFont, WebkitFontSmoothing: 'antialiased' }}
    >
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 pb-32 pt-36 md:pt-44">

        <header className="mb-14">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-neutral-400">
            Legal
          </p>
          <h1 className="mt-3 font-sans text-4xl font-bold leading-tight tracking-tight text-neutral-900 md:text-5xl">
            Privacy Policy
          </h1>
          <div className="mt-5 font-sans text-sm leading-relaxed text-neutral-500">
            <p>Effective: January 1, 2025</p>
            <p>Sympathetic Technology / Sean Cranbury</p>
            <p>Vancouver, British Columbia, Canada</p>
          </div>
        </header>

        <div className="space-y-10 font-sans text-[17px] leading-relaxed text-[#2b2e34]">

          <section className="space-y-4">
            <p>
              Sympathetic Technology is a sole-proprietor consulting practice operated by Sean
              Cranbury in Vancouver, British Columbia. This policy explains what information is
              collected when you use this website and its tools, how it is used, and how long
              it is kept.
            </p>
            <p>
              The short version: we collect what is needed to run the assessment and deliver your
              report. We do not collect more than that, and we do not reuse it for other purposes.
            </p>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 font-sans text-xl font-semibold text-neutral-900">
              What We Collect and Why
            </h2>
            <p>
              When you complete the AI Readiness Assessment or submit a contact form, we collect
              your name, email address, organization name, sector, role or title, and your
              assessment responses including the full conversational content.
            </p>
            <p className="mt-4">
              That information is used to generate your assessment report, deliver a PDF to your
              email, and provide context for any follow-up conversation. It is not used for
              advertising, profiling, or resale.
            </p>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 font-sans text-xl font-semibold text-neutral-900">
              How Your Information Is Processed
            </h2>
            <p>
              The assessment uses the Anthropic API to generate a diagnostic summary from your
              responses. This means your answers, along with contextual information like your
              organization and role, are sent to Anthropic&rsquo;s systems as part of generating
              the report. In some cases your email address may be included as part of system-level
              context.
            </p>
            <p className="mt-4">
              You should avoid including sensitive personal, financial, or confidential
              organizational information in your responses.
            </p>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 font-sans text-xl font-semibold text-neutral-900">
              How Your Information Is Stored
            </h2>
            <p>
              Information you submit is stored in a structured database managed through Supabase.
              This includes your contact details, assessment responses, generated scores and
              summaries, and report delivery status.
            </p>
            <p className="mt-4">
              Assessment response content is cleared automatically on a rolling 30-day basis.
              Basic contact records may be retained beyond that window to support direct
              follow-up, and will be deleted on request.
            </p>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 font-sans text-xl font-semibold text-neutral-900">
              Email Delivery
            </h2>
            <p>
              Your report is delivered automatically to the email address you provide. Your name
              and email are used only for that delivery and for any direct response to your
              inquiry. We do not add you to a mailing list without your explicit consent.
            </p>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 font-sans text-xl font-semibold text-neutral-900">
              Third-Party Services
            </h2>
            <p>The following services are used to operate this system:</p>
            <PolicyList items={[
              'Anthropic, for AI-generated assessment summaries',
              'Supabase, for data storage',
              'Vercel, for hosting and serverless infrastructure',
              'An SMTP-based email provider, for report delivery',
            ]} />
            <p className="mt-4">
              These services may process or store data outside of Canada. Sympathetic Technology
              monitors the availability of equivalent services that store data within Canada and
              will transition to them when a reliable option exists.
            </p>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 font-sans text-xl font-semibold text-neutral-900">
              Data Retention
            </h2>
            <p>
              Assessment response content is cleared automatically on a rolling 30-day basis.
              Basic contact records may be retained beyond that window to support direct
              follow-up, and will be deleted on request. You may request deletion of any record
              at any time.
            </p>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 font-sans text-xl font-semibold text-neutral-900">
              Sharing and Disclosure
            </h2>
            <p>
              We do not sell, rent, or trade personal information. Information is shared only
              with the services listed above to deliver the assessment, where required by law,
              or to protect the safety or integrity of users or systems.
            </p>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 font-sans text-xl font-semibold text-neutral-900">
              Your Rights
            </h2>
            <p>
              Under PIPEDA, you have the right to:
            </p>
            <PolicyList items={[
              'request access to your personal information',
              'request corrections',
              'request deletion',
              'withdraw consent for use',
            ]} />
            <p className="mt-4">
              If you are in the European Economic Area, you may also have rights under GDPR,
              including access, rectification, erasure, and restriction of processing.
            </p>
            <p className="mt-4">
              Requests can be made using the contact information below. We respond within 30 days.
            </p>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 font-sans text-xl font-semibold text-neutral-900">
              Cookies and Local Storage
            </h2>
            <p>
              This site does not use advertising cookies or third-party tracking pixels. A minimal
              local storage flag may be used to remember whether you have acknowledged this privacy
              notice. Infrastructure providers may set technical cookies required for site operation.
            </p>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 font-sans text-xl font-semibold text-neutral-900">
              Changes to This Policy
            </h2>
            <p>
              This policy may be updated as the system evolves. Changes will be reflected in the
              effective date above.
            </p>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 font-sans text-xl font-semibold text-neutral-900">
              Contact
            </h2>
            <p className="leading-loose">
              Sean Cranbury<br />
              Sympathetic Technology<br />
              Vancouver, British Columbia, Canada
            </p>
            <p className="mt-4">
              <a
                href="/talk"
                className="underline underline-offset-2 transition-colors hover:text-neutral-900"
              >
                Contact via this website
              </a>
            </p>
          </section>

        </div>
      </main>

      <FooterCta />
    </div>
  )
}
