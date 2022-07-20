import styled from 'styled-components'
import { Flex } from '../../../primitives'
import { filterHeight } from '../../TrialNew/TrialNew.styles'
import { baseColors } from '../../../constants/colors'
import { scrollBarStyles } from '../../App/App.styles'
import theme from '../../../theme'

export const ContainerLeftWrapper = styled.div`
  display: flex;
  flex-flow: column;
  height: 88vh;
`
export const ActionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${filterHeight}px;
  padding: 0 20px;
  > div:first-child {
    margin-right: 0.5rem;
    width: 100%;
  }
  > div {
    > ul {
      max-height: 350px;
      width: 350px;
      ${scrollBarStyles};
    }
  }
`
export const ContainerActionBar = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  flex-flow: column;
  padding: 10px 20px;
`
export const ContainerSearchBar = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  > div {
    padding-left: 0;
  }
`
export const CatalystItemWrapper = styled.div<{
  isActive: boolean
  isLastItem: boolean
}>`
  border-bottom: 2px solid ${baseColors.GREY_LIGHT};
  padding: 10px 10px;
  cursor: pointer;
  border-left: ${(props) =>
    props.isActive ? `5px solid ${baseColors.BLUE_FIVE}` : ''};
  transition: all 150ms ease-in;
  background-color: ${(props) =>
    props.isActive ? baseColors.GREY_LIGHTER : 'unset'};
  &:hover {
    box-shadow: ${theme.boxShadow};
  }
`
export const CatalystItemHeader = styled.p`
  margin-bottom: 0.5rem;
  span:first-child {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    color: ${baseColors.GREY_ONE};
  }
  span.bullet {
    color: ${baseColors.GREY_DARKER};
    font-size: 20px;
    margin: 0 5px;
  }
  span.bar {
    color: ${baseColors.GREY_DARKER};
    margin: 0 5px;
  }
  strong {
    color: ${baseColors.GREY_DARKER};
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
  }
  small {
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: ${baseColors.GREY_DARKER};
  }
`
export const CatalystItemTitle = styled.p<{ isActive?: boolean }>`
  margin-bottom: 0.5rem;
  font-size: 14px;
  color: ${baseColors.GREY_DARKER};
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
