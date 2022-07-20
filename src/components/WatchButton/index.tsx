import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'

import { baseColors } from '../../constants/colors'
import Button from '../Button'
import { ButtonType } from '../Button/constants'

import Icon from '../Icon'

interface IProps {
  backgroundColor?: string
  color?: string
  hoverBackgroundColor?: string
  hoverColor?: string
  borderColor?: string
  onClick: MouseEventHandler
  useFlex?: boolean
  minWidth?: number
  style?: React.CSSProperties
}

const StyledButton = styled(Button)<IProps>`
  ${(props) =>
    props.useFlex
      ? 'display: flex; justify-content: center; & > * { align-self: center; }'
      : ''}
  min-width: ${(props) => (props.minWidth ? props.minWidth + 'px' : '108px')};
  float: right;
  font-size: 16px;
  border-radius: 0.35rem;
  border: 2px solid
    ${(props) =>
      props.borderColor ? props.borderColor : baseColors.GREY_DARK};

  > p {
    float: right;
    margin: 0;
    margin-left: 7.5px;
  }

  &:hover svg {
    cursor: pointer;
    color: ${(props) =>
      props.hoverColor ? props.hoverColor : baseColors.WHITE};
  }

  &:hover p {
    color: ${(props) =>
      props.hoverColor ? props.hoverColor : baseColors.WHITE};
  }
`

export const WatchButton = ({
  backgroundColor = baseColors.WHITE,
  color = baseColors.GREY_DARKER,
  hoverBackgroundColor = baseColors.GREY_DARKER,
  onClick,
  ...rest
}: IProps) => (
  <StyledButton
    type={ButtonType.NORMAL}
    onClick={onClick}
    backgroundColor={backgroundColor}
    hoverBackgroundColor={hoverBackgroundColor}
    color={color}
    {...rest}
  >
    <Icon type="far fa-eye" />
    <p>Watch</p>
  </StyledButton>
)

export const UnwatchButton = ({
  backgroundColor = baseColors.GREY_DARKER,
  color = baseColors.WHITE,
  hoverBackgroundColor = baseColors.GREY_DARKER,
  onClick,
  ...rest
}: IProps) => (
  <StyledButton
    type={ButtonType.NORMAL}
    onClick={onClick}
    backgroundColor={backgroundColor}
    hoverBackgroundColor={hoverBackgroundColor}
    color={color}
    {...rest}
  >
    <Icon type="far fa-eye-slash" />
    <p>Unwatch</p>
  </StyledButton>
)
