import styled from 'styled-components'
import { baseColors } from '../../../constants/colors'
import theme from '../../../theme'
import { scrollBarStyles } from '../../App/App.styles'

export const CONTAINER_HEADER_HEIGHT = 120
export const ContainerBody = styled.div<{
  isWindowView?: boolean
  width?: number
  height?: number
}>`
  height: ${({ height }) => (height ? height + 'px' : '100%')};
  width: ${({ width }) => (width ? width + 'px' : '100%')};
  background: ${baseColors.WHITE};
  position: relative;
  margin: ${({ isWindowView }) => (isWindowView ? '0' : '0 0%')};
  z-index: 9998;
`
export const ContainerContent = styled.div<{ isWindowView?: boolean }>`
  height: ${({ isWindowView }) =>
    isWindowView ? '100%' : `calc(100% - ${CONTAINER_HEADER_HEIGHT}px)`};
  width: 100%;
  overflow-y: auto;
`
export const ContainerHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 30px;
  height: ${CONTAINER_HEADER_HEIGHT}px;
  box-shadow: ${theme.boxShadow};
  width: 100%;
  z-index: 1;
  background: ${baseColors.WHITE};
  transition: all ease-in-out 200ms;
`
export const ContainerHeaderTextWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: start;
  width: 100%;
  flex-flow: column;
  > p {
    margin-bottom: 0;
    font-size: 15px;
    font-weight: 600;
    color: ${baseColors.GREY_ONE};
  }
`
export const ContainerContentBody = styled.div`
  width: 100%;
  overflow-y: auto;
  ${scrollBarStyles}
`
export const CloseViewerButton = styled.div`
  position: absolute;
  right: 0;
  z-index: 9999;
  top: 50%;
  bottom: 50%;
  cursor: pointer;
`
