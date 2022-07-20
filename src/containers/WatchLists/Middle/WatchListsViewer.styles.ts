import styled from 'styled-components'
import { baseColors } from '../../../constants/colors'
import { scrollBarStyles } from '../../App/App.styles'

export const CONTAINER_HEADER_HEIGHT = 40
export const ContainerBody = styled.div<{
  isWindowView?: boolean
  width?: number
  height?: number
}>`
  height: ${({ height }) => (height ? height + 'px' : '100%')};
  width: ${({ width }) => (width ? width + 'px' : '100%')};
  background: ${baseColors.WHITE};
  position: relative;
  margin: ${({ isWindowView }) => (isWindowView ? '0' : '0 3%')};
  z-index: 9998;
`
export const ContainerContent = styled.div<{ isWindowView?: boolean }>`
  height: ${({ isWindowView }) =>
    isWindowView ? '100%' : `calc(100% - ${CONTAINER_HEADER_HEIGHT}px)`};
  width: 100%;
  overflow-y: auto;
`
export const ContainerContentBody = styled.div`
  height: calc(100% - ${CONTAINER_HEADER_HEIGHT}px);
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
