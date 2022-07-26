import React from 'react'

interface IHomeIcon {
  height: number
  className?: string
  color: string
  onClick?: () => void
}
const HomeIcon = (props: IHomeIcon) => {
  const height = props.height || 25
  const className = props.className || ''
  const color = props.color || '#000000'
  return (
    <svg
      className={className}
      height={height}
      onClick={props.onClick}
      style={{ cursor: props.onClick && 'pointer' }}
      version="1.1"
      viewBox="0 0 27.02 27.02"
      enableBackground={'new 0 0 27.02 27.02'}
    >
      <g>
        <path
          fill={color}
          d="M3.674,24.876c0,0-0.024,0.604,0.566,0.604c0.734,0,6.811-0.008,6.811-0.008l0.01-5.581
		c0,0-0.096-0.92,0.797-0.92h2.826c1.056,0,0.991,0.92,0.991,0.92l-0.012,5.563c0,0,5.762,0,6.667,0
		c0.749,0,0.715-0.752,0.715-0.752V14.413l-9.396-8.358l-9.975,8.358C3.674,14.413,3.674,24.876,3.674,24.876z"
        />
        <path
          fill={color}
          d="M0,13.635c0,0,0.847,1.561,2.694,0l11.038-9.338l10.349,9.28c2.138,1.542,2.939,0,2.939,0
		L13.732,1.54L0,13.635z"
        />
        <polygon
          fill={color}
          points="23.83,4.275 21.168,4.275 21.179,7.503 23.83,9.752 	"
        />
      </g>
    </svg>
  )
}
export default HomeIcon
