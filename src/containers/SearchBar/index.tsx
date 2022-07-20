import React, { useState } from 'react'

import { History } from 'history'
import { Tag } from '../../components'
import InputSearchBar from '../../components/InputSearchBar'
import Loading from '../../components/Loading'
import { baseColors } from '../../constants/colors'
import { postCollection } from '../../helpers/api'
import { useFocus, useSearch } from '../../hooks'
import {
  Container,
  ContainerItemValue,
  ContainerResultItem,
  ContainerResults,
  MRCONSOConditionItem,
} from './SearchBar.styles'
import { SEARCH_TYPE } from '../../hooks/search'
import { LANDING_TYPE } from '../App/App'

const MATCH_TYPES = Object.freeze({
  COMPANY: 'COMPANY',
  COMPOUND: 'COMPOUND',
  TRIAL: 'TRIAL',
  PATENT: 'PATENT',
  DRUG: 'DRUG',
  INTERVENTION: 'INTERVENTION',
  MRCONSO: 'MRCONSO',
  CONDITION: 'CONDITION',
  MOA: 'MOA',
  BIOMARKER: 'BIOMARKER',
  TARGET: 'TARGET',
})

export interface IGlobalSearchValue {
  id: string
  name: string
  ticker: string
  type: string
  intervention_name?: string
  condition?: string
  condition_string?: string
}

export interface IGlobalSearchResult {
  match_type: string
  value: IGlobalSearchValue
  extra_data?: IGlobalSearchValue
}

function addUserSearchHistoryItem(searchTerm: string, searchType: string) {
  const url = '/v1/search-history'
  const data = {
    searchTerm,
    searchType,
  }
  return postCollection(url, data)
}

export function getCursor(
  eventKey: string,
  previousCursor: number | null,
  numItems: number
) {
  switch (eventKey) {
    case 'ArrowDown': {
      let cursor: number | null = null
      if (previousCursor === null) {
        cursor = 0
      } else if (previousCursor >= 0 && previousCursor < numItems - 1) {
        cursor = previousCursor + 1
      } else {
        cursor = null
      }
      return cursor
    }
    case 'ArrowUp': {
      let cursor
      if (previousCursor === null) {
        cursor = null
      } else if (previousCursor === 0) {
        cursor = null
      } else {
        cursor = previousCursor - 1
      }
      return cursor
    }
    default:
      return previousCursor
  }
}

export const getItemValue = (
  item: IGlobalSearchResult | any,
  searchType?: SEARCH_TYPE
) => {
  if (item.match_type === MATCH_TYPES.COMPANY && item?.value?.ticker) {
    return `${item?.value?.name} (${item?.value?.ticker})`
  } else if (
    [MATCH_TYPES.INTERVENTION, MATCH_TYPES.MRCONSO].includes(item.match_type) &&
    searchType === SEARCH_TYPE.INTERVENTIONS
  ) {
    return item?.value?.intervention_name ?? ''
  } else if (
    [MATCH_TYPES.CONDITION, MATCH_TYPES.MRCONSO].includes(item.match_type) &&
    (searchType === SEARCH_TYPE.CONDITIONS ||
      searchType === SEARCH_TYPE.CONDITIONS_DESIGNATION_OUTBOX)
  ) {
    return item?.value?.condition ?? ''
  } else if (item.match_type === MATCH_TYPES.MOA) {
    return item?.value?.pharm_action ?? ''
  } else if (item.match_type === MATCH_TYPES.DRUG) {
    return (
      (item?.extra_data?.intervention_name || item?.value?.intervention_name) ??
      ''
    )
  } else if (item.match_type === MATCH_TYPES.BIOMARKER) {
    return (item?.value?.biomarker_name || item?.value?.biomarker_symbol) ?? ''
  } else if (item.match_type === MATCH_TYPES.TARGET) {
    return (
      <div style={{ marginRight: 10 }}>
        <div>{item?.value?.target_name}</div>
        <div style={{ marginLeft: 10, color: baseColors.GREY_DARK2 }}>
          {item?.value?.synonym}
        </div>
      </div>
    )
  }
  return item?.value?.name ?? item.value
}

export const getLabelText = (matchType: string) => {
  if (matchType === MATCH_TYPES.COMPOUND) {
    return 'DRUG'
  }
  return matchType
}

export const getlabelColor = (matchType: string) => {
  if (matchType === MATCH_TYPES.TRIAL) {
    return baseColors.AFFAIR_ONE
  }
  if (matchType === MATCH_TYPES.COMPANY) {
    return baseColors.BLUE_SEVEN
  }
  if (matchType === MATCH_TYPES.COMPOUND || matchType === MATCH_TYPES.DRUG) {
    return baseColors.CYAN_ONE
  }
  if (matchType === MATCH_TYPES.PATENT) {
    return baseColors.YELLOW_ONE
  }
  if ([MATCH_TYPES.INTERVENTION, MATCH_TYPES.MRCONSO].includes(matchType)) {
    return baseColors.BLUE_EIGHT
  }
  return baseColors.GREY_DARKER
}

const SearchBar = ({
  history,
  fontSize = 15,
  placement = 'navbar',
  isAuthenticated,
  activeLandingType,
  setSelectedItem,
  searchType,
  placeholder,
}: {
  history?: History
  fontSize: number
  placement?: string
  isAuthenticated
  activeLandingType: string
  setSelectedItem?: any
  searchType?: SEARCH_TYPE
  placeholder?: string
}) => {
  const [ref] = useState(React.createRef<HTMLDivElement>())
  const [isKeyboardFocussed, setIsKeyboardFocussed] = useState(false)
  const [refetchSearchHistory, setRefetchSearchHistory] = useState(false)

  const { isMouseFocussed, removeMouseFocus } = useFocus(ref)
  const [searchTerm, setSearchTerm] = useState('')
  const {
    debouncedSearchTerm,
    error,
    isSearching,
    results,
    searchHistory,
  } = useSearch(
    searchTerm,
    searchType ?? SEARCH_TYPE.GENERAL,
    isAuthenticated,
    refetchSearchHistory,
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
    const selectedItem: IGlobalSearchResult | any = searchTerm
      ? results[cursor!]
      : searchHistory[cursor!]
    let itemValue = ''

    if (selectedItem.match_type === MATCH_TYPES.CONDITION)
      itemValue = selectedItem?.value?.condition
    else if (
      [MATCH_TYPES.CONDITION, MATCH_TYPES.MRCONSO].includes(
        selectedItem.match_type
      ) &&
      (searchType === SEARCH_TYPE.CONDITIONS ||
        searchType === SEARCH_TYPE.CONDITIONS_DESIGNATION_OUTBOX)
    ) {
      itemValue = selectedItem?.value?.condition
    } else if (
      selectedItem.match_type === MATCH_TYPES.INTERVENTION ||
      (searchType === SEARCH_TYPE.INTERVENTIONS &&
        selectedItem.match_type === MATCH_TYPES.MRCONSO)
    ) {
      itemValue = selectedItem?.value?.intervention_name
    } else if (selectedItem.match_type === MATCH_TYPES.MOA)
      itemValue = selectedItem?.value?.pharm_action
    else if (selectedItem?.value?.name) {
      itemValue = selectedItem?.value?.name
    } else if (['string', 'number'].includes(typeof selectedItem?.value)) {
      itemValue = selectedItem?.value
    } else if (selectedItem.match_type === MATCH_TYPES.DRUG) {
      itemValue = selectedItem?.value?.norm_cui
    } else if (selectedItem.match_type === MATCH_TYPES.BIOMARKER) {
      itemValue =
        selectedItem?.value?.biomarker_name ||
        selectedItem?.value?.biomarker_symbol
    } else if (selectedItem?.match_type === MATCH_TYPES.TARGET) {
      itemValue = selectedItem?.value?.target_name
    }
    setSelectedValue(itemValue)
    if (setSelectedItem) {
      setSelectedItem(selectedItem)
    }

    addUserSearchHistoryItem(itemValue, selectedItem.match_type).then(() => {
      setRefetchSearchHistory((refetch) => !refetch)
    })
    if (history) {
      if (selectedItem.match_type === MATCH_TYPES.COMPOUND) {
        history.push(`/patents/dashboard-drug/${itemValue}`)
      } else if (selectedItem.match_type === MATCH_TYPES.TRIAL) {
        history.push(`/patents/trials/${itemValue}`)
      } else if (selectedItem.match_type === MATCH_TYPES.COMPANY) {
        let companyId
        if (selectedItem?.value.type && selectedItem?.value.id) {
          companyId = `${selectedItem?.value.type}${selectedItem?.value.id}`
        } else {
          companyId = `${selectedItem?.extra_data?.type}${selectedItem?.extra_data?.id}`
        }
        if (activeLandingType === LANDING_TYPE.CLINICAL_TRIALS.id) {
          history.push(`/clinical-trials/company-dashboard/${companyId}`)
        } else {
          history.push(
            `/patents/dashboard/${itemValue}?company_id=${companyId}`
          )
        }
      } else if (selectedItem.match_type === MATCH_TYPES.PATENT) {
        history.push(`/patents/dashboard-patent/${itemValue}`)
      } else if (
        selectedItem.match_type === MATCH_TYPES.DRUG &&
        searchType !== SEARCH_TYPE.INTERVENTIONS_DESIGNATION_OUTBOX
      ) {
        history.push(`/clinical-trials/pipeline-products/${itemValue}`)
      }
    }
    removeMouseFocus()
    setIsKeyboardFocussed(false)
  }

  return (
    <Container ref={ref}>
      <InputSearchBar
        id="searchBar"
        placement={placement}
        placeholder={
          placeholder
            ? placeholder
            : activeLandingType === LANDING_TYPE.CLINICAL_TRIALS.id
            ? 'Search for pipeline drugs and companies'
            : 'Search for companies, drugs and PTAB trials'
        }
        fontSize={fontSize}
        handleChange={onChange}
        onBlur={() => setIsKeyboardFocussed(false)}
        onFocus={() => setIsKeyboardFocussed(true)}
        isSearching={isSearching}
        onKeyDown={(event: any) => {
          if (event.key === 'Enter' && cursor !== null) {
            onSubmit()
          }
          const newCursor = searchTerm
            ? getCursor(event.key, cursor, results.length)
            : getCursor(event.key, cursor, searchHistory.length)
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
            return setCursor(newCursor)
          }}
          onItemClick={onSubmit}
          results={results}
          searchHistory={searchHistory}
          searchTerm={debouncedSearchTerm}
          isSearchBarFocussed={isKeyboardFocussed || isMouseFocussed}
          searchType={searchType}
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
  searchHistory,
  searchTerm,
  isSearchBarFocussed,
  searchType,
}: {
  cursor: null | number
  isSearching: boolean
  error: string
  onItemChange: (index: number) => void
  onItemClick: () => void
  results: any[]
  searchHistory: any[]
  searchTerm: string
  isSearchBarFocussed: boolean
  searchType?: SEARCH_TYPE
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
  if (
    !searchTerm &&
    isSearchBarFocussed &&
    searchHistory &&
    searchHistory.length === 0
  ) {
    return null
  }

  // Search term is blank and has history results
  if (
    !searchTerm &&
    isSearchBarFocussed &&
    searchHistory &&
    searchHistory.length > 0
  ) {
    // list of items
    return (
      <ContainerResults>
        {searchHistory.map((item: IGlobalSearchResult, index: number) => (
          <ContainerResultItem
            onMouseEnter={() => onItemChange(index)}
            onClick={onItemClick}
            key={`${item.match_type}-${item.value}-${index}`}
            isSelected={cursor !== null && cursor === index}
          >
            <ContainerItemValue>
              {getItemValue(item, searchType)}
            </ContainerItemValue>
            <Tag
              bgColor={getlabelColor(item.match_type)}
              color={baseColors.WHITE}
            >
              {getLabelText(item.match_type)}
            </Tag>
          </ContainerResultItem>
        ))}
      </ContainerResults>
    )
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
      {results.map((item: IGlobalSearchResult | any, index: number) => (
        <ContainerResultItem
          onMouseEnter={() => onItemChange(index)}
          onClick={onItemClick}
          key={`${item.match_type}-${item.value}-${index}`}
          isSelected={cursor !== null && cursor === index}
        >
          {item.match_type === MATCH_TYPES.MRCONSO &&
          searchType === SEARCH_TYPE.CONDITIONS ? (
            <MRCONSOConditionItem>
              <div>{item?.value?.condition_string ?? ' '}</div>
              <div>{item?.value?.condition ?? ' '}</div>
            </MRCONSOConditionItem>
          ) : (
            <ContainerItemValue>
              {getItemValue(item, searchType)}
            </ContainerItemValue>
          )}
          {item?.match_type !== MATCH_TYPES.TARGET ? (
            <Tag
              bgColor={getlabelColor(item.match_type)}
              color={baseColors.WHITE}
            >
              {getLabelText(item.match_type)}
            </Tag>
          ) : (
            <Tag bgColor={baseColors.BLUE_SEVEN} color={baseColors.WHITE}>
              {getLabelText(item?.value?.target_symbol)}
            </Tag>
          )}
        </ContainerResultItem>
      ))}
    </ContainerResults>
  )
}

export default SearchBar
