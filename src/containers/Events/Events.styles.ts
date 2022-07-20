import styled from 'styled-components'
import { baseColors } from '../../constants/colors'
import theme from '../../theme'
import { scrollBarStyles } from '../App/App.styles'

const eventsActionBarHeight = 55
const eventActionBarExpandedHeight = 90
const eventsFixedSearchBarHeight = 60
const tabsHeight = 50

export const Container = styled.div`
  margin: 0 1.5rem;
  height: 100%;
  overflow-y: hidden;
`
export const ContainerTabs = styled.div`
  width: 100%;
  z-index: 2;

  > nav {
    border-bottom: unset;
    overflow-y: hidden;
    display: flex;
    justify-content: start;
    background: #f5f6fa;

    > a {
      padding: 0.8rem 1rem;
      text-align: center;
      min-width: 150px;
      border: none !important;
      transition: all ease-in 200ms;
      color: ${baseColors.GREY_DARKER};
      font-weight: 600;
      margin-bottom: 0px !important;
      &:focus {
        outline: none;
      }
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
export const ContainerTabBodyWrapper = styled.div`
  height: 100%;
  background: ${baseColors.WHITE};
  height: calc(100% - ${tabsHeight}px);
  overflow-y: auto;
  box-shadow: ${theme.boxShadow};
  border-radius: 0px 10px 10px 10px;

  ${scrollBarStyles}
`
export const EventsBodyWrapper = styled.div<{ hasActiveFilters: boolean }>`
  background-color: ${baseColors.WHITE};
  height: calc(
    100% -
      ${({ hasActiveFilters }) =>
        hasActiveFilters
          ? eventActionBarExpandedHeight
          : eventsActionBarHeight}px
  );
  transition: height ease-in 150ms;
  overflow: hidden;
`
export const EventsFixedSearchHeader = styled.div`
  border-bottom: 2px solid ${baseColors.GREY_LIGHT};
  > div {
    padding: 20px;
    height: ${eventsFixedSearchBarHeight}px;
    > input {
      width: 100%;
    }
  }
`
export const EventsBody = styled.div`
  height: calc(100% - ${eventsFixedSearchBarHeight}px);
  overflow-y: auto;
  ${scrollBarStyles};
`
export const EventsItem = styled.div`
  display: flex;
  flex-flow: column;
  padding: 1rem;
  border-bottom: 1px solid ${baseColors.GREY_LIGHT};
`
export const EventsItemDetails = styled.div`
  display: flex;
  justify-content: space-between;
`
export const EventsItemDetailsCol = styled.div`
  flex: 1;
`
export const EventsItemText = styled.p`
  font-weight: 600;
  color: ${baseColors.GREY_DARK};
  margin-bottom: 0;
`
export const EventsItemSubtext = styled.p`
  align-items: center;
  font-weight: 400;
  color: ${baseColors.GREY_DARKER};
  margin-bottom: 0;
  overflow-y: auto;
  word-wrap: break-word;
`
export const EventsActionBar = styled.div<{ hasActiveFilters: boolean }>`
  height: ${(props) =>
    props.hasActiveFilters
      ? eventActionBarExpandedHeight
      : eventsActionBarHeight}px;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  transition: height ease-in 150ms;
  padding: 15px;
`
export const EventsActions = styled.div`
  display: flex;
  align-items: self-start;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
  > div {
    margin-right: 0.8rem;
  }
`
export const SelectedFiltersContainer = styled.div<{
  hasActiveFilters: boolean
}>`
  display: flex;
  max-height: ${(props) => (props.hasActiveFilters ? '100%' : 0)};
  transition: max-height ease-in 150ms;
`
export const ClearFilter = styled.div`
  text-transform: uppercase;
  color: ${baseColors.BLUE_FIVE};
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 600;
  margin-left: 1rem;
`
export const SelectedFilter = styled.div`
  background-color: ${baseColors.GREY_SIX};
  color: ${baseColors.GREY_DARKER};
  padding: 3px 10px;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  > svg {
    cursor: pointer;
    margin-left: 1rem;
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
