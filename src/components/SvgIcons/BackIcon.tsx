import React from 'react'

interface IBackIcon {
  height: number
  className?: string
  color: string
  onClick?: () => void
}
const BackIcon = (props: IBackIcon) => {
  const height = props.height || 25
  const className = props.className || ''
  const color = props.color || '#000000'
  return (
    <svg
      className={className}
      height={height}
      viewBox="0 0 6 11"
      version="1.1"
      onClick={props.onClick}
      style={{ cursor: props.onClick && 'pointer' }}
    >
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="icons/drowdown/down/normal"
          transform="translate(-2.000000, 3.000000)"
          fill={color}
        >
          <g
            id="icons/drowdown/down"
            transform="translate(2.000000, -3.000000)"
          >
            <path
              d="M3,6.95095261 L6.60560575,3.24584257 C6.91602602,2.92685559 7.42626141,2.91991091 7.74524838,3.23033118 C7.75048898,3.23543104 7.75565992,3.24060198 7.76075977,3.24584257 C8.08225842,3.57621365 8.08225842,4.10250442 7.76075977,4.4328755 L3.71772069,8.58749076 C3.52445602,8.78608898 3.25373926,8.86373375 2.99994488,8.81914057 C2.75361496,8.86240584 2.49072216,8.79075226 2.29779069,8.60300215 C2.2925501,8.5979023 2.28737916,8.59273136 2.28227931,8.58749076 L-1.76075977,4.4328755 C-2.08225842,4.10250442 -2.08225842,3.57621365 -1.76075977,3.24584257 C-1.4503395,2.92685559 -0.940104108,2.91991091 -0.621117133,3.23033118 C-0.61587654,3.23543104 -0.610705599,3.24060198 -0.605605747,3.24584257 L3,6.95095261 Z"
              id="Arrow"
              transform="translate(3.000000, 5.916667) rotate(90.000000) translate(-3.000000, -5.916667) "
            ></path>
          </g>
        </g>
      </g>
    </svg>
  )
}
export default BackIcon
