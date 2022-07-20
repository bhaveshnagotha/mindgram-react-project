import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Table, {
  TableRow,
  TSortBy,
  TSortOrder,
} from '../../../../../components/Table'
import {
  TableIndex,
  TableLink,
  TdWrapper,
  TooltipWrapper,
  handleSort,
} from '../../../../Dashboard/dashboardHelper'
import {
  errorFetchingPriorArtsSelector,
  fetchPriorArts as fetchPriorArtsAction,
  isFetchingPriorArtsSelector,
  trialPriorArtsDataSelector,
} from '../../../../../redux/TrialPriorArts'

type TItem = string[]

const tableHeader = ['', 'Tag', 'Exhibit']
const tableHeaderWidth = [null, null, 400]

function PriorArtsCited({
  ptabTrialNum,
  priorArts,
  fetchPriorArts,
  errorFetchingPriorArts,
  isFetchingPriorArts,
  onOpenRight,
}: {
  onOpenRight: any
  ptabTrialNum: string
  priorArts: any
  errorFetchingPriorArts: boolean
  fetchPriorArts: (ptabTrialNum: string) => void
  isFetchingPriorArts: boolean
}) {
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(
    null
  )
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (
      priorArts === null ||
      (priorArts && priorArts[ptabTrialNum] === null) ||
      (priorArts && priorArts[ptabTrialNum] === undefined)
    ) {
      fetchPriorArts(ptabTrialNum)
    }
    // eslint-disable-next-line
  }, [fetchPriorArts, errorFetchingPriorArts])

  let buildData: TItem[] = []
  if (priorArts && priorArts[ptabTrialNum]) {
    buildData = Object.keys(priorArts[ptabTrialNum]).map((key: string) => [
      priorArts?.[ptabTrialNum]?.[key]?.tag,
      priorArts?.[ptabTrialNum]?.[key]?.exhibit?.exhibit_number,
      key,
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

  const handleClick = (priorArtId) => {
    const data = priorArts?.[ptabTrialNum]?.[priorArtId]
    const newData = { ...data, nodeType: 'priorArt' }
    return { type: 'analysis', data: newData }
  }

  const renderRow = (item: string[], index: number, match: any) => {
    return (
      <TableRow key={index}>
        <TableIndex>{`${index + 1}.`}</TableIndex>
        <TableLink>
          <TooltipWrapper>
            <div className="d-flex align-items-center" data-title={item[0]}>
              <TdWrapper
                style={{ width: 'auto', cursor: 'pointer' }}
                onClick={() => onOpenRight(handleClick(item[2]))}
              >
                {item[0]}
              </TdWrapper>
            </div>
          </TooltipWrapper>
        </TableLink>
        <td style={{ textAlign: 'left', width: `${tableHeaderWidth[2]}px` }}>
          {item[1]}
        </td>
      </TableRow>
    )
  }

  return (
    <Table
      id="patentOwners"
      items={sortedItems()}
      renderRow={renderRow}
      title="Prior Arts Cited"
      columnHeadings={tableHeader}
      tableHeaderWidth={tableHeaderWidth}
      sortableColumns={[1, 2, 3]}
      loaderSize={30}
      onSort={onSort}
      isSearchable={false}
      onSearch={onSearch}
      isLoading={isFetchingPriorArts}
      error={errorFetchingPriorArts}
    />
  )
}

function mapStateToProps(state: object) {
  return {
    errorFetchingPriorArts: errorFetchingPriorArtsSelector(state),
    isFetchingPriorArts: isFetchingPriorArtsSelector(state),
    priorArts: trialPriorArtsDataSelector(state),
  }
}

const mapDispatchToProps = {
  fetchPriorArts: fetchPriorArtsAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(PriorArtsCited)
