import styled from 'styled-components'
import { baseColors } from '../../../constants/colors'
import theme from '../../../theme'
import { scrollBarStyles } from '../../App/App.styles'

const ACTION_BAR_HEIGHT = 60
export const CardTitle = styled.p`
  margin-bottom: 0;
  // margin-left: 5px;
  font-size: 16px;
  font-weight: 600;
  color: ${baseColors.GREY_ONE};
`
export const CardSubtitle = styled.div`
  display: flex;
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 400;
  color: ${baseColors.GREY_DARKER};
`
export const ActionBarWrapper = styled.div`
  height: ${ACTION_BAR_HEIGHT}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const ExpandIconWrapper = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  background-color: ${baseColors.WHITE};
  box-shadow: ${theme.boxShadow};
`
export const ProductDetailBody = styled.div<{ productCardHeight: number }>`
  /* height: calc(
    100% - ${({ productCardHeight }) => ACTION_BAR_HEIGHT + productCardHeight}px
  ); */
  /* height: calc(100% - ${ACTION_BAR_HEIGHT}px); 
  overflow-y: auto;
  ${scrollBarStyles}; */
`
export const ProductAccordionWrapper = styled.div`
  background-color: ${baseColors.WHITE};
  border: 1px solid ${baseColors.GREY_SIX};
  margin-bottom: 1rem;
  border-radius: 6px;
  &:hover {
    box-shadow: ${theme.boxShadow};
  }
`
export const ProductAccordionHeaderWrapper = styled.div<{ isOpen: boolean }>`
  cursor: pointer;
  min-height: 90px;
  padding: 10px 20px;
  background-color: ${({ isOpen }) => isOpen && baseColors.GREY_SEVEN};
  transition: all 150ms ease-in;
  > div.row {
    min-height: 90px;
  }
`
export const ProductAccordionBodyWrapper = styled.div`
  padding: 0 20px;
`
export const ProductActionDropdownWrapper = styled.div`
  > div {
    margin-right: 10px;
  }
`
export const CaretWrapper = styled.div<{ isAccordionOpen: boolean }>`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;

  > svg {
    transition: all ease-in-out 200ms;
    transform: ${({ isAccordionOpen }) =>
      isAccordionOpen ? 'rotate(90deg)' : 'rotate(0deg)'};
  }
`
export const CircleWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: start;
  align-items: center;
  > p {
    margin-bottom: 0;
    margin-left: 10px;
  }
`
export const AccordionTitle = styled.p`
  font-size: 16px;
  color: ${baseColors.GREY_ONE};
  font-weight: 600;
  margin-bottom: 5px;
`
export const AccordionText = styled.p`
  font-size: 16px;
  color: ${baseColors.GREY_DARKER};
  margin-bottom: 0;
`
export const Circle = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: ${baseColors.WHITE};
  border: 6px solid ${baseColors.BLUE_FIVE};
`
export const ProductTimelineWrapper = styled.div`
  width: 100%;
  /* padding: 30px 0px; */
  /* border-top: 2px solid ${baseColors.GREY_SIX}; */
`
export const ProductAccordionColTitle = styled.p`
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${baseColors.GREY_ONE};
`
export const ProductAccordionColText = styled.div`
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 400;
  color: ${baseColors.GREY_DARKER};
`
export const ProductAccordionColLink = styled.a`
  text-decoration: none;
  font-size: 16px;
  transition: all ease-in 100ms;
  color: ${baseColors.BLUE_FIVE};
  svg > g > g > g {
    fill: ${baseColors.BLUE_FIVE};
  }
  svg > g > g > path {
    stroke: ${baseColors.BLUE_FIVE};
  }
  &:hover {
    text-decoration: none;
    color: ${baseColors.BLUE_FIVE};
  }
`

export const ClinicalTrialsWrapper = styled.div`
  background: ${baseColors.WHITE};
  position: relative;
  border-radius: 6px;
  padding: 20px;
  min-height: 500px;
`
