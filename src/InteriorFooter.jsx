import { Link } from 'react-router-dom'

const navItems = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/#work' },
  { label: 'Our Approach', to: '/approach' },
  { label: 'Journal', to: '/' },
  { label: 'Start Here', to: '/#manifesto' },
  { label: "Let's Talk", to: '/talk' },
]

export const pageFont = "-apple-system, 'Helvetica Neue', Arial, sans-serif"

export const eyebrowClass =
  'text-[11px] font-medium uppercase tracking-[0.12em] text-[#999999]'

export const bodyTextClass =
  'text-[17px] font-normal leading-[1.75] text-[#2b2e34]'

export const sectionHeadlineClass =
  'text-[clamp(28px,3vw,42px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#111111]'

export const ctaClass =
  'inline-block bg-[#111827] px-10 py-[18px] text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#1f2937]'

export function FooterCta() {
  return (
    <section className="border-b border-[#e8e8e8] bg-white px-6 py-16 text-center md:px-12 md:py-[100px]">
      <div className="mx-auto max-w-[800px]">
        <h2 className="text-[clamp(28px,4vw,52px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#111111]">
          Mission-driven organizations shouldn&apos;t have to choose between progress
          and privacy.
        </h2>
        <Link to="/talk" className={`mt-10 ${ctaClass}`}>
          Let&apos;s Talk
        </Link>
      </div>
    </section>
  )
}

// Retained for now, but this default footer component is not currently rendered.
export default function InteriorFooter() {
  return (
    <footer className="bg-[#111827] px-6 py-12 text-[#777777] md:px-12 md:py-16">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-[2fr_1fr_1.4fr] md:gap-16">
        <section>
          <h2 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
            Land Acknowledgement
          </h2>
          <div className="space-y-4 text-[13px] leading-[1.8]">
            <p>
              We live, work and play on the unceded territories of the xʷməθkʷəy̓əm
              (Musqueam), Skwxwú7mesh (Squamish), and səlilwətaɬ (Tsleil-Waututh)
              Nations.
            </p>
            <p>
              Our distributed team members are located on ancestral lands across Turtle
              Island.
            </p>
            <p>
              We honour and respect the lands, governance systems, and enduring
              stewardship of Indigenous Nations.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
            Navigation
          </h2>
          <ul className="space-y-2 text-[13px] leading-[1.8]">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.to.startsWith('mailto:') ? (
                  <a href={item.to} className="transition-colors hover:text-white">
                    {item.label}
                  </a>
                ) : (
                  <Link to={item.to} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
            Sympathetic Technology
          </h2>
          <div className="space-y-3 text-[13px] leading-[1.8]">
            <p>Organizational guidance for nonprofits, associations, and arts institutions</p>
            <p>Sean Cranbury, Principal</p>
            <p>Vancouver, BC</p>
            <p>sympathetictechnology.com</p>
          </div>
        </section>
      </div>
    </footer>
  )
}
