import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

/** Black bar nav shared by the header and footer. */
export const SITE_HEADER_NAV = [
  ['HOME', '/'],
  ['ABOUT', '/about'],
  ['SERVICES', '/services'],
  ['OUR APPROACH', '/approach'],
  ['SOVEREIGN AI', '/sovereign-ai'],
  ['JOURNAL', '/journal'],
  ['AI READINESS', '/readiness-assessment'],
  ["LET'S TALK", '/talk'],
]

export default function SiteHeader({ overlay = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const positionClass = overlay
    ? 'fixed left-0 right-0 top-0'
    : 'sticky top-0'

  const isActive = (to) => {
    if (to === '/') return pathname === '/'
    return pathname === to || pathname.startsWith(`${to}/`)
  }

  const navLinkClass = (to, mobile = false) =>
    `${mobile ? 'block ' : ''}font-sans text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-200 hover:text-white ${
      isActive(to) ? 'text-white' : 'text-white/70'
    }`

  return (
    <nav
      className={`${positionClass} z-[100] w-full border-b border-white/5 bg-black px-6 py-6 md:px-16`}
      aria-label="Site"
    >
      <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-4 md:items-start md:gap-6">
        <Link
          to="/"
          className="flex min-w-0 shrink flex-col items-start text-left"
          aria-label="Sympathetic Technology home"
        >
          <p className="max-w-full truncate whitespace-nowrap font-sans text-[17px] font-bold uppercase tracking-[0.16em] text-white sm:text-xl sm:tracking-[0.2em] md:text-2xl">
            SYMPATHETIC TECHNOLOGY
          </p>
          <p className="mt-1 max-w-[270px] truncate whitespace-nowrap font-sans text-[11px] font-normal tracking-[0.04em] text-white opacity-[0.72] sm:max-w-full sm:text-[13px]">
            Organizational guidance for nonprofits, associations, and arts institutions
          </p>
        </Link>

        <button
          type="button"
          className="-mr-1 shrink-0 p-2 text-white/90 transition-colors hover:text-white md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="site-mobile-nav"
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          {menuOpen ? (
            <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-white/90 transition-colors hover:text-white">
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

        <ul className="hidden flex-wrap items-center justify-end gap-x-10 md:flex lg:gap-x-12">
          {SITE_HEADER_NAV.map(([label, to]) => (
            <li key={label}>
              {to.startsWith('mailto:') ? (
                <a
                  href={to}
                  className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 transition-colors duration-200 hover:text-white"
                >
                  {label}
                </a>
              ) : (
                <Link
                  to={to}
                  className={navLinkClass(to)}
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div
        id="site-mobile-nav"
        className={`mx-auto mt-6 max-w-[1920px] border-t border-white/10 pt-6 md:hidden ${
          menuOpen ? 'block' : 'hidden'
        }`}
        aria-hidden={!menuOpen}
      >
        <ul className="space-y-4">
          {SITE_HEADER_NAV.map(([label, to]) => (
            <li key={label}>
              {to.startsWith('mailto:') ? (
                <a
                  href={to}
                  className="block font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 transition-colors duration-200 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              ) : (
                <Link
                  to={to}
                  className={navLinkClass(to, true)}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
