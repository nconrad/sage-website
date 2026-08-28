const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

// Exposes science/<year>/*.md docs as global data { years: [{year, items: [{id, title, path}]}] }
// so a plain React page (src/pages/science/index.tsx) can list every science
// project on one page, grouped by year, without depending on doc-only APIs.
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

      return yearDirs.map(year => {
        const dir = path.join(scienceDir, year)
        const items = fs.readdirSync(dir)
          .filter(file => file.endsWith('.md'))
          .map(file => {
            const name = file.replace(/\.md$/, '')
            const {data, content} = matter(fs.readFileSync(path.join(dir, file), 'utf8'))
            const heading = content.match(/^#\s+(.+)$/m)
            const title = data.sidebar_label || (heading && heading[1]) || name
            return {
              id: `${year}/${name}`,
              title,
              path: `/science/${year}/${name}`,
              position: data.sidebar_position ?? Infinity,
            }
          })
          .sort((a, b) => a.position - b.position)
          .map(({id, title, path: p}) => ({id, title, path: p}))

        const label = year === oldestYear ? `${year} and earlier` : year
        return {year, label, items}
      })
    },
    async contentLoaded({content, actions}) {
      const sidebarItems = content.map(({year, label, items}) => ({
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
      actions.setGlobalData({years: content, sidebarItems})
    },
  }
}
