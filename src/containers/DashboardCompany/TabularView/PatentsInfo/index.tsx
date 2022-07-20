import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Table, {
  TableRow,
  TSortBy,
  TSortOrder,
} from '../../../../components/Table'
import {
  getUrl,
  TableIndex,
  TableLink,
  TdWrapper,
} from '../../../Dashboard/dashboardHelper'

type TItem = string[]
const tableHeader = ['', 'Patent', 'Patent exp. date', 'No. IPR proceedings']

const renderRow = (item: any, index: number) => {
  return (
    <TableRow key={index}>
      <TableIndex>{`${index + 1}.`}</TableIndex>
      <TableLink>
        <TdWrapper>
          <Link to={getUrl('PATENT', item[0])}>{item[0]}</Link>
        </TdWrapper>
      </TableLink>
      <td>
        <TdWrapper width="100px">{item[1]}</TdWrapper>
      </td>
      <td style={{ textAlign: 'center' }}>{item[2]}</td>
    </TableRow>
  )
}

function PatentsInfo({
  isDataLoading,
  patentData,
}: {
  isDataLoading?: boolean
  patentData?: string[][]
}) {
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(
    null
  )
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const indexToBeFiltered = 0

  const onSort = (sortByValue: TSortBy, sortDirectionValue: TSortOrder) => {
    setSortBy(sortByValue)
    setSortDirection(sortDirectionValue)
  }

  const onFilter = (filterValue: string) => {
    setFilter(filterValue)
  }
  const onSearch = (searchValue: string) => {
    setSearch(searchValue)
  }

  const sortedItems = () => {
    const items = patentData || []
    let sortedItemsData = items.map((i) => i)

    if (search) {
      sortedItemsData = sortedItemsData.filter((item) => {
        return (
          item[0].toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
          item[1].toLowerCase().indexOf(search.toLowerCase()) >= 0
        )
      })
    }

    if (filter && filter !== 'all') {
      sortedItemsData = sortedItemsData.filter(
        (item) => item[indexToBeFiltered].toLowerCase() === filter
      )
    }

    if (sortBy) {
      sortedItemsData.sort((a: TItem, b: TItem) => {
        const index = sortBy.toLowerCase() === 'search details' ? 0 : 1

        if (sortDirection === 'asc') {
          return a[index] > b[index] ? 1 : -1
        }

        if (sortDirection === 'desc') {
          return a[index] > b[index] ? -1 : 1
        }

        return 0
      })
    }

    return sortedItemsData
  }

  return (
    <Table
      id="patentsInfo"
      items={sortedItems()}
      renderRow={renderRow}
      title="Patents"
      columnHeadings={tableHeader}
      sortableColumns={[1, 2, 3]}
      onSort={onSort}
      onFilter={onFilter}
      isSearchable={true}
      onSearch={onSearch}
      isLoading={isDataLoading}
    />
  )
}

export default PatentsInfo
