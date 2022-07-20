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
} from '../../../Dashboard/dashboardHelper'

type TItem = string[]

const tableHeader = ['', 'Product Name', 'No. IPR proceedings', 'Patents']

const renderRow = (item: any, index: number) => {
  return (
    <TableRow key={index}>
      <TableIndex>{`${index + 1}.`}</TableIndex>
      <TableLink>
        <Link to={getUrl('COMPOUND', item[0])}>{item[0]}</Link>
      </TableLink>
      <td>{item[1]}</td>
      <td>{item[2]}</td>
    </TableRow>
  )
}

function ProductsInfo({
  isDataLoading,
  productInfoData,
}: {
  isDataLoading?: boolean
  productInfoData: string[][]
}) {
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(
    null
  )
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

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
    const items = productInfoData || []
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
        (item) => item[0].toLowerCase() === filter
      )
    }

    if (sortBy) {
      sortedItemsData.sort((a: TItem, b: TItem) => {
        const index = tableHeader.indexOf(sortBy)

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
      id="productsInfo"
      items={sortedItems()}
      renderRow={renderRow}
      title="Products"
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

export default ProductsInfo
