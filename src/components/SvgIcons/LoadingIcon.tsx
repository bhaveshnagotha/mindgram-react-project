import React from 'react'

interface ILoadingIcon {
  height: number
  className?: string
  color: string
}
const LoadingIcon = (props: ILoadingIcon) => {
  const height = props.height || 25
  const className = props.className || ''
  const color = props.color || '#000000'
  return (
    <svg
      className={className}
      height={height}
      id="LoadingIcon"
      viewBox="0 0 16 16"
      version="1.1"
    >
      <g
        id="UI---Dashboard---Desktop"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="mindgram-UI-elements"
          transform="translate(-546.000000, -276.000000)"
          fill={color}
        >
          <g id="Search-input" transform="translate(516.000000, 124.000000)">
            <g
              id="Search-input/Active"
              transform="translate(0.000000, 136.000000)"
            >
              <g id="icons/loading" transform="translate(30.000000, 16.000000)">
                <g id="Oval">
                  <circle
                    cx="3.07692308"
                    cy="3.07692308"
                    r="3.07692308"
                  ></circle>
                  <circle
                    cx="12.9230769"
                    cy="3.07692308"
                    r="3.07692308"
                  ></circle>
                  <circle
                    cx="4.92307692"
                    cy="12.9230769"
                    r="3.07692308"
                  ></circle>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
export default LoadingIcon
