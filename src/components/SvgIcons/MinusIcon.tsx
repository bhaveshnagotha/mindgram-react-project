import React from 'react'

interface IMinusIcon {
  height: number
  className?: string
  color: string
  onClick?: (e?: any) => void
}
const MinusIcon = (props: IMinusIcon) => {
  const height = props.height || 25
  const className = props.className || ''
  const color = props.color || '#000000'
  return (
    <svg
      className={className}
      onClick={props.onClick}
      height={height}
      width={height}
      style={{ cursor: props.onClick && 'pointer' }}
      viewBox="0 0 16 2"
      version="1.1"
    >
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="icons/minus/normal"
          transform="translate(0.000000, -7.000000)"
          fill={color}
        >
          <rect
            id="Rectangle"
            transform="translate(8.000000, 8.000000) rotate(-360.000000) translate(-8.000000, -8.000000) "
            x="0"
            y="7"
            width="16"
            height="2"
            rx="1"
          ></rect>
        </g>
      </g>
    </svg>
  )
}
export default MinusIcon
