import { Link } from 'react-router-dom'

import { SITE_HEADER_NAV } from './SiteHeader.jsx'

const labelClass =
  'font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-white'

const bodyClass =
  'font-sans text-[13px] font-normal leading-relaxed text-white'

const navLinkClass =
  'font-sans text-[13px] font-normal leading-relaxed tracking-normal text-white transition-colors duration-200 hover:text-white/85'

/** Title-case labels for footer nav (paths stay in sync with `SITE_HEADER_NAV`). */
const FOOTER_NAV_TITLE = {
  '/services': 'Work',
  '/approach': 'Approach',
  '/sovereign-ai': 'Sovereign AI',
  '/journal': 'Journal',
  '/about': 'About',
  '/readiness-assessment': 'Readiness Assessment',
  '/privacy': 'Privacy',
  '/talk': 'Book a Conversation',
}

const FOOTER_NAV_ITEMS = [
  ...SITE_HEADER_NAV.map(([, to]) => [FOOTER_NAV_TITLE[to] ?? to, to]),
  ['Book a Conversation', '/talk'],
]

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.12] bg-[#111827] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-y-14 md:grid-cols-3 md:gap-x-14 lg:gap-x-16 md:gap-y-0">
          {/* Left: Land acknowledgement */}
          <div>
            <h2 className={`${labelClass} mb-5`}>Land acknowledgement</h2>
            <p className={`${bodyClass}`}>
              We honour and respect the lands, governance systems, and enduring stewardship
              of Indigenous Nations, and we are grateful to count friends, colleagues, and
              partners from these communities among our collaborators.
            </p>
          </div>

          {/* Centre: Navigation — mirrors header */}
          <div>
            <h2 className={`${labelClass} mb-5`}>Navigation</h2>
            <nav aria-label="Footer">
              <ul className="flex flex-col gap-2.5">
                {FOOTER_NAV_ITEMS.map(([label, to]) => (
                  <li key={to}>
                    <Link to={to} className={navLinkClass}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right: Data & governance */}
          <div>
            <h2 className={`${labelClass} mb-5`}>Data &amp; governance</h2>
            <div className={`${bodyClass} space-y-5`}>
              <p>
                Sympathetic Technology operates within Canada&apos;s privacy framework,
                including the Personal Information Protection and Electronic Documents Act
                (PIPEDA).
              </p>
              <p>
                In projects involving Indigenous organizations or communities, we support
                data stewardship approaches consistent with OCAP™ (Ownership, Control,
                Access, and Possession) principles and community authority over
                information.
              </p>
            </div>
            <div className="mt-6">
              <Link
                to="/privacy"
                className={`${navLinkClass} inline-block font-sans text-[13px] font-normal`}
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.15]">
        <div className="mx-auto w-full max-w-7xl px-6 py-5">
          <p className="font-sans text-[13px] font-normal leading-relaxed text-white">
            © Sympathetic Technology 2025
          </p>
        </div>
      </div>
    </footer>
  )
}
