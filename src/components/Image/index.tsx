import React from 'react'
import styled from 'styled-components'

const StyledImage = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  max-width: 100%;
  max-height: 80vh;
`

interface IProps {
  alt?: string
  height?: string
  src: string
  width?: string
}

const Image = (props: IProps) => {
  const { alt, height, src, width } = props
  return <StyledImage src={src} alt={alt} height={height} width={width} />
}

Image.defaultProps = {
  alt: '',
  height: '100%',
  width: '100%',
}

export default Image
