/**
 * After `vite build`, writes `dist/journal/<slug>/index.html` for each published
 * journal post so link previews (Slack, iMessage, social crawlers) see OG/Twitter
 * tags pointing at the hero/cover image — crawlers do not run the SPA.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_ORIGIN } from '../src/documentMeta.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const contentDir = path.join(root, 'content', 'journal')
const distIndex = path.join(root, 'dist', 'index.html')

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) return { data: {}, body: raw }

  const lines = match[1].split('\n')
  const data = {}
  let currentKey = null

  const cleanValue = (value) => value.trim().replace(/^"(.*)"$/, '$1')

  for (const line of lines) {
    if (!line.trim()) continue

    if (/^\s+-\s+/.test(line) && currentKey) {
      data[currentKey] = [
        ...(Array.isArray(data[currentKey]) ? data[currentKey] : []),
        cleanValue(line.replace(/^\s+-\s+/, '')),
      ]
      continue
    }

    if (/^\s+/.test(line) && currentKey && typeof data[currentKey] === 'string') {
      data[currentKey] = `${data[currentKey]} ${cleanValue(line)}`
      continue
    }

    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) continue

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()

    currentKey = key
    data[key] = value ? cleanValue(value) : []
  }

  return { data, body: match[2].trim() }
}

function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function normalizeExcerpt(text) {
  if (typeof text !== 'string') return ''
  return text.replace(/\s+/g, ' ').trim()
}

function absoluteImageUrl(coverPath) {
  if (!coverPath) return `${SITE_ORIGIN}/og-image.png`
  if (coverPath.startsWith('http://') || coverPath.startsWith('https://')) return coverPath
  const p = coverPath.startsWith('/') ? coverPath : `/${coverPath}`
  return `${SITE_ORIGIN}${p}`
}

function injectJournalMeta(html, { title, description, pageUrl, ogImage, date, author }) {
  const safeTitle = escapeHtml(`${title} | Sympathetic Technology`)
  const safePostTitle = escapeHtml(title)
  const safeDesc = escapeHtml(description)
  const safeUrl = escapeHtml(pageUrl)
  const safeImage = escapeHtml(ogImage)

  let out = html

  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`)

  out = out.replace(
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${safeDesc}" />`,
  )

  out = out.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${safeUrl}" />`,
  )

  out = out.replace(/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="article" />`)
  out = out.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${safePostTitle}" />`)
  out = out.replace(
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${safeDesc}" />`,
  )
  out = out.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${safeUrl}" />`)
  out = out.replace(
    /<meta\s+property="og:image"[\s\S]*?\/>/,
    `<meta property="og:image" content="${safeImage}" />`,
  )

  out = out.replace(/<meta name="twitter:card"[^>]*>/, `<meta name="twitter:card" content="summary_large_image" />`)
  out = out.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${safePostTitle}" />`)
  out = out.replace(
    /<meta\s+name="twitter:description"[\s\S]*?\/>/,
    `<meta name="twitter:description" content="${safeDesc}" />`,
  )
  out = out.replace(
    /<meta\s+name="twitter:image"[\s\S]*?\/>/,
    `<meta name="twitter:image" content="${safeImage}" />`,
  )

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    image: ogImage,
    url: pageUrl,
    datePublished: date || undefined,
    author: {
      '@type': 'Person',
      name: author || 'Sean Cranbury',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sympathetic Technology',
      url: SITE_ORIGIN,
    },
  }

  const jsonLd = JSON.stringify(structuredData, null, 2)
  out = out.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n${jsonLd}\n    </script>`,
  )

  return out
}

function main() {
  if (!fs.existsSync(distIndex)) {
    console.error('prerender-journal-posts: dist/index.html missing — run vite build first.')
    process.exit(1)
  }

  const template = fs.readFileSync(distIndex, 'utf8')
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'))

  let count = 0
  for (const file of files) {
    const slug = file.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(contentDir, file), 'utf8')
    const { data } = parseFrontmatter(raw)

    if (data.status !== 'published' || !data.cover_image) continue

    const title = data.title || slug
    const description =
      normalizeExcerpt(data.excerpt) ||
      'Periodic observations at the intersection of AI and work.'
    const pageUrl = `${SITE_ORIGIN}/journal/${slug}`
    const ogImage = absoluteImageUrl(data.cover_image)

    const html = injectJournalMeta(template, {
      title,
      description,
      pageUrl,
      ogImage,
      date: data.date,
      author: data.author,
    })

    const outDir = path.join(root, 'dist', 'journal', slug)
    fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8')
    count += 1
    console.log(`prerender-journal-posts: wrote dist/journal/${slug}/index.html`)
  }

  console.log(`prerender-journal-posts: ${count} journal HTML file(s).`)
}

main()
