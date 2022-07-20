import styled from 'styled-components'
import { baseColors } from '../../../../constants/colors'
import theme from '../../../../theme'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

export const ContainerTrialNumber = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  width: 100%;
  display: flex;
  align-items: center;
  font-family: ${theme.fonts.sourceSansPro};
  color: ${baseColors.GREY_DARKER};
`
export const LoadingWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface IContainerItemLabel {
  bgColor: string
  borderColor: string
}

export const ContainerItemLabel = styled.div<IContainerItemLabel>`
  background: ${(props) => props.bgColor};
  border: 4px solid ${(props) => props.borderColor};
  height: 15px;
  width: 15px;
  border-radius: 50%;
  margin-right: 10px;
  font-size: 15px;
  font-weight: 500;
`

export const SectionHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  height: 40px;
`
export const SectionRight = styled.div``
export const GraphWrapper = styled.div`
  width: 100%;
  height: 100%;
  transform: translateX(-50px);
`

export const SectionTitle = styled.h6`
  font-family: ${theme.fonts.sourceSansPro};
  color: ${baseColors.GREY_DARKER};
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 0;
`

export const IconWrapper = styled.div`
  box-shadow: ${theme.boxShadow};
  width: 35px;
  height: 35px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${baseColors.BLUE_FIVE};
`
interface ISummaryProps {
  flex?: number
  fontSize?: string
  fontColor?: string
  fontWeight?: number
}
export const SummaryWrapper = styled.div<ISummaryProps>`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const SummaryTitle = styled.p<ISummaryProps>`
  flex: ${(props) => (props.flex ? props.flex : 1)};
  color: ${(props) =>
    props.fontColor ? props.fontColor : baseColors.GREY_ONE};
  font-family: ${theme.fonts.sourceSansPro};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 600)};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '13px')};
  margin-bottom: 8px;
`
export const SummaryText = styled.p<ISummaryProps>`
  flex: ${(props) => (props.flex ? props.flex : 3)};
  color: ${(props) =>
    props.fontColor ? props.fontColor : baseColors.GREY_DARKER};
  font-family: ${theme.fonts.sourceSansPro};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '14px')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 600)};
  margin-bottom: 8px;
  > a {
    color: ${baseColors.GREY_DARKER};
    text-decoration: underline;
  }
`

export const Pill = styled.span`
  margin-left: 10px;
  background: ${baseColors.BLUE_SIX};
  padding: 3px 10px;
  border-radius: 15px;
  color: ${baseColors.GREY_DARKER};
  font-weight: 400;
  font-size: 13px;
`

export const PatentDetail = styled.p`
  font-size: 14px;
  font-family: ${theme.fonts.sourceSansPro};
  font-weight: 600;
  color: ${baseColors.GREY_DARKER};
`
