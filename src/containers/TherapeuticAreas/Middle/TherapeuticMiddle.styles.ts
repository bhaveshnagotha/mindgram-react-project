import styled from 'styled-components'
import { baseColors } from '../../../constants/colors'
import theme from '../../../theme'
import { scrollBarStyles } from '../../App/App.styles'

export const TherapeuticProductsWrapper = styled.div`
  height: 100%;
  position: relative;
  // z-index: 800;
  margin: 0 1.5rem;
`
export const TherapeuticProductsHeader = styled.div`
  background: ${baseColors.WHITE};
  height: 70px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  h1 {
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    color: ${baseColors.GREY_DARKER};
  }
`

export const ProductsContainer = styled.div`
  border-radius: 4px;
  background: ${baseColors.WHITE};
  height: calc(1000px + 1.5rem);
`

export const ProductsListHeader = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  h1 {
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    color: ${baseColors.GREY_DARKER};
  }
`

export const ProductsListActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 10px 10px;
  row-gap: 10px;
  > div {
    margin-right: 0.8rem;
    ul {
      max-height: 350px;
      width: 350px;
      ${scrollBarStyles};
    }
  }
`

export const ItemHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 10px;

  > .arrowIcon {
    cursor: pointer;
    justify-self: start;
  }
`

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`

export const TimelineItemsWrapper = styled.div`
  & .timeline-item:not(:last-child) {
    margin-bottom: 1.25rem !important;
  }
`

export const ConditionProductWrapper = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${baseColors.GREY_LIGHT};
  transition: all 150ms ease-in;
  &:hover {
    box-shadow: ${theme.boxShadow};
  }
  header {
    small {
      font-style: italic;
      font-size: 12px;
      font-weight: 400;
      line-height: 15px;
      color: ${baseColors.GREY_DARK};

      strong {
        font-weight: 600;
        color: ${baseColors.GREY_ONE};
      }
    }
  }
  main {
    margin: 1rem 0;
  }
`

export const ProductsListBodyContainer = styled.div`
  max-height: calc(1000px + 1.5rem - 150px);
  overflow-y: auto;
  ${scrollBarStyles};
`

export const ConditionIconHeader = styled.div`
  display: grid;
  grid-template-columns: 35px 1fr;
  align-items: center;

  & h1 {
    margin: 0;
  }
`

export const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${baseColors.GREY_DARKER};
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
`

export const PublicationsInfoPaneContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 10px;
  padding: 10px;
`

export const PublicationsHeader = styled.div`
  font-size: 18px;
  font-weight: 700;
`

export const PublicationsSubtitle = styled.div`
  font-size: 14px;
  font-style: italic;
`

export const PubAbstractBody = styled.p`
  font-size: 14px;
  margin: 0;
`
