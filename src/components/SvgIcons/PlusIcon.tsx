import React from 'react'

interface IPlusIcon {
  height: number
  className?: string
  color: string
  onClick?: (e?: any) => void
}
const PlusIcon = (props: IPlusIcon) => {
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
        <g id="icons/plus/normal" fill={color}>
          <path
            d="M7,9 L1,9 C0.44771525,9 -3.12564735e-16,8.55228475 -2.4492936e-16,8 C-1.77293985e-16,7.44771525 0.44771525,7 1,7 L7,7 L7,1 C7,0.44771525 7.44771525,0 8,0 C8.55228475,0 9,0.44771525 9,1 L9,7 L15,7 C15.5522847,7 16,7.44771525 16,8 C16,8.55228475 15.5522847,9 15,9 L9,9 L9,15 C9,15.5522847 8.55228475,16 8,16 C7.44771525,16 7,15.5522847 7,15 L7,9 Z"
            id="Combined-Shape"
          ></path>
        </g>
      </g>
    </svg>
  )
}
export default PlusIcon
