import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  ['About', '/about'],
  ['Approach', '/approach'],
  ['Services', '/services'],
  ['Journal', '/journal'],
  ['Assessment', '/readiness-assessment'],
  ['Controlled Intelligence', '/controlled-intelligence'],
]

/** Exported for use in SiteFooter navigation list. */
export const SITE_HEADER_NAV = NAV_LINKS

export default function SiteHeader({ overlay = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const positionClass = overlay ? 'fixed left-0 right-0 top-0' : 'sticky top-0'

  const isActive = (to) =>
    to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`)

  const navLinkClass = (to, mobile = false) =>
    `${mobile ? 'block ' : ''}font-sans text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-200 hover:text-white ${
      isActive(to) ? 'text-white' : 'text-white/70'
    }`

  return (
    <nav
      className={`${positionClass} z-[100] w-full max-w-full overflow-x-hidden border-b border-white/5 bg-[#0B111E] py-5 pl-[calc(1.5rem+25px)] pr-6 md:py-6 md:pl-[calc(3rem+25px)] md:pr-12`}
      aria-label="Site"
    >
      <div className="mx-auto flex min-w-0 max-w-[1920px] items-center justify-between gap-4 md:gap-6">
        {/* Logomark + wordmark */}
        <Link
          to="/"
          className="flex min-w-0 flex-1 items-start gap-3 text-left sm:gap-3.5 md:gap-4"
          aria-label="Sympathetic Technology home"
        >
          <span className="mt-0.5 shrink-0 text-white md:mt-1" aria-hidden>
            <svg
              width={36}
              height={36}
              viewBox="0 0 40 40"
              className="h-[30px] w-[30px] sm:h-8 sm:w-8 md:h-9 md:w-9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="15.5" stroke="currentColor" strokeWidth="1.25" />
              <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1.25" opacity="0.85" />
            </svg>
          </span>
          <span className="min-w-0">
            <p className="break-words font-sans text-[15px] font-bold uppercase leading-tight tracking-[0.15em] text-white sm:text-[17px] md:text-[20px]">
              Sympathetic Technology
            </p>
            <p className="mt-1 break-words font-sans text-[14px] font-normal leading-tight text-[#A0AEC0] sm:text-[15px] md:text-[18px]">
              A West Coast AI Infrastructure Studio
            </p>
          </span>
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="-mr-1 shrink-0 p-2 text-white/90 transition-colors hover:text-white md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="site-mobile-nav"
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          {menuOpen ? (
            <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
              Close
            </span>
          ) : (
            <span className="flex h-5 w-6 flex-col justify-center gap-1.5" aria-hidden>
              <span className="h-px w-full bg-white" />
              <span className="h-px w-full bg-white" />
              <span className="h-px w-full bg-white" />
            </span>
          )}
        </button>

        {/* Desktop nav */}
        <div className="hidden min-w-0 flex-1 items-center justify-end gap-x-5 md:flex lg:gap-x-7">
          <ul className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 lg:gap-x-7">
            {NAV_LINKS.map(([label, to]) => (
              <li key={label}>
                <Link to={to} className={navLinkClass(to)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/talk"
            className="rounded-none bg-white px-6 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#111827] transition-colors duration-200 hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Book a Conversation
          </Link>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        id="site-mobile-nav"
        className={`mx-auto mt-6 max-w-[1920px] border-t border-white/10 pt-6 md:hidden ${
          menuOpen ? 'block' : 'hidden'
        }`}
        aria-hidden={!menuOpen}
      >
        <ul className="space-y-4">
          {NAV_LINKS.map(([label, to]) => (
            <li key={label}>
              <Link
                to={to}
                className={navLinkClass(to, true)}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/talk"
              className="block font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:text-white/80"
              onClick={() => setMenuOpen(false)}
            >
              Book a Conversation
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
