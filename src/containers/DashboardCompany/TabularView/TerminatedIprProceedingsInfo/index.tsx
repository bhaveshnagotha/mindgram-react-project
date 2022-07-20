import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IValue as IFilterOption } from '../../../../components/Dropdown'
import Table, {
  TableRow,
  TSortBy,
  TSortOrder,
} from '../../../../components/Table'
import getFilterOptions, {
  getUrl,
  TableIndex,
  TableLink,
  TdWrapper,
  TooltipWrapper,
} from '../../../Dashboard/dashboardHelper'

type TItem = string[]

const tableHeader = ['', 'IPR', 'Patent', 'Patent exp. date', 'Outcome']

const renderRow = (item: any, index: number) => {
  return (
    <TableRow key={index}>
      <TableIndex>{`${index + 1}.`}</TableIndex>
      <TableLink>
        <TooltipWrapper>
          <div data-title={item[0]}>
            <TdWrapper width="150px">
              <Link to={getUrl('TRIAL', item[0])}>{item[0]}</Link>
            </TdWrapper>
          </div>
        </TooltipWrapper>
      </TableLink>
      <TableLink>
        <TdWrapper>
          <Link to={getUrl('PATENT', item[1])}>{item[1]}</Link>
        </TdWrapper>
      </TableLink>
      <td>
        <TdWrapper>{item[2]}</TdWrapper>
      </td>
      <td>
        <TooltipWrapper>
          <div data-title={item[3]}>
            <TdWrapper>{item[3]}</TdWrapper>
          </div>
        </TooltipWrapper>
      </td>
    </TableRow>
  )
}

function TerminatedIprProceedingsInfo({
  terminatedIprInfoData,
  isDataLoading,
}: {
  terminatedIprInfoData: string[][]
  isDataLoading?: boolean
}) {
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(
    null
  )
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const indexToBeFiltered = 3
  const [filterOptions, setFilterOptions] = useState<IFilterOption[]>([])

  useEffect(() => {
    if (terminatedIprInfoData) {
      const allFilterableOptions: IFilterOption[] = getFilterOptions(
        terminatedIprInfoData,
        indexToBeFiltered
      )
      setFilterOptions(allFilterableOptions)
    }
  }, [terminatedIprInfoData])

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
    const items = terminatedIprInfoData || []
    let sortedItemsData = items.map((i) => i)

    if (search) {
      sortedItemsData = sortedItemsData.filter((item) => {
        return (
          (item[0] &&
            item[0].toLowerCase().indexOf(search.toLowerCase()) >= 0) ||
          (item[1] && item[1].toLowerCase().indexOf(search.toLowerCase()) >= 0)
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
      id="terminatedIprProceedingsInfo"
      items={sortedItems()}
      renderRow={renderRow}
      title="Terminated IPR proceedings"
      columnHeadings={tableHeader}
      sortableColumns={[1, 2, 3, 4, 5]}
      filterOptions={filterOptions}
      onSort={onSort}
      onFilter={onFilter}
      isSearchable={true}
      onSearch={onSearch}
      isLoading={isDataLoading}
    />
  )
}

export default TerminatedIprProceedingsInfo
