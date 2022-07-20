import styled from 'styled-components'
import { baseColors } from '../../constants/colors'
import { Label } from '../../primitives'
import theme from '../../theme'

interface IContainerProps {
  roundedBorder: boolean
  placement: string
  showCancel: boolean
  isFocused: boolean
  isDisabled?: boolean
  fontSize: number
}

export const Container = styled.div<IContainerProps>`
  background: ${(props) =>
    props.isDisabled ? baseColors.GREY_LIGHT : baseColors.WHITE};
  box-sizing: border-box;
  border-radius: ${(props) => (props.roundedBorder ? '40px' : '0px')};
  height: ${(props) => (props.placement === 'home' ? '50px' : '40px')};
  padding-left: 20px;
  padding-right: ${(props) => (props.showCancel ? '20px' : 'inherit')};
  width: 100%;
  font-family: ${theme.fonts.sourceSansPro};
  label {
    width: 25px;
  }

  display: flex;
  align-items: center;
  input {
    border: none;
    font-size: ${(props) => `${props.fontSize}px`};
    line-height: ${(props) => (props.placement === 'home' ? '45px' : '38px')};
    padding: 0px 10px 0px;
    width: ${(props) => (props.showCancel ? '70%' : '80%')};
  }

  input:focus {
    outline-width: 0;
  }
  input:disabled {
    outline-width: 0;
    background: ${baseColors.GREY_LIGHT};
  }
`

export const StyledInput = styled.input`
  text-overflow: ellipsis;
  font-style: italic;
  font-weight: 600;

  &::placeholder {
    font-weight: 400;
    color: ${baseColors.GREY_ONE};
  }
`

export const IconLabel = styled(Label)`
  color: ${theme.colors.gray};
  cursor: pointer;
`
