export const SITE_ORIGIN = 'https://www.sympathetictechnology.com'

export const JOURNAL_INDEX_HEADLINE =
  'Periodic observations at the intersection of AI and work'

export const JOURNAL_INDEX_DESCRIPTION =
  'Twenty years working inside healthcare, arts, and nonprofit organizations. And for a good run of it, the best nerd bar in Vancouver. RIP, Storm Crow Alliance.'

const DEFAULT = {
  title:
    'Sympathetic Technology | Responsible AI adoption for nonprofits, publishers, and healthcare organizations',
  description:
    'Sympathetic Technology helps nonprofits, publishers, and healthcare organizations adopt AI responsibly through governance-aware workflows, secure environments, and practical implementation support.',
  ogTitle: 'Sympathetic Technology',
  ogDescription:
    'Responsible AI adoption for nonprofits, publishers, and healthcare organizations.',
  ogUrl: `${SITE_ORIGIN}/`,
  ogImage: `${SITE_ORIGIN}/og-image.png`,
  ogType: 'website',
  canonical: `${SITE_ORIGIN}/`,
  twitterTitle: 'Sympathetic Technology',
  twitterDescription:
    'Responsible AI adoption for nonprofits, publishers, and healthcare organizations.',
  twitterImage: `${SITE_ORIGIN}/og-image.png`,
}

function setMetaProperty(property, content) {
  let el = document.head.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setMetaName(name, content) {
  let el = document.head.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function normalizeExcerpt(text) {
  if (typeof text !== 'string') return ''
  return text.replace(/\s+/g, ' ').trim()
}

export function applyDefaultDocumentMeta() {
  document.title = DEFAULT.title
  setMetaName('description', DEFAULT.description)
  setCanonical(DEFAULT.canonical)
  setMetaProperty('og:type', DEFAULT.ogType)
  setMetaProperty('og:title', DEFAULT.ogTitle)
  setMetaProperty('og:description', DEFAULT.ogDescription)
  setMetaProperty('og:url', DEFAULT.ogUrl)
  setMetaProperty('og:image', DEFAULT.ogImage)
  setMetaName('twitter:card', 'summary_large_image')
  setMetaName('twitter:title', DEFAULT.twitterTitle)
  setMetaName('twitter:description', DEFAULT.twitterDescription)
  setMetaName('twitter:image', DEFAULT.twitterImage)
}

export function applyJournalIndexMeta() {
  const url = `${SITE_ORIGIN}/journal`
  document.title = 'Journal | Sympathetic Technology'
  setMetaName('description', JOURNAL_INDEX_DESCRIPTION)
  setCanonical(url)
  setMetaProperty('og:type', 'website')
  setMetaProperty('og:title', `Journal · ${JOURNAL_INDEX_HEADLINE}`)
  setMetaProperty('og:description', JOURNAL_INDEX_DESCRIPTION)
  setMetaProperty('og:url', url)
  setMetaProperty('og:image', DEFAULT.ogImage)
  setMetaName('twitter:card', 'summary_large_image')
  setMetaName('twitter:title', `Journal · ${JOURNAL_INDEX_HEADLINE}`)
  setMetaName('twitter:description', JOURNAL_INDEX_DESCRIPTION)
  setMetaName('twitter:image', DEFAULT.ogImage)
}

export function applyJournalPostMeta(post) {
  const path = post.cover_image || ''
  const ogImage =
    path.startsWith('http://') || path.startsWith('https://')
      ? path
      : `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`
  const pageUrl = `${SITE_ORIGIN}${post.href}`
  const description = normalizeExcerpt(post.excerpt) || JOURNAL_INDEX_DESCRIPTION

  document.title = `${post.title} | Sympathetic Technology`
  setMetaName('description', description)
  setCanonical(pageUrl)
  setMetaProperty('og:type', 'article')
  setMetaProperty('og:title', post.title)
  setMetaProperty('og:description', description)
  setMetaProperty('og:url', pageUrl)
  setMetaProperty('og:image', ogImage)
  setMetaName('twitter:card', 'summary_large_image')
  setMetaName('twitter:title', post.title)
  setMetaName('twitter:description', description)
  setMetaName('twitter:image', ogImage)
}
