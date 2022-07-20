import React, { useEffect, useRef, useState } from 'react'

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
} from '../Dropdown/Dropdown.styles'
import styled from 'styled-components'
import { Box } from '../../primitives'
import { debounce } from 'lodash'
import { autoUpdate, shift, useFloating } from '@floating-ui/react-dom'
import { capitalizeFirstLetter, DropdownList } from './DropdownList'

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

export interface IMultiSelectValue {
  label: string
  key: string
  tag?: string
}

interface IProps {
  preSelectedValues?: string[]
  values: IMultiSelectValue[]
  onSelect: (item: string[]) => void
  onClear?: () => void
  value?: string
  label: string
  width?: number | null
  height?: number | null
  icon?: string | null
  showCarat?: boolean
  left?: boolean
  isDisabled?: boolean
  disableSearch?: boolean
  id: string
  ref?: any
}

const MultiSelectDropdown = (props: IProps) => {
  const {
    value,
    icon,
    showCarat,
    width,
    isDisabled,
    label,
    id,
    disableSearch,
    onSelect,
  } = props
  const { preSelectedValues } = props
  const [selectedValues, setSelectedValues] = useState<string[]>(
    preSelectedValues ?? []
  )
  const [isListOpen, setIsListOpen] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const ref = useRef<any>(props?.ref)
  const { x, y, reference, floating, strategy, update, refs } = useFloating({
    placement: 'bottom-start',
    middleware: [shift()],
  })
  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return
    }
    return autoUpdate(refs.reference.current, refs.floating.current, update)
  }, [refs.reference, refs.floating, update, isListOpen])
  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false)
    return () => {
      document.removeEventListener('mousedown', handleClick, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    setSelectedValues(preSelectedValues ?? [])
  }, [preSelectedValues])
  const handleClick = (e: any) => {
    if (ref?.current?.contains(e.target)) {
      return
    }
    handleClickOutside()
  }
  const handleClickOutside = () => {
    setIsListOpen(false)
  }
  const toggleList = () => {
    // console.log(refs.reference.current, refs.floating.current)
    setIsListOpen((prevState) => !prevState)
  }
  const onKeyDownHeader = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === keyCodes.ENTER || e.keyCode === keyCodes.SPACE) {
      toggleList()
    } else if (e.keyCode === keyCodes.ESCAPE) {
      handleClickOutside()
    }
  }
  const clearSelectedValues = () => {
    setSelectedValues([])
    setSearchText('')
    props?.onClear?.()
  }
  const onSearch = (text) => {
    setSearchText(text)
  }
  const debouncedSearch = debounce((text) => onSearch(text.trim()), 200, {
    trailing: true,
  })
  useEffect(() => {
    onSelect(selectedValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValues])
  const handleSelect = (item: string) => {
    const selectedItems = [...selectedValues]
    if (selectedValues.includes(item)) {
      selectedItems.splice(selectedValues.indexOf(item), 1)
    } else {
      selectedItems.push(item)
    }
    setSelectedValues(selectedItems)
  }
  const onKeyDownItem = (keyCode: number, item: any) => {
    if (keyCode === keyCodes.ENTER || keyCode === keyCodes.SPACE) {
      handleSelect(item)
    } else if (keyCode === keyCodes.ESCAPE) {
      handleClickOutside()
    }
  }
  const iconType = isListOpen ? 'angle-up' : 'angle-down'
  return (
    <Container ref={ref} width={width}>
      <ContainerHeader
        onClick={isDisabled ? null : toggleList}
        onKeyDown={onKeyDownHeader}
        isListOpen={isListOpen || selectedValues.length}
        tabIndex={0}
        isDisabled={isDisabled}
        ref={reference}
      >
        <ContainerHeaderText isListOpen={isListOpen} hasValue={value !== 'all'}>
          {!icon && (
            <span style={{ color: baseColors.GREY_DARKER, fontWeight: 400 }}>
              {capitalizeFirstLetter(label)}
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

      {isListOpen && (
        <DropdownList
          id={id}
          selectedValues={selectedValues}
          values={props?.values}
          searchText={searchText}
          top={y ?? ''}
          left={x ?? ''}
          strategy={strategy}
          clearSelectedValues={clearSelectedValues}
          debouncedSearch={debouncedSearch}
          handleSelect={handleSelect}
          height={props?.height}
          onKeyDownItem={onKeyDownItem}
          disableSearch={disableSearch}
          pref={floating}
        />
      )}
    </Container>
  )
}

export default MultiSelectDropdown
