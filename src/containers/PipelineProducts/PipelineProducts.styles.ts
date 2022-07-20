import styled from 'styled-components'
import { baseColors } from '../../constants/colors'
import { scrollBarStyles } from '../App/App.styles'
import theme from '../../theme'

const ActionBarHeight = 45
const ActionBarExpandedHeight = 80
const FixedSearchBarHeight = 60
export const Container = styled.div`
  margin: 0 1.5rem;
  height: 100%;
  /* overflow: hidden; */
`
export const ActionBar = styled.div<{ hasActiveFilters: boolean }>`
  height: ${(props) =>
    props.hasActiveFilters ? ActionBarExpandedHeight : ActionBarHeight}px;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  transition: height ease-in 150ms;
`
export const ActionsList = styled.div`
  display: flex;
  align-items: self-start;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
  > div {
    margin-right: 0.8rem;
    > ul {
      max-height: 350px;
      width: 350px;
      ${scrollBarStyles};
    }
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
export const BodyWrapper = styled.div<{ hasActiveFilters: boolean }>`
  background-color: ${baseColors.WHITE};
  height: calc(
    100% -
      ${(props) =>
        props.hasActiveFilters ? ActionBarExpandedHeight : ActionBarHeight}px
  );
  transition: height ease-in 150ms;
  overflow: hidden;
`
export const FixedSearchHeader = styled.div`
  border-bottom: 2px solid ${baseColors.GREY_LIGHT};
  > div {
    padding: 20px;
    height: ${FixedSearchBarHeight}px;
    > input {
      width: 100%;
    }
  }
`
export const Body = styled.div`
  height: calc(100% - ${FixedSearchBarHeight}px);
  overflow-y: auto;
  ${scrollBarStyles};
`
export const NoDataError = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: italic;
  font-weight: 600;
  font-size: 20px;
  color: ${baseColors.GREY_DARK};
`
export const ItemWrapper = styled.div`
  display: flex;
  flex-flow: column;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${baseColors.GREY_LIGHT};
  transition: all 150ms ease-in;
  cursor: pointer;
  &:hover {
    box-shadow: ${theme.boxShadow};
  }
`
export const ItemInner = styled.div`
  display: flex;
  justify-content: space-between;
`
export const ItemInnerLeft = styled.div`
  display: flex;
  flex-basis: 60%;
  flex-flow: column;
`
export const ItemInnerRight = styled.div`
  display: flex;
  flex-flow: column;
  flex-basis: 40%;
  margin-left: 1rem;
  > div {
    margin-bottom: 0.5rem;
  }
  > p {
    color: ${baseColors.GREY_DARKER};
    margin-bottom: 0;
    text-align: right;
    margin-right: 1.2rem;
    font-size: 16px;
  }
`
export const TimeLineWrapper = styled.div`
  width: 100%;
  > p {
    margin-bottom: 0.3rem;
    margin-left: 6%;
    color: ${baseColors.GREY_DARKER};
    font-weight: 700;
    font-size: 14px;
  }
`

export const ItemSubHeader = styled.span`
  font-style: italic;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  color: ${baseColors.GREY_DARK};

  strong {
    font-weight: 600;
    color: ${baseColors.GREY_ONE};
  }
`

export const ItemHeader = styled.div`
  display: flex;
  color: ${baseColors.GREY_DARKER};
  align-items: center;
  margin-bottom: 0.5rem;
  > p {
    font-weight: 600;
    font-size: 22px;
    margin-bottom: 0;
  }
  > span {
    font-weight: 400;
    font-size: 16px;
  }
  > .separator {
    margin: 0 12px;
    font-size: 16px;
    font-weight: 900;
    color: ${baseColors.BLUE_FIVE};
  }
  > a {
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    text-transform: uppercase;
    margin-left: 1rem;
  }
`
export const ItemDetailBody = styled.div`
  display: flex;
  margin: 1rem 0;
  > div {
    flex: 1;
  }
`
export const ItemTitle = styled.p`
  margin-bottom: 0;
  font-weight: 600;
  color: ${baseColors.GREY_ONE};
  font-size: 16px;
`
export const ItemSubtitle = styled.div`
  color: ${baseColors.GREY_DARKER};
  font-size: 16px;
`
