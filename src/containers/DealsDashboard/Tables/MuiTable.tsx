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
import { baseColors } from '../../../constants/colors'
import { ITag } from '../../../components/Tag'
import { Loading } from '../../../components'
import theme from '../../../theme'

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
  ${(props) => (props.width ? `width: ${props.width}` : '')};
  font-family: ${theme.fonts.sourceSansPro};
  display: flex;
  justify-content: center;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '')};
  align-items: center;
  border-radius: 20px;
  min-height: ${({ height }) => height || 25}px;
  padding: 3px 15px;
  font-size: ${(props) => (props.fontSize ? props.fontSize : 12)}px;
  min-width: 60px;
  text-transform: uppercase;
  text-overflow: ellipsis;
  flex-wrap: wrap;
`

const SPag = styled(TablePagination)`
  font-size: 12px;
`

const Sspan = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0px 3px;
`

export const LoadingWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function MuiTable({
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const renderTags = (arr) => {
    const elems = arr.map((item, key) => {
      return (
        <Tag bgColor={'#f2f5f5'} key={key}>
          {item}{' '}
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
            <Table stickyHeader>
              <colgroup>
                {/*<col width="auto"/>*/}
                {/*  <col style={{}}/>*/}
                {/*  <col width="10%"/>*/}
                {columns.map((column) => (
                  <col style={{ width: column?.width }} />
                ))}
              </colgroup>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column?.id}
                      align={column?.rowAlign ?? 'left'}
                      style={{
                        minWidth: column?.minWidth,
                        padding: '5px 0 5px 0',
                        backgroundColor: baseColors.WHITE,
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
                    <TableRow role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column?.id]
                        let arr
                        if (column?.id === 'investors' && row?.type === 'tag') {
                          arr = row?.investors.split(', ')
                        }
                        return (
                          <TableCell
                            key={column?.id + page * rowsPerPage + index}
                            align={column?.rowAlign ?? 'left'}
                            style={{
                              fontSize: 12,
                              padding: '5px 0 5px 0',
                            }}
                          >
                            {arr
                              ? renderTags(arr)
                              : column?.format
                              ? column.format(value)
                              : value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
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
