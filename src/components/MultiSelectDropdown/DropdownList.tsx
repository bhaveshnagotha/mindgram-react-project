import { ContainerItem } from '../Dropdown/Dropdown.styles'
import { Checkbox, InputSearchBar } from '../index'
import React from 'react'
import styled from 'styled-components'
import { baseColors } from '../../constants/colors'

export function capitalizeFirstLetter(text: string) {
  return text && text.charAt(0).toUpperCase() + text.slice(1)
}

export const SearchDropdownWrapper = styled.div`
  padding: 7px 0px;
  border-bottom: 1px solid ${baseColors.GREY_LIGHT};
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
export const ClearAllButton = styled.p`
  margin-bottom: 0;
  text-transform: uppercase;
  color: ${baseColors.BLUE_FIVE};
  padding: 7px 14px;
  font-weight: 600;
  cursor: pointer;
  border-top: 1px solid ${baseColors.GREY_LIGHT};
  user-select: none;
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
interface IContainerListProps {
  height: null | number
}
const ContainerList = styled.ul<IContainerListProps>`
  box-shadow: 0 8px 11px ${baseColors.GREY_LIGHT};
  background: white;
  height: ${(props) => (props.height ? `${props.height}px` : 'auto')};
  list-style: none;
  overflow-y: auto;
  padding: 5px 10px 2px 10px;
  z-index: 1000;
  display: flex;
  flex-flow: column nowrap;
  min-width: 300px;
  max-height: 400px;
`
export const DropdownList = ({
  selectedValues,
  values,
  searchText,
  left,
  top,
  height,
  debouncedSearch,
  handleSelect,
  onKeyDownItem,
  clearSelectedValues,
  id,
  disableSearch,
  pref,
  strategy,
}) => {
  const filterOptions = values?.filter((val) =>
    val?.label?.toLowerCase()?.includes(searchText?.toLowerCase())
  )

  const renderItem = (index, key) => {
    const item = filterOptions[index]
    const isSelected = selectedValues.includes(item.key.toLowerCase())
    return (
      <ContainerItem
        key={key}
        onClick={() => handleSelect(item.key?.toLowerCase())}
        onKeyDown={(e) => onKeyDownItem(e.keyCode, item.key)}
        tabIndex={0}
        selected={isSelected}
        title={capitalizeFirstLetter(item.label)}
        style={{ minWidth: 0, height: !item?.label ? 35 : 'auto' }}
      >
        <div>
          <Checkbox
            checked={isSelected}
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              handleSelect(item.key?.toLowerCase())
            }}
          />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', minWidth: 0 }}>
          <span
            style={{
              marginLeft: '0',
              overflowWrap: 'anywhere',
              flex: '0 1 auto',
              textOverflow: 'ellipsis',
              minWidth: 0,
              overflow: 'hidden',
            }}
          >
            {capitalizeFirstLetter(item.label)}
          </span>
          <div style={{ flex: '1 0 auto' }}>
            {item.tag && <OptionTag>{item.tag}</OptionTag>}
          </div>
        </div>
      </ContainerItem>
    )
  }
  return (
    <ContainerList
      height={height!}
      style={{ position: strategy, top, left }}
      ref={pref}
    >
      <div style={{ height: 'auto' }}>
        {!disableSearch && (
          <SearchDropdownWrapper>
            <SearchDropdown>
              <InputSearchBar
                id={id}
                showSearchIcon={false}
                placeholder="Search..."
                handleChange={debouncedSearch}
              />
            </SearchDropdown>
          </SearchDropdownWrapper>
        )}
      </div>
      <div style={{ height: 'auto', overflow: 'auto' }}>
        {filterOptions?.length > 0 &&
          filterOptions?.map((val, index) => {
            return renderItem(index, index)
          })}
      </div>
      <div style={{ height: 'auto' }}>
        <ClearAllButton onClick={clearSelectedValues}>clear</ClearAllButton>
      </div>
    </ContainerList>
  )
}
