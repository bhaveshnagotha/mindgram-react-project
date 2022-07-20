import React from 'react'

interface IDownArrowIcon {
  height: number
  className?: string
  color?: string
  onClick?: () => void
}
const DownArrowIcon = (props: IDownArrowIcon) => {
  const height = props.height || 25
  const className = props.className || ''
  const color = props.color || '#000000'
  return (
    <svg
      className={className}
      height={height}
      onClick={props.onClick}
      style={{ cursor: props.onClick && 'pointer' }}
      viewBox="0 0 24 24"
      version="1.1"
    >
      <path
        fill={color}
        d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"
      />
    </svg>
  )
}
export default DownArrowIcon
