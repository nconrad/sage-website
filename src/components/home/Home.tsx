import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
  'Climate Research',
  'Wildfire Detection',
  'Health & Safety',
  'Science',
  'Discovery'
]


export const Section = (props) =>
  <section className={`md:mx-auto px-10 py-16 max-w-screen-2xl ${props.className || ''}` }>
    {props.children}
  </section>



type DevTools = 'client' | 'api' | 'ui' | 'template'
type FeaturedSci = 'cloudMotion' | 'armDoppler' | 'selfSupervised' | 'solarRadiance'

export default function Home() {
  const [devHover, setDevHover] = useState<DevTools>('client')
  const [sciHover, setSciHover] = useState<FeaturedSci>('cloudMotion')


  const getRecentPubs = () =>
    publications
      .filter(pub => pub.image && pub.id)
      .slice(0, MaxNumOfPublications)

  return (
    <Root>
      <div className="banner h-[400px] md:pt-6">
        <Section className="flex flex-col justify-between md:flex-row">
          <div className="flex flex-col justify-between self-start md:self-center md:mr-20">
            <div className="text-[#f9f9f9] text-4xl md:text-6xl">
              AI @ the Edge<br/>
              for <span className="text-emerald-200">
                <TypeWriter texts={scienceTexts} />
              </span>
            </div>

            <div className="hidden lg:block text-xl w-3/4 leading-relaxed mt-4 text-[#f9f9f9]">
              A new kind of national-scale cyberinfrastructure
              to enable AI at the Edge for science.
            </div>
          </div>


          <div className="flex flex-col mt-12 md:m-0 md:mr-40 md:self-center">
            <h3 className="text-slate-300">Getting Started</h3>
            <a href="docs/about/overview" className="focused-link gap-1">Documentation <Arrow /></a>
            <a href={`${portal}/data`} className="focused-link gap-1">Browse Data <Arrow /></a>
          </div>
        </Section>
      </div>

      <div className="bg-white">
        <Section>
          <div className="flex flex-col md:flex-row gap-10 md:gap-4 xl:gap-10">
            <Link to="/science/category/recent-projects" className="card">
              <img src={require('@site/static/img/home/learn.jpg').default} />
              <h3 className="flex items-center gap-2">
                <LearnIcon />Learn
              </h3>
              <p>Explore some of the <Link to="/science/category/recent-projects">science</Link> made possible with Sage</p>
            </Link>
            <a href={`${portal}/apps`} className="card">
              <img src={require('@site/static/img/home/create-app.png').default} />
              <h3 className="flex items-center gap-2">
                <ContributeIcon />Contribute
              </h3>
              <p>Upload, build, and share <a href={`${portal}/apps`}>apps</a> for AI at the edge</p>
            </a>
            <a className="card" href={`${portal}/jobs`}>
              <img src={require('@site/static/img/home/circuit-board.jpg').default} />
              <h3 className="flex items-center gap-2">
                <RunIcon />Run jobs
              </h3>
              <p>Create <a href={`${portal}/create-job?tab=editor&start_with_sample=true`}>science goals</a> to run apps on nodes<br/></p>
            </a>
            <a href={`${portal}/data`} className="card">
              <img src={require('@site/static/img/home/browse.png').default} />
              <h3 className="flex items-center gap-2">
                <BrowseIcon />Browse
              </h3>
              <p>Browse <a href={`${portal}/data`}>data</a> from sensors and edge apps</p>
            </a>
            <Link to="docs/tutorials/accessing-data" className="card">
              <img src={require('@site/static/img/home/wildfire.jpg').default} />
              <h3 className="flex items-center gap-2">
                <AnalyzeIcon/>Analyze
              </h3>
              <p>Use Sage APIs to fetch, analyze, or integrate data</p>
            </Link>
          </div>

          <h2 className="text-purple font-bold mt-16 self-center">AI/ML Status</h2>
          {config.downtime ?
            'The node status view is currently unavailable due to scheduled maintenance.' :
            <StatusChart />
          }

        </Section>
      </div>

      <div className="bg-[#e7ebf0]"> {/* (bg color matches portal) */}
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
              <EventsIcon />Events
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
          <h2 className="flex items-center gap-2 text-purple font-bold mb-10">
            <DevIcon />Developer Tools for Research and Analysis
          </h2>

          <div className="flex flex-col md:flex-row text-slate-200 gap-10">
            <div className="sci-items flex flex-col gap-4 md:w-7/12">
              <a className="sci-item group" onMouseOver={() => setDevHover('client')} href="https://pypi.org/project/sage-data-client" target="_blank" rel="noreferrer">
                <div className="flex justify-between [&>*]:text-slate-200">
                  <h3>Python Data Client</h3>
                  <div className="invisible group-hover:visible"><LaunchRounded /></div>
                </div>
                <span className="text-slate-200">Easily analyze data in Pandas with the Sage Data Client</span>
              </a>
              <a className="sci-item group" onMouseOver={() => setDevHover('api')}  href="/docs/tutorials/accessing-data#http-api" target="_blank" rel="noreferrer">
                <div className="flex justify-between [&>*]:text-slate-200">
                  <h3>HTTP APIs</h3>
                  <div className="invisible group-hover:visible"><LaunchRounded /></div>
                </div>
                <span className="text-slate-200">Access and update data via web APIs</span>
              </a>
              <a className="sci-item group" onMouseOver={() => setDevHover('template')} href="/docs/tutorials/edge-apps/creating-an-edge-app#bootstraping-our-app-from-a-template" target="_blank" rel="noreferrer">
                <div className="flex justify-between [&>*]:text-slate-200">
                  <h3>Developer Templates</h3>
                  <div className="invisible group-hover:visible"><LaunchRounded /></div>
                </div>
                <span className="text-slate-200">Get started building apps quickly with templates and snippets</span>
              </a>
              <a className="sci-item group" onMouseOver={() => setDevHover('ui')} href={`${portal}/query-browser`} target="_blank" rel="noreferrer">
                <div className="flex justify-between [&>*]:text-slate-200">
                  <h3>Web GUIs</h3>
                  <div className="invisible group-hover:visible"><LaunchRounded /></div>
                </div>
                <span className="text-slate-200">Quickly navigate job/sampler data with a few clicks</span>
              </a>

              <div className="hidden md:flex justify-between mx-5 text-slate-200">
                <Link className="focused-link purple gap-1" to="docs/tutorials/edge-apps/intro-to-edge-apps" >Tutorials <Arrow /></Link>
                <Link className="focused-link purple gap-1" to="docs/reference-guides/pluginctl" >Reference Guides <Arrow /></Link>
                <a className="focused-link purple gap-1" href={`${portal}/query-browser`}>Query Browser <Arrow /></a>
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
              {/* preload images for hover */}
              <div className={`${devHover == 'ui' ? 'flex' : 'hidden'} max-h-96` }>
                <CodeWindow
                  title="portal.sagecontinuum.org"
                  src={require('@site/static/img/home/query-browser.png').default}
                  showUrlBar={true}
                />
              </div>
            </div>

          </div>
        </Section>
      </div>


      <div className="bg-purple">
        <Section className="items-center gap-2">
          <h2 className="flex items-center gap-2 text-slate-200 font-bold mb-10">
            <SciIcon />Featured Science
          </h2>
          <div className="flex flex-col md:flex-row text-slate-200">
            <div className="md:w-1/3 hidden md:flex mr-5 flex justify-center" >
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
                    <a className="sci-item group" onMouseOver={() => setSciHover(id)} href={href} target="_blank" key={id} rel="noreferrer">
                      <div className="flex justify-between [&>*]:text-slate-200">
                        <h3>{title}</h3>
                        {href && <div className="invisible group-hover:visible"><LaunchRounded /></div>}
                      </div>
                    </a>
                  )
                })}

              <div className="hidden md:flex justify-between mx-5">
                <Link to="/publications" className="focused-link gap-1">Publications <Arrow /></Link>
                <Link to="/science/category/recent-projects" className="focused-link gap-1">Science<Arrow /></Link>
                <a href={`${portal}/apps`} className="focused-link gap-1">Apps <Arrow /></a>
              </div>
            </div>
          </div>
        </Section>
      </div>


      {/* add user stories?
        <div className="user-stories section justify-center gap-2">
          <div>
            <h2>User Stories</h2>
            <div className="flex">
              <img src="https://avatars.githubusercontent.com/u/104843704?s=200&v=4" />
              CROCUS
            </div>
          </div>
          <br/>
          [logos with links go here?]
        </div>
      */}
    </Root>
  )
}

const purple = 'rgb(78, 42, 132)'
const sage = 'rgb(135, 186, 166)'


const Root = styled.div`
  .banner {
    background: radial-gradient(farthest-side ellipse at 0% 0,#87baa6 20%,#382d64);
  }

  .card {
    color: initial;
    padding: 0;
    background: #fff;
    border: 1px solid #ddd;

    img {
      border-radius: 5px 5px 0 0;
    }

    p, h3 {
      padding: 15px;
    }

    border-bottom: 3px solid #7a6bac;
    :hover {
      text-decoration: none;
      border: 1px solid #7a6bac;
      border-bottom: 3px solid ${purple};
    }
  }

  a.focused-link {
    color: #f2f2f2;
    font-size: 2em;
    display: flex;
    align-items: center;
  }

  a.focused-link.purple {
    color: ${purple};
  }

  .bg-purple { background: ${purple}; }
  .text-purple { color: ${purple}; }

  .bg-sage { background: ${sage}; }

  .sci-items {
    .sci-item {
      background: #63509c;
      padding: 10px;
      border-radius: 10px;

      h3 {
        font: bold;
      }
    }

    .sci-item:hover {
      text-decoration: none;
      background: #70619f;
    }

    .focused-link {
      font-size: 1.5em;
    }
  }
`





