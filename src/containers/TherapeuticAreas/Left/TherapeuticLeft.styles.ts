import styled from 'styled-components'
import { Flex } from '../../../primitives'
import { filterHeight } from '../../TrialNew/TrialNew.styles'
import { baseColors } from '../../../constants/colors'
import { scrollBarStyles } from '../../App/App.styles'
import theme from '../../../theme'

export const TherapeuticItemWrapper = styled.div`
  background-color: ${baseColors.WHITE};
  border-bottom: 2px solid ${baseColors.GREY_LIGHT};
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: ${baseColors.GREY_DARKER};
  user-select: none;

  &:hover {
    background-color: ${baseColors.GREY_LIGHTER};
  }
`

export const ContainerLeftWrapper = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`
export const ActionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${filterHeight}px;
  padding: 0 3%;
  > div:first-child {
    margin-right: 0.5rem;
  }
  > div {
    > ul {
      max-height: 350px;
      width: 350px;
      ${scrollBarStyles};
    }
  }
`
export const InputSearchBarWrapper = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${filterHeight}px;
`
export const StyledBackBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${filterHeight}px;
  padding: 1.2rem;

  span {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    color: #4a4a4a;
    display: block;
    margin-left: 0.7rem;
  }
`

export const StyledHLTConditionItem = styled.div<{
  isActive: boolean
}>`
  border-bottom: 2px solid ${baseColors.GREY_LIGHT};
  padding: 10px 20px;
  padding-left: 35px;
  cursor: pointer;
  user-select: none;
  font-weight: ${(props) => (props.isActive ? 600 : 400)};
  font-size: 14px;
  color: ${baseColors.GREY_DARKER};
  border-left: ${(props) =>
    props.isActive ? `5px solid ${baseColors.BLUE_FIVE}` : ''};
  transition: all 150ms ease-in;
  background-color: ${baseColors.GREY_LIGHTER};
`

export const StyledConditionItem = styled.div<{
  isActive: boolean
}>`
  border-bottom: 2px solid ${baseColors.GREY_LIGHT};
  padding: 10px 20px;
  cursor: pointer;
  user-select: none;
  font-weight: ${(props) => (props.isActive ? 600 : 400)};
  font-size: 16px;
  color: ${baseColors.GREY_DARKER};
  border-left: ${(props) =>
    props.isActive ? `5px solid ${baseColors.BLUE_FIVE}` : ''};
  transition: all 150ms ease-in;
  background-color: ${(props) =>
    props.isActive ? baseColors.GREY_LIGHTER : baseColors.WHITE};
`

export const ContainerSearchBar = styled.div`
  height: 100%;
  width: 100%;
  > div {
    padding-left: 0;
  }
`
export const CatalystItemWrapper = styled.div<{
  isActive: boolean
  isLastItem: boolean
}>`
  border-bottom: 2px solid ${baseColors.GREY_LIGHT};
  padding: 10px 20px;
  cursor: pointer;
  user-select: none;
  border-left: ${(props) =>
    props.isActive ? `5px solid ${baseColors.BLUE_FIVE}` : ''};
  transition: all 150ms ease-in;
  background-color: ${(props) =>
    props.isActive ? baseColors.GREY_LIGHTER : baseColors.WHITE};
  &:hover {
    box-shadow: ${theme.boxShadow};
  }
`
export const CatalystItemHeader = styled.p`
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  font-size: 14px;
  color: ${baseColors.GREY_DARK};
`
export const CatalystItemTitle = styled.p<{ isActive?: boolean }>`
  margin-bottom: 0.5rem;
  font-size: 15px;
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
`
export const CatalystItemSubInfo = styled.p`
  margin-bottom: 0;
  font-size: 14px;
  color: ${baseColors.GREY_DARKER};
  font-weight: 600;
  text-transform: capitalize;
  > span {
    color: ${baseColors.GREY_DARK};
    font-size: 13px;
  }
`

export const LazyLoadIndicator = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 200px;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: ${baseColors.WHITE};
  opacity: 0.5;
`

export const HeaderIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 5px;
`
