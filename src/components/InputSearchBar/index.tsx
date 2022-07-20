import React from 'react'
import { baseColors } from '../../constants/colors'
import { Label } from '../../primitives'
import theme from '../../theme'
import LoadingIcon from '../SvgIcons/LoadingIcon'
import { Container, IconLabel, StyledInput } from './InputSearchBar.styles'

interface IProps {
  fontSize?: number
  handleChange?: (value: string) => void
  handleSubmit?: (value: string) => void
  iconType?: string
  selectedValue?: string
  onBlur?: () => void
  onCancel?: () => void
  onFocus?: () => void
  onKeyDown?: (e: any) => void
  placeholder?: string
  placement?: string
  roundedBorder?: boolean
  showCancel?: boolean
  showSearchIcon?: boolean
  isSearching?: boolean
  isDisabled?: boolean
  id: string
}

interface IState {
  isFocused: boolean
  value: string
}

class InputSearchBar extends React.Component<IProps, IState> {
  private static defaultProps: Partial<IProps> = {
    fontSize: 14,
    handleChange: () => undefined,
    handleSubmit: () => undefined,
    iconType: 'search',
    isSearching: false,
    onBlur: () => undefined,
    onCancel: () => undefined,
    onFocus: () => undefined,
    onKeyDown: (e: any) => undefined,
    placeholder: '',
    placement: 'navbar',
    roundedBorder: true,
    showCancel: false,
    showSearchIcon: true,
    id: '',
  }
  private textInput: React.RefObject<HTMLInputElement>

  constructor(props: IProps) {
    super(props)
    this.state = {
      isFocused: false,
      value: '',
    }
    this.textInput = React.createRef<HTMLInputElement>()
  }

  public render() {
    const {
      fontSize,
      iconType,
      placeholder,
      onKeyDown,
      placement,
      roundedBorder,
      showCancel,
      showSearchIcon,
      onCancel,
      isSearching,
      isDisabled,
      selectedValue,
      id,
    } = this.props

    const { value, isFocused } = this.state

    return (
      <Container
        fontSize={fontSize!}
        placement={placement!}
        roundedBorder={roundedBorder!}
        showCancel={showCancel!}
        isFocused={isFocused}
        isDisabled={isDisabled}
      >
        {showSearchIcon && !isSearching && (
          <Label
            htmlFor={id}
            color={
              isDisabled
                ? theme.colors.gray
                : isFocused
                ? theme.colors.darkPurple
                : theme.colors.gray
            }
            className="mb-0"
          >
            <i className={`fa fa-${iconType} fa-lg`} />
          </Label>
        )}
        {showSearchIcon && isSearching && (
          <LoadingIcon color={baseColors.BLUE_FIVE} height={18} />
        )}
        <StyledInput
          autoComplete="off"
          id={id || 'search'}
          onBlur={this.onBlur}
          onChange={this.handleChange}
          onFocus={this.onFocus}
          onKeyUp={this.onKeyUp}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          type="text"
          value={selectedValue || value}
          ref={this.textInput}
          disabled={isDisabled}
        />
        {showCancel && (
          <IconLabel className="mb-0" htmlFor="cancel" onClick={onCancel}>
            <i className="fa fa-times"></i>
          </IconLabel>
        )}
      </Container>
    )
  }

  private onKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      this.props.handleSubmit!(this.state.value)
    } else if (e.key === 'Escape' && this.state.value === '') {
      this.props.onCancel!()
    }
  }

  private handleChange = (e: any) => {
    const newValue = e.target.value
    this.setState(
      () => ({ value: newValue }),
      () => {
        this.props.handleChange!(newValue)
      }
    )
  }

  private onBlur = () => {
    this.setState(
      () => ({ isFocused: false }),
      () => this.props.onBlur!()
    )
  }

  private onFocus = () => {
    this.setState(
      () => ({ isFocused: true }),
      () => this.props.onFocus!()
    )
  }
}

export default InputSearchBar
