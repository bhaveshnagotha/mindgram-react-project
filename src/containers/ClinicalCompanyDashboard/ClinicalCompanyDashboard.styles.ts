import styled from 'styled-components'
import { baseColors } from '../../constants/colors'
import { scrollBarStyles } from '../App/App.styles'

export const headerHeight = 40
export const actionBarHeight = 55
export const Header = styled.div`
  height: ${headerHeight}px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  padding: 2rem 1.5rem 1rem;
  color: ${baseColors.GREY_DARKER};
`
export const Status = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 10px;
`
export const ActionBar = styled.div`
  height: ${actionBarHeight}px;
  display: flex;
  justify-content: flex-start;
  padding: 0 0 0 10px;
  > div:first-child {
    margin-right: 10px;
  }
  > div {
    > ul {
      max-height: 350px;
      width: 350px;
      ${scrollBarStyles};
    }
  }
`
export const BodyWrapper = styled.div`
  height: calc(100% - ${actionBarHeight + headerHeight}px);
  overflow-y: auto;
  ${scrollBarStyles};
`

export const ItemHeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`

export const BiomarkerContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  row-gap: 0.25rem;
`

export const BiomarkerLabel = styled.span`
  color: ${baseColors.GREY_ONE};
  font-weight: 600;
  margin-right: 0.25rem;
`

export const VerticalLineConnector = styled.div`
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-left: 1.5px solid black;
    background: black;
    height: 100%;
    transform: translateX(0.5rem);
  }
`

export const ConnectedSubtitle = styled.div`
  position: relative;
  margin-left: 1rem;
  padding-left: 0.25rem;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    border-top: 1.5px solid black;
    background: black;
    width: 0.5rem;
    transform: translateX(-0.5rem);
  }

  & .biomarker-tag:not(:last-child) {
    margin-right: 0.25rem;
  }
`
