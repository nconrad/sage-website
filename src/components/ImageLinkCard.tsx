import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Card from '@mui/material/Card'


type LinkCardProps = {
  title: string
  src: string
  link: string
  alt?: string
  description?: string
  /** Small label pinned to the top-left, e.g. a year */
  eyebrow?: string
  /** Small label pinned to the top-right, e.g. a "Lab" marker */
  badge?: ReactNode
}

export default function ImageLinkCard(props: LinkCardProps) {
  const {title, src, link, alt, eyebrow, badge} = props
  return (
    <Root>
      <Card
        className="card z-0 relative"
        component={Link}
        to={link}
      >
        <img
          src={src}
          alt={alt}
          className="w-[256px] h-[256px] md:w-[220px] md:h-[220px] object-cover"
        />
        {(eyebrow || badge) &&
          <div className="absolute top-0 left-0 right-0 z-10 flex items-start justify-between gap-2 p-2">
            {eyebrow ?
              <span className="rounded bg-black/60 px-1.5 py-0.5 text-xs font-semibold leading-none text-white">
                {eyebrow}
              </span> :
              <span />
            }
            {badge}
          </div>
        }
        <h3 className="text-white absolute left-4 bottom-0 z-10">{title}</h3>
      </Card>
    </Root>
  )
}

const Root = styled.div`
  .card::after {
    display: block;
    position: relative;
    background-image: linear-gradient(to bottom, transparent 0%, black 100%);
    margin-top: -110px;
    height: 110px;
    width: 100%;
    content: '';
  }

  .card:hover h3 {
    color: rgb(121, 208, 255);
    text-decoration: underline;
  }
`