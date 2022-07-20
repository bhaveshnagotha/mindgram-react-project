import React from 'react'
import styled from 'styled-components'

const StyledImage = styled.img<Partial<IProps>>`
  border: 1px solid grey;
  cursor: ${(props) => (props.isClickable ? 'pointer' : 'auto')};
`

interface IProps {
  alt?: string
  height?: number
  id: string
  isClickable?: boolean
  onClick?: (id: string) => void
  src: string
  width?: number
}
const ImageThumbnail = ({
  alt = '',
  height = 150,
  isClickable = false,
  onClick = () => undefined,
  width = 150,
  src,
  id,
}: IProps) => {
  return (
    <StyledImage
      src={src}
      alt={alt}
      height={height}
      isClickable={isClickable}
      onClick={() => onClick(id)}
      width={width}
    />
  )
}

export default ImageThumbnail
