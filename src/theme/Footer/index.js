import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { IconButton } from '@mui/material'
import GitHub from '@mui/icons-material/GitHub'
import Twitter from '@mui/icons-material/Twitter'
import YouTube from '@mui/icons-material/YouTube'
import NULogo from '@site/static/img/northwestern-university.svg'
import ANLLogo from '@site/static/img/anl-logo.png'
import NSFLogo from '@site/static/img/NSF_Official_logo.svg'

import { Section } from '../../components/home/Home'

import config from '../../config'
const { portal } = config


function Footer() {
  return (
    <Root className="bg-neutral-900">
      <Section>
        <div className="flex flex-col md:flex-row justify-between pt-8 pb-16 text-neutral-200">
          <div className="md:w-1/2 flex items-center text-neutral-400 md:mr-12 lg:mr-24">
            <NSFLogo className="max-w-[100px] md:max-w-[150px]"/>
            <div>
              This material is based upon work supported by
              the National Science Foundation under Grant No. OAC-1935984.
              <br/>
              <small className="text-neutral-500">
                Any opinions, findings, and conclusions or recommendations expressed in this material
                are those of the author(s) and do not necessarily reflect the views
                of the National Science Foundation.
              </small>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-between mt-12 md:mt-0">
            <div>
              <h4><a href="/about" className="text-neutral-200 hover:text-neutral-100">About</a></h4>
              <ul>
                <li><Link to="/science/category/recent-projects">Science</Link></li>
                <li><Link to="/news">News</Link></li>
                <li><Link to="/about">Publications</Link></li>
                <li><Link to="/docs/about/overview">Docs</Link></li>
              </ul>
            </div>
            <div>
              <h4><a href={portal} className="text-neutral-200 hover:text-neutral-300">Browse</a></h4>
              <ul>
                <li><a href={`${portal}/apps`}>Apps</a></li>
                <li><a href={`${portal}/data`}>Data</a></li>
                <li><a href={`${portal}/query-browser`}>Query Browser</a></li>
                <li><a href={`${portal}/nodes`}>Nodes</a></li>
              </ul>
            </div>
            <div>
              <h4><Link to={`/docs/contact-us`} className="text-neutral-200 hover:text-neutral-300">Contact</Link></h4>
              <ul>
                <li><Link to={`/docs/contact-us`}>Contact Us</Link></li>
              </ul>
              <div className="flex">
                <IconButton href="https://github.com/waggle-sensor" target="_blank">
                  <GitHub className="text-neutral-200" />
                </IconButton>
                <IconButton href="https://www.youtube.com/@sagecontinuum8206" target="_blank">
                  <YouTube className="text-neutral-200" />
                </IconButton>
                <IconButton href="https://twitter.com/sagecontinuum" target="_blank">
                  <Twitter className="text-neutral-200" />
                </IconButton>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-neutral-400">
          <div className="mx-2 mb-2">Copyright © {new Date().getFullYear()} Sage</div>
          <div className="flex gap-6 justify-end">
            <a href="https://naise.northwestern.edu"><span><NULogo className="h-[30px] md:h-[45px]" /></span></a>
            <a href="https://www.anl.gov"><img src={ANLLogo} className="h-[30px] md:h-[45px] pb-1" /></a>
          </div>
        </div>
      </Section>
    </Root>
  )
}


const Root = styled.footer`
  ul {
    padding:0;
    list-style: none;
    a {
      color: #999999;
    }
  }
`

export default React.memo(Footer)
