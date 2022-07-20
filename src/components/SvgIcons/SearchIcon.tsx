import React from 'react'

interface ISearchIcon {
  height: number
  className?: string
  color: string
  onClick?: () => void
}
const SearchIcon = (props: ISearchIcon) => {
  const height = props.height || 25
  const className = props.className || ''
  const color = props.color || '#000000'
  return (
    <svg
      className={className}
      height={height}
      width={height}
      onClick={props.onClick}
      style={{ cursor: props.onClick && 'pointer' }}
      viewBox="0 0 24 24"
      version="1.1"
    >
      <path
        fill={color}
        d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"
      />
    </svg>
  )
}
export default SearchIcon
