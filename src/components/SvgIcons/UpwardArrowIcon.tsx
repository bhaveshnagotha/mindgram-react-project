import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.span<{ rotationAngle?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;

  > svg {
    transform: ${(props) =>
      props.rotationAngle ? `rotate(${props.rotationAngle}deg)` : ''};
  }
`

interface IUpwardArrowIcon {
  height: number
  className?: string
  color: string
  onClick?: () => void
  rotationAngle?: number
}
const UpwardArrowIcon = (props: IUpwardArrowIcon) => {
  const height = props.height || 25
  const className = props.className || ''
  const color = props.color || '#000000'
  return (
    <Wrapper rotationAngle={props.rotationAngle}>
      <svg
        className={className}
        height={height}
        onClick={props.onClick}
        style={{ cursor: props.onClick && 'pointer' }}
        viewBox="0 0 8 10"
        version="1.1"
      >
        <g
          id="icons/arrow/green"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <rect
            id="Rectangle"
            fill={color}
            x="3"
            y="1"
            width="2"
            height="9"
            rx="1"
          ></rect>
          <rect
            id="Rectangle"
            fill={color}
            transform="translate(2.924874, 2.074874) rotate(45.000000) translate(-2.924874, -2.074874) "
            x="1.92487373"
            y="-0.425126266"
            width="2"
            height="5"
            rx="1"
          ></rect>
          <rect
            id="Rectangle"
            fill={color}
            transform="translate(5.084874, 2.074874) rotate(-45.000000) translate(-5.084874, -2.074874) "
            x="4.08487373"
            y="-0.425126266"
            width="2"
            height="5"
            rx="1"
          ></rect>
        </g>
      </svg>
    </Wrapper>
  )
}
export default UpwardArrowIcon
