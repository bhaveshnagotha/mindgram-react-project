import { useEffect, useState } from 'react'

import { useDebounce } from './debounce'

import { getCollection } from '../helpers/api'
import { LANDING_TYPE } from '../containers/App/App'

const MAX_NUMBER_OF_RESULTS_PER_TYPE = 3
export enum SEARCH_TYPE {
  'GENERAL' = 'general',
  'COMPANY' = 'company',
  'SUBSIDIARIES' = 'subsidiaries',
  'INTERVENTIONS' = 'interventions',
  'INTERVENTIONS_DESIGNATION_OUTBOX' = 'interventions_designation_outbox',
  'CONDITIONS_DESIGNATION_OUTBOX' = 'conditions_designation_outbox',
  'CONDITIONS' = 'conditions',
  'MOA' = 'moa',
  'OVERLAPS' = 'overlaps',
  'BIOMARKERS' = 'biomarkers',
  'TARGET' = 'target',
}

function fetchSearchResults(
  searchTerm: string,
  searchType: SEARCH_TYPE,
  activeLandingType: string
) {
  let url
  if (searchType === SEARCH_TYPE.COMPANY) {
    url = `/v1/company-search?term=${searchTerm}`
  } else if (searchType === SEARCH_TYPE.SUBSIDIARIES) {
    url = `/v1/company-search?term=${searchTerm}`
  } else if (searchType === SEARCH_TYPE.INTERVENTIONS) {
    url = `/v1/intervention-search?term=${searchTerm}`
  } else if (searchType === SEARCH_TYPE.INTERVENTIONS_DESIGNATION_OUTBOX) {
    url = `/v1/existing-intervention-search?term=${searchTerm}`
  } else if (searchType === SEARCH_TYPE.CONDITIONS) {
    url = `/v1/condition-search?term=${searchTerm}&all=true`
  } else if (searchType === SEARCH_TYPE.CONDITIONS_DESIGNATION_OUTBOX) {
    url = `/v1/condition-search?term=${searchTerm}`
  } else if (searchType === SEARCH_TYPE.MOA) {
    url = `/v1/moa-search?term=${searchTerm}`
  } else if (searchType === SEARCH_TYPE.OVERLAPS) {
    url = `/v1/company-search?term=${searchTerm}&is_active=true`
  } else if (searchType === SEARCH_TYPE.BIOMARKERS) {
    url = `/v1/biomarker-search?term=${searchTerm}`
  } else if (searchType === SEARCH_TYPE.TARGET) {
    url = `/v1/target-search?term=${searchTerm}`
  } else {
    if (activeLandingType === LANDING_TYPE.CLINICAL_TRIALS.id) {
      url = `/v1/clinical-search?term=${searchTerm}&limit=${MAX_NUMBER_OF_RESULTS_PER_TYPE}`
    } else {
      url = `/v1/patent-search?term=${searchTerm}&limit=${MAX_NUMBER_OF_RESULTS_PER_TYPE}`
    }
  }
  return getCollection(url)
}

function fetchSearchHistory() {
  const url = `/v1/search-history`
  return getCollection(url)
}

function useSearch(
  searchTerm: string,
  searchType: SEARCH_TYPE,
  isAuthenticated: boolean,
  refetchSearchHistory: boolean,
  activeLandingType: string
) {
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [searchHistory, setSearchHistory] = useState<any[]>([])
  const [error, setError] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    if (debouncedSearchTerm) {
      setError('')
      setIsSearching(true)
      setResults([])

      fetchSearchResults(debouncedSearchTerm, searchType, activeLandingType)
        .then((responseData) => {
          setResults(responseData)
          setIsSearching(false)
        })
        .catch(() => {
          setError('Failed to fetch results')
          setIsSearching(false)
        })
    } else {
      setResults([])
    }
  }, [debouncedSearchTerm, searchType, activeLandingType])

  useEffect(() => {
    let isMounted = true
    if (isAuthenticated) {
      fetchSearchHistory()
        .then((responseData) => {
          if (isMounted) {
            if (responseData && responseData.length > 0) {
              const filteredSearchHistoryData =
                responseData &&
                responseData
                  .map((history) => {
                    return {
                      match_type: history.search_type,
                      value: history.search_term,
                      extra_data: history.extra_data || history.value,
                    }
                  })
                  .splice(0, 3)
              setSearchHistory(filteredSearchHistoryData)
            } else {
              setSearchHistory([])
            }
          }
        })
        .catch(() => {
          if (isMounted) {
            setError('Failed to fetch results')
            setSearchHistory([])
          }
        })
    }
    return () => {
      isMounted = false
    }
  }, [isAuthenticated, refetchSearchHistory])

  return {
    debouncedSearchTerm,
    error,
    isSearching,
    results,
    searchHistory,
  }
}

export { useSearch }
