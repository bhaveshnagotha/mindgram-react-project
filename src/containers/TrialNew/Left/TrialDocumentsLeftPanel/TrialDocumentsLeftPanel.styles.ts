import styled from 'styled-components'

import { baseColors } from '../../../../constants/colors'
import { Flex } from '../../../../primitives'
import theme from '../../../../theme'
import { scrollBarStyles } from '../../../App/App.styles'

const containerActionBarHeight = 60

export const Container = styled.div`
  height: 100%;
  // left: 4vh;
  // position: absolute;
`

export const ContainerActionBar = styled(Flex)`
  align-items: center;
  justify-content: center;
  flex-flow: column;
  height: ${containerActionBarHeight}px;
  padding: 15px 20px;
`
export const ContainerActionBarItems = styled(Flex)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  > div > ul {
    width: 170px;
    min-width: 170px;
    padding: 10px;
    box-shadow: ${theme.boxShadow} !important;
    max-height: 400px;
    ${scrollBarStyles}
  }
`

export const ContainerSearchBar = styled.div`
  height: 100%;
  > div {
    padding-left: 0;
  }
`

export const ContainerActionButtons = styled.div`
  float: right;
  height: 100%;
  padding-top: 5px;
`

export const ContainerRows = styled.div`
  height: calc(100% - ${containerActionBarHeight}px - 30px);
  overflow-y: auto;
  > div {
    &:nth-child(1) {
      border-bottom: 1px solid ${baseColors.GREY};
    }
  }

  ${scrollBarStyles}
`

export const ContainerRow = styled.div`
  width: 100%;
  box-shadow: ${(props: { isActive: boolean }) =>
    props.isActive ? theme.boxShadow : ''};
  border-top: 1px solid ${baseColors.GREY};
  cursor: pointer;
  padding: 13px 20px;
  display: flex;
  flex-flow: column;
  transition: all ease-in 100ms;
  color: ${(props: { isActive: boolean; isSmartDocActive?: boolean }) =>
    props.isActive && !props.isSmartDocActive
      ? baseColors.BLUE_FIVE
      : baseColors.GREY_DARKER};
  &:hover {
    box-shadow: ${theme.boxShadow};
    transition: all ease-in 200ms;
  }
`

export const ContainerRowIndex = styled.div`
  color: ${baseColors.GREY_DARK};
  margin-right: 10px;
`

export const ContainerDocumentTextWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

export const ContainerFiledOnText = styled.div`
  font-family: ${theme.fonts.sourceSansPro};
  font-weight: 500;
  color: #737373;
  font-size: 12.5px;
  margin-top: 8px;
  margin-left: 19px;
  font-style: italic;
`

export const ContainerDocumentText = styled.div`
  text-overflow: ellipsis;
  height: 100%;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  font-family: ${theme.fonts.sourceSansPro};
  font-weight: 500;
`
export const ContainerDocumentIcons = styled.div`
  height: 100%;
  padding-left: 15px;
  width: 10%;
`
export const ContainerDocumentIcon = styled.span`
  margin-left: 40px;
`

export const ActiveDocumentButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
export const ActiveDocumentButton = styled.div`
  color: ${baseColors.GREY_DARK};
  font-weight: 600;
  font-size: 12px;
`
