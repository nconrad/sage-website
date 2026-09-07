import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import Layout from '@theme/Layout'
import useGlobalData from '@docusaurus/useGlobalData'
import { DocsSidebarProvider } from '@docusaurus/plugin-content-docs/client'
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'

import LinkCard from '../../components/ImageLinkCard'
import icons from '../../../science/icons'
import { labProjects } from '../../../labs/labsData'
import fireImg from '../use-cases/images/fire/ohaz-right.jpg'
import droughtImg from '../use-cases/images/drought/drought-2.jpg'


// One shape for science reports, labs pages, and use-case pages, so the index
// can show all three side by side in a single list.
type IndexItem = {
  id: string
  kind: 'report' | 'lab' | 'use-case'
  year: string
  title: string
  path: string
  tags: string[]
  text: string
  description?: string
}

type SidebarItem = {
  type: 'link' | 'category'
  label: string
  href?: string
  docId?: string
  items?: SidebarItem[]
  collapsible?: boolean
  collapsed?: boolean
}

// Controlled vocabulary, grouped so the three kinds of reader we expect
// (domain scientists, AI/ML folks, systems engineers) can each scan one row.
// Tags not listed here fall into "Other" so nothing silently disappears.
const TAG_GROUPS: {label: string, tags: string[]}[] = [
  {
    label: 'AI methods & data',
    tags: [
      'Computer Vision',
      'Object Detection & Tracking',
      'Foundation Models & LLMs',
      'Multimodal Learning',
      'Self-Supervised Learning',
      'Acoustics & Audio',
    ],
  },   {
    label: 'Science domain',
    tags: [
      'Atmospheric Science',
      'Ecology & Biodiversity',
      'Water & Hydrology',
      'Wildfire',
      'Urban & Transportation',
    ],
  }, {
    label: 'Edge systems',
    tags: [
      'Edge AI',
      'Sensors & Instrumentation',
      'Networking',
      'Data Management',
      'Scheduling & Orchestration',
      'Energy & Resource Management',
      'Privacy',
    ],
  }, {
    // What a page *is*, rather than what it is about. "Sage Lab" and
    // "Use Case" are derived from the collection by the index plugin, so they
    // always agree with the badge on the card.
    label: 'Type',
    tags: ['Sage Lab', 'Use Case', 'Sage Summer Camp'],
  },
]

// Labs thumbnails, so labs results render as the same image cards the science
// reports use. labsData ids match the labs/*.md filenames, which is what the
// plugin derives its ids from.
const labImages: Record<string, string> = Object.fromEntries(
  labProjects.filter(p => p.image).map(p => [p.id, p.image])
)
const labImageAlts: Record<string, string> = Object.fromEntries(
  labProjects.filter(p => p.imageAlt).map(p => [p.id, p.imageAlt])
)

// Use-case pages have no icon set of their own; these are picked from the
// imagery already on each page (the smaller files, since some are 18MB).
const useCaseImages: Record<string, {src: string, alt: string}> = {
  'fire': {src: fireImg, alt: 'thermal camera watching for wildfire'},
  'ai-drought-mitigation': {src: droughtImg, alt: 'dry landscape during drought'},
}

// Must match the plugin's KIND_TAGS, so a card's badge reads the same as the
// "Type" tag that selects it.
const KIND_LABELS: Record<string, string> = {
  lab: 'Sage Lab',
  'use-case': 'Use Case',
}

// The plugin indexes bodies as alphanumeric tokens, so the query has to be
// split the same way or a hyphenated search ("pan-tilt") could never match.
function toTerms(query: string) {
  return query.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)
}

// A doc matches when every term appears somewhere in its title, tags, or
// indexed body — so "bat acoustic" narrows rather than widens.
function matchesQuery(terms: string[], haystack: string) {
  return terms.every(term => haystack.includes(term))
}

// Marks a card as something other than a student report (a lab or a use case).
function KindChip({label}: {label: string}) {
  return (
    <Chip
      size="small"
      label={label}
      sx={{
        height: 20,
        fontSize: '0.7rem',
        fontWeight: 700,
        color: 'common.white',
        bgcolor: 'rgba(0,0,0,0.6)',
        '& .MuiChip-label': {px: '6px'},
      }}
    />
  )
}

function TextCard({
  title, link, year, kindLabel,
}: {title: string, link: string, year?: string, kindLabel?: string}) {
  return (
    <Link to={link} className="card padding--lg" style={{display: 'block', width: 256}}>
      {(year || kindLabel) &&
        <div className="mb-1 flex items-center justify-between gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <span>{year}</span>
          {kindLabel && <span className="uppercase tracking-wide">{kindLabel}</span>}
        </div>
      }
      <h3 className="text--truncate" title={title}>📄️ {title}</h3>
    </Link>
  )
}

// `showYear` puts the year on the card itself, for the search and filter views
// where results from different years are mixed together. When browsing, the
// year headings carry it instead.
function ItemCard({item, showYear}: {item: IndexItem, showYear?: boolean}) {
  const name = item.id.slice(item.id.lastIndexOf('/') + 1)
  const useCase = useCaseImages[name]
  const image = item.kind === 'lab' ? labImages[name] :
    item.kind === 'use-case' ? useCase?.src :
      icons[name]
  const alt = item.kind === 'lab' ? labImageAlts[name] : useCase?.alt
  const kindLabel = KIND_LABELS[item.kind]
  const year = showYear ? item.year : ''
  return (
    <article className="flex flex-col md:flex-row flex-wrap mr-4 my-4">
      {image ?
        <LinkCard
          title={item.title}
          link={item.path}
          src={image}
          alt={alt}
          eyebrow={year || undefined}
          badge={kindLabel ? <KindChip label={kindLabel} /> : undefined}
        /> :
        <TextCard
          title={item.title}
          link={item.path}
          year={year}
          kindLabel={kindLabel}
        />
      }
    </article>
  )
}

// The count rides in the Chip's trailing `deleteIcon` slot rather than in an
// outer Badge, so it sits inside the pill. `onDelete` is required for MUI to
// render that slot at all; it just toggles the tag like the chip body does.
function TagCount({count, active}: {count: number, active: boolean}) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 18,
        height: 18,
        px: '5px',
        mr: '4px !important',
        ml: '-2px !important',
        borderRadius: '9px',
        fontSize: '0.65rem',
        fontWeight: 700,
        lineHeight: 1,
        color: active ? 'primary.main' : 'text.secondary',
        bgcolor: active ? 'common.white' : 'action.selected',
      }}
    >
      {count}
    </Box>
  )
}

function TagChip({
  label, count, active, onClick,
}: {label: string, count: number, active: boolean, onClick: () => void}) {
  return (
    <Chip
      size="small"
      label={label}
      onClick={onClick}
      onDelete={onClick}
      deleteIcon={<TagCount count={count} active={active} />}
      color={active ? 'primary' : 'default'}
      variant={active ? 'filled' : 'outlined'}
      aria-label={`${label}, ${count} page${count === 1 ? '' : 's'}`}
      sx={{
        boxShadow: 'none',
        fontWeight: 500,
        '&:hover': {boxShadow: 'none'},
        '&:focus, &.Mui-focusVisible': {boxShadow: 'none'},
        '&:active': {boxShadow: 'none'},
      }}
    />
  )
}

export default function ScienceIndex() {
  const globalData = useGlobalData()
  const {items, sidebarItems} = globalData['science-index-plugin']['default'] as
    {items: IndexItem[], sidebarItems: SidebarItem[]}

  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [query, setQuery] = useState('')

  const terms = useMemo(() => toTerms(query), [query])
  const searching = terms.length > 0

  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>()
    items.forEach(({tags}) => {
      (tags || []).forEach(tag => counts.set(tag, (counts.get(tag) || 0) + 1))
    })
    return counts
  }, [items])

  // Group the tags that are actually in use, keeping anything unrecognized.
  const groupedTags = useMemo(() => {
    const known = new Set(TAG_GROUPS.flatMap(g => g.tags))
    const other = [...tagCounts.keys()].filter(tag => !known.has(tag)).sort()
    return [...TAG_GROUPS, {label: 'Other', tags: other}]
      .map(({label, tags}) => ({
        label,
        tags: tags.filter(tag => tagCounts.has(tag)),
      }))
      .filter(group => group.tags.length > 0)
  }, [tagCounts])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  // Reports, labs, and use cases share one result list and one set of tags.
  const results = useMemo(() => {
    if (!selectedTags.length && !searching) return items
    return items.filter(item => {
      if (!selectedTags.every(tag => (item.tags || []).includes(tag))) return false
      if (!searching) return true
      const haystack = [
        toTerms(`${item.title} ${(item.tags || []).join(' ')} ${item.description || ''}`).join(' '),
        item.text || '',
      ].join(' ')
      return matchesQuery(terms, haystack)
    })
  }, [items, selectedTags, terms, searching])

  const counts = useMemo(() => {
    const n = (kind: string) => results.filter(r => r.kind === kind).length
    return [
      {label: 'report', count: n('report')},
      {label: 'lab', count: n('lab')},
      {label: 'use case', count: n('use-case')},
    ].filter(c => c.count > 0)
  }, [results])
  const hasTags = tagCounts.size > 0
  const filtersActive = searching || selectedTags.length > 0

  // Browsing shows the cards grouped under year headings; searching and
  // filtering mix the years, so there the year moves onto the card itself.
  const groupedResults = useMemo(() => {
    if (filtersActive) return []
    const byYear = new Map<string, IndexItem[]>()
    results.forEach(item => {
      const key = item.year || ''
      if (!byYear.has(key)) byYear.set(key, [])
      byYear.get(key).push(item)
    })
    const oldest = [...byYear.keys()].filter(Boolean).sort()[0]
    return [...byYear.entries()]
      // Undated pages (use cases) collect at the end under their own heading.
      .sort((a, b) => (b[0] || '').localeCompare(a[0] || ''))
      .map(([year, group]) => ({
        year,
        label: !year ? 'Use cases' : year === oldest ? `${year} and earlier` : year,
        items: group,
      }))
  }, [results, filtersActive])

  const clearAll = () => {
    setSelectedTags([])
    setQuery('')
  }

  return (
    <Layout
      title="AI & Science"
      description="Project reports, labs, and use cases from the Sage and Sage Grande Testbed community"
    >
      <DocsSidebarProvider name="scienceSidebar" items={sidebarItems}>
        <div className="flex w-full">
          <DocRootLayoutSidebar
            sidebar={sidebarItems}
            hiddenSidebarContainer={false}
            setHiddenSidebarContainer={() => {}}
          />
          <main className="max-w-screen-lg mx-auto px-4 py-8 w-full">
            <header className="mb-10">
              <h1 className="mb-4">AI & Science</h1>
              <p>
                 Below are project reports from students at every level, from early
                 undergraduates through graduate students and postdocs, as well as from
                 research scientists and occasional collaborators who are building and
                 using the <Link to="/about">Sage Grande Testbed</Link>. Each node in Sage Grande
                 collects data from cameras, microphones, LiDAR, and environmental
                 sensors, then runs models directly at the edge. This allows the science
                 to happen where and when the data are created, rather than after the fact.
              </p>
              <p>
                The work spans a range of scientific disciplines, the AI methods that support
                them, and the edge infrastructure that makes them possible.  This page also includes projects
                from <Link to="/labs">Sage Labs</Link>, as well as use cases that
                demonstrate how Sage supports research across a range of scientific domains.
              </p>
            </header>

            <section className="mb-10 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <TextField
                  size="small"
                  value={query}
                  onChange={evt => setQuery(evt.target.value)}
                  placeholder="Search reports, labs, and use cases…"
                  aria-label="Search reports, labs, and use cases"
                  InputProps={{
                    startAdornment:
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>,
                    endAdornment: query ?
                      <InputAdornment position="end">
                        <ClearIcon
                          fontSize="small"
                          role="button"
                          aria-label="Clear search"
                          className="cursor-pointer opacity-60 hover:opacity-100"
                          onClick={() => setQuery('')}
                        />
                      </InputAdornment> : null,
                  }}
                  sx={{flexGrow: 1, minWidth: 240, maxWidth: 420}}
                />
                {filtersActive &&
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {counts.length === 0 ? 'No matches' :
                        counts
                          .map(({label, count}) => `${count} ${label}${count === 1 ? '' : 's'}`)
                          .join(' · ')
                      }
                    </span>
                    <Button
                      size="small"
                      color="primary"
                      variant="text"
                      disableElevation
                      onClick={clearAll}
                      startIcon={<ClearIcon fontSize="small" />}
                      sx={{textTransform: 'none', fontWeight: 500, whiteSpace: 'nowrap'}}
                    >
                      Clear
                    </Button>
                  </div>
                }
              </div>

              {hasTags &&
                <div className="flex flex-col gap-4 pt-1">
                  {groupedTags.map(({label, tags}) => (
                    <div key={label} className="flex flex-col sm:flex-row sm:items-baseline gap-x-4 gap-y-2">
                      <div className="sm:w-36 shrink-0 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        {label}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                          <TagChip
                            key={tag}
                            label={tag}
                            count={tagCounts.get(tag)}
                            active={selectedTags.includes(tag)}
                            onClick={() => toggleTag(tag)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              }
            </section>

            {results.length === 0 &&
              <p className="text-gray-500">
                Nothing matches {searching ? <>“{query.trim()}”</> : 'the selected tags'}
                {searching && selectedTags.length > 0 && ' with the selected tags'}.
              </p>
            }

            {filtersActive ?
              <div className="flex flex-wrap">
                {results.map(item => <ItemCard key={item.id} item={item} showYear />)}
              </div> :
              groupedResults.map(({year, label, items: group}) => (
                <section key={year || 'undated'} className="mb-12">
                  <h2 className="mb-4">{label}</h2>
                  <div className="flex flex-wrap">
                    {group.map(item => <ItemCard key={item.id} item={item} />)}
                  </div>
                </section>
              ))
            }
          </main>
        </div>
      </DocsSidebarProvider>
    </Layout>
  )
}
