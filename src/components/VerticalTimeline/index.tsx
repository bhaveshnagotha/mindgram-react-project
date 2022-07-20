import React from 'react'
import styled from 'styled-components'
import { baseColors } from '../../constants/colors'
import theme from '../../theme'

export enum StepperSize {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
}

interface IStepperContainer {
  size?: StepperSize
  markerSize?: number
}

const StepperContainer = styled.div<IStepperContainer>`
  margin: 0;
  padding: 0;
  h2 {
    font-family: ${theme.fonts.sourceSansPro};
    color: ${baseColors.GREY_DARKER};
    text-align: left;
    width: 90%;
    font-weight: 700;
    font-size: ${({ size }) => (size === StepperSize.Small ? '14px' : '18px')};
    padding: ${({ size }) => (size === StepperSize.Small ? '0px' : '25px 0px')};
  }
`
const Stepper = styled.div`
  --step-transition: background 0.5s, color 0.5s;
  --step-color: hsl(0, 0%, 61%);
  --step-subcolor: ${baseColors.GREY_DARKER};
  --step-bullet-color: white;
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(1px, 1fr));
  position: relative;
  z-index: 1;
`
const StepperStep = styled.div`
  display: flex;
`

interface IStepperButton {
  isLastStep: boolean
  isComplete: boolean
  isActive: boolean
  isLink: boolean
  markerBorder?: number
  markerSize?: number
  markerColor?: string
  markerBorderColor?: string
}

const StepperButton = styled.div<IStepperButton>`
  position: relative;
  display: inline-block;
  margin: 0 15px;
  text-align: center;
  color: var(--step-color);
  ${({ isLink }) =>
    isLink
      ? '&:hover::before { transition: transform 0.5s; transform: scale(1.2); }'
      : ''};
  &::before {
    content: '';
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    margin: 0 auto ${({ markerSize }) => (markerSize || 30) / 2}px;
    border: ${({ isComplete, isActive, markerBorder, markerBorderColor }) =>
      isComplete || isActive
        ? `${markerBorder ?? 6}px solid ${markerBorderColor || '#5abb7f'}`
        : `${markerBorder ?? 6}px solid ${baseColors.GREY_LIGHT}`};
    height: ${({ markerSize }) => markerSize || 30}px;
    width: ${({ markerSize }) => markerSize || 30}px;
    border-radius: ${({ markerSize }) => markerSize || 30}px;
    -webkit-transition: var(--step-transition);
    transition: var(--step-transition);
    background: ${({ isComplete, markerColor }) =>
      isComplete ? `${markerColor || '#84d3a2'}` : '#fff'};
    color: var(--step-bullet-color);
    ${({ isLink }) => (isLink ? 'cursor:pointer' : '')};
  }
  &::after {
    ${(props) => (props.isLastStep ? 'display:none' : '')};
    content: '';
    position: absolute;
    width: ${({ markerSize }) => (markerSize || 30) / 8}px;
    height: 100%;
    background-image: repeating-linear-gradient(
      to bottom,
      transparent 0 4px,
      ${({ isComplete, markerBorderColor }) =>
          isComplete
            ? `${markerBorderColor || '#84d3a2'}`
            : baseColors.GREY_LIGHT}
        4px 8px
    );
    background-size: 10px 100%;
    -webkit-transition: var(--step-transition);
    transition: var(--step-transition);
    top: ${({ markerSize }) => (markerSize || 30) / 2}px;
    left: 50%;
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    z-index: -1;
  }
`

const StepperDescription = styled.div`
  display: block;
  text-align: center;
  font-style: italic;
  line-height: 1.25;
  padding: 0.25rem;
  margin-bottom: 0;
  color: var(--step-color);
  -webkit-transition: opacity 0.5s 0.05s;
  transition: opacity 0.5s 0.05s;
  ::-moz-selection {
    color: black;
    background: var(--step-bullet-color);
  }
  ::selection {
    color: black;
    background: var(--step-bullet-color);
  }
`
const StepperHeader = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: ${baseColors.GREY_DARKER};
  -webkit-transition: opacity 0.5s 0.05s;
  transition: opacity 0.5s 0.05s;
`

const StepperInfoWrapper = styled.div`
  display: inline-block;
  margin-bottom: 1.5rem;
  * {
    text-align: left;
  }
`

export interface IStepperData {
  title: string
  text: string
  type: string
  url: string
  id: number
}

interface IVerticalTimelineProps {
  data: IStepperData[]
  activeIndex: number
  title?: string
  onStepClick: (id: number, url: string, type: string) => void
  markerSize?: number
  markerBorder?: number
  markerBorderColor?: string
  markerColor?: string
  size?: StepperSize
}

const VerticalTimeline = ({
  data,
  activeIndex,
  title,
  onStepClick,
  markerSize = 25,
  markerBorder = 6,
  markerBorderColor = baseColors.BLUE_FIVE,
  markerColor = baseColors.BLUE_TEN,
  size,
}: IVerticalTimelineProps) => {
  return (
    <StepperContainer size={size} markerSize={markerSize}>
      {title && <h2>{title}</h2>}
      <Stepper>
        {data?.map((step: IStepperData, index: number) => {
          const isLastStep = index === data.length - 1
          const isComplete = activeIndex > index
          const isActive = activeIndex === index
          return (
            <StepperStep key={index}>
              <StepperButton
                onClick={() => {
                  onStepClick(step.id, step.url, step.type)
                }}
                isLastStep={isLastStep}
                isComplete={isComplete}
                isActive={isActive}
                isLink={!!step.url || step.id !== -1}
                markerBorder={markerBorder}
                markerSize={markerSize}
                markerBorderColor={markerBorderColor}
                markerColor={markerColor}
              />
              <StepperInfoWrapper>
                {step.text && size !== StepperSize.Small && (
                  <StepperHeader title={step.text}>{step.text}</StepperHeader>
                )}
                {step.title && size !== StepperSize.Small && (
                  <StepperDescription>{step.title}</StepperDescription>
                )}
              </StepperInfoWrapper>
            </StepperStep>
          )
        })}
      </Stepper>
    </StepperContainer>
  )
}

export default VerticalTimeline
