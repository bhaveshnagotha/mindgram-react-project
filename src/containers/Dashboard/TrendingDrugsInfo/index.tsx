import { History } from 'history'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { IMatch } from '..'
import Table, { TableRow, TSortBy, TSortOrder } from '../../../components/Table'
import {
  errorFetchingTrendingDrugs,
  fetchTrendingDrugs as fetchTrendingDrugsAction,
  isFetchingTrendingDrugsSelector,
  trendingDrugsKey,
  trendingDrugsSelector,
} from '../../../redux/TrendingDrugs'
import {
  getUrl,
  TableIndex,
  TableLink,
  TdWrapper,
  TooltipWrapper,
  handleSort,
} from '../dashboardHelper'

type TItem = string[]

const tableHeader = ['', 'Drug', 'Company', 'Trials', 'Patents']
const tableHeaderWidth = [null, null, null, 150, 100]

const renderRow = (item: string[], index: number, match: any) => {
  return (
    <TableRow key={index}>
      <TableIndex>{`${index + 1}.`}</TableIndex>
      <TableLink>
        <TooltipWrapper>
          <div data-title={item[0]}>
            <TdWrapper>
              <Link to={getUrl('COMPOUND', item[0])}>{item[0]}</Link>
            </TdWrapper>
          </div>
        </TooltipWrapper>
      </TableLink>
      <TableLink>
        <TooltipWrapper>
          <div data-title={item[1]}>
            <TdWrapper width="150px">
              <Link
                to={{
                  pathname: `${match && match.url}/${item[1]}`,
                  search: `?company_id=${item[4]}`,
                }}
              >
                {item[1]}
              </Link>
            </TdWrapper>{' '}
          </div>
        </TooltipWrapper>
      </TableLink>
      <td style={{ textAlign: 'left', width: `${tableHeaderWidth[3]}px` }}>
        {item[2]}
      </td>
      <td style={{ textAlign: 'left', width: `${tableHeaderWidth[4]}px` }}>
        {item[3]}
      </td>
    </TableRow>
  )
}

function TrendingDrugs({
  history,
  match,
  fetchTrendingDrugsData,
  trendingDrugsData,
  errorFetchingTrendingDrugsData,
  isFetchingTrendingDrugsData,
}: {
  history: History
  match: IMatch
  fetchTrendingDrugsData: (trendingDrugs: string) => void
  errorFetchingTrendingDrugsData: boolean
  isFetchingTrendingDrugsData: boolean
  trendingDrugsData: any
}) {
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(
    null
  )
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (
      trendingDrugsData[trendingDrugsKey] === null ||
      trendingDrugsData[trendingDrugsKey] === undefined
    ) {
      fetchTrendingDrugsData('')
    }
    // eslint-disable-next-line
  }, [fetchTrendingDrugsData, errorFetchingTrendingDrugsData])

  let buildData: TItem[] = []

  if (
    trendingDrugsData &&
    trendingDrugsData[trendingDrugsKey] &&
    trendingDrugsData[trendingDrugsKey].length
  ) {
    buildData = trendingDrugsData[trendingDrugsKey].map((d: any) => [
      d.drug_name,
      d.company_name,
      (d.proceedings && d.proceedings.length).toString(),
      (d.patents && d.patents.length).toString(),
      d.company_id,
    ])
  }

  const onSort = (sortByValue: TSortBy, sortDirectionValue: TSortOrder) => {
    setSortBy(sortByValue)
    setSortDirection(sortDirectionValue)
  }

  const onSearch = (searchValue: string) => {
    setSearch(searchValue)
  }

  const sortedItems = () => {
    const items = buildData || []
    let sortedItemsData = items.map((i) => i)

    if (search) {
      sortedItemsData = sortedItemsData.filter((item) => {
        return (
          item[0].toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
          item[1].toLowerCase().indexOf(search.toLowerCase()) >= 0
        )
      })
    }

    if (sortBy) {
      sortedItemsData.sort((a: TItem, b: TItem) => {
        return handleSort(a, b, sortDirection, sortBy, tableHeader)
      })
    }

    return sortedItemsData
  }

  return (
    <>
      <Table
        id="trendingDrugs"
        items={sortedItems()}
        renderRow={renderRow}
        title="Trending drugs"
        columnHeadings={tableHeader}
        tableHeaderWidth={tableHeaderWidth}
        sortableColumns={[1, 2, 3, 4]}
        loaderSize={30}
        onSort={onSort}
        isSearchable={true}
        onSearch={onSearch}
        isLoading={isFetchingTrendingDrugsData}
        match={match}
        error={errorFetchingTrendingDrugsData}
      />
    </>
  )
}

function mapStateToProps(state: object) {
  return {
    errorFetchingTrendingDrugsData: errorFetchingTrendingDrugs(state),
    isFetchingTrendingDrugsData: isFetchingTrendingDrugsSelector(state),
    trendingDrugsData: trendingDrugsSelector(state),
  }
}

const mapDispatchToProps = {
  fetchTrendingDrugsData: fetchTrendingDrugsAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(TrendingDrugs)
