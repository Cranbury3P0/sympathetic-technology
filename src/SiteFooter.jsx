import { Link } from 'react-router-dom'

const labelClass =
  'font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-white/50'

const bodyClass = 'font-sans text-[13px] font-normal leading-relaxed'

const linkClass = `${bodyClass} text-white/70 transition-colors duration-200 hover:text-white`

const FOOTER_NAV = [
  ['Work', '/services'],
  ['Journal', '/journal'],
  ['About', '/about'],
  ['Book a Conversation', '/talk'],
]

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.12] bg-[#111827] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-16 md:gap-y-0">
          {/* Left: On the Land */}
          <div>
            <h2 className={`${labelClass} mb-5`}>On the Land</h2>
            <div className={`${bodyClass} space-y-3 text-white/60`}>
              <p>Vancouver, BC</p>
              <p>
                On the unceded territories of the xʷməθkʷəy̓əm (Musqueam),
                Sḵwx̱wú7mesh (Squamish), and səl̓ilwətaɬ (Tsleil-Waututh) Nations.
              </p>
            </div>
          </div>

          {/* Centre: Navigation */}
          <div>
            <h2 className={`${labelClass} mb-5`}>Navigation</h2>
            <nav aria-label="Footer">
              <ul className="flex flex-col gap-2">
                {FOOTER_NAV.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className={linkClass}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right: Sympathetic Technology */}
          <div>
            <h2 className={`${labelClass} mb-5`}>Sympathetic Technology</h2>
            <p className={`${bodyClass} mb-6 text-white/60`}>
              Organizational guidance for AI adoption, governance, and communications.
              We design systems that protect your data, support your people, and
              strengthen the work that matters.
            </p>
            <div className="flex gap-5">
              <Link to="/privacy" className={linkClass}>
                Privacy
              </Link>
              <Link to="/privacy" className={linkClass}>
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.15]">
        <div className="mx-auto w-full max-w-7xl px-6 py-5">
          <p className={`${bodyClass} text-white/40`}>
            © Sympathetic Technology 2025
          </p>
        </div>
      </div>
    </footer>
  )
}
