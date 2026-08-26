import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Card from '@mui/material/Card'


type LinkCardProps = {
  title: string
  src: string
  link: string
  alt?: string
  description?: string
}

export default function ImageLinkCard(props: LinkCardProps) {
  const {title, src, link, alt} = props
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