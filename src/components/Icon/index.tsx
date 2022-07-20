import React from 'react'
import styled from 'styled-components'

interface IProps {
  color?: string
  isClickable?: boolean
  onClick?: (e: React.MouseEvent) => void
  size?: string
  type: string
  iconStyle?: 'fas' | 'far'
}

const StyledI = styled.i`
  color: ${(props: Partial<IProps>) => (props.color ? props.color : 'none')};
  cursor: ${(props: Partial<IProps>) =>
    props.isClickable ? 'pointer' : 'auto'};
`
const Icon = (props: IProps) => {
  const size = props.size ? props.size : ''
  const className = `${props.iconStyle} fa-${props.type} ${size}`
  return (
    <span onClick={props.onClick}>
      <StyledI
        className={className}
        color={props.color}
        isClickable={props.isClickable}
      />
    </span>
  )
}

Icon.defaultProps = {
  color: '',
  iconStyle: 'fas',
  isClickable: false,
  onClick: () => undefined,
  size: '',
}

export default Icon
