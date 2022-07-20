import styled, { css, keyframes } from 'styled-components'

import { baseColors } from '../../constants/colors'
import { NAVBAR_HEIGHT, scrollBarStyles } from '../../containers/App/App.styles'

export const BODY_PADDING_TOP = 10 // Padding from the navbar for all three farmes
const SLIDE_IN_DURATION = 0.5
const EXPAND_LEFT_FRAME_WIDTH = 60
const EXPAND_RIGHT_FRAME_WIDTH = 30
const Z_INDEX_EXPAND_BUTTON = 500

const rightFrameWidth = 600
const iconContainerHeight = 70

function getKeyFrames(
  fromPosition: string | number,
  toPosition: string | number
) {
  const result = keyframes`
    from {
      -webkit-transform: translate3d(${fromPosition}, 0, 0);
      transform: translate3d(${fromPosition}, 0, 0);
    }

    to {
      -webkit-transform: translate3d(${toPosition}, 0, 0);
      transform: translate3d(${toPosition}, 0, 0);
    }
  `
  return result
}

function getLeftSlideRule(isShowing: boolean) {
  let slideKeyFrames
  if (isShowing) {
    slideKeyFrames = getKeyFrames('-100%', '0%')
  } else {
    slideKeyFrames = getKeyFrames('0%', '-100%')
  }
  const slideRule = css`
    ${slideKeyFrames} ${SLIDE_IN_DURATION}s forwards;
  `
  return slideRule
}

function getRightSlideRule(isShowing: boolean, width: number | string) {
  let slideKeyFrames
  if (isShowing) {
    slideKeyFrames = getKeyFrames('100%', width)
  } else {
    slideKeyFrames = getKeyFrames(width, '100%')
  }
  const slideRule = css`
    ${slideKeyFrames} ${SLIDE_IN_DURATION}s forwards;
  `
  return slideRule
}

function getKeyFramesForMiddleLeftExpanded(width, leftFrameWidth) {
  const result = keyframes`
    from {
      -webkit-transform: translate3d(${EXPAND_LEFT_FRAME_WIDTH}, 0, 0);
      transform: translate3d(${EXPAND_LEFT_FRAME_WIDTH}, 0, 0);
      //width: calc(100% - ${width}px - ${EXPAND_LEFT_FRAME_WIDTH}px);
      left: ${EXPAND_LEFT_FRAME_WIDTH}px;
    }

    to {
      -webkit-transform: translate3d(${leftFrameWidth}, 0, 0);
      transform: translate3d(${leftFrameWidth}, 0, 0);
      //width: calc(100% - ${leftFrameWidth}px);
      left: ${leftFrameWidth}px;
    }
  `
  return result
}

function getKeyFramesForMiddleLeftCollapsed(width, leftFrameWidth) {
  const result = keyframes`
    from {
      -webkit-transform: translate3d(${leftFrameWidth}, 0, 0);
      transform: translate3d(${leftFrameWidth}, 0, 0);
      //width: calc(100% - ${leftFrameWidth}px);
      left: ${leftFrameWidth}px;
    }

    to {
      -webkit-transform: translate3d(${EXPAND_LEFT_FRAME_WIDTH}, 0, 0);
      transform: translate3d(${EXPAND_LEFT_FRAME_WIDTH}, 0, 0);
      //width: calc(100% - ${width}px - ${EXPAND_LEFT_FRAME_WIDTH}px);
      left: ${EXPAND_LEFT_FRAME_WIDTH}px;
    }
  `
  return result
}

function getMiddleSlideRule(
  isLeftExpanded: boolean,
  width: number,
  leftFrameWidth: number
) {
  let slideKeyFrames
  if (isLeftExpanded) {
    slideKeyFrames = getKeyFramesForMiddleLeftExpanded(width, leftFrameWidth)
  } else {
    slideKeyFrames = getKeyFramesForMiddleLeftCollapsed(width, leftFrameWidth)
  }
  const slideRule = css`
    ${slideKeyFrames} ${SLIDE_IN_DURATION}s forwards;
  `
  return slideRule
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
`

export const ContainerLeftFrame = styled.div`
  float: left;
  height: 100%;
`

const sharedLeftFrameStyles = css`
  position: fixed;
  left: ${NAVBAR_HEIGHT};
`

export const ContainerExpandLeftIcon = styled.div`
  height: 100%;
  padding: 10px 0px;
  text-align: center;
  width: ${EXPAND_LEFT_FRAME_WIDTH}px;

  z-index: ${Z_INDEX_EXPAND_BUTTON};
  ${sharedLeftFrameStyles};
`

export const ContainerExpandRightIcon = styled.div<{ rightFrameWidth: number }>`
  /* height: 100%; */
  padding: 10px 0px;
  text-align: center;
  width: ${EXPAND_RIGHT_FRAME_WIDTH}px;

  z-index: ${Z_INDEX_EXPAND_BUTTON};
  position: fixed;
  cursor: pointer;
  right: ${(props) =>
    props.rightFrameWidth
      ? props.rightFrameWidth + 30
      : rightFrameWidth + 30}px;
`

export const ContainerLeftFrameExpanded = styled.div<{
  isShowing: boolean
  leftWidth?: number
}>`
  animation: ${(props) => getLeftSlideRule(props.isShowing)};
  /* setting the background in order to hide the expand button */
  background: ${baseColors.TABLE_BORDER};
  height: 100%;
  width: ${(props) => props.leftWidth}px;

  z-index: 1000;
  ${sharedLeftFrameStyles};
  padding-top: ${BODY_PADDING_TOP}px;
`
interface IContainerMiddleFrame {
  leftFrameWidth: number
  isLeftFrameExpanded: boolean
}

export const ContainerMiddleFrame = styled.div<IContainerMiddleFrame>`
  animation: ${(props) => {
    return getMiddleSlideRule(
      props.isLeftFrameExpanded,
      400,
      props.leftFrameWidth
    )
  }};
  height: 100%;
  //position: fixed;
  //float: left;
  background: ${baseColors.TABLE_BORDER};
  padding-top: ${BODY_PADDING_TOP}px;
`
interface IContainerRightFrame {
  backgroundColor?: string
  isShowing: boolean
  rightFrameWidth?: number
}

export const ContainerRightFrame = styled.div<IContainerRightFrame>`
  animation: ${(props) => {
    const width = props.rightFrameWidth
      ? props.rightFrameWidth
      : rightFrameWidth
    return getRightSlideRule(props.isShowing, width)
  }};
  border-left: 1px solid ${baseColors.GREY};
  float: right;
  height: 100%;
  width: ${(props) =>
    props.rightFrameWidth ? props.rightFrameWidth : rightFrameWidth}px;
  background: ${(props) =>
    props.backgroundColor ? props.backgroundColor : ''};
  position: relative;
  ${scrollBarStyles};
`

export const ContainerCloseRightIcon = styled.div`
  height: ${iconContainerHeight}px;
  padding: 20px 20px;
  text-align: left;
  width: 100%;
  display: flex;
  align-items: center;
`

export const ContainerRightFrameBody = styled.div`
  padding: 0px 20px;
  width: 100%;
  height: calc(100% - ${iconContainerHeight}px);
  overflow-y: auto;
  ${scrollBarStyles};
`

export const HamburgerContainer = styled.div<{ isOpen: boolean }>`
  display: block;
  position: relative;
  top: 50px;
  left: 50px;

  z-index: 800;

  -webkit-user-select: none;
  user-select: none;

  & div.menu {
    position: absolute;
    width: 300px;
    margin: -100px 0 0 -50px;
    padding-top: ${BODY_PADDING_TOP};

    background: #ededed;
    list-style-type: none;
    -webkit-font-smoothing: antialiased;
    /* to stop flickering of text in safari */

    transform-origin: 0% 0%;
    transform: ${(props) => (props.isOpen ? 'none' : 'translate(-100%, 0)')};

    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  }
`

export const HamburgerBody = styled.div`
  height: 100%;
`
