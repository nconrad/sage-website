import { useState } from 'react'
import { Link } from 'react-router-dom'

import Arrow from '@mui/icons-material/PlayCircleOutlineRounded'
import LaunchRounded from '@mui/icons-material/LaunchRounded'
import LearnIcon from '@mui/icons-material/SchoolOutlined'
import ContributeIcon from '@mui/icons-material/Diversity1Outlined'
import RunIcon from '@mui/icons-material/PendingActionsOutlined'
import BrowseIcon from '@mui/icons-material/QueryStatsRounded'
import AnalyzeIcon from '@mui/icons-material/BarChartOutlined'
import NewsIcon from '@mui/icons-material/FeedOutlined'
import EventsIcon from '@mui/icons-material/CalendarMonthOutlined'
import DevIcon from '@mui/icons-material/CodeRounded'
import SciIcon from '@mui/icons-material/ScienceOutlined'

import { Button } from '@mui/material'

import CodeWindow from './CodeWindow'
import NewsPreview from './NewsPreview'
import TypeWriter from './TypeWriter'
import StatusChart from './StatusChart'

import publications from '../../publications'

import config from '../../config'
import Calendar from './Calendar'

const { portal } = config

const MaxNumOfPublications = 4

const clientSnippet =
`import sage_data_client

# fetch cloud motion data uploaded
# from two nodes in Chicago
df = sage_data_client.query(
  start="2023-02-24T10:00:00Z",
  end="2023-02-24T11:00:00Z",
  filter={
    "plugin": ".*cloud-motion.*",
    "vsn": "W02C|W079"
  }
)
`

const httpSnippet =
`# fetch recent bme680 sensor temperature uploaded
# from all nodes

curl -H 'Content-Type: application/json' \\
https://data.sagecontinuum.org/api/v1/query -d '
{
  "start": "-10s",
  "filter": {
    "sensor": "bme680",
    "name": "env.temperature"
  }
'
`

const appTemplateSnippet =
`pip3 install cookiecutter
cookiecutter gh:waggle-sensor/cookiecutter-sage-app

...
name []: app-tutorial
description [My really amazing app!]:
author [My name]: Your name
version [0.1.0]:
Select template:
1 - vision
2 - usbserial_sensor
3 - minimal
4 - tutorial
Choose from 1, 2, 3, 4 [1]: 4
`

const scienceTexts = [
  'Wildfire Detection',
  'Health & Safety',
  'Intelligent Agriculture',
  'Understanding Wildlife',
  'Science',
  'Discovery'
]

export const Section = (props) =>
  <section className={`md:mx-auto px-10 py-16 max-w-[1536px] ${props.className || ''}` }>
  {props.children}
  </section>


const getRecentPubs = () =>
  publications
    .filter(pub => pub.image && pub.id)
    .slice(0, MaxNumOfPublications)

// Tailwind Card replacement
type TWCardProps = {
  to?: string;
  href?: string;
  className?: string;
  children: React.ReactNode;
};
function TWCard({ to, href, className = '', children }: TWCardProps) {
  const base = `rounded-[15px] shadow-md bg-white flex flex-col flex-1 min-w-[220px] max-w-[340px] mb-4 hover:shadow-lg transition-shadow ${className}`;
  if (href) {
    return (
      <a href={href} className={base} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link to={to} className={base}>
        {children}
      </Link>
    );
  }
  return <div className={base}>{children}</div>;
}

type DevTools = 'client' | 'api' | 'ui' | 'template'

export default function Home() {
  const [devHover, setDevHover] = useState<DevTools>('client')
  const [sciHover, setSciHover] = useState<string>(getRecentPubs().find(pub => pub.defaultImage).id)

  return (
    <div className="font-sans">
      <div className="banner h-[400px] md:pt-6 bg-[radial-gradient(ellipse_farthest-side_at_0%_0%,#87baa6_20%,#382d64)]">
        <Section className="flex flex-col justify-between md:flex-row">
          <div className="flex flex-col justify-between self-start md:self-center md:mr-4">
            <div className="text-[#f9f9f9] text-4xl md:text-6xl">
              AI @ the Edge<br/>
              for <span className="text-emerald-200">
                <TypeWriter texts={scienceTexts} />
              </span>
            </div>
            <div className="hidden lg:block text-xl w-3/4 leading-relaxed mt-4 text-[#f9f9f9]">
              A new kind of national-scale cyberinfrastructure
              to enable artificial intelligence at the edge for science.
            </div>
          </div>
          <div className="flex flex-col gap-6 mt-12 md:m-0 md:mr-16 md:self-center">
            <Button
              href="docs/getting-started"
              className="flex items-center justify-center hover:text-[#fff] gap-1 text-nowrap"
              variant="contained"
              size="large"
              color="info"
              disableRipple
            >
              <span className="normal-case text-2xl ">Getting Started</span> <Arrow />
            </Button>
            <a href={portal} className="focused-link gap-1 text-nowrap flex self-center text-[#f2f2f2] text-2xl items-center">
              <span className="normal-case text-xl text-[#fff] hover:underline">Browse the Portal</span> <Arrow className="text-[#fff]" />
            </a>
          </div>
        </Section>
      </div>
      <div className="bg-white">
        <Section>
          <div className="flex flex-col md:flex-row gap-10 md:gap-4 xl:gap-10">
            <TWCard to="/science/category/recent-projects">
              <img src={require('@site/static/img/home/learn.jpg').default} className="rounded-t-[15px]" />
              <h3 className="flex items-center gap-2 mt-2 mb-4 mx-4">
                <LearnIcon />Learn
              </h3>
              <p className="px-4">Explore some of the <Link to="/science/category/recent-projects">science</Link> made possible with Sage</p>
            </TWCard>
            <TWCard href={`${portal}/apps`}>
              <img src={require('@site/static/img/home/create-app.png').default} className="rounded-t-[15px]" />
              <h3 className="flex items-center gap-2 mt-2 mb-4 mx-4">
                <ContributeIcon />Contribute
              </h3>
              <p className="px-4">Upload, build, and share <a href={`${portal}/apps`}>apps</a> for AI at the edge</p>
            </TWCard>
            <TWCard href={`${portal}/jobs`}>
              <img src={require('@site/static/img/home/circuit-board.jpg').default} className="rounded-t-[15px]" />
              <h3 className="flex items-center gap-2 mt-2 mb-4 mx-4">
                <RunIcon />Run jobs
              </h3>
              <p className="px-4">Create <a href={`${portal}/create-job?tab=editor&start_with_sample=true`}>science goals</a> to run apps on nodes<br/></p>
            </TWCard>
            <TWCard href={`${portal}/data`}>
              <img src={require('@site/static/img/home/browse.png').default} className="rounded-t-[15px]" />
              <h3 className="flex items-center gap-2 mt-2 mb-4 mx-4">
                <BrowseIcon />Browse
              </h3>
              <p className="px-4">Browse <a href={`${portal}/data`}>data</a> from sensors and edge apps</p>
            </TWCard>
            <TWCard to="docs/tutorials/accessing-data">
              <img src={require('@site/static/img/home/wildfire.jpg').default} className="rounded-t-[15px]" />
              <h3 className="flex items-center gap-2 mt-2 mb-4 mx-4">
                <AnalyzeIcon/>Analyze
              </h3>
              <p className="px-4">Use Sage APIs to fetch, analyze, or integrate data</p>
            </TWCard>
          </div>
          <h2 className="text-[rgb(78,42,132)] font-bold mt-16 self-center">AI/ML Status</h2>
          {config.downtime ?
            'The node status view is currently unavailable due to scheduled maintenance.' :
            <StatusChart />
          }
        </Section>
      </div>
      <div className="bg-[#e7ebf0]">
        <Section className="flex flex-col md:flex-row gap-2">
          <div className="bg-white shadow-sm rounded-xl md:w-2/3 h-[620px] overflow-y-scroll">
            <Link to="/news" className="hover:decoration-black">
              <h2 className="flex items-center gap-2 p-4 pb-3 m-0">
                <NewsIcon />News
              </h2>
            </Link>
            <hr className="m-0"/>
            <div className="px-4 py-2">
              <NewsPreview />
            </div>
          </div>
          <div className="bg-white shadow-sm rounded-xl md:w-1/3 h-[620px]">
            <h2 className="flex items-center gap-2 p-4 pb-3 m-0">
              <EventsIcon />Events & Training
            </h2>
            <hr className="m-0"/>
            <div className="px-4 py-8">
              <Calendar />
            </div>
          </div>
        </Section>
      </div>
      <div className="bg-emerald-50 border-solid border-t-2 border-b-4 border-slate-200">
        <Section className="gap-2">
          <h2 className="flex items-center gap-2 text-[rgb(78,42,132)] font-bold mb-10">
            <DevIcon />Developer Tools for Research and Analysis
          </h2>
          <div className="flex flex-col md:flex-row text-slate-200 gap-10"></div>
          <div className="sci-items flex flex-col gap-4 md:w-7/12">
            <a
              className="sci-item group bg-[#63509c] hover:bg-[#70619f] p-2.5 rounded-[10px] transition-colors"
              onMouseOver={() => setDevHover('client')}
              href="https://pypi.org/project/sage-data-client"
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold">Python Data Client</h3>
                <div className="invisible group-hover:visible"><LaunchRounded /></div>
              </div>
              <span className="text-slate-200">Easily analyze data in Pandas with the Sage Data Client</span>
            </a>
            <a
              className="sci-item group bg-[#63509c] hover:bg-[#70619f] p-2.5 rounded-[10px] transition-colors"
              onMouseOver={() => setDevHover('api')}
              href="/docs/tutorials/accessing-data#http-api"
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold">HTTP APIs</h3>
                <div className="invisible group-hover:visible"><LaunchRounded /></div>
              </div>
              <span className="text-slate-200">Access and update data via web APIs</span>
            </a>
            <a
              className="sci-item group bg-[#63509c] hover:bg-[#70619f] p-2.5 rounded-[10px] transition-colors"
              onMouseOver={() => setDevHover('template')}
              href="/docs/tutorials/edge-apps/creating-an-edge-app#bootstraping-our-app-from-a-template"
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold">Developer Templates</h3>
                <div className="invisible group-hover:visible"><LaunchRounded /></div>
              </div>
              <span className="text-slate-200">Get started building apps quickly with templates and snippets</span>
            </a>
            <a
              className="sci-item group bg-[#63509c] hover:bg-[#70619f] p-2.5 rounded-[10px] transition-colors"
              onMouseOver={() => setDevHover('ui')}
              href={`${portal}/query-browser`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold">Web GUIs</h3>
                <div className="invisible group-hover:visible"><LaunchRounded /></div>
              </div>
              <span className="text-slate-200">Quickly navigate job/sampler data with a few clicks</span>
            </a>
            <div className="hidden md:flex justify-between mx-5 text-slate-200">
              <Link className="focused-link gap-1 text-[1.5em] text-[rgb(78,42,132)] flex items-center" to="docs/tutorials/edge-apps/intro-to-edge-apps" >Tutorials <Arrow /></Link>
              <Link className="focused-link gap-1 text-[1.5em] text-[rgb(78,42,132)] flex items-center" to="docs/reference-guides/pluginctl" >Reference Guides <Arrow /></Link>
              <a className="focused-link gap-1 text-[1.5em] text-[rgb(78,42,132)] flex items-center" href={`${portal}/query-browser`}>Query Browser <Arrow /></a>
            </div>
          </div>
          <div className="md:w-5/12">
            {devHover == 'client' &&
              <CodeWindow title="Python Data Client" code={clientSnippet} />
            }
            {devHover == 'api' &&
              <CodeWindow title="Web API" code={httpSnippet} language="bash"/>
            }
            {devHover == 'template' &&
              <CodeWindow title="Templates" code={appTemplateSnippet} language="bash" />
            }
            <div className={`${devHover == 'ui' ? 'flex' : 'hidden'} max-h-96`}>
              <CodeWindow
                title="portal.sagecontinuum.org"
                src={require('@site/static/img/home/query-browser.png').default}
                showUrlBar={true}
              />
            </div>
          </div>
        </Section>
      </div>
      <div className="bg-[rgb(78,42,132)]">
        <Section className="items-center gap-2">
          <h2 className="flex items-center gap-2 text-slate-200 font-bold mb-10">
            <SciIcon />Featured Science
          </h2>
          <div className="flex flex-col md:flex-row text-slate-200">
            <div className="md:w-1/3 hidden md:flex mr-5 justify-center" >
              {getRecentPubs()
                .map(pub => {
                  return (
                    <img
                      key={pub.id}
                      src={pub.image}
                      className={`${pub.id == sciHover ? 'flex' : 'hidden'} max-h-96 object-contain`}
                    />
                  )
                })
              }
            </div>
            <div className="flex flex-col gap-y-4 md:w-2/3 sci-items">
              {getRecentPubs()
                .map(pub => {
                  const {title, href, id} = pub
                  return (
                    <a className="sci-item group bg-[#63509c] hover:bg-[#70619f] p-2.5 rounded-[10px] transition-colors" onMouseOver={() => setSciHover(id)} href={href} target="_blank" key={id} rel="noreferrer">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold">{title}</h3>
                        {href && <div className="invisible group-hover:visible"><LaunchRounded /></div>}
                      </div>
                    </a>
                  )
                })}
              <div className="hidden md:flex justify-between mx-5">
                <Link to="/publications" className="focused-link gap-1 text-[1.5em] text-[#f2f2f2] flex items-center">Publications <Arrow /></Link>
                <Link to="/science/category/recent-projects" className="focused-link gap-1 text-[1.5em] text-[#f2f2f2] flex items-center">Science<Arrow /></Link>
                <a href={`${portal}/apps`} className="focused-link gap-1 text-[1.5em] text-[#f2f2f2] flex items-center">Apps <Arrow /></a>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}
