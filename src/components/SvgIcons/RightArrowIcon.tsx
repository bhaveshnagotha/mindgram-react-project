import React from 'react'

interface IRightArrowIcon {
  height: number
  className?: string
  color: string
  style?: any
  onClick?: () => void
}
const RightArrowIcon = (props: IRightArrowIcon) => {
  const height = props.height || 25
  const className = props.className || ''
  const color = props.color || '#000000'
  const style = props.style
  return (
    <svg
      className={className}
      height={height}
      onClick={props.onClick}
      style={{ cursor: props.onClick && 'pointer', ...style }}
      viewBox="0 0 4 7"
    >
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M2,4.43830218 L4.16336345,2.15171999 C4.34444194,1.9603278 4.64638908,1.9519669 4.83778127,2.13304539 C4.84417727,2.13909673 4.85040452,2.14532398 4.85645586,2.15171999 C5.05087414,2.35721175 5.05087414,2.67879711 4.85645586,2.88428888 L2.43063242,5.44828001 C2.31595092,5.56949343 2.15278897,5.61729294 1.99993436,5.59005072 C1.85606828,5.6156711 1.70234088,5.57509401 1.58804218,5.46695461 C1.58164617,5.46090327 1.57541892,5.45467602 1.56936758,5.44828001 L-0.856455861,2.88428888 C-1.05087414,2.67879711 -1.05087414,2.35721175 -0.856455861,2.15171999 C-0.675377369,1.9603278 -0.373430225,1.9519669 -0.18203804,2.13304539 C-0.175642036,2.13909673 -0.169414787,2.14532398 -0.163363448,2.15171999 L2,4.43830218 Z"
          id="Arrow"
          fill={color}
          transform="translate(2.000000, 3.800000) scale(-1, 1) rotate(90.000000) translate(-2.000000, -3.800000) "
        ></path>
      </g>
    </svg>
  )
}
export default RightArrowIcon
