import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Loading, Table } from '../../components'
import { TableRow, TSortBy, TSortOrder } from '../../components/Table'
import {
  errorFetchingTherapeuticAreas,
  isFetchingTherapeuticAreasSelector,
  therapeuticAreasSelector,
  fetchTherapeuticAreas as fetchTherapeuticAreasAction,
  therapeuticAreasKey,
} from '../../redux/TherapeuticAreas'
import {
  TableIndex,
  TableLink,
  TooltipWrapper,
  TdWrapper,
  handleSort,
} from '../Dashboard/dashboardHelper'
import { LoadingWrapper } from '../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { Header } from './ClinicalTrialsDashboard.style'

const TherapeuticAreas = ({
  therapeuticAreas,
  fetchTherapeuticAreas,
  isErrorFetchingTherapeuticAreas,
  isFetchingTherapeuticAreas,
}) => {
  const therapeuticAreasData = therapeuticAreas[therapeuticAreasKey]
  const { push } = useHistory()

  useEffect(() => {
    if (!therapeuticAreasData && !isErrorFetchingTherapeuticAreas) {
      fetchTherapeuticAreas()
    }
  }, [
    fetchTherapeuticAreas,
    therapeuticAreasData,
    isErrorFetchingTherapeuticAreas,
  ])

  const renderRow = (item: string[], index: number, match: any) => {
    return (
      <TableRow key={index}>
        <TableIndex>{`${index + 1}.`}</TableIndex>
        <TableLink>
          <TooltipWrapper>
            <div data-title={item[1]}>
              <TdWrapper>
                <Link to={`/clinical-trials/therapeutic-areas/${item[0]}`}>
                  {item[1]}
                </Link>
              </TdWrapper>
            </div>
          </TooltipWrapper>
        </TableLink>
        <td style={{ textAlign: 'left' }}>{item[2]}</td>
      </TableRow>
    )
  }
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(
    null
  )
  type TItem = string[]
  const onSort = (sortByValue: TSortBy, sortDirectionValue: TSortOrder) => {
    setSortBy(sortByValue)
    setSortDirection(sortDirectionValue)
  }
  const tableHeader = ['', 'Area', 'No. of conditions']
  const sortedItems = () => {
    if (therapeuticAreasData === null) return []
    const items =
      Object.values(therapeuticAreasData)?.map((area: any) => [
        area.id,
        area.name,
      ]) || []
    const sortedItemsData = items.map((i) => i)
    if (sortBy) {
      sortedItemsData.sort((a: TItem, b: TItem) => {
        return handleSort(a, b, sortDirection, sortBy, tableHeader)
      })
    }
    return sortedItemsData
  }

  return (
    <Fragment>
      <Header>
        <p>Therapeutic Areas</p>
        <div onClick={() => push('/clinical-trials/therapeutic-areas')}>
          View all
        </div>
      </Header>

      {isFetchingTherapeuticAreas ? (
        <LoadingWrapper>
          <Loading size={30} />
        </LoadingWrapper>
      ) : (
        <Table
          hideHeader={true}
          id="therapeuticAreas"
          onSort={onSort}
          items={sortedItems()}
          sortableColumns={[1, 2]}
          renderRow={renderRow}
          columnHeadings={tableHeader}
          loaderSize={30}
        />
      )}
    </Fragment>
  )
}

function mapStateToProps(state: object) {
  return {
    therapeuticAreas: therapeuticAreasSelector(state),
    isErrorFetchingTherapeuticAreas: errorFetchingTherapeuticAreas(state),
    isFetchingTherapeuticAreas: isFetchingTherapeuticAreasSelector(state),
  }
}

const mapDispatchToProps = {
  fetchTherapeuticAreas: fetchTherapeuticAreasAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(TherapeuticAreas)
