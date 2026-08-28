import { Link } from 'react-router-dom'

import Layout from '@theme/Layout'
import useGlobalData from '@docusaurus/useGlobalData'
import { DocsSidebarProvider } from '@docusaurus/plugin-content-docs/client'
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar'

import LinkCard from '../../components/ImageLinkCard'
import icons from '../../../science/icons'


type ScienceDoc = {
  id: string
  title: string
  path: string
}

type ScienceYear = {
  year: string
  label: string
  items: ScienceDoc[]
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

function TextCard({title, link}: {title: string, link: string}) {
  return (
    <Link to={link} className="card padding--lg" style={{display: 'block', width: 256}}>
      <h3 className="text--truncate" title={title}>📄️ {title}</h3>
    </Link>
  )
}

export default function ScienceIndex() {
  const globalData = useGlobalData()
  const {years, sidebarItems} = globalData['science-index-plugin']['default'] as
    {years: ScienceYear[], sidebarItems: SidebarItem[]}

  return (
    <Layout
      title="Science"
      description="Science made possible with Sage, organized by year"
    >
      <DocsSidebarProvider name="scienceSidebar" items={sidebarItems}>
        <div className="flex w-full">
          <DocRootLayoutSidebar
            sidebar={sidebarItems}
            hiddenSidebarContainer={false}
            setHiddenSidebarContainer={() => {}}
          />
          <main className="max-w-screen-lg mx-auto px-4 py-8 w-full">
            {years.map(({year, label, items}) => (
              <section key={year} className="mb-12">
                <h2 className="mb-4">{label}</h2>
                <div className="flex flex-wrap">
                  {items.map(doc => {
                    const name = doc.id.slice(doc.id.lastIndexOf('/') + 1)
                    const assetPath = icons[name]
                    return (
                      <article key={doc.id} className="flex flex-col md:flex-row flex-wrap mr-4 my-4">
                        {assetPath ?
                          <LinkCard
                            title={doc.title}
                            link={doc.path}
                            src={assetPath}
                          /> :
                          <TextCard title={doc.title} link={doc.path} />
                        }
                      </article>
                    )
                  })}
                </div>
              </section>
            ))}
          </main>
        </div>
      </DocsSidebarProvider>
    </Layout>
  )
}
