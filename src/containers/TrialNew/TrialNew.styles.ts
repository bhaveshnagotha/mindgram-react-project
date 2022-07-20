import styled from 'styled-components'

import { baseColors } from '../../constants/colors'
import theme from '../../theme'
import {
  BREADCRUMBS_HEIGHT,
  NAVBAR_HEIGHT,
  scrollBarStyles,
} from '../App/App.styles'
// import Tag from '../../components/Tag/'
const buffer = 10 + BREADCRUMBS_HEIGHT
const fixedHeight = NAVBAR_HEIGHT + buffer
export const filterHeight = 50

export const Container = styled.div``

export const ContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - ${filterHeight}px);
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%) !important;
`

export const ContainerTabBodyWrapper = styled.div`
  height: 100%;
  background: ${baseColors.WHITE};
  display: flex;
  flex-direction: column;
`

export const ContainerTabBody = styled.div<{ padding?: string }>`
  overflow-y: auto;
  padding: ${(props) => (props.padding ? props.padding : '20px')};
  // box-shadow: ${theme.boxShadow};
  ${scrollBarStyles}
  flex: 1;
`

export const ContainerTabs = styled.div`
  width: 100%;
  z-index: 2;

  > nav {
    border-bottom: unset;
    overflow-y: hidden;
    display: flex;
    justify-content: space-between;
    background: #f5f6fa;

    > a {
      padding: 0.8rem 1rem;
      text-align: center;
      flex: 1;
      border: none !important;
      transition: all ease-in 200ms;
      color: ${baseColors.GREY_DARKER};
      font-weight: 600;
      margin-bottom: 0px !important;
      &:hover {
        margin-bottom: 0px !important;
        border: none !important;
        box-shadow: ${theme.boxShadow};
        transition: all ease-in 200ms;
        color: ${baseColors.BLUE_FIVE};
        background: #fff;
        border-radius: 10px 10px 0 0;
      }
    }
    > a.active {
      border: none;
      box-shadow: ${theme.boxShadow};
      border-radius: 10px 10px 0 0;
      color: ${baseColors.BLUE_FIVE} !important;
    }
  }
`

interface IContainerRight {
  isLeftFrameExpanded?: boolean
  isRightFrameCaretShowing?: boolean
}

export const ContainerRight = styled.div<IContainerRight>`
  float: left;
  height: calc(100vh - ${fixedHeight}px);
  overflow-y: auto;
  padding: ${(props) =>
    props.isLeftFrameExpanded && props.isRightFrameCaretShowing
      ? '0 90px 0 30px'
      : '0 30px 0 30px'};
  width: 100%;
  ${scrollBarStyles};
`

interface IText {
  justifyContent?: string
  fontSize?: string
  fontWeight?: string
}

export const Text = styled.p<IText>`
  margin-bottom: 15px;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '700')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '18px')};
  color: ${baseColors.GREY_DARKER};
  width: 100%;
  display: flex;
  align-items: center;
  ${(props) =>
    props.justifyContent && `justify-content: ${props.justifyContent}`};

  > span {
    color: ${baseColors.GREEN_FOUR};
    margin-left: 10px;
    font-size: 25px;
  }

  > span > svg {
    margin-right: 5px;
  }
`

export const TextLink = styled.span`
  color: ${baseColors.BLUE_FIVE} !important;
  font-size: inherit !important;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

interface IPill {
  bgColor?: string
  padding?: string
  height?: string
}

export const Pill = styled.span<IPill>`
  background: ${(props) =>
    props.bgColor ? props.bgColor : baseColors.BLUE_FIVE};
  padding: ${(props) => (props.padding ? props.padding : '5px 10px')};
  border-radius: 20px;
  color: ${baseColors.WHITE};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => (props.height ? props.height : '25px')};
  min-width: 50px;
  cursor: pointer;
  text-transform: uppercase;
  transition: all ease-in 300ms;
  user-select: none;
`
export const Tag = styled.div<{ borderColor: string }>`
  border: 2px solid ${(props) => props.borderColor};
  padding: 5px 20px;
  border-radius: 20px;
  color: ${(props) => props.borderColor};
  text-transform: uppercase;
  font-weight: 400;
  font-size: 12px;
  position: absolute;
  top: 20px;
  right: 20px;
`

interface ITag {
  bgColor?: string
  color?: string
  borderColor?: string
  height?: number
  width?: string
  fontWeight?:
    | number
    | '-moz-initial'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'unset'
    | 'bold'
    | 'normal'
    | 'bolder'
    | 'lighter'
    | undefined
}

export const DocListTag = styled.span<ITag>`
  background: ${(props) => (props.bgColor ? props.bgColor : 'transparent')};
  ${(props) =>
    props.borderColor ? `border: 2px solid ${props.borderColor}` : ''};
  ${(props) => (props.color ? `color: ${props.color}` : '')};
  ${(props) => (props.width ? `width: ${props.width}` : '')};
  font-family: ${theme.fonts.sourceSansPro};
  display: flex;
  justify-content: center;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '')};
  align-items: center;
  border-radius: 20px;
  max-height: ${({ height }) => height || 25}px;
  padding: 3px 15px;
  font-size: 10.5px;
  margin-bottom:50px
  min-width: 60px;
  text-transform: uppercase;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
