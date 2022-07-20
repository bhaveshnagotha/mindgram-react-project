import React from 'react'

interface IExternalLinkIcon {
  height: number
  className?: string
  color: string
  onClick?: () => void
}
const ExternalLinkIcon = (props: IExternalLinkIcon) => {
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
    >
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="icons/resize/expand"
          transform="translate(10.500000, 5.000000) scale(-1, 1) translate(-10.500000, -5.000000) translate(1.000000, -5.000000)"
        >
          <g
            id="Group"
            transform="translate(7.575379, 8.024621) rotate(-45.000000) translate(-7.575379, -8.024621) translate(2.575379, 2.524621)"
            fill={color}
          >
            <rect
              id="Rectangle"
              x="3.35729663"
              y="2.82176272"
              width="2.5"
              height="8"
              rx="1"
            ></rect>
            <path
              d="M3.08480015,1.03041224 L3.53355019,1.02125408 C4.08571996,1.00998531 4.54247715,1.44847221 4.55374592,2.00064198 C4.5540235,2.01424318 4.5540235,2.02784862 4.55374592,2.04144981 L4.46958776,6.16519985 C4.45864282,6.7015019 4.0265019,7.13364282 3.49019985,7.14458776 L3.04144981,7.15374592 C2.48928004,7.16501469 2.03252285,6.72652779 2.02125408,6.17435802 C2.0209765,6.16075682 2.0209765,6.14715138 2.02125408,6.13355019 L2.10541224,2.00980015 C2.11635718,1.4734981 2.5484981,1.04135718 3.08480015,1.03041224 Z"
              id="Rectangle"
              transform="translate(3.287500, 4.087500) rotate(45.000000) translate(-3.287500, -4.087500) "
            ></path>
            <path
              d="M5.74144981,1.02125408 L6.19019985,1.03041224 C6.7265019,1.04135718 7.15864282,1.4734981 7.16958776,2.00980015 L7.25374592,6.13355019 C7.26501469,6.68571996 6.82652779,7.14247715 6.27435802,7.15374592 C6.26075682,7.1540235 6.24715138,7.1540235 6.23355019,7.15374592 L5.78480015,7.14458776 C5.2484981,7.13364282 4.81635718,6.7015019 4.80541224,6.16519985 L4.72125408,2.04144981 C4.70998531,1.48928004 5.14847221,1.03252285 5.70064198,1.02125408 C5.71424318,1.0209765 5.72784862,1.0209765 5.74144981,1.02125408 Z"
              id="Rectangle"
              transform="translate(5.987500, 4.087500) rotate(-45.000000) translate(-5.987500, -4.087500) "
            ></path>
          </g>
          <path
            d="M10.9378591,6.2 L7.2,6.2 C6.0954305,6.2 5.2,7.0954305 5.2,8.2 L5.2,17.8 C5.2,18.9045695 6.0954305,19.8 7.2,19.8 L16.8,19.8 C17.9045695,19.8 18.8,18.9045695 18.8,17.8 L18.8,13.7404941"
            id="Path-2"
            stroke={color}
            strokeWidth="2.3"
            strokeLinecap="round"
            transform="translate(12.000000, 13.000000) scale(-1, 1) translate(-12.000000, -13.000000) "
          ></path>
        </g>
      </g>
    </svg>
  )
}
export default ExternalLinkIcon
