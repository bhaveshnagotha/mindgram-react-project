import React, { Component } from 'react'
import { baseColors } from '../../constants/colors'
import keyCodes from '../../constants/keyCodes'
import theme from '../../theme'
import Icon from '../Icon'
import { iconSizes } from '../Icon/constants'
import FilterIcon from '../SvgIcons/FilterIcon'
import {
  Container,
  ContainerHeaderText,
  ContainerIcon,
  ContainerList,
  ContainerItem,
} from '../Dropdown/Dropdown.styles'
import styled from 'styled-components'
import { Box } from '../../primitives'

export const ContainerHeader = styled(Box)<{ isDisabled?: boolean }>`
  display: flex;
  align-items: center;
  background: ${(props) =>
    props.isDisabled ? baseColors.GREY_LIGHT : baseColors.WHITE};
  cursor: ${(props) => (props.isDisabled ? '' : 'pointer')};
  height: 35px;
  padding: 7px 14px;
  width: 100%;
  min-width: 10rem;
  outline: 0;
  border-radius: 20px;
  border: ${(props) =>
    props.isListOpen ? `1.5px solid ${baseColors.BLUE_FIVE}` : ''};
  transition: all 100ms ease-in;
  user-select: none;
  box-shadow: ${theme.boxShadow};
  font-family: ${theme.fonts.sourceSansPro};
`
export const SearchDropdown = styled.div`
  border-radius: 20px;
  border: 1px solid ${baseColors.GREY_LIGHT};
  overflow: hidden;
  > div {
    padding-left: 10px;
    height: 30px;
  }
`
export const OptionTag = styled.span`
  margin-left: 0.7rem;
  text-transform: uppercase;
  background-color: ${baseColors.BLUE_SIX};
  border-radius: 20px;
  padding: 3px 15px;
  font-size: 12px;
  min-width: 60px;
  color: ${baseColors.GREY_DARKER};
`
function capitalizeFirstLetter(text: string) {
  return text && text.charAt(0).toUpperCase() + text.slice(1)
}
export interface ISingleSelectValue {
  label: string
  key: string
  tag?: string
}
interface IProps {
  values: ISingleSelectValue[]
  onSelect: (item: ISingleSelectValue) => void
  defaultValue: ISingleSelectValue
  label: string
  width?: number | null
  height?: number | null
  icon?: string | null
  showCarat?: boolean
  left?: boolean
  isDisabled?: boolean
}
interface IState {
  isListOpen: boolean
  selectedValue: ISingleSelectValue
}
class SingleSelectDropdown extends Component<IProps, IState> {
  private static defaultProps = {
    height: null,
    icon: null,
    left: false,
    showCarat: true,
    width: null,
    label: '',
  }
  private ref: any

  constructor(props: IProps) {
    super(props)

    this.ref = React.createRef()
    this.state = {
      isListOpen: false,
      selectedValue: props.defaultValue,
    }
  }

  public componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false)
  }

  public componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
  }

  public render() {
    const {
      defaultValue,
      icon,
      showCarat,
      width,
      isDisabled,
      label,
    } = this.props
    const { isListOpen, selectedValue } = this.state
    const iconType = isListOpen ? 'angle-up' : 'angle-down'

    return (
      <Container ref={this.ref} width={width!}>
        <ContainerHeader
          onClick={isDisabled ? null : this.toggleList}
          onKeyDown={this.onKeyDownHeader}
          isListOpen={
            isListOpen || (selectedValue && selectedValue !== defaultValue)
          }
          tabIndex={0}
          isDisabled={isDisabled}
        >
          <ContainerHeaderText isListOpen={isListOpen}>
            {!icon && (
              <span style={{ color: baseColors.GREY_DARKER, fontWeight: 600 }}>
                {selectedValue?.label || capitalizeFirstLetter(label)}
              </span>
            )}
            {icon && (
              <FilterIcon
                color={isListOpen ? baseColors.BLUE_FIVE : theme.colors.gray}
                height={15}
              />
            )}
          </ContainerHeaderText>
          {(showCarat || showCarat === undefined) && (
            <ContainerIcon isListOpen={isListOpen}>
              <Icon
                type={iconType}
                size={iconSizes.S}
                isClickable={!isDisabled}
              />
            </ContainerIcon>
          )}
        </ContainerHeader>

        {isListOpen && this.getListRows()}
      </Container>
    )
  }

  private handleClick = (e: any) => {
    if (this.ref.current.contains(e.target)) {
      return
    }
    this.handleClickOutside()
  }

  private handleClickOutside = () => {
    this.setState({ isListOpen: false })
  }

  private handleSelect = (item: ISingleSelectValue) => {
    this.setState({ selectedValue: item, isListOpen: false }, () =>
      this.props.onSelect(this.state.selectedValue)
    )
  }

  private toggleList = () => {
    this.setState((prevState: IState) => ({
      isListOpen: !prevState.isListOpen,
    }))
  }

  private getListRows = () => {
    const { values, left, height } = this.props
    return (
      <ContainerList left={left!} height={height!}>
        {values?.map((item: ISingleSelectValue, index: number) => {
          const isSelected = this.state.selectedValue?.key === item.key
          return (
            <ContainerItem
              key={`${item.key}${index}`}
              onClick={() => this.handleSelect(item)}
              onKeyDown={(e) => this.onKeyDownItem(e.keyCode, item.key)}
              tabIndex={0}
              selected={isSelected}
            >
              <span>{capitalizeFirstLetter(item.label)}</span>
              {item.tag && <OptionTag>{item.tag}</OptionTag>}
            </ContainerItem>
          )
        })}
      </ContainerList>
    )
  }

  private onKeyDownHeader = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === keyCodes.ENTER || e.keyCode === keyCodes.SPACE) {
      this.toggleList()
    } else if (e.keyCode === keyCodes.ESCAPE) {
      this.handleClickOutside()
    }
  }

  private onKeyDownItem = (keyCode: number, item: any) => {
    if (keyCode === keyCodes.ENTER || keyCode === keyCodes.SPACE) {
      this.handleSelect(item)
    } else if (keyCode === keyCodes.ESCAPE) {
      this.handleClickOutside()
    }
  }
}

export default SingleSelectDropdown
