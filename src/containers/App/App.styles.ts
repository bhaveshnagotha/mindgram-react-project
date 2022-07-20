import styled, { css } from 'styled-components'

import { baseColors, fontColors } from '../../constants/colors'
import { Link } from 'react-router-dom'
import theme from '../../theme'

export const NAVBAR_HEIGHT = 70
export const BREADCRUMBS_HEIGHT = 40
export const NAVLINKS_HEIGHT = 50
export const SIDEBAR_WIDTH = 60

const AppContainer = styled.div`
  background: ${baseColors.TABLE_BORDER};
  color: ${fontColors.PRIMARY};
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  height: 100vh;
`

interface IProps {
  isAuthenticated: boolean
}
export const scrollBarStyles = css`
  ::-webkit-scrollbar {
    width: 0.3rem;
    height: 0.3rem;
  }
  ::-webkit-scrollbar-thumb {
    background: #d0d0d0;
  }
  ::-webkit-scrollbar-track {
    background: #eaeaea;
  }
`
const PageBodyContainer = styled.div<IProps>`
  display: flex;
  flex-flow: column;
  top: ${(props) => (props.isAuthenticated ? `${NAVBAR_HEIGHT}px` : '0px')};
  bottom: 0px;
  left: ${(props) => (props.isAuthenticated ? `${SIDEBAR_WIDTH}px` : '0px')};
  right: 0px;
  position: absolute;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${baseColors.TABLE_BORDER};
  margin-left: auto;
  margin-right: auto;
  margin: 0;
  padding: 0;
  ${scrollBarStyles};
`

export const StyledLink = styled<any>(Link)`
  text-decoration: none;
  color: ${baseColors.GREY_DARKER};
  transition: all ease-in 100ms;
  font-weight: 400;
  font-size: 16px;
  &:hover {
    color: ${baseColors.BLUE_FIVE};
    text-decoration: underline;
  }
  &::after {
    content: ${({ content }) => (content ? `'${content}'` : '')};
    background: ${(props) => (props.bgcolor ? props.bgcolor : 'transparent')};
    ${(props) =>
      props.borderColor ? `border: 2px solid ${props.borderColor}` : ''};
    ${(props) => (props.color ? `color: ${props.color}` : '')};
    ${(props) => (props.width ? `width: ${props.width}` : '')};
    font-family: ${theme.fonts.sourceSansPro};
    font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 600)};
    border-radius: 20px;
    max-height: ${({ height }) => height || 25}px;
    padding: 3px 15px;
    font-size: 12px;
    min-width: 60px;
    text-transform: uppercase;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-left: 5px;
  }
`
export const NoDataErrorMsg = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: italic;
  font-weight: 600;
  font-size: 20px;
  color: ${baseColors.GREY_DARK};
`

export const NoDataErrorMsgSmall = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 25px 25px 25px 25px;
  font-style: italic;
  font-weight: 600;
  font-size: 16px;
  color: ${baseColors.GREY_DARK};
`

export { AppContainer, PageBodyContainer }
