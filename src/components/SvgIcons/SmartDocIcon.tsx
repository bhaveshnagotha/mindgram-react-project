import React from 'react'

interface ISmartDocIcon {
  height: number
  className?: string
  color: string
  onClick?: (e: any) => undefined | void
  ref?: any
}
const SmartDocIcon = React.forwardRef((props: ISmartDocIcon, ref: any) => {
  const height = props.height || 25
  const className = props.className || ''
  const color = props.color || '#000000'
  return (
    <svg
      className={className}
      height={height}
      onClick={(e: any) => props.onClick && props.onClick(e)}
      style={{ cursor: props.onClick && 'pointer' }}
      viewBox="0 0 16 16"
      version="1.1"
      ref={ref}
    >
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="icons/smart-doc/normal"
          transform="translate(2.000000, 2.000000)"
          stroke={color}
          strokeWidth="2"
        >
          <path d="M1.5,8 L1.5,4" id="Line-3" strokeLinecap="square"></path>
          <path d="M4,8 L8,5" id="Line-3" strokeLinecap="square"></path>
          <path d="M4,10.5 L8,10.5" id="Line-3" strokeLinecap="square"></path>
          <circle id="Oval" cx="1.5" cy="10.5" r="2.5"></circle>
          <circle id="Oval" cx="10.5" cy="2.5" r="2.5"></circle>
          <circle id="Oval" cx="1.5" cy="1.5" r="2.5"></circle>
          <circle id="Oval" cx="10.5" cy="10.5" r="2.5"></circle>
        </g>
      </g>
    </svg>
  )
})
export default SmartDocIcon
