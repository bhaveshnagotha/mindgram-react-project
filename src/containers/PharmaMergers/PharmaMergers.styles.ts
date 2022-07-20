import styled from 'styled-components'
import { baseColors } from '../../constants/colors'
import { scrollBarStyles } from '../App/App.styles'
import theme from '../../theme'

const OverlapActionBarHeight = 45
const OverlapFixedSearchBarHeight = 60
export const Container = styled.div`
  margin: 0 1.5rem;
  height: 100%;
  overflow: hidden;
`
export const OverlapActionBar = styled.div`
  height: ${OverlapActionBarHeight}px;
  display: flex;
  align-items: self-start;
  justify-content: space-between;
`
export const OverlapBodyWrapper = styled.div`
  background-color: ${baseColors.WHITE};
  height: calc(100% - ${OverlapActionBarHeight}px);
  overflow: hidden;
`
export const OverlapFixedSearchHeader = styled.div`
  border-bottom: 2px solid ${baseColors.GREY_LIGHT};
  > div {
    padding: 20px;
    height: ${OverlapFixedSearchBarHeight}px;
    > input {
      width: 100%;
    }
  }
`
export const OverlapBody = styled.div`
  height: calc(100% - ${OverlapFixedSearchBarHeight}px);
  overflow-y: auto;
  ${scrollBarStyles};
`
export const OverlapItem = styled.div`
  display: flex;
  flex-flow: column;
  padding: 20px;
  border-bottom: 1px solid ${baseColors.GREY_LIGHT};
  transition: all 150ms ease-in;
  cursor: pointer;
  &:hover {
    box-shadow: ${theme.boxShadow};
  }
`
export const OverlapItemTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${baseColors.GREY_DARKER};
`
export const OverlapItemDetails = styled.div`
  display: flex;
  justify-content: space-between;
`
export const OverlapItemDetailsCol = styled.div`
  flex: 1;
`
export const OverlapItemText = styled.p`
  font-weight: 600;
  color: ${baseColors.GREY_DARK};
  margin-bottom: 0;
`
export const OverlapItemSubtext = styled.p`
  display: flex;
  align-items: center;
  font-weight: 600;
  color: ${baseColors.GREY_DARKER};
  margin-bottom: 0;
`
export const OverlapIcon = styled.div<{ color: string }>`
  display: flex;
  position: relative;
  margin-right: 20px;
  > div:first-child {
    position: absolute;
    left: 50%;
  }
  > div {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${(props) => props.color || baseColors.MAROON_FIVE};
    opacity: 0.5;
  }
`
