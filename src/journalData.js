/** New or renamed `content/journal/*.md` files may not show until you restart `npm run dev` (Vite glob + HMR). */
const markdownFiles = import.meta.glob('../content/journal/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    return { data: {}, body: raw.trim() }
  }

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

function slugFromPath(path) {
  return path.split('/').pop().replace(/\.md$/, '')
}

export function formatJournalDate(date) {
  return new Intl.DateTimeFormat('en-CA', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}

export function formatJournalShortDate(date) {
  return new Intl.DateTimeFormat('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}

/** Old slug -> canonical slug (filename stem); SPA redirects preserve bookmarks */
export const JOURNAL_SLUG_REDIRECTS = {
  '2026-05-10-what-controlled-intelligence-actually-is':
    '2026-05-10-introducing-controlled-intelligence',
}

export const journalPosts = Object.entries(markdownFiles)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw)
    return {
      ...data,
      body,
      slug: slugFromPath(path),
      href: `/journal/${slugFromPath(path)}`,
    }
  })
  .filter((post) => {
    const visible =
      post.status === 'published' ||
      (import.meta.env.DEV && post.status === 'draft')
    return visible && post.cover_image
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .map((post, index) => ({
    ...post,
    position: index + 1,
    colourSlot: (index + 1) % 4,
  }))

export function getJournalPost(slug) {
  return journalPosts.find((post) => post.slug === slug)
}
