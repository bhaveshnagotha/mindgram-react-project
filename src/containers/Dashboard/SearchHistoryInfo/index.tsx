import styled from '@emotion/styled'
import { History } from 'history'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/Button'
import { ButtonType } from '../../../components/Button/constants'
import Table, { TableRow } from '../../../components/Table'
import { baseColors } from '../../../constants/colors'
import {
  errorFetchingSearchHistory,
  fetchSearchHistory as fetchSearchHistoryAction,
  isFetchingSearchHistorySelector,
  searchHistoryKey,
  searchHistorySelector,
} from '../../../redux/SearchHistory'
import { TdWrapper, TooltipWrapper } from '../dashboardHelper'

type TItem = string[]

interface IPill {
  backgroundColor: string
}
const Pill = styled.span<IPill>`
  font-size: 12px;
  font-weight: 600;
  background: ${(props) => props.backgroundColor};
  padding: 3px 15px;
  border-radius: 15px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
`
const MATCH_TYPES = Object.freeze({
  COMPANY: 'COMPANY',
  COMPOUND: 'COMPOUND',
  TRIAL: 'TRIAL',
})

const tableHeader = ['', 'Search Details', 'Category', 'Search Again']

function SearchHistory({
  history,
  fetchSearchHistoryData,
  searchHistoryData,
  isFetchingSearchHistoryData,
  errorFetchingSearchHistoryData,
}: {
  history: History
  searchHistoryData: any
  fetchSearchHistoryData: (searchHistory: string) => void
  isFetchingSearchHistoryData: boolean
  errorFetchingSearchHistoryData: boolean
}) {
  useEffect(() => {
    if (
      searchHistoryData[searchHistoryKey] === null ||
      searchHistoryData[searchHistoryKey] === undefined
    ) {
      fetchSearchHistoryData('')
    }
    // eslint-disable-next-line
  }, [fetchSearchHistoryData, errorFetchingSearchHistoryData])

  let buildData: TItem[] = []

  if (
    searchHistoryData &&
    searchHistoryData[searchHistoryKey] &&
    searchHistoryData[searchHistoryKey].length
  ) {
    buildData = searchHistoryData[searchHistoryKey].map((d: any) => [
      d.search_term,
      d.search_type,
    ])
  }

  const renderRow = (item: string[], index: number) => {
    const getPillBgColor = (pillItem: string) => {
      switch (pillItem) {
        case 'COMPOUND':
          return baseColors.CYAN_ONE
        case 'TRIAL':
          return baseColors.AFFAIR_ONE
        case 'COMPANY':
          return baseColors.BLUE_SEVEN
        default:
          return baseColors.CYAN_ONE
      }
    }
    const getCategoryName = item[1] === 'COMPOUND' ? 'DRUG' : item[1]
    return (
      <TableRow key={index}>
        <td style={{ padding: '12px 5px', width: '20px' }}></td>
        <td>
          <TooltipWrapper>
            <div data-title={item[0]}>
              <TdWrapper width="100px">{item[0]}</TdWrapper>
            </div>
          </TooltipWrapper>
        </td>
        <td>
          <Pill backgroundColor={getPillBgColor(item[1])}>
            {getCategoryName}
          </Pill>
        </td>
        <td>
          <div className="text-center">
            <Button
              type={ButtonType.ICON}
              icon="sync"
              onClick={() => {
                if (item[1] === MATCH_TYPES.COMPOUND) {
                  history.push(`/patents/dashboard-drug/${item[0]}`)
                } else if (item[1] === MATCH_TYPES.TRIAL) {
                  history.push(`/patents/trials/${item[0]}`)
                } else if (item[1] === MATCH_TYPES.COMPANY) {
                  history.push(`/patents/dashboard/${item[0]}`)
                }
              }}
            />
          </div>
        </td>
      </TableRow>
    )
  }

  return (
    <Table
      id="searchHistory"
      items={buildData}
      renderRow={renderRow}
      title="Search History"
      columnHeadings={tableHeader}
      isLoading={isFetchingSearchHistoryData}
      isSearchable={false}
      loaderSize={30}
      error={errorFetchingSearchHistoryData}
    />
  )
}

function mapStateToProps(state: object) {
  return {
    errorFetchingSearchHistoryData: errorFetchingSearchHistory(state),
    isFetchingSearchHistoryData: isFetchingSearchHistorySelector(state),
    searchHistoryData: searchHistorySelector(state),
  }
}

const mapDispatchToProps = {
  fetchSearchHistoryData: fetchSearchHistoryAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchHistory)
