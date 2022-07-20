import React from 'react'

interface ICrossIcon {
  height: number
  className?: string
  color: string
  onClick?: () => void
}
const CrossIcon = (props: ICrossIcon) => {
  const height = props.height || 25
  const className = props.className || ''
  const color = props.color || '#000000'
  return (
    <svg
      className={className}
      height={height}
      onClick={props.onClick}
      style={{ cursor: props.onClick && 'pointer' }}
      viewBox="0 0 16 16"
      version="1.1"
    >
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="cross" fill={color}>
          <path
            d="M6.54073773,7.95495129 L0.707106781,2.12132034 C0.316582489,1.73079605 0.316582489,1.09763107 0.707106781,0.707106781 C1.09763107,0.316582489 1.73079605,0.316582489 2.12132034,0.707106781 L7.95495129,6.54073773 L13.7885822,0.707106781 C14.1791065,0.316582489 14.8122715,0.316582489 15.2027958,0.707106781 C15.5933201,1.09763107 15.5933201,1.73079605 15.2027958,2.12132034 L9.36916485,7.95495129 L15.2027958,13.7885822 C15.5933201,14.1791065 15.5933201,14.8122715 15.2027958,15.2027958 C14.8122715,15.5933201 14.1791065,15.5933201 13.7885822,15.2027958 L7.95495129,9.36916485 L2.12132034,15.2027958 C1.73079605,15.5933201 1.09763107,15.5933201 0.707106781,15.2027958 C0.316582489,14.8122715 0.316582489,14.1791065 0.707106781,13.7885822 L6.54073773,7.95495129 Z"
            id="Combined-Shape"
          ></path>
        </g>
      </g>
    </svg>
  )
}
export default CrossIcon
