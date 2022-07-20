import React from 'react'

interface IFilterIcon {
  height: number
  className?: string
  color: string
}
const FilterIcon = (props: IFilterIcon) => {
  const height = props.height || 25
  const className = props.className || ''
  const color = props.color || '#000000'
  return (
    <svg
      className={className}
      height={height}
      viewBox="0 0 16 15"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="icons/filter/normal"
          transform="translate(0.000000, -1.000000)"
          fill={color}
          stroke={color}
        >
          <g id="icons/normal/filter" transform="translate(0.000000, 1.000000)">
            <path
              d="M1.25,0.5 C0.835786438,0.5 0.5,0.835786438 0.5,1.25 C0.5,1.66421356 0.835786438,2 1.25,2 L14.75,2 C15.1642136,2 15.5,1.66421356 15.5,1.25 C15.5,0.835786438 15.1642136,0.5 14.75,0.5 L1.25,0.5 Z M4.25,6.5 C3.83578644,6.5 3.5,6.83578644 3.5,7.25 C3.5,7.66421356 3.83578644,8 4.25,8 L11.75,8 C12.1642136,8 12.5,7.66421356 12.5,7.25 C12.5,6.83578644 12.1642136,6.5 11.75,6.5 L4.25,6.5 Z M7.25,12.5 C6.83578644,12.5 6.5,12.8357864 6.5,13.25 C6.5,13.6642136 6.83578644,14 7.25,14 L8.75,14 C9.16421356,14 9.5,13.6642136 9.5,13.25 C9.5,12.8357864 9.16421356,12.5 8.75,12.5 L7.25,12.5 Z"
              id="Combined-Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  )
}
export default FilterIcon
