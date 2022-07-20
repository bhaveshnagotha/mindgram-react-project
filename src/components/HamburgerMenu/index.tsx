import React, { useEffect, useState } from 'react'

import {
  Container,
  ContainerLeftFrame,
  ContainerLeftFrameExpanded,
  ContainerMiddleFrame,
} from './HamburgerMenu.styles'

interface IProps {
  Left: any
  leftProps: object
  Middle: any
  middleProps: object
  leftFrameWidth?: number
  isLeftPaneStatic?: boolean
  onCloseLeftPane?: () => void
}
function HamburgerMenu(props: IProps) {
  const [isLeftFrameExpanded, setIsLeftFrameExpanded] = useState(true)

  const {
    Left,
    Middle,
    leftProps,
    middleProps,
    leftFrameWidth = 350,
    isLeftPaneStatic = false,
    onCloseLeftPane,
  } = props

  return (
    <Container>
      <LeftFrame
        Component={Left}
        componentProps={leftProps}
        leftFrameWidth={leftFrameWidth}
        isLeftFrameExpanded={isLeftFrameExpanded}
        isStatic={isLeftPaneStatic}
        expandLeftPane={() => setIsLeftFrameExpanded(true)}
        closeLeftPane={() => setIsLeftFrameExpanded(false)}
        onClose={onCloseLeftPane}
      />
      <MiddleFrame
        expandLeftPane={() => setIsLeftFrameExpanded(true)}
        closeLeftPane={() => setIsLeftFrameExpanded(false)}
        isLeftFrameExpanded={isLeftFrameExpanded}
        leftFrameWidth={leftFrameWidth}
        Component={Middle}
        componentProps={middleProps}
      />
    </Container>
  )
}

function LeftFrame({
  Component,
  componentProps,
  isLeftFrameExpanded,
  isStatic,
  leftFrameWidth,
  expandLeftPane,
  closeLeftPane,
  onClose,
}: {
  Component: any
  componentProps: object
  leftFrameWidth: number
  isLeftFrameExpanded: boolean
  isStatic: boolean
  expandLeftPane: () => void
  closeLeftPane: () => void
  onClose?: () => void
}) {
  const [ref] = useState(React.createRef<HTMLDivElement>())
  useEffect(() => {
    function listener(e: any) {
      if (
        !isLeftFrameExpanded ||
        isStatic ||
        (ref.current && ref.current.contains(e.target))
      ) {
        return
      }

      if (onClose) onClose()
      closeLeftPane()
    }
    document.addEventListener('mousedown', listener, false)

    return function cleanup() {
      document.removeEventListener('mousedown', listener, false)
    }
  })

  return (
    <ContainerLeftFrame>
      <ContainerLeftFrameExpanded
        leftWidth={leftFrameWidth}
        isShowing={isLeftFrameExpanded}
        ref={ref}
      >
        {isLeftFrameExpanded && (
          <Component
            {...componentProps}
            expandLeftPane={expandLeftPane}
            closeLeftPane={closeLeftPane}
          />
        )}
      </ContainerLeftFrameExpanded>
    </ContainerLeftFrame>
  )
}

function MiddleFrame({
  Component,
  componentProps,
  isLeftFrameExpanded,
  leftFrameWidth,
  expandLeftPane,
  closeLeftPane,
}: {
  Component: any
  componentProps: object
  isLeftFrameExpanded: boolean
  leftFrameWidth: number
  expandLeftPane: () => void
  closeLeftPane: () => void
}) {
  return (
    <ContainerMiddleFrame
      isLeftFrameExpanded={isLeftFrameExpanded}
      leftFrameWidth={leftFrameWidth}
    >
      <Component
        {...componentProps}
        isLeftFrameExpanded={isLeftFrameExpanded}
        expandLeftPane={expandLeftPane}
        closeLeftPane={closeLeftPane}
      />
    </ContainerMiddleFrame>
  )
}

export default HamburgerMenu
