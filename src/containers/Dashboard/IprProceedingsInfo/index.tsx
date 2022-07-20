import styled from '@emotion/styled'
import { History } from 'history'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { IMatch } from '..'
import { IValue as IFilterOption } from '../../../components/Dropdown'
import Table, { TableRow, TSortBy, TSortOrder } from '../../../components/Table'
import { baseColors } from '../../../constants/colors'
import {
  errorFetchingLatestIprProceedings,
  fetchLatestIprProceedings as fetchLatestIprProceedingsAction,
  isFetchingLatestIprProceedingsSelector,
  latestIprProceedingsKey,
  latestIprProceedingsSelector,
} from '../../../redux/LatestIprProceedings'
import {
  getUrl,
  TableIndex,
  TableLink,
  TdWrapper,
  TooltipWrapper,
  handleSort,
} from '../dashboardHelper'
import { formatDate } from '../../../helpers/utils'

type TItem = string[]

interface IPill {
  backgroundColor?: string
  borderColor?: string
}
const StatusIcon = styled.span<IPill>`
  background: ${(props) => props.backgroundColor};
  min-width: 13px;
  min-height: 13px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid ${(props) => props.borderColor};
  margin-right: 5px;
`

const tableHeader = ['', 'IPR', 'Company', 'Drug', 'LAST UPDATE']

const renderRow = (item: string[], index: number, match: any) => {
  const getStatusIconBgColor = (status: string) => {
    switch (status) {
      case 'true':
        return '#c1e9d0'
      case 'false':
        return '#ffb5cd'
      default:
        return baseColors.YELLOW_TWO
    }
  }
  const getStatusIconBorderColor = (status: string) => {
    switch (status) {
      case 'true':
        return '#84D3A2'
      case 'false':
        return '#FF6B9B'
      default:
        return baseColors.YELLOW_ONE
    }
  }
  return (
    <TableRow key={index}>
      <TableIndex>{`${index + 1}.`}</TableIndex>
      <TableLink>
        <TooltipWrapper>
          <div className="d-flex align-items-center">
            <StatusIcon
              data-title={item[5] === 'true' ? 'Active' : 'Not Active'}
              backgroundColor={getStatusIconBgColor(item[5])}
              borderColor={getStatusIconBorderColor(item[5])}
            />
            <div className="d-flex align-items-center" data-title={item[0]}>
              <TdWrapper width="100px">
                <Link to={getUrl('TRIAL', item[0])}>{item[0]}</Link>
              </TdWrapper>
            </div>
          </div>
        </TooltipWrapper>
      </TableLink>
      <TableLink>
        <TooltipWrapper>
          <div data-title={item[1]}>
            <TdWrapper width="130px">
              <Link
                to={{
                  pathname: `${match && match.url}/${item[1]}`,
                  search: `?company_id=${item[6]}`,
                }}
              >
                {item[1]}
              </Link>
            </TdWrapper>
          </div>
        </TooltipWrapper>
      </TableLink>
      <TableLink>
        <TooltipWrapper>
          <div data-title={item[2]}>
            <TdWrapper width={'120px'}>
              <Link to={getUrl('COMPOUND', item[2])}>{item[2]}</Link>
            </TdWrapper>
          </div>
        </TooltipWrapper>
      </TableLink>
      <td style={{ color: '#A5A7B4' }}>
        <TdWrapper>{item[3]}</TdWrapper>
      </td>
    </TableRow>
  )
}

const filterOptions: IFilterOption[] = [
  { label: 'All', key: 'all' },
  { label: 'Active', key: 'isActive' },
  { label: 'Not Active', key: 'isInactive' },
]

function IprProceedings({
  history,
  match,
  fetchLatestIprProceedingsData,
  latestIprProceedingsData,
  errorFetchingLatestIprProceedingsData,
  isFetchingLatestIprProceedingsData,
}: {
  history: History
  match: IMatch
  fetchLatestIprProceedingsData: (latestIprProceedings: string) => void
  errorFetchingLatestIprProceedingsData: boolean
  isFetchingLatestIprProceedingsData: boolean
  latestIprProceedingsData: any
}) {
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(
    null
  )
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const indexToBeFiltered = 5

  useEffect(() => {
    if (
      latestIprProceedingsData[latestIprProceedingsKey] === null ||
      latestIprProceedingsData[latestIprProceedingsKey] === undefined
    ) {
      fetchLatestIprProceedingsData('')
    }
    // eslint-disable-next-line
  }, [fetchLatestIprProceedingsData, errorFetchingLatestIprProceedingsData])

  let buildData: TItem[] = []

  if (latestIprProceedingsData?.[latestIprProceedingsKey]?.length) {
    buildData = latestIprProceedingsData?.[
      latestIprProceedingsKey
    ]?.map((d: any) => [
      d.proceeding_number,
      d.company_name,
      d.drug_name,
      formatDate(d.max_document_date, 'yyyy-MM-dd'),
      d.institution_decision,
      String(d.is_active),
      d.company_id,
    ])
  }

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

    if (filter && filter !== 'all') {
      if (filter && filter === 'isActive') {
        sortedItemsData = sortedItemsData.filter(
          (item) => item[indexToBeFiltered] === 'true'
        )
      } else if (filter && filter === 'isInactive') {
        sortedItemsData = sortedItemsData.filter(
          (item) => item[indexToBeFiltered] === 'false'
        )
      } else {
        sortedItemsData = sortedItemsData.filter(
          (item) => item[indexToBeFiltered].toLowerCase() === filter
        )
      }
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
      id="iprProceedings"
      items={sortedItems()}
      renderRow={renderRow}
      title="Latest IPR proceedings"
      columnHeadings={tableHeader}
      filterOptions={filterOptions}
      loaderSize={30}
      onSort={onSort}
      onFilter={onFilter}
      isSearchable={true}
      onSearch={onSearch}
      isLoading={isFetchingLatestIprProceedingsData}
      match={match}
      error={errorFetchingLatestIprProceedingsData}
    />
  )
}

function mapStateToProps(state: object) {
  return {
    errorFetchingLatestIprProceedingsData: errorFetchingLatestIprProceedings(
      state
    ),
    isFetchingLatestIprProceedingsData: isFetchingLatestIprProceedingsSelector(
      state
    ),
    latestIprProceedingsData: latestIprProceedingsSelector(state),
  }
}

const mapDispatchToProps = {
  fetchLatestIprProceedingsData: fetchLatestIprProceedingsAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(IprProceedings)

// export default IprProceedings
