import { useState } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { FooterCta, pageFont } from './InteriorFooter.jsx'
import SiteHeader, { SITE_HEADER_NAV } from './SiteHeader.jsx'
import {
  formatJournalDate,
  formatJournalShortDate,
  getJournalPost,
  journalPosts,
} from './journalData.js'

const CREAM = '#EDE9DC'

function JournalBadge() {
  return (
    <span className="relative inline-flex h-8 items-center">
      <svg
        viewBox="0 0 92 32"
        className="absolute inset-0 h-full w-full"
        aria-hidden
        preserveAspectRatio="none"
      >
        <polygon
          fill="#111111"
          points="0,4 4,0 8,4 12,0 16,4 20,0 24,4 28,0 32,4 36,0 40,4 44,0 48,4 52,0 56,4 60,0 64,4 68,0 72,4 76,0 80,4 84,0 88,4 92,4 92,28 88,32 84,28 80,32 76,28 72,32 68,28 64,32 60,28 56,32 52,28 48,32 44,28 40,32 36,28 32,32 28,28 24,32 20,28 16,32 12,28 8,32 4,28 0,28"
        />
      </svg>
      <span className="relative z-10 px-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
        Journal
      </span>
    </span>
  )
}

function JournalHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const isActive = (to) => {
    if (to === '/') return pathname === '/'
    return pathname === to || pathname.startsWith(`${to}/`)
  }

  return (
    <nav
      className="sticky top-0 z-[100] w-full border-b-2 border-[#111111] px-6 py-4 md:px-12"
      style={{ backgroundColor: CREAM }}
    >
      <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-6">
        <Link to="/" aria-label="Sympathetic Technology home" className="shrink-0">
          <p className="font-sans text-[14px] font-black uppercase leading-[1.15] tracking-[0.06em] text-[#111111]">
            Sympathetic<br />Technology
          </p>
        </Link>

        {/* Mobile toggle */}
        <button
          type="button"
          className="shrink-0 p-2 text-[#111111] md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="journal-mobile-nav"
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          {menuOpen ? (
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Close</span>
          ) : (
            <span className="flex h-5 w-6 flex-col justify-center gap-1.5" aria-hidden>
              <span className="h-px w-full bg-[#111111]" />
              <span className="h-px w-full bg-[#111111]" />
              <span className="h-px w-full bg-[#111111]" />
            </span>
          )}
        </button>

        {/* Desktop nav */}
        <ul className="hidden items-center md:flex">
          {SITE_HEADER_NAV.map(([label, to], i) => (
            <li key={label} className="flex items-center">
              {i > 0 && (
                <span className="mx-3 select-none text-[#AAAAAA]" aria-hidden>|</span>
              )}
              {label === 'JOURNAL' ? (
                <Link to={to} aria-label="Journal" aria-current={isActive(to) ? 'page' : undefined}>
                  <JournalBadge />
                </Link>
              ) : (
                <Link
                  to={to}
                  className={`font-sans text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:text-[#111111] ${
                    isActive(to) ? 'text-[#111111]' : 'text-[#666666]'
                  }`}
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile nav */}
      <div
        id="journal-mobile-nav"
        className={`mx-auto mt-5 max-w-[1920px] border-t border-[#CCCCCC] pt-5 md:hidden ${
          menuOpen ? 'block' : 'hidden'
        }`}
        aria-hidden={!menuOpen}
      >
        <ul className="space-y-4">
          {SITE_HEADER_NAV.map(([label, to]) => (
            <li key={label}>
              <Link
                to={to}
                className={`block font-sans text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:text-[#111111] ${
                  isActive(to) ? 'text-[#111111]' : 'text-[#666666]'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

const eyebrowClass =
  'text-[11px] font-medium uppercase tracking-[0.12em] text-[#999999]'

const categoryClass =
  'text-[11px] font-medium uppercase tracking-[0.1em] text-[#888888]'

const dateClass = 'text-[12px] uppercase tracking-[0.06em] text-[#999999]'

const shareButtonClass =
  'text-[#111111] opacity-60 transition-opacity hover:opacity-100'

const colourBySlot = {
  1: '#E8725A',
  2: '#2A4A2E',
  3: '#B52B2B',
  0: '#1E3F5A',
}

function getPostColour(post) {
  return colourBySlot[post.colourSlot] ?? colourBySlot[1]
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-current">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.3 8.1h4.4V23H.3V8.1Zm7.2 0h4.2v2.03h.06c.59-1.12 2.03-2.3 4.18-2.3 4.47 0 5.3 2.94 5.3 6.77V23h-4.4v-7.45c0-1.78-.03-4.06-2.47-4.06-2.48 0-2.86 1.94-2.86 3.93V23h-4.4V8.1h.39Z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-current">
      <path d="M18.9 1.6h3.68l-8.04 9.2L24 22.4h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.6h7.6l5.24 6.93L18.9 1.6Zm-1.29 18.76h2.04L6.49 3.53H4.3l13.31 16.83Z" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.07 0l-3 3A5 5 0 0 0 11 21.07l1.71-1.71" />
    </svg>
  )
}

function renderInline(text) {
  const parts = []
  const pattern = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*)/g
  let lastIndex = 0
  let match

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    if (match[2]) {
      parts.push(
        <a key={`link-${match.index}`} href={match[3]}>
          {match[2]}
        </a>,
      )
    } else {
      parts.push(
        <strong key={`strong-${match.index}`} className="font-semibold text-[#111111]">
          {match[4]}
        </strong>,
      )
    }

    lastIndex = pattern.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

function isBlockStart(line) {
  return (
    line === '---' ||
    line.startsWith('## ') ||
    line.startsWith('### ') ||
    line.startsWith('> ') ||
    line.startsWith('- ') ||
    /^\d+\.\s/.test(line) ||
    /^\*\*.+\*\*$/.test(line)
  )
}

function markdownToBlocks(markdown) {
  const lines = markdown.split('\n')
  const blocks = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index].trim()

    if (!line) {
      index += 1
      continue
    }

    if (line === '---') {
      blocks.push({ type: 'hr' })
      index += 1
      continue
    }

    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', text: line.slice(4) })
      index += 1
      continue
    }

    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.slice(3) })
      index += 1
      continue
    }

    if (/^\*\*.+\*\*$/.test(line)) {
      blocks.push({ type: 'h2', text: line.slice(2, -2) })
      index += 1
      continue
    }

    if (line.startsWith('> ')) {
      const quoteLines = []
      while (index < lines.length && lines[index].trim().startsWith('> ')) {
        quoteLines.push(lines[index].trim().slice(2))
        index += 1
      }
      blocks.push({ type: 'blockquote', text: quoteLines.join(' ') })
      continue
    }

    if (line.startsWith('- ')) {
      const items = []
      while (index < lines.length && lines[index].trim().startsWith('- ')) {
        items.push(lines[index].trim().slice(2))
        index += 1
      }
      blocks.push({ type: 'ul', items })
      continue
    }

    if (/^\d+\.\s/.test(line)) {
      const items = []
      while (index < lines.length && /^\d+\.\s/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s/, ''))
        index += 1
      }
      blocks.push({ type: 'ol', items })
      continue
    }

    const paragraphLines = []
    while (index < lines.length) {
      const current = lines[index].trim()
      if (!current) break
      if (paragraphLines.length > 0 && isBlockStart(current)) break
      paragraphLines.push(current)
      index += 1
    }
    blocks.push({ type: 'p', text: paragraphLines.join(' ') })
  }

  return blocks
}

function MarkdownBody({ markdown }) {
  return (
    <div className="text-[17px] leading-[1.8] text-[#2b2e34] md:text-[18px]">
      {markdownToBlocks(markdown).map((block, index) => {
        if (block.type === 'h2') {
          return (
            <h2
              key={index}
              className="mb-5 mt-14 text-[26px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#111111]"
            >
              {renderInline(block.text)}
            </h2>
          )
        }

        if (block.type === 'h3') {
          return (
            <h3
              key={index}
              className="mb-4 mt-10 text-[20px] font-bold leading-snug tracking-[-0.01em] text-[#111111]"
            >
              {renderInline(block.text)}
            </h3>
          )
        }

        if (block.type === 'blockquote') {
          return (
            <blockquote
              key={index}
              className="my-12 border-l-[3px] border-[#111111] bg-[#f8f8f8] px-8 py-8 text-[20px] font-semibold leading-[1.4] tracking-[-0.01em] text-[#111111] md:px-10"
            >
              {renderInline(block.text)}
            </blockquote>
          )
        }

        if (block.type === 'ul' || block.type === 'ol') {
          const ListTag = block.type
          return (
            <ListTag key={index} className="mb-7 list-outside pl-6">
              {block.items.map((item) => (
                <li key={item} className="mb-2.5 leading-[1.7]">
                  {renderInline(item)}
                </li>
              ))}
            </ListTag>
          )
        }

        if (block.type === 'hr') {
          return <hr key={index} className="my-14 border-0 border-t border-[#e8e8e8]" />
        }

        return (
          <p key={index} className="mb-7 [&_a]:border-b [&_a]:border-[#e8e8e8] [&_a]:text-[#111111] [&_a]:no-underline hover:[&_a]:border-[#111111]">
            {renderInline(block.text)}
          </p>
        )
      })}
    </div>
  )
}

function SubscribeBlock() {
  return (
    <section className="bg-[#111827] px-6 py-16 text-center md:px-12 md:py-[100px]">
      <div className="mx-auto max-w-[600px]">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#555555]">
          The Journal
        </p>
        <h2 className="mx-auto mt-4 max-w-[600px] text-[clamp(28px,3vw,42px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white">
          This arrives by email when there is something worth saying.
        </h2>
        <p className="mx-auto mt-4 max-w-[480px] text-[16px] leading-[1.7] text-[#777777]">
          No frequency promises. No content calendar. Writing that earns its place
          in your inbox.
        </p>
        <form
          className="mx-auto mt-10 flex max-w-[440px] flex-col sm:flex-row"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            type="email"
            placeholder="Your email address"
            aria-label="Your email address"
            className="min-w-0 flex-1 border border-[#333333] bg-transparent px-5 py-4 text-[15px] text-white outline-none placeholder:text-[#555555] sm:border-r-0"
          />
          <button
            type="submit"
            className="border border-white bg-white px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#111111] transition-colors hover:bg-[#e8e8e8]"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

function SidebarRow({ label, children, valueClassName = '' }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[#e8e8e8] py-4">
      <span className="shrink-0 text-[13px] text-[#888888]">{label}</span>
      <span className={`text-right text-[13px] font-semibold text-[#111111] ${valueClassName}`}>
        {children}
      </span>
    </div>
  )
}

function ShareLinks({ post }) {
  const url = `https://www.sympathetictechnology.com${post.href}`
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(post.title)

  const copyLink = async () => {
    if (navigator?.clipboard) {
      await navigator.clipboard.writeText(url)
    }
  }

  return (
    <div className="flex items-center gap-3.5">
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className={shareButtonClass}
      >
        <LinkedInIcon />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className={shareButtonClass}
      >
        <XIcon />
      </a>
      <button
        type="button"
        aria-label="Copy link"
        className={shareButtonClass}
        onClick={copyLink}
      >
        <LinkIcon />
      </button>
    </div>
  )
}

function PostSidebar({ post }) {
  return (
    <aside className="border-t-2 border-[#111111] md:sticky md:top-[88px]">
      <SidebarRow label="Author">{post.author}</SidebarRow>
      <SidebarRow label="Published">{formatJournalShortDate(post.date)}</SidebarRow>
      <SidebarRow label="Category">{post.category}</SidebarRow>
      <SidebarRow label="Read Time">{post.read_time}</SidebarRow>
      <div className="flex items-baseline justify-between gap-4 border-b border-[#e8e8e8] py-4">
        <span className="shrink-0 text-[13px] text-[#888888]">Share</span>
        <ShareLinks post={post} />
      </div>
      {post.credits ? (
        <SidebarRow label="Credits" valueClassName="text-[12px] font-normal leading-[1.5] text-[#888888]">
          {post.credits}
        </SidebarRow>
      ) : null}
    </aside>
  )
}

function PostFooterMeta({ post }) {
  const hasTags = Array.isArray(post.tags) && post.tags.length > 0
  const hasCredits = Boolean(post.credits)

  if (!hasTags && !hasCredits) {
    return (
      <div className="mt-14">
        <div className="flex items-baseline gap-6 border-t border-b border-[#e8e8e8] py-5">
          <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.12em] text-[#888888]">
            Share
          </span>
          <ShareLinks post={post} />
        </div>
      </div>
    )
  }

  return (
    <div className="mt-14">
      {hasTags ? (
        <div className="flex items-baseline gap-6 border-t border-[#e8e8e8] py-5">
          <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.12em] text-[#888888]">
            Tags
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#111111]">
            {post.tags.map((tag) => `• ${tag}`).join('   ')}
          </span>
        </div>
      ) : null}
      <div className="flex items-baseline gap-6 border-t border-[#e8e8e8] py-5">
        <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.12em] text-[#888888]">
          Share
        </span>
        <ShareLinks post={post} />
      </div>
      {hasCredits ? (
        <div className="flex items-baseline gap-6 border-t border-b border-[#e8e8e8] py-5">
          <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.12em] text-[#888888]">
            Credits
          </span>
          <span className="text-[12px] font-normal text-[#888888]">{post.credits}</span>
        </div>
      ) : (
        <div className="border-b border-[#e8e8e8]" aria-hidden />
      )}
    </div>
  )
}

function RelatedPosts({ currentPost }) {
  const relatedPosts = journalPosts
    .filter((post) => post.slug !== currentPost.slug)
    .slice(0, 4)

  if (relatedPosts.length === 0) return null

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-12 md:py-20">
      <p className={eyebrowClass}>Read More</p>
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {relatedPosts.map((post) => (
          <Link key={post.slug} to={post.href} className="group block no-underline">
            <img
              src={post.cover_image}
              alt={post.cover_alt}
              className="aspect-[3/2] w-full object-cover grayscale transition-opacity duration-200 group-hover:opacity-85"
              loading="lazy"
              decoding="async"
            />
            <p className="mb-2 mt-4 text-[11px] font-medium uppercase tracking-[0.12em] text-[#888888]">
              {post.category}
            </p>
            <h2 className="m-0 text-[16px] font-bold leading-[1.3] tracking-[-0.01em] text-[#111111]">
              {post.title}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function JournalIndexPage() {
  return (
    <div
      className="min-h-screen bg-white text-[#111111] antialiased"
      style={{ fontFamily: pageFont, WebkitFontSmoothing: 'antialiased' }}
    >
      <JournalHeader />
      <main style={{ backgroundColor: CREAM }}>
        <section
          className="border-b-2 border-[#111111] px-6 pb-12 pt-10 md:px-12 md:pb-14 md:pt-12"
          style={{ backgroundColor: CREAM }}
        >
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:items-center md:gap-0">

              {/* Left: editorial masthead */}
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#111111]">
                  Sympathetic Technology
                </p>
                <h1
                  className="mt-1 text-[clamp(80px,10.5vw,124px)] uppercase leading-[0.88] text-[#111111]"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  Journal
                </h1>

                {/* Zigzag accent */}
                <svg
                  viewBox="0 0 560 28"
                  className="mt-4 h-[18px] w-full max-w-[640px]"
                  aria-hidden
                  preserveAspectRatio="none"
                >
                  <polyline
                    points="0,22 35,4 56,16 70,8 112,22 147,4 168,16 182,8 224,22 259,4 280,16 294,8 336,22 371,4 392,16 406,8 448,22 483,4 504,16 518,8 560,22"
                    fill="none"
                    stroke="#111111"
                    strokeWidth="2"
                    strokeLinejoin="miter"
                  />
                </svg>

                {/* Divider + star */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#111111]" />
                  <span className="text-[13px] leading-none" aria-hidden>★</span>
                  <div className="h-px flex-1 bg-[#111111]" />
                </div>

                {/* Subtitle */}
                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.26em] text-[#111111]">
                  Writing and thinking about AI in practice
                </p>
              </div>

              {/* Right: blurb panel */}
              <div className="border-t border-[#BBBBBB] pt-8 md:w-[260px] md:border-l md:border-t-0 md:pl-12 md:pt-0">
                <svg
                  viewBox="0 0 40 44"
                  className="h-10 w-10"
                  aria-hidden
                  fill="none"
                  stroke="#111111"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                >
                  <rect x="6" y="2" width="28" height="40" />
                  <line x1="12" y1="14" x2="28" y2="14" />
                  <line x1="12" y1="21" x2="28" y2="21" />
                  <line x1="12" y1="28" x2="20" y2="28" />
                  <line x1="2" y1="10" x2="6" y2="10" />
                  <line x1="2" y1="18" x2="6" y2="18" />
                  <line x1="2" y1="26" x2="6" y2="26" />
                </svg>
                <p className="mt-4 text-[12px] font-bold uppercase tracking-[0.1em] text-[#111111]">
                  Ideas. Practice. Impact.
                </p>
                <p className="mt-3 max-w-[220px] text-[14px] leading-[1.65] text-[#555555]">
                  Thoughts on responsible AI adoption, institutional change, and the systems we build together.
                </p>
              </div>

            </div>
          </div>
        </section>

        <section>
          {journalPosts.map((post) => (
            <article key={post.slug} className="border-b border-[#e8e8e8]">
              <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-7 px-6 py-10 md:grid-cols-2 md:gap-16 md:px-12 md:py-14">
                <Link
                  to={post.href}
                  aria-label={post.title}
                  className="group block p-4 md:p-5"
                  style={{ backgroundColor: getPostColour(post) }}
                >
                  <img
                    src={post.cover_image}
                    alt={post.cover_alt}
                    className="aspect-[3/2] w-full object-cover grayscale transition-opacity duration-200 group-hover:opacity-85"
                    loading="lazy"
                    decoding="async"
                  />
                </Link>
                <div>
                  <div className="mb-5 flex items-baseline justify-between gap-6">
                    <p className={categoryClass}>{post.category}</p>
                    <time className={`${dateClass} shrink-0`} dateTime={post.date}>
                      {formatJournalDate(post.date)}
                    </time>
                  </div>
                  <h2 className="mb-4 text-[22px] font-bold leading-[1.2] tracking-[-0.02em] text-[#111111]">
                    <Link to={post.href} className="transition-colors hover:text-[#2b2e34]">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mb-6 text-[17px] leading-[1.7] text-[#555555]">
                    {post.excerpt}
                  </p>
                  <Link
                    to={post.href}
                    className="inline-block text-[12px] font-semibold uppercase tracking-[0.1em] text-[#111111] hover:underline"
                  >
                    Read →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        <SubscribeBlock />
        <FooterCta />
      </main>
    </div>
  )
}

export function JournalPostPage() {
  const { slug } = useParams()
  const post = getJournalPost(slug)

  if (!post) {
    return <Navigate to="/journal" replace />
  }

  return (
    <div
      className="min-h-screen bg-white text-[#111111] antialiased"
      style={{ fontFamily: pageFont, WebkitFontSmoothing: 'antialiased' }}
    >
      <SiteHeader />
      <main className="bg-white">
        <article>
          <header
            className="border-b border-white/15 px-6 pt-12 md:px-12 md:pt-20"
            style={{ backgroundColor: getPostColour(post) }}
          >
            <div className="mx-auto max-w-[1200px]">
              <div className="flex items-baseline justify-between gap-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/60">
                  {post.category}
                </p>
                <time
                  className="shrink-0 text-[12px] uppercase tracking-[0.06em] text-white/60"
                  dateTime={post.date}
                >
                  {formatJournalDate(post.date)}
                </time>
              </div>
              <img
                src={post.cover_image}
                alt={post.cover_alt}
                className="mx-auto mt-8 aspect-video w-full max-w-[760px] object-cover grayscale"
                decoding="async"
              />
              <h1 className="mx-auto mt-10 max-w-[760px] pb-12 text-[clamp(28px,6vw,44px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white md:pb-20 md:text-[clamp(32px,4vw,60px)]">
                {post.title}
              </h1>
            </div>
          </header>

          <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 px-6 py-12 md:grid-cols-[1fr_280px] md:gap-20 md:px-12 md:py-[72px]">
            <div className="max-w-[640px]">
              <MarkdownBody markdown={post.body} />
              <PostFooterMeta post={post} />
            </div>
            <PostSidebar post={post} />
          </div>

          <footer className="mx-auto max-w-[1100px] border-t border-[#e8e8e8] px-6 py-10 md:px-12">
            <Link
              to="/journal"
              className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#111111] hover:underline"
            >
              ← All Posts
            </Link>
          </footer>
        </article>

        <RelatedPosts currentPost={post} />
        <SubscribeBlock />
        <FooterCta />
      </main>
    </div>
  )
}
