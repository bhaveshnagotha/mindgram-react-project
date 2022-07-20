import React from 'react'
import styled from 'styled-components'
import { baseColors } from '../../constants/colors'
import theme from '../../theme'

interface IIconWrapper {
  backgroundColor?: string
  borderRadius?: string
  color?: string
}

const IconWrapper = styled.span<IIconWrapper>`
  background: ${(props) => props.backgroundColor};
  border-radius: ${(props) => props.borderRadius};
  color: ${(props) => props.color};
  padding: 8px 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const SwitchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

interface IText {
  color?: string
  fontWeight?: number
  fontSize?: string
}

const Text = styled.p<IText>`
  margin-right: 15px;
  margin-bottom: 0;
  font-weight: ${(props) => props.fontWeight || 400};
  color: ${(props) => props.color || 400};
  font-family: ${theme.fonts.sourceSansPro};
  font-size: ${(props) => props.fontSize || '14px'};
  text-transform: uppercase;
  user-select: none;
`

export default function Switch({
  hasActiveBg,
  isActive,
  handleSwitch,
  switchText,
  switchIcons,
}: {
  hasActiveBg?: boolean
  switchText?: string
  isActive: boolean
  handleSwitch?: (val: { isSwitchOn: boolean }) => object | undefined | void
  switchIcons: {
    iconLeft: React.ReactNode
    iconRight: React.ReactNode
  }
}) {
  return (
    <SwitchWrapper>
      {switchText && (
        <Text color={baseColors.GREY_DARK} fontSize="12px" fontWeight={700}>
          {switchText}
        </Text>
      )}
      <SwitchWrapper
        style={{ boxShadow: theme.boxShadow, borderRadius: '5px' }}
      >
        <IconWrapper
          backgroundColor={
            hasActiveBg && !isActive ? baseColors.BLUE_FIVE : baseColors.WHITE
          }
          color={
            hasActiveBg && !isActive ? baseColors.WHITE : baseColors.GREY_DARK
          }
          borderRadius="5px 0px 0px 5px"
          onClick={() => handleSwitch && handleSwitch({ isSwitchOn: false })}
        >
          {switchIcons.iconLeft}
        </IconWrapper>
        <IconWrapper
          backgroundColor={
            hasActiveBg && isActive ? baseColors.BLUE_FIVE : baseColors.WHITE
          }
          color={
            hasActiveBg && isActive ? baseColors.WHITE : baseColors.GREY_DARK
          }
          borderRadius="0px 5px 5px 0px"
          onClick={() => handleSwitch && handleSwitch({ isSwitchOn: true })}
        >
          {switchIcons.iconRight}
        </IconWrapper>
      </SwitchWrapper>
    </SwitchWrapper>
  )
}
