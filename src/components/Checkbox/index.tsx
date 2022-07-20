import React from 'react'
import styled from 'styled-components'
import { baseColors } from '../../constants/colors'

interface ICheckbox {
  checked: boolean
  isInverted?: boolean
  isDisabled?: boolean
  onChange?: (e: any) => void
  onClick?: (e: any) => void
  label?: string
  id?: string
  value?: any
  name?: string
}

const CheckboxWrapper = styled.div<{
  isChecked: boolean
  isDisabled?: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  label:last-child {
    ${(props) => (props.isDisabled ? 'opacity: .5' : '')};
    font-size: 16px;
    margin: 0;
    cursor: pointer;
    color: ${(props) =>
      props.isChecked ? props.theme.btnBg : props.theme.primaryTextColor};
    transition: all ease-in 200ms;
    user-select: none;
  }
`

const CheckboxLabel = styled.label<{ isInverted?: boolean }>`
  display: inline-block;
  position: relative;
  padding-left: 28px;
  margin-bottom: 18px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover input ~ span.checkmark {
    border: 1.2px solid #b3b3b3;
    transition: all ease-in 200ms;
  }

  input:checked ~ span.checkmark {
    background-color: ${(props) =>
      props.isInverted ? '' : baseColors.BLUE_FIVE};
    border: 1.2px solid ${baseColors.BLUE_FIVE};
    transition: all ease-in 200ms;
  }

  input:checked ~ span.checkmark::after {
    display: block;
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  span.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    border-radius: 4px;
    width: 18px;
    border: 1.2px solid ${baseColors.BLUE_FIVE};
    transition: all ease-in 200ms;
  }

  span.checkmark::after {
    content: '';
    position: absolute;
    display: none;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 10px;
    border: solid
      ${(props) => (props.isInverted ? baseColors.BLUE_FIVE : '#fff')};
    border-width: 0 1.3px 1.3px 0;
    transform: translate(-60%, -60%) rotate(45deg);
  }
`

const Checkbox: React.FC<ICheckbox> = (props) => {
  const {
    checked,
    onChange,
    onClick,
    label,
    id,
    isInverted,
    isDisabled,
  } = props

  return (
    <CheckboxWrapper
      isChecked={checked}
      isDisabled={isDisabled}
      onClick={(e) => !isDisabled && onClick?.(e)}
    >
      <CheckboxLabel isInverted={isInverted}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => !isDisabled && onChange?.(e)}
        />
        <span className="checkmark"></span>
      </CheckboxLabel>
      {label && <label htmlFor={id}>{label}</label>}
    </CheckboxWrapper>
  )
}

export default Checkbox
