import React from 'react'

interface IDocumentIcon {
  height: number
  className?: string
  color: string
  onClick?: () => void
}
const DocumentIcon = (props: IDocumentIcon) => {
  const height = props.height || 25
  const className = props.className || ''
  const color = props.color || '#000000'
  return (
    <svg
      className={className}
      height={height}
      onClick={props.onClick}
      style={{ cursor: props.onClick && 'pointer' }}
      viewBox="0 0 14 18"
    >
      <g
        id="UI---Dashboard---Desktop"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="pre-ipr-summary-analytics-1"
          transform="translate(-1359.000000, -224.000000)"
          fill="#A5A7B4"
          fillRule="nonzero"
          stroke={color}
        >
          <g id="Info" transform="translate(0.000000, 92.000000)">
            <g id="Summary" transform="translate(365.000000, 0.000000)">
              <g
                id="Patent-Summary"
                transform="translate(537.000000, 106.000000)"
              >
                <g id="Download" transform="translate(385.000000, 19.000000)">
                  <g id="PDF" transform="translate(56.000000, 0.000000)">
                    <g
                      id="icons/document/normal"
                      transform="translate(15.000000, 8.000000)"
                    >
                      <g transform="translate(2.000000, 0.000000)">
                        <rect
                          id="Rectangle"
                          strokeWidth="0.5"
                          x="2.5"
                          y="6"
                          width="7"
                          height="1"
                          rx="0.5"
                        ></rect>
                        <rect
                          id="Rectangle"
                          strokeWidth="0.5"
                          x="2.5"
                          y="8"
                          width="7"
                          height="1"
                          rx="0.5"
                        ></rect>
                        <rect
                          id="Rectangle"
                          strokeWidth="0.5"
                          x="2.5"
                          y="10"
                          width="7"
                          height="1"
                          rx="0.5"
                        ></rect>
                        <path
                          d="M9.207,0 L1,0 C0.44771525,1.01453063e-16 -6.76353751e-17,0.44771525 0,1 L0,15 C6.76353751e-17,15.5522847 0.44771525,16 1,16 L11,16 C11.5522847,16 12,15.5522847 12,15 L12,2.792 L12,2.792 L9.207,0 Z M8.999,1.2065 L10.793,3 L8.999,3 L8.999,1.2065 L8.999,1.2065 Z M1,15 L1,0.999 L8,0.999 L8,3.9995 L11,3.9995 L11,15 L1,15 Z"
                          id="Shape"
                          strokeWidth="0.7"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
export default DocumentIcon
