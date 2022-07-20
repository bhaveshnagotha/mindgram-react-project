import styled from 'styled-components'
import { BODY_PADDING_TOP } from '../../../../components/ThreeFrames/ThreeFrames.styles'
import { baseColors } from '../../../../constants/colors'
import theme from '../../../../theme'
import { NAVBAR_HEIGHT, scrollBarStyles } from '../../../App/App.styles'

export const CONTAINER_HEADER_HEIGHT = 80

export const ContainerEmptyState = styled.div`
  font-size: 24px;
  font-weight: 600;
  height: calc(100vh - ${NAVBAR_HEIGHT + BODY_PADDING_TOP}px);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${baseColors.GREY_DARK};
  user-select: none;
`
export const ContainerBody = styled.div`
  height: 100%;
  background: ${baseColors.WHITE};
  position: relative;
`

export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  height: ${CONTAINER_HEADER_HEIGHT}px;
  box-shadow: ${theme.boxShadow};
  position: absolute;
  width: 100%;
  z-index: 1;
  background: ${baseColors.WHITE};
`
export const ContainerHeaderTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  margin-right: 20px;
`

export const ContainerButton = styled.div``

export const ContainerTitle = styled.h5`
  font-weight: bold;
  margin-bottom: 0;
  color: ${baseColors.GREY_DARKER};
  font-size: 24px;
  font-weight: 600;
  flex: -1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const ContainerContent = styled.div`
  /* height: calc(100% - ${CONTAINER_HEADER_HEIGHT}px); */
  height: 100%;
  width: 100%;
  overflow-y: hidden;
`

export const ContainerLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

export const DynamicHeightListWrapper = styled.div`
  > div > div > div {
    padding: 20px 0px 0px 20px;
    ${scrollBarStyles}
  }
`

export const DocumentButton = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) =>
    props.disabled ? baseColors.GREY_DARK : baseColors.GREY_DARKER};
  cursor: pointer;
  > span {
    font-weight: 600;
    margin: 0 5px;
    &:first-child {
      margin-left: 20px;
    }
  }
`
