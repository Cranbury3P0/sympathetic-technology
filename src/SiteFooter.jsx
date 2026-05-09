import { Link } from 'react-router-dom'

import { SITE_HEADER_NAV } from './SiteHeader.jsx'

const labelClass =
  'font-sans text-[12px] font-bold uppercase tracking-[0.22em] text-white'

const bodyClass =
  'font-sans text-[15px] font-normal leading-relaxed text-white'

const navLinkClass =
  'font-sans text-[15px] font-normal leading-relaxed tracking-normal text-white transition-colors duration-200 hover:text-white/85'

/** Same order and labels as `SITE_HEADER_NAV`, then primary CTA (matches header left-to-right). */
const FOOTER_NAV_ITEMS = [
  ...SITE_HEADER_NAV.map(([label, to]) => [label, to]),
  ['Book a Conversation', '/talk'],
]

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.12] bg-[#111827] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-y-14 md:grid-cols-3 md:gap-x-14 lg:gap-x-16 md:gap-y-0">
          {/* Navigation first — top-down on mobile matches header order */}
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

          {/* Land acknowledgement */}
          <div>
            <h2 className={`${labelClass} mb-5`}>Land acknowledgement</h2>
            <p className={`${bodyClass}`}>
              We honour and respect the lands, governance systems, and enduring stewardship
              of Indigenous Nations, and we are grateful to count friends, colleagues, and
              partners from these communities among our collaborators.
            </p>
          </div>

          {/* Data & governance */}
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
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.15]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[15px] font-normal leading-relaxed text-white">
            © Sympathetic Technology 2025
          </p>
          <Link
            to="/privacy"
            className={`${navLinkClass} shrink-0 text-[14px] sm:text-[15px]`}
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}
