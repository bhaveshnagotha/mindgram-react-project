import React, { Component } from 'react'

import { baseColors } from '../../constants/colors'
import keyCodes from '../../constants/keyCodes'
import theme from '../../theme'
import Icon from '../Icon'
import { iconSizes } from '../Icon/constants'
import FilterIcon from '../SvgIcons/FilterIcon'
import {
  Container,
  ContainerHeader,
  ContainerHeaderText,
  ContainerIcon,
  ContainerItem,
  ContainerList,
} from './Dropdown.styles'

function capitalizeFirstLetter(text: string) {
  return text && text.charAt(0).toUpperCase() + text.slice(1)
}

export interface IValue {
  label: string
  key: string
}
interface IProps {
  values: IValue[]
  onSelect: (item: string) => void
  value: string
  width?: number | null
  height?: number | null
  icon?: string | null
  showCarat?: boolean
  left?: boolean
  isDisabled?: boolean
}

interface IState {
  isListOpen: boolean
}

class Dropdown extends Component<IProps, IState> {
  private static defaultProps = {
    height: null,
    icon: null,
    left: false,
    showCarat: true,
    width: null,
  }

  private ref: any

  constructor(props: IProps) {
    super(props)

    this.ref = React.createRef()
    this.state = {
      isListOpen: false,
    }
  }

  public componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false)
  }

  public componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
  }

  public render() {
    const { value, icon, showCarat, width, isDisabled } = this.props
    const { isListOpen } = this.state
    const iconType = isListOpen ? 'angle-up' : 'angle-down'

    return (
      <Container ref={this.ref} width={width!}>
        <ContainerHeader
          onClick={isDisabled ? null : this.toggleList}
          onKeyDown={this.onKeyDownHeader}
          isListOpen={isListOpen}
          tabIndex={0}
          isDisabled={isDisabled}
        >
          <ContainerHeaderText
            isListOpen={isListOpen}
            hasValue={value !== 'all'}
          >
            {!icon && capitalizeFirstLetter(value)}
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

  private handleSelect = (item: string) => {
    this.setState({ isListOpen: false }, () => this.props.onSelect(item))
  }

  private toggleList = () => {
    this.setState((prevState: IState) => ({
      isListOpen: !prevState.isListOpen,
    }))
  }

  private getListRows = () => {
    const { values, left, value, height } = this.props

    return (
      <ContainerList left={left!} height={height!}>
        {values!.map((item: IValue) => (
          <ContainerItem
            key={item.key}
            onClick={() => this.handleSelect(item.key)}
            onKeyDown={(e) => this.onKeyDownItem(e.keyCode, item.key)}
            tabIndex={0}
            selected={item.key === value}
          >
            {capitalizeFirstLetter(item.label)}
          </ContainerItem>
        ))}
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

export default Dropdown
