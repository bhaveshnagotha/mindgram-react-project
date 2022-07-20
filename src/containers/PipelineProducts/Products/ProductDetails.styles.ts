import styled from 'styled-components'
import { baseColors } from '../../../constants/colors'
import { ItemSubHeader } from '../PipelineProducts.styles'
export const HEADER_MAX_HEIGHT = 100

export const FDALabelTag = styled.div`
  display: inline-block;
  cursor: pointer;
  padding: 5px 12px;
  background-color: ${baseColors.GREY_SIX};
  color: ${baseColors.GREY_DARKER};
  font-weight: 600;
  font-size: 12px;
  line-height: 13px;
  border-radius: 50px;
  margin-right: 10px;
`
export const StyledDiv = styled.div`
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 4px;
  }
  padding: 0px 0 0px 0;
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  gap: 2px;
`
export const StyledBackNavigation = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
`
export const TitleContainer = styled.div`
  > p {
    font-weight: 600;
    font-size: 18px;
    line-height: 23px;
    color: ${baseColors.GREY_DARKER};
    margin: 0;
    margin-left: 0rem;
  }
`
export const Header = styled.div`
  display: grid;
  grid-template-columns: fit-content(500px) fit-content(500px) 5fr auto;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0 0rem;

  > p {
    font-weight: 600;
    font-size: 18px;
    line-height: 23px;
    color: ${baseColors.GREY_DARKER};
    margin: 0;
    margin-left: 0rem;
  }
`
export const TagsContainer = styled.div`
  display: flex;
  overflow: auto;
`
export const StyledHeader = styled.div`
  display: flex;
  // align-items: center;
  // height: 50px;
  height: auto;
`
export const HeaderItem = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  height: 100%;
  flex: 1;
  overflow: auto;
`

export const ProductDetailsItemSubHeader = styled(ItemSubHeader)`
  display: flex;
  // align-items: center;
  > div {
    white-space: nowrap;
    margin-right: 10px;
    // padding-right: 10px;
  }
  > strong {
    overflow: auto;
    height: 100%;
    display: flex;
    align-items: center;
    padding-right: 10px;
  }
`
export const ProductDetailsLicensingContainer = styled.div`
  // overflow: auto;
  // flex: 0 0 1px;
  flex: 1;
  display: flex;
  // align-items: center;
  // justify-content: flex-start;
  flex-wrap: wrap;
`
export const TabSwitcher = styled.div`
  background-color: ${baseColors.TABLE_BORDER};
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  margin-left: auto;
  margin-right: 1.5rem;
  margin-bottom: 1rem;
  color: black;
  width: fit-content;

  & span {
    display: inline-block;
    // font-size: 14px;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    padding: 0.25rem 0.5rem;
    // transition: all ease-in 200ms;
  }

  & span:hover {
    cursor: pointer;
  }

  & span.active {
    background-color: ${baseColors.WHITE};
    border-radius: 0.25rem;
    color: ${baseColors.BLUE_FIVE};
  }
`
export const CompetitiveTabTypes = {
  CompLands: 'competitiveLandscape',
  DevTime: 'developmentTimeline',
}
