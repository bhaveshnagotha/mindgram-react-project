import React, { useState } from 'react'

import { baseColors } from '../../constants/colors'
import Icon from '../Icon'
import { iconSizes } from '../Icon/constants'
import CrossIcon from '../SvgIcons/CrossIcon'
import {
  Container,
  ContainerCloseRightIcon,
  ContainerExpandLeftIcon,
  ContainerExpandRightIcon,
  ContainerLeftFrame,
  ContainerLeftFrameExpanded,
  ContainerMiddleFrame,
  ContainerRightFrame,
  ContainerRightFrameBody,
} from './ThreeFrames.styles'

interface IProps {
  Left: any
  leftProps: object
  Middle: any
  middleProps: object
  Right: any
  rightProps: object
  onLinkClick?: (data: object) => void
  onCloseRight?: () => void
  rightFrameWidth: number
  leftFrameWidth?: number
  isRightFrameCaretShowing: boolean
}
function ThreeFrames(props: IProps) {
  const [isLeftFrameExpanded, setIsLeftFrameExpanded] = useState(true)
  const {
    Left,
    Middle,
    Right,
    leftProps,
    middleProps,
    rightProps,
    onLinkClick,
    rightFrameWidth,
    leftFrameWidth = 350,
    isRightFrameCaretShowing,
  } = props

  return (
    <Container>
      <LeftFrame
        Component={Left}
        componentProps={leftProps}
        leftFrameWidth={leftFrameWidth}
        isLeftFrameExpanded={isLeftFrameExpanded}
        onOpenLeft={() => setIsLeftFrameExpanded(true)}
      />
      <MiddleFrame
        isLeftFrameExpanded={isLeftFrameExpanded}
        rightFrameWidth={rightFrameWidth}
        leftFrameWidth={leftFrameWidth}
        Component={Middle}
        componentProps={middleProps}
        onOpenRight={(item) => {
          onLinkClick?.(item)
          setIsLeftFrameExpanded(false)
        }}
        onCloseRight={() => {
          setIsLeftFrameExpanded(true)
        }}
      />
      <RightFrame
        Component={Right}
        componentProps={rightProps}
        isLeftFrameExpanded={isLeftFrameExpanded}
        onCloseRight={() => setIsLeftFrameExpanded(true)}
        onOpenRight={() => setIsLeftFrameExpanded(false)}
        rightFrameWidth={rightFrameWidth}
        isRightFrameCaretShowing={isRightFrameCaretShowing}
      />
    </Container>
  )
}

function LeftFrame({
  Component,
  componentProps,
  isLeftFrameExpanded,
  leftFrameWidth,
  onOpenLeft,
}: {
  Component: any
  componentProps: object
  leftFrameWidth: number
  isLeftFrameExpanded: boolean
  onOpenLeft: () => void
}) {
  return (
    <ContainerLeftFrame>
      <ContainerExpandLeftIcon>
        <Icon
          type="caret-right"
          isClickable
          size={iconSizes.S}
          onClick={() => onOpenLeft()}
        />
      </ContainerExpandLeftIcon>
      <ContainerLeftFrameExpanded
        leftWidth={leftFrameWidth}
        isShowing={isLeftFrameExpanded}
      >
        {isLeftFrameExpanded && <Component {...componentProps} />}
      </ContainerLeftFrameExpanded>
    </ContainerLeftFrame>
  )
}

function MiddleFrame({
  Component,
  componentProps,
  isLeftFrameExpanded,
  onOpenRight,
  onCloseRight,
  rightFrameWidth,
  leftFrameWidth,
}: {
  Component: any
  componentProps: object
  isLeftFrameExpanded: boolean
  onOpenRight: (x: object) => void
  onCloseRight: () => void
  rightFrameWidth: number
  leftFrameWidth: number
}) {
  return (
    <ContainerMiddleFrame
      isLeftFrameExpanded={isLeftFrameExpanded}
      rightFrameWidth={rightFrameWidth}
      leftFrameWidth={leftFrameWidth}
    >
      <Component
        {...componentProps}
        onOpenRight={onOpenRight}
        onCloseRight={onCloseRight}
        isLeftFrameExpanded={isLeftFrameExpanded}
      />
    </ContainerMiddleFrame>
  )
}

function RightFrame({
  Component,
  componentProps,
  isLeftFrameExpanded,
  onCloseRight,
  onOpenRight,
  rightFrameWidth,
  isRightFrameCaretShowing,
}: {
  Component: any
  componentProps: any
  isLeftFrameExpanded: boolean
  isRightFrameCaretShowing: boolean
  onCloseRight: () => void
  onOpenRight: () => void
  backgroundColor?: string
  rightFrameWidth
}) {
  const isShowing = !isLeftFrameExpanded

  return (
    <ContainerRightFrame
      isShowing={isShowing}
      backgroundColor={componentProps && componentProps.backgroundColor}
      rightFrameWidth={rightFrameWidth}
    >
      {!isShowing && isRightFrameCaretShowing && (
        <ContainerExpandRightIcon
          rightFrameWidth={rightFrameWidth}
          onClick={() => onOpenRight()}
        >
          <Icon
            type="caret-left"
            isClickable
            size={iconSizes.S}
            onClick={() => onOpenRight()}
          />
        </ContainerExpandRightIcon>
      )}
      {isShowing && (
        <>
          <ContainerCloseRightIcon>
            <CrossIcon
              height={18}
              onClick={() => onCloseRight()}
              color={baseColors.GREY_ONE}
            />
          </ContainerCloseRightIcon>
          <ContainerRightFrameBody>
            <Component
              {...componentProps}
              isLeftFrameExpanded={isLeftFrameExpanded}
            />
          </ContainerRightFrameBody>
        </>
      )}
    </ContainerRightFrame>
  )
}

export default ThreeFrames
