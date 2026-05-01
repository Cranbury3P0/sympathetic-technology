import { Link } from 'react-router-dom'
import { SITE_HEADER_NAV } from './SiteHeader.jsx'

const formatFooterNavLabel = (label) =>
  label
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replace(/'S\b/g, "'s")

const footerHeadingClass =
  'm-0 font-sans text-lg font-bold uppercase tracking-widest text-white'

const footerTitleRowClass = `${footerHeadingClass} md:self-baseline`

const footerBodyClass = 'font-sans text-[13px] font-normal leading-relaxed'

const navLinkClass =
  `${footerBodyClass} text-white/70 transition-colors duration-200 hover:text-white`

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.12] bg-black text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-[2fr_1fr_2fr] md:gap-x-16 md:gap-y-6">
          <h2 className={`${footerTitleRowClass} order-1 md:col-start-1 md:row-start-1`}>
            Land acknowledgement
          </h2>

          <div
            className={`${footerBodyClass} order-2 max-w-[75ch] text-white/60 md:col-start-1 md:row-start-2 md:self-start`}
          >
            <p>
              We live, work and play on the unceded territories of the xʷməθkʷəy̓əm
              (Musqueam), Sḵwx̱wú7mesh (Squamish), and səl̓ilwətaɬ (Tsleil-Waututh)
              Nations.
            </p>
            <p className="mt-4">
              Our distributed team members are located on ancestral lands across Turtle
              Island.
            </p>
            <p className="mt-4">
              We honour and respect the lands, governance systems, and enduring stewardship
              of Indigenous Nations, and we are grateful to count friends, colleagues, and
              partners from these communities among our collaborators.
            </p>
          </div>

          <h2 className={`${footerTitleRowClass} order-3 md:col-start-2 md:row-start-1`}>
            Navigation
          </h2>

          <nav
            aria-label="Footer"
            className={`order-4 md:col-start-2 md:row-start-2 md:self-start ${footerBodyClass}`}
          >
            <ul className="flex flex-col gap-2">
              {SITE_HEADER_NAV.map(([label, to]) => (
                <li key={label}>
                  {to.startsWith('mailto:') ? (
                    <a href={to} className={navLinkClass}>
                      {formatFooterNavLabel(label)}
                    </a>
                  ) : (
                    <Link to={to} className={navLinkClass}>
                      {formatFooterNavLabel(label)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <p
            className={`${footerTitleRowClass} order-5 whitespace-nowrap md:col-start-3 md:row-start-1`}
          >
            SYMPATHETIC TECHNOLOGY
          </p>

          <div
            className={`order-6 flex min-w-0 flex-col items-start gap-4 md:col-start-3 md:row-start-2 md:self-start ${footerBodyClass}`}
          >
            <p className="text-white/55">
              Organizational guidance for nonprofits, associations, and arts institutions
            </p>
            <p className="text-white/55">Sean Cranbury, Principal</p>
            <a
              href="/talk"
              className={`${footerBodyClass} text-white/75 transition-opacity hover:opacity-100`}
            >
              Let&apos;s Talk
            </a>
            <p className="text-white/55">Vancouver, BC</p>
            <a
              href="https://linkedin.com/in/seancranbury"
              target="_blank"
              rel="noopener noreferrer"
              className={navLinkClass}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.15]">
        <div className="mx-auto w-full max-w-7xl px-6 py-6 text-right">
          <p className={`${footerBodyClass} text-white/40`}>
            © 2026 Sympathetic Technology
          </p>
        </div>
      </div>
    </footer>
  )
}
