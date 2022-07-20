import React, { useState } from 'react'

import { History } from 'history'
import { Tag } from '../../components'
import InputSearchBar from '../../components/InputSearchBar'
import Loading from '../../components/Loading'
import { baseColors } from '../../constants/colors'
import { useFocus, useSearch } from '../../hooks'
import {
  Container,
  ContainerItemValue,
  ContainerResultItem,
  ContainerResults,
} from './SearchBar.styles'
import { getItemValue, getCursor, IGlobalSearchResult } from '.'
import { SEARCH_TYPE } from '../../hooks/search'

export interface ICompanySearch {
  match_type: string
  ticker: string
  value: string
  id: number
  type: string
}

const CompanySearchBar = ({
  activeLandingType,
  searchType,
  id,
  history,
  fontSize = 15,
  placement = 'navbar',
  placeholder,
  isAuthenticated,
  onSelect,
}: {
  activeLandingType: string
  searchType?: SEARCH_TYPE
  id: string
  history?: History
  fontSize: number
  placement?: string
  placeholder?: string
  isAuthenticated: boolean
  onSelect: (result: IGlobalSearchResult) => void
}) => {
  const [ref] = useState(React.createRef<HTMLDivElement>())
  const [isKeyboardFocussed, setIsKeyboardFocussed] = useState(false)

  const { isMouseFocussed, removeMouseFocus } = useFocus(ref)
  const [searchTerm, setSearchTerm] = useState('')
  const { debouncedSearchTerm, error, isSearching, results } = useSearch(
    searchTerm,
    searchType || SEARCH_TYPE.COMPANY,
    isAuthenticated,
    false,
    activeLandingType
  )

  const [cursor, setCursor] = useState<null | number>(null)
  const [selectedValue, setSelectedValue] = useState<string>('')

  const onChange = (value: string) => {
    setSelectedValue(value)
    setSearchTerm(value)
    setCursor(null)
  }

  const onSubmit = () => {
    if (cursor === null) {
      return
    }
    const selectedItem: IGlobalSearchResult = results[cursor!]
    setSelectedValue(selectedItem?.value?.name)
    onSelect?.(selectedItem)

    removeMouseFocus()
    setIsKeyboardFocussed(false)
  }

  return (
    <Container ref={ref}>
      <InputSearchBar
        id={id}
        placement={placement}
        placeholder={placeholder ?? 'Search...'}
        fontSize={fontSize}
        handleChange={onChange}
        onBlur={() => setIsKeyboardFocussed(false)}
        onFocus={() => setIsKeyboardFocussed(true)}
        isSearching={isSearching}
        onKeyDown={(event: any) => {
          if (event.key === 'Enter' && cursor !== null) {
            onSubmit()
          }
          const newCursor = getCursor(event.key, cursor, results?.length)
          if (newCursor !== cursor) {
            // doing `preventDefault` to prevent the cursor going to the
            // beginning on pressing the up arrow key
            event.preventDefault()
            setCursor(newCursor)
          }
        }}
        selectedValue={selectedValue}
      />
      {(isKeyboardFocussed || isMouseFocussed) && (
        <Suggestions
          cursor={cursor}
          error={error}
          isSearching={isSearching}
          onItemChange={(newCursor: number) => {
            setCursor(newCursor)
          }}
          onItemClick={onSubmit}
          results={results}
          searchTerm={debouncedSearchTerm}
          isSearchBarFocussed={isKeyboardFocussed || isMouseFocussed}
        />
      )}
    </Container>
  )
}

function Suggestions({
  cursor,
  isSearching,
  error,
  onItemChange,
  onItemClick,
  results,
  searchTerm,
  isSearchBarFocussed,
}: {
  cursor: null | number
  isSearching: boolean
  error: string
  onItemChange: (index: number) => void
  onItemClick: () => void
  results: any[]
  searchTerm: string
  isSearchBarFocussed: boolean
}) {
  // Loading state
  if (isSearching) {
    return (
      <ContainerResults>
        <ContainerResultItem isSelected={false}>
          <Loading size={25} />
        </ContainerResultItem>
      </ContainerResults>
    )
  }

  // Search term is blank
  if (!searchTerm && !isSearchBarFocussed) {
    return null
  }

  // Search term is blank if no history or search result
  if (!searchTerm && isSearchBarFocussed) {
    return null
  }

  // Error state
  if (error) {
    return (
      <ContainerResults>
        <ContainerResultItem isSelected={false}>{error}</ContainerResultItem>
      </ContainerResults>
    )
  }

  // Empty state
  if (searchTerm && results.length === 0) {
    return (
      <ContainerResults>
        <ContainerResultItem isSelected={false}>
          No matches found!
        </ContainerResultItem>
      </ContainerResults>
    )
  }

  // list of items
  return (
    <ContainerResults>
      {results.map((item: IGlobalSearchResult, index: number) => (
        <ContainerResultItem
          onMouseEnter={() => onItemChange(index)}
          onClick={onItemClick}
          key={`${item.match_type}-${item?.value}-${index}`}
          isSelected={cursor !== null && cursor === index}
        >
          <ContainerItemValue>{getItemValue(item)}</ContainerItemValue>
          {item?.value?.ticker && (
            <Tag bgColor={baseColors.BLUE_SIX} color={baseColors.GREY_DARKER}>
              {item?.value?.ticker}
            </Tag>
          )}
        </ContainerResultItem>
      ))}
    </ContainerResults>
  )
}

export default CompanySearchBar
