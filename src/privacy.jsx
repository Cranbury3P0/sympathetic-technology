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
    <div className={`min-h-screen bg-white ${pageFont}`}>
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
              Cranbury in Vancouver, British Columbia, Canada. This policy explains how information
              is handled when you visit this website or use services linked from it.
            </p>
            <p>We collect only what is necessary to respond to inquiries and deliver services. We keep information only as long as it serves a clear purpose. We do not sell or trade personal information.</p>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 font-sans text-xl font-semibold text-neutral-900">
              What We Collect and Why
            </h2>
            <p>When you complete a contact form or submit the AI Readiness Assessment intake, we may collect:</p>
            <PolicyList items={[
              'name',
              'email address',
              'organization name',
              'sector',
              'role or professional context',
            ]} />
            <p className="mt-4">
              This information is used only to respond to your inquiry and support assessment
              conversations. It is not used for marketing and is not shared with third parties.
            </p>
            <p className="mt-4">
              If you use the AI Readiness Assessment tool, conversation content is processed through
              Anthropic&rsquo;s API to generate responses. This is a third-party service subject to
              Anthropic&rsquo;s own privacy and data-use policies.
            </p>
            <p className="mt-4">
              Please avoid sharing sensitive personal, financial, clinical, or confidential
              organizational information in assessment conversations.
            </p>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 font-sans text-xl font-semibold text-neutral-900">
              Cookies and Local Storage
            </h2>
            <p>This site does not use advertising cookies or third-party tracking pixels.</p>
            <p className="mt-4">
              The only browser storage used is a single localStorage entry that records whether you
              have acknowledged the privacy notice banner. This setting remains entirely within your
              browser and is never transmitted to our servers.
            </p>
            <p className="mt-4">
              If this site is deployed through Vercel, Vercel may set limited infrastructure cookies
              required for hosting and security purposes. These cookies are outside our direct
              control. Vercel&rsquo;s privacy practices are described at:{' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors hover:text-neutral-900"
              >
                vercel.com/legal/privacy-policy
              </a>
            </p>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 font-sans text-xl font-semibold text-neutral-900">
              How Information Is Stored
            </h2>
            <p>
              Contact form submissions are received by email. Sympathetic Technology does not
              maintain a standalone marketing database.
            </p>
            <p className="mt-4">Information you provide is retained only as long as necessary for:</p>
            <PolicyList items={[
              'responding to your inquiry',
              'supporting active conversations or projects',
              'meeting basic professional record-keeping obligations',
            ]} />
            <p className="mt-4">
              Information is stored using standard business communication and document tools with
              appropriate access controls.
            </p>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 font-sans text-xl font-semibold text-neutral-900">
              Sharing and Disclosure
            </h2>
            <p>Sympathetic Technology does not sell, rent, or trade personal information.</p>
            <p className="mt-4">Information may be disclosed only:</p>
            <PolicyList items={[
              "to fulfill a service you requested (such as the AI assessment tool's use of Anthropic's API)",
              'where required by law or valid legal process',
              'where necessary to protect the rights, property, or safety of clients or the public',
            ]} />
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 font-sans text-xl font-semibold text-neutral-900">
              Email Communications
            </h2>
            <p>
              If you contact Sympathetic Technology through this site, your email address will be
              used only to respond to your inquiry.
            </p>
            <p className="mt-4">We do not operate a marketing mailing list from this site.</p>
            <p className="mt-4">Email addresses are not added to distribution lists without explicit consent.</p>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 font-sans text-xl font-semibold text-neutral-900">
              Your Rights
            </h2>
            <p>
              Under PIPEDA (Canada&rsquo;s Personal Information Protection and Electronic Documents
              Act), you have the right to:
            </p>
            <PolicyList items={[
              'request access to personal information we hold about you',
              'request corrections',
              'withdraw consent for its use where applicable',
            ]} />
            <p className="mt-4">
              Residents of the European Economic Area and United Kingdom may also have rights under
              GDPR, including the right to access, correct, erase, or restrict processing of
              personal data.
            </p>
            <p className="mt-4">
              Requests can be made using the contact information below. We respond within 30 days.
            </p>
            <p className="mt-4">
              In projects involving Indigenous communities or organizations, Sympathetic Technology
              supports data governance approaches consistent with OCAP™ (Ownership, Control, Access,
              and Possession) principles and works with partners to ensure information remains under
              appropriate community authority.
            </p>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 font-sans text-xl font-semibold text-neutral-900">
              Data Security
            </h2>
            <p>
              Reasonable administrative and technical safeguards are used to protect information
              submitted through this site.
            </p>
            <p className="mt-4">
              However, no internet transmission method can be guaranteed completely secure.
            </p>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 font-sans text-xl font-semibold text-neutral-900">
              Changes to This Policy
            </h2>
            <p>
              This policy may be updated from time to time. The effective date at the top of this
              page reflects the most recent revision.
            </p>
            <p className="mt-4">
              Continued use of the site after changes are posted constitutes acceptance of the
              updated policy.
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
                Contact us through this site
              </a>
            </p>
          </section>

        </div>
      </main>

      <FooterCta />
    </div>
  )
}
