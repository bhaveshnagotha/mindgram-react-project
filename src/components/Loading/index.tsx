import React from 'react'
import styled from 'styled-components'

import { baseColors } from '../../constants/colors'

const Container = styled.div`
  text-align: center;
`

interface ISpinnerProps {
  size: number
}
const StyledSpinner = styled.svg`
  animation: rotate 1s linear infinite;
  width: ${(props: ISpinnerProps) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};

  & .path {
    stroke: ${baseColors.BLUE_TWO};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`

const Loading = ({
  loadingText = '',
  size = 100,
  style = {},
}: {
  loadingText?: string
  size?: number
  style?: any
}) => {
  return (
    <Container style={{ ...style }}>
      <StyledSpinner viewBox="0 0 50 50" size={size}>
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="2"
        />
      </StyledSpinner>
      {loadingText && (
        <div style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
          {loadingText}
        </div>
      )}
    </Container>
  )
}

export default Loading
