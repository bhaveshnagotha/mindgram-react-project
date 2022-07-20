import React, { useEffect, useState } from 'react'

import styled, { css, keyframes } from 'styled-components'

import { Tag } from '..'
import { baseColors } from '../../constants/colors'
import theme from '../../theme'
import CrossIcon from '../SvgIcons/CrossIcon'
import { scrollBarStyles } from '../../containers/App/App.styles'

const PANE_DEFAULT_WIDTH = 500
const SLIDE_IN_DURATION = 0.5

function getKeyFrames(
  fromPosition: number | string,
  toPosition: number | string
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

function getSlideRule(isShowing: boolean, width: number) {
  let slideKeyFrames
  if (isShowing) {
    slideKeyFrames = getKeyFrames('100vw', width)
  } else {
    slideKeyFrames = getKeyFrames(width, '100vw')
  }
  const slideRule = css`
    ${slideKeyFrames} ${SLIDE_IN_DURATION}s forwards;
  `
  return slideRule
}

interface IContainer {
  isShowing: boolean
  width: number
  backgroundColor: string
  top: number
}
const Container = styled.div<IContainer>`
  animation: ${(props) => getSlideRule(props.isShowing, props.width)};
  background-color: ${(props) => props.backgroundColor};
  position: fixed;
  right: 0px;
  top: ${(props) => `${props.top}px`};
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${window.innerHeight - props.top}px`};
  z-index: 1000;
  box-shadow: ${theme.boxShadow};
`

const sharedStyles = css`
  padding: 0px 20px;
  text-align: left;
  width: -webkit-fill-available;
`

const ContainerCloseRightIcon = styled.div`
  ${sharedStyles};
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TagContainer = styled.div<{ width?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${(props) => `max-width: ${props.width ? props.width : ''}`};
  flex-wrap: wrap;
`
const HelperText = styled.p`
  margin: 0;
  font-family: ${theme.fonts.sourceSansPro};
  font-size: 14px;
  color: ${baseColors.GREY_DARKER};
  margin-right: 10px;
`
const ContainerChildren = styled.div`
  ${sharedStyles};
  height: calc(100% - 40px);
  overflow-y: auto;
  ${scrollBarStyles};
`

interface IProps {
  children: any
  isShowing: boolean
  onClose: () => void
  backgroundColor?: string
  top?: number
  right?: number
  width?: number
  hasTags?: boolean
  tagsData?: string[]
  tagBgColor?: string
  tagBorderColor?: string
  tagColor?: string
  tagName?: string
  tagHelperText?: string
  isStatic?: boolean
  style?: React.CSSProperties
  handleScrollEvent?: React.UIEventHandler
}
function SlidingPane({
  children = null,
  isShowing,
  onClose,
  backgroundColor = baseColors.GREY,
  top = 0,
  right = 0,
  width = PANE_DEFAULT_WIDTH,
  hasTags = false,
  tagsData = [],
  tagBgColor = baseColors.YELLOW_TWO,
  tagBorderColor = baseColors.YELLOW_TWO,
  tagColor = baseColors.YELLOW_TWO,
  tagHelperText = '',
  isStatic = false,
  style,
  handleScrollEvent,
}: IProps) {
  const [ref] = useState(React.createRef<HTMLDivElement>())
  useEffect(() => {
    function listener(e: any) {
      if (isStatic) {
        return
      }
      if (!isShowing || (ref.current && ref.current.contains(e.target))) {
        return
      }
      onClose()
    }
    document.addEventListener('mousedown', listener, false)

    return function cleanup() {
      document.removeEventListener('mousedown', listener, false)
    }
  })

  return (
    <>
      {isShowing && (
        <Container
          ref={ref}
          isShowing={isShowing}
          backgroundColor={backgroundColor}
          top={top}
          width={width}
          style={style}
        >
          <ContainerCloseRightIcon>
            <CrossIcon
              height={18}
              onClick={onClose}
              color={baseColors.GREY_ONE}
            />
            <TagContainer>
              {tagHelperText && <HelperText>{tagHelperText}</HelperText>}
              <TagContainer width="300px">
                {hasTags &&
                  tagsData &&
                  tagsData.map((tag, index) => (
                    <Tag
                      key={index}
                      bgColor={tagBgColor}
                      borderColor={tagBorderColor}
                      color={tagColor}
                      style={{
                        marginBottom: tagsData.length > 1 ? '5px' : '0',
                        marginLeft: tagsData.length > 1 ? '5px' : '0',
                      }}
                    >
                      {tag}
                    </Tag>
                  ))}
              </TagContainer>
            </TagContainer>
          </ContainerCloseRightIcon>
          <ContainerChildren onScroll={handleScrollEvent}>
            {children}
          </ContainerChildren>
        </Container>
      )}
    </>
  )
}

export default SlidingPane
