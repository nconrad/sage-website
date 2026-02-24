import ImageSearch from './img/icons/image-search-icon.png'
import PTZYolo from './img/icons/ptz-yolo.jpg'
import SageMCP from './img/icons/sage-mcp-icon.png'
import HawaiiImg from './img/icons/volcano-placeholder.png'

import { ReactNode } from 'react'

export type LabProject = {
  id: string
  title: string
  description: string
  image?: string
  imageAlt?: string
  imageOverlay?: ReactNode
  placeholder?: {
    text: string
  }
  primaryButton?: {
    text: string
    url: string
    external?: boolean
  }
  readMoreUrl: string
  githubUrl?: string
}

export const labProjects: LabProject[] = [
  {
    id: 'image-search',
    title: 'AI Vision Semantic Search',
    description: 'AI-powered semantic image search enables intuitive exploration of large-scale datasets. Locate relevant images based on visual content rather than metadata.',
    image: ImageSearch,
    imageAlt: 'screenshot of image searching for volcanoes',
    primaryButton: {
      text: 'Try It Now',
      url: 'https://portal.sagecontinuum.org/labs/image-search',
      external: true
    },
    readMoreUrl: './labs/image-search',
    githubUrl: 'https://github.com/waggle-sensor/sage-vectordb-example'
  },
  {
    id: 'sage-mcp',
    title: 'Vibe Coding and AI-Agents: Sage MCP',
    description: 'Control edge nodes through natural conversation. Use AI-powered IDEs to query sensors, find apps, and run jobs. Ask "What\'s the temperature in Hawaii?" and let the prototype MCP handle the rest.',
    image: SageMCP,
    imageAlt: 'screenshot of prompting with mcp',
    primaryButton: {
      text: 'Try It Now',
      url: '/docs/tutorials/sage-mcp#getting-started',
      external: false
    },
    readMoreUrl: './labs/sage-mcp',
    githubUrl: 'https://github.com/waggle-sensor/sage-mcp'
  },
  {
    id: 'ptz-app',
    title: 'PTZ App',
    description: 'Using AI and Pan-Tilt-Zoom cameras for autonomous wildlife, hazard observation, and more. AI-driven detection scans, zooms, and captures key images at the edge using models like YOLO and Florence.',
    image: PTZYolo,
    imageAlt: 'deer detectection with PTZ camera',
    imageOverlay: (
      <div className="absolute bottom-4 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
        Elk spotted at <a
          href="https://portal.sagecontinuum.org/nodes/W06C"
          target="_blank"
          className="font-bold !text-[#3ca4ff] hover:underline"
          onClick={(e) => e.stopPropagation()}
          rel="noreferrer"
        >
          AMK Ranch
        </a> in Wyoming
      </div>
    ),
    readMoreUrl: './labs/ptz-app',
    githubUrl: 'https://github.com/waggle-sensor/ptz-app'
  },
  {
    id: 'volcano-fire-anomaly',
    title: 'Volcano, Fire, and Anomaly Detection',
    description: 'Detecting volcanic activity, fire, and anomalies using advanced AI models and edge computing.',
    image: HawaiiImg,
    imageAlt: 'view of volcano from node in Hawaii',
    // primaryButton: {
    //   text: 'Try It Now',
    //   url: 'https://some_url_or_portal_link_here',
    //   external: true
    // },
    readMoreUrl: './labs/volcano-fire-anomaly',
    // githubUrl: 'https://github.com/...add_repo_link_here...'
  },
  {
    id: 'next-gen-nodes',
    title: 'New Sage Grande Edge Nodes',
    description: 'The future of edge computing with Sage Grande\'s Next-Gen nodes, built on the NVIDIA Jetson Thor platform.',
    placeholder: {
      text: 'Next-Generation Nodes\n(Coming Soon!)'
    },
    readMoreUrl: './labs/next-gen-nodes',
    // githubUrl: '_____add_repo_link_here____'
  }
]
