import React, { Component, MouseEventHandler } from 'react'
import styled, { css } from 'styled-components'

import { baseColors } from '../../constants/colors'
import { ButtonType } from './constants'

import { layout, position, space } from 'styled-system'
import theme from '../../theme'
import Icon from '../Icon'

interface IStyledButtonProps {
  disabled: boolean
  width?: number
  hasShadow?: boolean
  backgroundColor: string
  color: string
  type: 'button'
  hoverBackgroundColor: string
  onClick: MouseEventHandler
}

export const StyledButton = styled.button<IStyledButtonProps>`
  background: ${(props) =>
    props.disabled ? baseColors.GREY_DARK : props.backgroundColor};

  border: 1px solid ${baseColors.WHITE};
  border-radius: 30px;
  color: ${(props) => props.color};
  cursor: pointer;
  height: 35px;
  padding: 0px 10px;
  box-shadow: ${(props) => (props.hasShadow ? theme.boxShadow : '')};
  width: ${(props) => (props.width ? `${props.width}px` : '')};
  transition: all ease-in 150ms;

  &:focus {
    outline: none;
  }

  &:hover {
    background: ${(props) =>
      props.disabled ? baseColors.GREY_DARK : props.hoverBackgroundColor};
  }

  ${position}
  ${layout}
  ${space}
`

const baseLinkStyles = css`
  background: none;
  border: none;
  color: ${(props: { disabled: boolean }) =>
    props.disabled ? baseColors.GREY_DARK : baseColors.BLUE_TWO};
  cursor: pointer;
  font-weight: 500;

  &:hover {
    color: ${(props) =>
      props.disabled ? baseColors.GREY_DARK : baseColors.BLUE_ONE};
  }
`

export const LinkButton = styled.button<any>`
  ${baseLinkStyles};
  ${position}
  ${layout}
  ${space}
`
export const BorderedButton = styled.button<any>`
  background: none;
  border: 2px solid ${(props) => props.color};
  padding: 5px 18px;
  outline: none;
  color: ${(props: { disabled: boolean; color: string }) =>
    props.disabled ? baseColors.GREY_DARK : props.color};
  cursor: pointer;
  font-weight: 500;
  font-size: 12px;
  border-radius: 15px;
  transition: all ease-in 200ms;

  &:hover {
    transition: all ease-in 200ms;
    background: ${(props) =>
      props.disabled ? baseColors.GREY_DARK : props.color};
    color: ${(props) =>
      props.disabled ? baseColors.GREY_DARK : baseColors.WHITE};
  };
  ${position}
  ${layout}
  ${space}
`

export const LinkExternal = styled.a<any>`
  ${baseLinkStyles};
  text-decoration: none;
  ${position}
  ${layout}
  ${space}
`

export const IconButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.gray};
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  outline: 0;
  padding: 5px;
  display: inline-block;

  &:hover {
    color: ${theme.colors.purple};
    outline: 0;
  }

  &:active {
    color: ${theme.colors.darkPurple};
    outline: 0;
  }
  ${position}
  ${layout}
  ${space}
`

interface IProps {
  backgroundColor?: string
  children?: any
  color?: string
  disabled?: boolean
  hasShadow?: boolean
  hoverBackgroundColor?: string
  href?: string
  onClick: MouseEventHandler
  type?: ButtonType
  style?: React.CSSProperties
  icon?: string
  width?: number
  className?: string
}
class Button extends Component<IProps> {
  public static defaultProps = {
    backgroundColor: baseColors.BLUE_TWO,
    children: null,
    color: baseColors.WHITE,
    disabled: false,
    hoverBackgroundColor: baseColors.BLUE_ONE,
    href: '#',
    icon: '',
    type: ButtonType.NORMAL,
  }

  public render() {
    const { type } = this.props

    switch (type) {
      case ButtonType.NORMAL:
        return this.getNormalButton()
      case ButtonType.LINK:
        return this.getLinkButton()
      case ButtonType.BORDERED:
        return this.getBorderedButton()
      case ButtonType.LINK_EXTERNAL:
        return this.getExternalLinkButton()
      case ButtonType.ICON:
        return this.getIconButton()
      case ButtonType.SHADOWED:
        return this.getShadowedButton()

      default:
        return this.getNormalButton()
    }
  }

  private getNormalButton = () => {
    const {
      children,
      disabled,
      color,
      backgroundColor,
      hoverBackgroundColor,
      onClick,
      ...rest
    } = this.props

    return (
      <StyledButton
        {...rest}
        type="button"
        color={color!}
        disabled={disabled!}
        backgroundColor={backgroundColor!}
        hoverBackgroundColor={hoverBackgroundColor!}
        onClick={onClick}
      >
        {children}
      </StyledButton>
    )
  }

  private getShadowedButton = () => {
    const {
      children,
      disabled,
      color,
      backgroundColor,
      hoverBackgroundColor,
      onClick,
      hasShadow,
      ...rest
    } = this.props

    return (
      <StyledButton
        {...rest}
        type="button"
        color={color!}
        disabled={disabled!}
        backgroundColor={backgroundColor!}
        hoverBackgroundColor={hoverBackgroundColor!}
        onClick={onClick}
        hasShadow={hasShadow}
      >
        {children}
      </StyledButton>
    )
  }

  private getBorderedButton = () => {
    const { children, ...rest } = this.props

    return (
      <BorderedButton {...rest} type="button">
        {children}
      </BorderedButton>
    )
  }

  private getLinkButton = () => {
    const { children, ...rest } = this.props

    return (
      <LinkButton {...rest} type="button">
        {children}
      </LinkButton>
    )
  }

  private getExternalLinkButton = () => {
    const { children, ...rest } = this.props

    return (
      <LinkExternal target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </LinkExternal>
    )
  }

  private getIconButton = () => {
    const { icon, type, ...rest } = this.props

    return (
      <IconButton {...rest}>
        <Icon type={icon!} isClickable />
      </IconButton>
    )
  }
}

export default Button
export { ButtonType as buttonTypes }
