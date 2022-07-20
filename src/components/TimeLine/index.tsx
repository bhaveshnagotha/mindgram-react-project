import React from 'react'
import styled from 'styled-components'
import { baseColors } from '../../constants/colors'
import theme from '../../theme'

interface IStepperContainer {
  size?: 'sm' | 'md' | 'lg'
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
    font-size: ${({ size }) => (size === 'sm' ? '14px' : '18px')};
    padding: ${({ size }) => (size === 'sm' ? '0px' : '25px 0px')};
  }
`
const Stepper = styled.div`
  --step-transition: background 0.5s, color 0.5s;
  --step-color: hsl(0, 0%, 61%);
  --step-subcolor: ${baseColors.GREY_DARKER};
  --step-bullet-color: white;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
  position: relative;
  z-index: 1;
`
const StepperStep = styled.div``

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
  text-align: center;
  color: var(--step-color);
  display: block;
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
    width: 100%;
    background-image: linear-gradient(
      to right,
      transparent 50%,
      ${({ isComplete, markerBorderColor }) =>
          isComplete
            ? `${markerBorderColor || '#84d3a2'}`
            : baseColors.GREY_LIGHT}
        50%
    );
    background-size: 10px 100%;
    height: ${({ markerSize }) => (markerSize || 30) / 8}px;
    -webkit-transition: var(--step-transition);
    transition: var(--step-transition);
    top: ${({ markerSize }) => (markerSize || 30) / 2}px;
    left: 50%;
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
    z-index: -1;
  }
`
const StepperContent = styled.div`
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
const StepperText = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: ${baseColors.GREY_DARKER};
  -webkit-transition: opacity 0.5s 0.05s;
  transition: opacity 0.5s 0.05s;
  margin-bottom: 1rem;
`

interface IStepperData {
  stepTitle: string
  stepText: string
  stepUrl?: string
}

const Timeline = ({
  data,
  activeIndex,
  title,
  markerSize,
  markerBorder,
  markerBorderColor,
  markerColor,
  size,
}: {
  data: IStepperData[]
  activeIndex: number
  title?: string
  markerSize?: number
  markerBorder?: number
  markerBorderColor?: string
  markerColor?: string
  size?: 'sm' | 'md' | 'lg'
}) => {
  return (
    <StepperContainer size={size} markerSize={markerSize}>
      {title && <h2>{title}</h2>}
      <Stepper>
        {data?.map((timeline: IStepperData, index: number) => {
          const isLastStep = index === data.length - 1
          const isComplete = activeIndex > index
          const isActive = activeIndex === index
          return (
            <StepperStep key={index}>
              {timeline?.stepText && size !== 'sm' && (
                <StepperText title={timeline.stepText}>
                  {timeline.stepText}
                </StepperText>
              )}
              <StepperButton
                onClick={() =>
                  timeline?.stepUrl && window.open(timeline?.stepUrl, '_blank')
                }
                isLastStep={isLastStep}
                isComplete={isComplete}
                isActive={isActive}
                isLink={!!timeline?.stepUrl}
                markerBorder={markerBorder}
                markerSize={markerSize}
                markerBorderColor={markerBorderColor}
                markerColor={markerColor}
              />
              {timeline.stepTitle && size !== 'sm' && (
                <StepperContent title={timeline.stepTitle}>
                  {timeline.stepTitle}
                </StepperContent>
              )}
            </StepperStep>
          )
        })}
      </Stepper>
    </StepperContainer>
  )
}
export default Timeline
