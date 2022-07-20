import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core'
import styled from 'styled-components'
import { ITag } from '../../../components/Tag'
import { Loading } from '../../../components'
import theme from '../../../theme'
import { baseColors } from '../../../constants/colors'
import { useHistory } from 'react-router-dom'
import { BORDER } from './MuiHeatmap'

const RootTable = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
`

const StyledTableContainer = styled(TableContainer)`
  flex-grow: 1;
`

const Tag = styled.span<ITag>`
  background: ${(props) => (props.bgColor ? props.bgColor : 'transparent')};
  ${(props) =>
    props.borderColor ? `border: 2px solid ${props.borderColor}` : ''};
  ${(props) => (props.color ? `color: ${props.color}` : '')};
  font-family: ${theme.fonts.sourceSansPro};
  display: flex;
  justify-content: center;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '')};
  align-items: center;
  border-radius: 20px;
  padding: 3px 5px;
  font-size: ${(props) => (props.fontSize ? props.fontSize : 12)}px;
  text-transform: uppercase;
  text-overflow: ellipsis;
  flex-wrap: wrap;
  width: auto;
  height: auto;
`

const SPag = styled(TablePagination)`
  font-size: 12px;
`

const Sspan = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px 3px;
`

export const LoadingWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CustomTable = styled(Table)`
  & .MuiTableCell-root {
    padding: 6px;
  }
`

const VerticalHeaderTableCell = styled(TableCell)`
  &:hover {
    background-color: ${baseColors.TABLE_BORDER};
    cursor: pointer;
  }
  background-color: ${baseColors.WHITE};
`

const LinkSpan = styled.span`
  &:hover {
    color: ${baseColors.BLUE_ELEVEN};
    // color: ${baseColors.BLUE_FIVE};
  }
  cursor: pointer;
  text-decoration: underline;
`

export default function MuiTableFundingDetails({
  isLoading,
  rows,
  columns,
  isPagination,
}: {
  isLoading: boolean
  rows: any
  columns: any
  isPagination?: boolean
}) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const history = useHistory()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const renderTags = (cellData) => {
    const elems = cellData.map((item, key) => {
      return (
        <Tag bgColor={'#c5efef'} key={key} fontSize={8}>
          {item?.value}{' '}
        </Tag>
      )
    })
    return <Sspan>{elems}</Sspan>
  }
  const newRows = isPagination
    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : rows

  return (
    <RootTable>
      {isLoading ? (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      ) : (
        <>
          <StyledTableContainer>
            <CustomTable stickyHeader style={{ borderCollapse: 'collapse' }}>
              <TableHead>
                <TableRow>
                  {columns?.map((column) => (
                    <TableCell
                      key={column?.id}
                      align={column?.align ?? 'center'}
                      style={{
                        minWidth: column?.minWidth,
                        backgroundColor: baseColors.WHITE,
                        border: 'none',
                      }}
                    >
                      {column?.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {newRows.map((row: any, index) => {
                  return (
                    <TableRow tabIndex={-1} key={index}>
                      {columns?.map((column) => {
                        const cellData = row[column?.id]
                        const isArray = Array.isArray(cellData)
                        const retdata = isArray ? cellData : [cellData]
                        const type = cellData?.[0]?.type
                        let retval
                        switch (type) {
                          case 'tag': {
                            retval = renderTags(retdata)
                            break
                          }
                          case 'number': {
                            retval = retdata?.map((v, i) => {
                              return (
                                <span>
                                  {column?.format
                                    ? column?.format(v?.value)
                                    : v?.value}
                                  {i !== cellData?.length - 1 && ', '}
                                </span>
                              )
                            })
                            retval = (
                              <div
                                style={{
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  alignItems: isArray ? 'left' : 'center',
                                  justifyContent: isArray ? 'left' : 'center',
                                }}
                              >
                                {retval}
                              </div>
                            )
                            break
                          }
                          default: {
                            retval = retdata?.map((v, i) => {
                              if (isArray && v?.linkData && column?.link) {
                                return (
                                  <LinkSpan
                                    onClick={() => {
                                      history.push(column?.link(v?.linkData))
                                    }}
                                  >
                                    {column?.format
                                      ? column?.format(v?.value)
                                      : v?.value}{' '}
                                    {i !== retdata?.length - 1 && ', '}
                                  </LinkSpan>
                                )
                              } else {
                                return (
                                  <span style={{}}>
                                    {column?.format
                                      ? column?.format(v?.value)
                                      : v?.value}{' '}
                                    {i !== retdata?.length - 1 && ', '}
                                  </span>
                                )
                              }
                            })
                            retval = (
                              <div
                                style={{
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                {retval}
                              </div>
                            )
                            break
                          }
                        }
                        if (!isArray && column?.link && cellData?.linkData) {
                          return (
                            <VerticalHeaderTableCell
                              key={column?.id + row?.id}
                              align={isArray ? 'left' : 'center'}
                              style={{
                                fontSize: 12,
                                border: BORDER,
                                height: 'auto',
                              }}
                              onClick={() => {
                                history.push(column?.link(cellData?.linkData))
                              }}
                            >
                              {retval}
                            </VerticalHeaderTableCell>
                          )
                        } else {
                          return (
                            <TableCell
                              key={column?.id + row?.id}
                              align={isArray ? 'left' : 'center'}
                              style={{
                                fontSize: 12,
                                border: BORDER,
                                height: 'auto',
                              }}
                            >
                              {retval}
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
          {isPagination && (
            <Table>
              <TableFooter>
                <TableRow>
                  <SPag
                    rowsPerPageOptions={[10, 25, 50, 100, 250]}
                    count={rows?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          )}
        </>
      )}
    </RootTable>
  )
}
