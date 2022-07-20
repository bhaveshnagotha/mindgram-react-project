import React, { useEffect, useState } from 'react'
import { History } from 'history'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { IMatch } from '..'
import Table, { TableRow, TSortBy, TSortOrder } from '../../../components/Table'
import { baseColors } from '../../../constants/colors'
import {
  errorFetchingPatentOwners,
  fetchPatentOwners as fetchPatentOwnersAction,
  isFetchingPatentOwnersSelector,
  patentOwnersKey,
  patentOwnersSelector,
} from '../../../redux/PatentOwners'
import {
  TableIndex,
  TableLink,
  TdWrapper,
  TooltipWrapper,
  handleSort,
} from '../dashboardHelper'
import { Tag } from '../../../components'

type TItem = string[]

const tableHeader = ['', 'Company', 'Trials', 'Drugs']
const tableHeaderWidth = [null, null, 150, 150]

const renderRow = (item: string[], index: number, match: any) => {
  return (
    <TableRow key={index}>
      <TableIndex>{`${index + 1}.`}</TableIndex>
      <TableLink>
        <TooltipWrapper>
          <div className="d-flex align-items-center" data-title={item[0]}>
            <TdWrapper width="auto">
              <Link
                to={{
                  pathname: `${match && match.url}/${item[0]}`,
                  search: `?company_id=${item[4]}`,
                }}
              >
                {item[0]}
              </Link>
            </TdWrapper>
            {item[3] && (
              <Tag className="ml-2" bgColor={baseColors.BLUE_SIX}>
                {item[3]}
              </Tag>
            )}
          </div>
        </TooltipWrapper>
      </TableLink>
      <td style={{ textAlign: 'left', width: `${tableHeaderWidth[2]}px` }}>
        {item[1]}
      </td>
      <td style={{ textAlign: 'left', width: `${tableHeaderWidth[3]}px` }}>
        {item[2]}
      </td>
    </TableRow>
  )
}

function PatentOwners({
  history,
  match,
  fetchPatentOwnersData,
  patentOwnersData,
  errorFetchingPatentOwnersData,
  isFetchingPatentOwnersData,
}: {
  history: History
  match: IMatch
  fetchPatentOwnersData: (patentOwners: string) => void
  errorFetchingPatentOwnersData: boolean
  isFetchingPatentOwnersData: boolean
  patentOwnersData: any
}) {
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(
    null
  )
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (
      patentOwnersData[patentOwnersKey] === null ||
      patentOwnersData[patentOwnersKey] === undefined
    ) {
      fetchPatentOwnersData('')
    }
    // eslint-disable-next-line
  }, [fetchPatentOwnersData, errorFetchingPatentOwnersData])

  let buildData: TItem[] = []

  if (
    patentOwnersData &&
    patentOwnersData[patentOwnersKey] &&
    patentOwnersData[patentOwnersKey].length
  ) {
    buildData = patentOwnersData[patentOwnersKey].map((d: any) => [
      d.company_name,
      (d.proceedings && d.proceedings.length).toString(),
      (d.drugs && d.drugs.length).toString(),
      d.company_ticker,
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
    <Table
      id="patentOwners"
      items={sortedItems()}
      renderRow={renderRow}
      title="Patent Owners In Focus"
      columnHeadings={tableHeader}
      tableHeaderWidth={tableHeaderWidth}
      sortableColumns={[1, 2, 3]}
      loaderSize={30}
      onSort={onSort}
      isSearchable={true}
      onSearch={onSearch}
      isLoading={isFetchingPatentOwnersData}
      match={match}
      error={errorFetchingPatentOwnersData}
    />
  )
}

function mapStateToProps(state: object) {
  return {
    errorFetchingPatentOwnersData: errorFetchingPatentOwners(state),
    isFetchingPatentOwnersData: isFetchingPatentOwnersSelector(state),
    patentOwnersData: patentOwnersSelector(state),
  }
}

const mapDispatchToProps = {
  fetchPatentOwnersData: fetchPatentOwnersAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(PatentOwners)
