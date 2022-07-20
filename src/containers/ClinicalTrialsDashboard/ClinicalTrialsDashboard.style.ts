import styled from 'styled-components'
import theme from '../../theme'
import { baseColors } from '../../constants/colors'
import { scrollBarStyles } from '../App/App.styles'

export const cardHeight = 400
export const headerHeight = 50
export const Container = styled.div`
  margin: 0 1.5rem 2% 1.5rem;
  height: 100%;
  /* overflow: hidden; */
  display: grid;
  grid-template-columns: 65% auto;
  grid-gap: 25px;
  // width: 50vh;
`

const row1Height = 600
const row2Height = 400

export const Left = styled.div`
  height: 100%;
  /* overflow: hidden; */
  padding-bottom: 1.5rem;
`
export const LeftTop = styled.div`
  height: ${row1Height}px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 25px;
  margin-bottom: 25px;
`
export const LeftTopInner = styled.div`
  box-shadow: ${theme.boxShadow};
  background-color: ${baseColors.WHITE};
  height: 100%;
  overflow-y: hidden;
`
export const LeftBottom = styled.div`
  height: ${row2Height}px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 25px;
`
export const LeftBottomInner = styled.div`
  box-shadow: ${theme.boxShadow};
  background-color: ${baseColors.WHITE};
  height: 100%;
  overflow-y: auto;
`
export const Right = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding-bottom: 1.5rem;
`

export const RightTop = styled.div`
  height: ${row1Height}px;
  background-color: ${baseColors.WHITE};
  box-shadow: ${theme.boxShadow};
  margin-bottom: 25px;
`

export const RightBottom = styled.div`
  height: ${row2Height}px;
  background-color: ${baseColors.WHITE};
  box-shadow: ${theme.boxShadow};
`

interface IHeaderProps {
  padding?: string
  marginTop?: number
}
export const Header = styled.div<IHeaderProps>`
  height: ${headerHeight}px;
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : 0)}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => (props.padding ? props.padding : '0px 15px 0px 15px')};
  > p {
    color: ${baseColors.GREY_DARKER};
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 0;
  }
  > div {
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    color: ${baseColors.BLUE_ELEVEN};
  }
`
export const BodyWrapper = styled.div`
  height: calc(100% - ${headerHeight}px);
  overflow-y: auto;
  overflow-x: hidden;
  ${scrollBarStyles};
`
export const ItemWrapper = styled.div`
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
export const ItemInnerWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
`
export const ItemInner = styled.div`
  display: flex;
  justify-content: space-between;
`
export const ItemHeader = styled.div`
  display: flex;
  color: ${baseColors.GREY_DARKER};
  align-items: center;
  margin-bottom: 0.5rem;
  > p {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 0;
  }
  > span {
    margin-left: 0.5rem;
  }
`
export const ItemDetailBody = styled.div`
  display: flex;
  > div {
    flex: 1;
  }
`
export const ItemDetailText = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  color: ${baseColors.GREY_DARKER};
  width: 100%;
  height: 20px;
  overflow: hidden;
  position: relative;
  margin-top: 5px;
  ::after {
    content: '...';
    position: absolute;
    top: 0px;
    right: 5px;
  }
`
export const ItemTitle = styled.p`
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 600;
  color: ${baseColors.GREY_ONE};
`
export const ItemSubtitle = styled.div`
  color: ${baseColors.GREY_DARKER};
`

export const LoadingWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
