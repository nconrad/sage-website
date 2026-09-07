const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const STOPWORDS = new Set(`
  the and for that with this from was were are can not but they you our its
  have has had been will would could should when what which while than then
  there their them these those into over under also more most such only very
  each other some any all one two how why does did done use used using
  about above after again because before being between both during few further
  here itself just now once same too under until where who whom your yours
`.trim().split(/\s+/))

// Reduce a markdown body to the set of distinct, meaningful words it contains.
// The page ships this to the browser to power its search box, so we store a
// deduplicated token list rather than the prose: it is a fraction of the size
// and matches better, since a multi-word query is scored token by token.
// Code fences, URLs, and image refs are dropped — they bulk up the payload and
// match badly (otherwise every page hits on "https", "png", and so on).
function toSearchTokens(content) {
  const words = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(w => w.length >= 2 && w.length <= 24 && !STOPWORDS.has(w) && !/^\d+$/.test(w))
  return [...new Set(words)].sort().join(' ')
}

// First real prose paragraph, used as the blurb on a labs search result.
function firstParagraph(content) {
  const body = content
    .replace(/^import .*$/gm, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^#.*$/gm, '')
    .replace(/^<[^>]+\/>\s*$/gm, '')
  for (const block of body.split(/\n\s*\n/)) {
    if (block.replace(/\s+/g, ' ').trim().length > 60) {
      // keep original casing/punctuation, just flattened
      const raw = block
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/<[^>]+>/g, '')
        .replace(/[*_`]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
      return raw.length > 240 ? `${raw.slice(0, 237)}…` : raw
    }
  }
  return ''
}

// The "Type" facet is derived from which collection a page came from rather
// than written into frontmatter, so a card's badge and its tag can never
// disagree. Reports get no type tag: they are the default, and tagging all 40
// of them would just add a chip that filters nothing out.
const KIND_TAGS = {
  lab: 'Sage Lab',
  'use-case': 'Use Case',
}

function readDoc(file, dir) {
  const name = file.replace(/\.mdx?$/, '')
  const {data, content} = matter(fs.readFileSync(path.join(dir, file), 'utf8'))
  const heading = content.match(/^#\s+(.+)$/m)
  const title = data.sidebar_label || (heading && heading[1]) || name
  return {name, data, content, title}
}

// Exposes science/<year>/*.md reports as global data so a plain React page
// (src/pages/science/index.tsx) can list every project on one page without
// depending on doc-only APIs. Labs and use-case pages are indexed the same way,
// so all three show up in that page's tag filters and search.
//   { years, labs, useCases, items, sidebarItems }
// `years` keeps the year grouping the sidebar needs; `items` is the flat,
// newest-first list of all three kinds that the index page renders.
module.exports = function scienceIndexPlugin() {
  return {
    name: 'science-index-plugin',
    async loadContent() {
      const scienceDir = __dirname
      const yearDirs = fs.readdirSync(scienceDir, {withFileTypes: true})
        .filter(entry => entry.isDirectory() && /^\d{4}$/.test(entry.name))
        .map(entry => entry.name)
        .sort((a, b) => b.localeCompare(a))

      const oldestYear = yearDirs[yearDirs.length - 1]

      const years = yearDirs.map(year => {
        const dir = path.join(scienceDir, year)
        const items = fs.readdirSync(dir)
          .filter(file => file.endsWith('.md'))
          .map(file => {
            const {name, data, content, title} = readDoc(file, dir)
            const tags = Array.isArray(data.tags) ? data.tags : []
            return {
              id: `${year}/${name}`,
              kind: 'report',
              year,
              title,
              path: `/science/${year}/${name}`,
              position: data.sidebar_position ?? Infinity,
              tags,
              text: toSearchTokens(content),
            }
          })
          .sort((a, b) => a.position - b.position)
          .map(({position, ...rest}) => rest)

        const label = year === oldestYear ? `${year} and earlier` : year
        return {year, label, items}
      })

      // Other page collections that belong in the index alongside the reports.
      const collect = (dir, {kind, routeBase}) => {
        const abs = path.join(scienceDir, '..', dir)
        if (!fs.existsSync(abs)) return []
        return fs.readdirSync(abs)
          .filter(file => /\.mdx?$/.test(file) && !file.startsWith('_') && file !== 'index.mdx')
          .map(file => {
            const {name, data, content, title} = readDoc(file, abs)
            return {
              id: `${kind}/${name}`,
              kind,
              year: data.year ? String(data.year) : '',
              title,
              path: `${routeBase}/${name}`,
              position: data.sidebar_position ?? Infinity,
              tags: [
                ...(KIND_TAGS[kind] ? [KIND_TAGS[kind]] : []),
                ...(Array.isArray(data.tags) ? data.tags : []),
              ],
              description: firstParagraph(content),
              text: toSearchTokens(content),
            }
          })
          .sort((a, b) => a.position - b.position || a.title.localeCompare(b.title))
          .map(({position, ...rest}) => rest)
      }

      const labs = collect('labs', {kind: 'lab', routeBase: '/labs'})
      const useCases = collect('src/pages/use-cases',
        {kind: 'use-case', routeBase: '/use-cases'})

      // One flat list for the index page; the sidebar still needs the year
      // grouping, so `years` is kept alongside it. Undated pages (use cases are
      // ongoing programs, not dated projects) sort after the dated ones.
      const items = [...years.flatMap(y => y.items), ...labs, ...useCases]
        .sort((a, b) => (b.year || '').localeCompare(a.year || '') ||
          a.title.localeCompare(b.title))

      return {years, labs, useCases, items}
    },
    async contentLoaded({content, actions}) {
      const {years, labs, useCases, items} = content
      const sidebarItems = years.map(({year, label, items}) => ({
        type: 'category',
        label,
        collapsible: true,
        collapsed: year !== '2026',
        items: items.map(({id, title, path}) => ({
          type: 'link',
          label: title,
          href: path,
          docId: id,
        })),
      }))
      actions.setGlobalData({years, labs, useCases, items, sidebarItems})
    },
  }
}
