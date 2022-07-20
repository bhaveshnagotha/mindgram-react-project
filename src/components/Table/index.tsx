import React, { MouseEventHandler } from 'react'

import { debounce } from 'lodash'
import styled from 'styled-components'

import { Card, Icon, InputSearchBar, Loading } from '../../components'
import { baseColors } from '../../constants/colors'
import { scrollBarStyles } from '../../containers/App/App.styles'
import { Box } from '../../primitives'
import theme from '../../theme'
import Button, { buttonTypes, IconButton } from '../Button'
import { IValue as IFilterOption } from '../Dropdown'
import FilterDropdown from './FilterDropdown'
import CrossIcon from '../SvgIcons/CrossIcon'

const tableHeaderHeight = 60
const buffer = 0

const TableWrapper = styled.div<{ isHidden: boolean }>`
  height: 100%;
  ${scrollBarStyles}
`
const TableInner = styled.table<{ fullHeight?: boolean }>`
  width: 100%;
  border-collapse: collapse;
  display: block;
  overflow: hidden;
  height: ${(props) =>
    props.fullHeight ? '100%' : `calc(100% - ${tableHeaderHeight - buffer}px`};

  ::-webkit-scrollbar {
    width: 0.3rem;
    height: 0.3rem;
  }
  ::-webkit-scrollbar-thumb {
    background: #d0d0d0;
  }
  ::-webkit-scrollbar-track {
    background: #eaeaea;
  }
`
const TableBody = styled.tbody`
  width: 100%;
  border-collapse: collapse;
  display: block;
  overflow-y: auto;
  height: calc(100% - ${tableHeaderHeight - buffer}px);
  ::-webkit-scrollbar {
    width: 0.3rem;
    height: 0.3rem;
  }
  ::-webkit-scrollbar-thumb {
    background: #d0d0d0;
  }
  ::-webkit-scrollbar-track {
    background: #eaeaea;
  }
`

export const TableRow = styled.tr`
  border-top: 2px solid #000;
  display: table;
  width: 100%;
  table-layout: fixed;

  td {
    border-top: 2px solid ${baseColors.TABLE_BORDER};
    padding: 12px 10px;
    color: ${baseColors.GREY_DARKER};
    font-family: ${theme.fonts.sourceSansPro};
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }
`
const TableHead = styled.thead`
  display: table;
  width: 100%;
  table-layout: fixed;
`
const ColumnHeadings = styled.tr`
  color: ${theme.colors.gray};
  font-size: 11px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.5px;
  line-height: 20px;

  th,
  td {
    font-family: ${theme.fonts.sourceSansPro};
    text-align: left;
    padding: 12px 10px;
  }
`

const SortButton = styled(IconButton)`
  position: relative;
`

export type TSortOrder = 'asc' | 'desc' | null
export type TSortBy = string | null

interface ISortableColumnHeaderProps {
  children: any
  width?: number | null
  direction: TSortOrder
  onClick: MouseEventHandler
}
const SortableColumnHeader = ({
  children,
  direction,
  onClick,
  width,
}: ISortableColumnHeaderProps) => (
  <th style={{ width: width ? `${width}px` : '' }}>
    <label
      style={{ margin: 0, cursor: 'pointer', userSelect: 'none' }}
      onClick={onClick}
    >
      {children}
      {!direction && (
        <Button type={buttonTypes.ICON} icon="sort" onClick={() => undefined} />
      )}
      {direction && direction === 'asc' && (
        <SortButton>
          <Icon type="sort-up" isClickable />
        </SortButton>
      )}
      {direction && direction === 'desc' && (
        <SortButton>
          <Icon type="sort-down" isClickable />
        </SortButton>
      )}
    </label>
  </th>
)

export const TableHeader = styled.div`
  display: flex;
  flex-flow: row;
  height: ${tableHeaderHeight}px;
  align-items: center;
  padding: 10px 20px 0;

  > div > div {
    position: relative;
  }
`

export const TableTitle = styled.p<{ textAlign?: string }>`
  margin: 0;
  font-weight: bold;
  color: ${baseColors.GREY_DARKER};
  font-family: ${theme.fonts.sourceSansPro};
  font-size: 18px;
  line-height: 20px;
  flex-grow: 1;
  flex-basis: 50%;
  text-align: ${(props) => props.textAlign || ''};
`

export const TableButton = styled.button<{ noFilter: boolean }>`
  border: 0;
  padding: ${(props) => (props.noFilter ? '0' : '0 16px 0 0')};
  color: ${theme.colors.gray};
  background-color: transparent;
  transition: 0.1s ease;
  outline: none;

  &:active,
  &:focus {
    outline: none;
  }

  &:hover {
    color: ${theme.colors.purple};
    cursor: pointer;
  }
`

const ZeroState = styled(Box)`
  font-family: ${theme.fonts.sourceSansPro};
  color: ${baseColors.GREY_DARKER};
  font-style: italic;
  text-align: center;
  padding: 20px;
`

type TItem = any
interface IProps {
  items: TItem[]
  renderRow: (item: TItem, index: number, match: any) => void
  columnHeadings?: string[]
  columnHeaderStyles?: React.CSSProperties[]
  tableStyle?: React.CSSProperties
  tableHeaderStyle?: React.CSSProperties
  tableHeaderWidth?: (number | null)[]
  sortableColumns?: number[]
  title?: string
  titleComponent?: any
  isLoading?: boolean
  match?: any
  loaderSize?: number
  onFilter?: (value: string) => void
  filterOptions?: IFilterOption[]
  isSearchable?: boolean
  onSearch?: (value: string) => void
  onSort?: (column: TSortBy, direction: TSortOrder) => void
  error?: boolean
  id: string
  hideHeader?: boolean
  textAlign?: string
  fullHeight?: boolean
  noShadow?: boolean
}

interface IState {
  searchText: string
  sortBy: TSortBy
  sortOrder: TSortOrder
  searching: boolean
}

class Table extends React.Component<IProps, IState> {
  private static defaultProps = {
    columnHeadings: [],
    error: false,
    filterOptions: [],
    isLoading: false,
    isSearchable: false,
    loaderSize: 30,
    onFilter: (value: string) => undefined,
    onSearch: (value: string) => undefined,
    onSort: (column: TSortBy, direction: TSortOrder) => undefined,
    sortableColumns: [],
    title: '',
  }
  public state: IState = {
    searchText: '',
    searching: false,
    sortBy: '',
    sortOrder: null,
  }

  public render() {
    const {
      items,
      renderRow,
      columnHeadings,
      columnHeaderStyles,
      tableStyle,
      tableHeaderStyle,
      tableHeaderWidth,
      sortableColumns,
      title,
      titleComponent,
      isLoading,
      onFilter,
      isSearchable,
      loaderSize,
      onSearch,
      filterOptions,
      error,
      match,
      id,
      hideHeader,
      fullHeight,
      noShadow,
    } = this.props

    const { searching, sortBy, sortOrder } = this.state

    if (isLoading) {
      return (
        <Card
          isFlex={true}
          alignItems="center"
          style={{ padding: '20px', height: '100%' }}
        >
          <Loading size={loaderSize} loadingText="Loading..." />
        </Card>
      )
    }

    const debouncedSearch = debounce(onSearch!, 200, { trailing: true })
    return (
      <Card
        boxShadow={noShadow ? 'none' : `0 6px 18px 0 ${baseColors.GREY_LIGHT}`}
        style={{ height: '100%' }}
      >
        {!hideHeader && (
          <TableHeader>
            {title && (
              <TableTitle textAlign={this.props.textAlign}>{title}</TableTitle>
            )}
            {titleComponent && (
              <TableTitle textAlign={this.props.textAlign}>
                {titleComponent}
              </TableTitle>
            )}
            {isSearchable && !searching && (
              <TableButton
                noFilter={filterOptions!.length <= 0}
                onClick={() => this.setState({ searching: true })}
              >
                <span className="fa fa-search"></span>
              </TableButton>
            )}
            {isSearchable && searching && (
              <div className="d-flex align-items-center pr-3">
                <InputSearchBar
                  id={id}
                  placeholder="Search..."
                  handleChange={(text) => debouncedSearch(text.trim())}
                  onCancel={this.clearSearch.bind(this)}
                />
                <CrossIcon
                  height={12}
                  color={baseColors.GREY_ONE}
                  onClick={() => {
                    this.setState({ searching: false })
                    onSearch?.('')
                  }}
                />
              </div>
            )}
            {filterOptions!.length > 0 && (
              <FilterDropdown
                filterOptions={filterOptions!}
                onFilter={onFilter!}
                selected={filterOptions![0].key}
              />
            )}
          </TableHeader>
        )}

        <TableWrapper isHidden={items && items.length === 0}>
          <TableInner style={tableStyle} fullHeight={fullHeight}>
            {columnHeadings && columnHeadings.length > 0 && (
              <TableHead style={tableHeaderStyle}>
                <ColumnHeadings>
                  {columnHeadings.map((headerItem, index) => {
                    if (sortableColumns!.indexOf(index) >= 0) {
                      return (
                        <SortableColumnHeader
                          direction={sortBy === headerItem ? sortOrder : null}
                          onClick={this.setSort.bind(this)}
                          key={index}
                          width={tableHeaderWidth && tableHeaderWidth[index]}
                        >
                          {headerItem}
                        </SortableColumnHeader>
                      )
                    }

                    let styleObj: React.CSSProperties = {
                      padding:
                        items && items.length !== 0 && !headerItem
                          ? '12px 0'
                          : '',
                      width:
                        items && items.length !== 0 && !headerItem
                          ? '20px'
                          : tableHeaderWidth
                          ? `${tableHeaderWidth[index]}px`
                          : '',
                    }

                    if (columnHeaderStyles && columnHeaderStyles[index])
                      styleObj = { ...styleObj, ...columnHeaderStyles[index] }

                    return (
                      <th key={index} style={styleObj}>
                        {headerItem}
                      </th>
                    )
                  })}
                </ColumnHeadings>
              </TableHead>
            )}
            <TableBody>
              {items &&
                !error &&
                items.length > 0 &&
                items.map((item, index) => renderRow(item, index, match))}
            </TableBody>
          </TableInner>
        </TableWrapper>
        {items && !error && items.length === 0 && (
          <ZeroState>No matching items</ZeroState>
        )}
        {error && (
          <ZeroState>There was an error while fetching the data</ZeroState>
        )}
      </Card>
    )
  }

  private setSort(e: any) {
    e.preventDefault()

    const { sortBy, sortOrder } = this.state
    const { onSort } = this.props
    const newSortBy = e.currentTarget.textContent

    if (newSortBy !== sortBy) {
      return this.setState(
        {
          sortBy: newSortBy,
          sortOrder: 'asc',
        },
        () => onSort!(newSortBy, 'asc')
      )
    }

    if (newSortBy === sortBy && sortOrder === 'desc') {
      return this.setState(
        {
          sortBy: null,
          sortOrder: null,
        },
        () => onSort!(null, null)
      )
    }

    if (newSortBy === sortBy && sortOrder === 'asc') {
      return this.setState(
        {
          sortOrder: 'desc',
        },
        () => onSort!(newSortBy, 'desc')
      )
    }
  }

  private clearSearch() {
    this.setState({ searching: false })
    this.props.onSearch!('')
  }
}

export default Table
