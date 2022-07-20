import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import styled from 'styled-components'
import { Loading } from '../../../components'
import { convertNumber } from '../helpers'
import { baseColors } from '../../../constants/colors'
import { useHistory } from 'react-router-dom'
import {
  fetchDealsModalData as fetchDealsModalDataAction,
  setDealsModalOpen as setDealsModalOpenAction,
} from '../../../redux/DealsActivity'
import { connect } from 'react-redux'

const RootTable = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
`
const StyledTableContainer = styled(TableContainer)`
  &::-webkit-scrollbar {
    height: 10px;
  }
`
export const LoadingWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const VerticalHeaderTableCell = styled(TableCell)`
  &:hover {
    background-color: ${baseColors.TABLE_BORDER};
    cursor: pointer;
  }
  background-color: ${baseColors.WHITE};
`

const ClickableTableCell = styled(TableCell)`
  &:hover {
    filter: brightness(0.95);
    cursor: pointer;
  }
`

function adjust(color, amount) {
  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, (c) =>
        (
          '0' +
          Math.min(255, Math.max(0, parseInt(c, 16) + amount)).toString(16)
        ).substr(-2)
      )
  )
}

const CustomTable = styled(Table)`
  // & .MuiTableCell-root {
  //   padding: 1px;
  // }
`
const tableBodyCellPadding = '1px'
export const BORDER = `0.5px solid ${baseColors.GREY}`

interface IReduxProps {
  setDealsModalOpen: any
  fetchDealsModalData: any
}

interface IProps {
  isLoading: boolean
  rows: any
  columns: any
}

function MuiHeatmap(props: IProps & IReduxProps) {
  const {
    isLoading,
    rows,
    columns,
    setDealsModalOpen,
    fetchDealsModalData,
  } = props
  const history = useHistory()
  return (
    <>
      <RootTable>
        {isLoading ? (
          <LoadingWrapper>
            <Loading />
          </LoadingWrapper>
        ) : (
          <StyledTableContainer>
            <CustomTable stickyHeader style={{ borderCollapse: 'collapse' }}>
              <colgroup>
                {/*<col width="10%" />*/}
                {/*  <col width="10%"/>*/}
                {/*  <col width="10%"/>*/}
              </colgroup>
              <TableHead>
                <TableRow>
                  {columns.map((column, i) => {
                    const first = i === 0
                    return (
                      <TableCell
                        key={i}
                        align={'center'}
                        style={{
                          backgroundColor: baseColors.WHITE,
                          // padding: '0 5px 0 5px',
                          padding: 5,
                          fontSize: 12,
                          minWidth: 80,
                          border: 'none',
                          zIndex: first ? 3 : 2,
                          // maxWidth: 60,
                          width: first ? 200 : 'auto',
                        }}
                      >
                        {first ? '' : column}
                      </TableCell>
                    )
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row: any, index) => {
                  return (
                    <TableRow role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        if (column === 'rowKey') {
                          const cellData = row[column]
                          const separatedData = cellData?.split('|')
                          const conditionId = separatedData[0]
                          const conditionName = separatedData[1]
                          return (
                            <VerticalHeaderTableCell
                              key={row?.rowIndex + '-' + column}
                              align={'left'}
                              style={{
                                fontSize: 12,
                                border: 'none',
                                position: 'sticky',
                                left: 0,
                                padding: '0 10px 0 0',
                                textOverflow: 'ellipsis',
                                wordWrap: 'break-word',
                              }}
                              onClick={() => {
                                history.push(
                                  `/clinical-trials/therapeutic-areas/c/${conditionId}`
                                )
                              }}
                            >
                              {conditionName}
                            </VerticalHeaderTableCell>
                          )
                        } else if (column in row) {
                          const cellData = row[column]
                          const dealCount = cellData?.dealCount
                          const dealValue = cellData?.dealValue
                          const dealIds = cellData?.dealIds
                          const color = adjust('#42f563', -dealCount)
                          const cellContent = (
                            <>
                              <div>{'$' + convertNumber(dealValue)}</div>
                              <div>({dealCount ? dealCount : ''})</div>
                            </>
                          )
                          const renderedCell = dealIds?.length ? (
                            <ClickableTableCell
                              key={row?.rowIndex + '-' + column}
                              align={'center'}
                              style={{
                                fontSize: 12,
                                border: BORDER,
                                backgroundColor: color,
                                padding: tableBodyCellPadding,
                              }}
                              onClick={() => {
                                fetchDealsModalData({ deal_ids: dealIds })
                                setDealsModalOpen(true)
                              }}
                            >
                              {cellContent}
                            </ClickableTableCell>
                          ) : (
                            <TableCell
                              key={row?.rowIndex + '-' + column}
                              align={'center'}
                              style={{
                                fontSize: 12,
                                border: BORDER,
                                backgroundColor: color,
                                padding: tableBodyCellPadding,
                              }}
                            >
                              {cellContent}
                            </TableCell>
                          )
                          return <>{renderedCell}</>
                        } else {
                          return (
                            <TableCell
                              key={row?.rowIndex + '-' + column}
                              align={'center'}
                              style={{
                                fontSize: 12,
                                border: BORDER,
                                padding: tableBodyCellPadding,
                              }}
                            >
                              {''}
                            </TableCell>
                          )
                        }
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </CustomTable>
          </StyledTableContainer>
        )}
      </RootTable>
    </>
  )
}

const mapDispatchToProps = {
  setDealsModalOpen: setDealsModalOpenAction,
  fetchDealsModalData: fetchDealsModalDataAction,
}

export default connect(null, mapDispatchToProps)(MuiHeatmap)
