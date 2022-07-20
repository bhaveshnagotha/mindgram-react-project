import styled, { css } from 'styled-components'
import { IValue as IFilterOption } from '../../components/Dropdown'
import { baseColors } from '../../constants/colors'

type TItem = string[]

const MATCH_TYPES = Object.freeze({
  COMPANY: 'COMPANY',
  COMPOUND: 'COMPOUND',
  PATENT: 'PATENT',
  TRIAL: 'TRIAL',
})

export default function getFilterOptions(
  filterableData: string[][],
  indexToBeFiltered: number
) {
  const filterableColumns =
    filterableData &&
    Array.from(
      new Set(
        filterableData.map((data: any) => data && data[indexToBeFiltered])
      )
    )
  const fetchedfilterableOptions: IFilterOption[] =
    filterableColumns &&
    filterableColumns.map((col: string) => {
      return { label: cleanString(col), key: col && col.toLowerCase() }
    })
  const allFilterableOptions: IFilterOption[] = fetchedfilterableOptions
    ? [{ label: 'All', key: 'all' }, ...fetchedfilterableOptions]
    : [{ label: 'All', key: 'all' }]
  return allFilterableOptions.sort((a, b) => {
    if (a.label < b.label) {
      return -1
    }
    if (a.label > b.label) {
      return 1
    }
    return 0
  })
}

export const cleanString = (input: string) =>
  input && input.trim().replace(/_/g, ' ')

const truncateString = (input: string, truncateLength: number) =>
  input.length > 5 ? `${input.substring(0, truncateLength)}...` : input

const tooltipStyles = css`
  [data-title]:hover:after {
    opacity: 1;
    transition: all 0.1s ease 0.5s;
    visibility: visible;
  }
  [data-title]:after {
    content: attr(data-title);
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-size: 100%;
    position: absolute;
    padding: 5px 10px;
    bottom: -2.6em;
    left: 0%;
    white-space: nowrap;
    box-shadow: 1px 1px 3px #222222;
    opacity: 0;
    z-index: 9999;
    visibility: hidden;
    border-radius: 5px;
  }
  [data-title] {
    position: relative;
  }
`
export const TooltipWrapper = styled.div`
  ${tooltipStyles};
  position: relative;
`
const TableIndex = styled.td`
  padding: 5px !important;
  vertical-align: middle;
  text-align: left;
  color: #a5a7b4 !important;
  padding-left: 10px !important;
  width: 30px;
`
const TdWrapper = styled.div<{ width?: string }>`
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 400;
  color: ${baseColors.GREY_DARKER};
  /* width: ${(props) => (props.width ? props.width : '80px')}; */
  overflow: hidden;
  position: relative;
  ${tooltipStyles}
`

const TableLink = styled.td<{ width?: string }>`
  ${(props) => (props.width ? `width: ${props.width}` : '')};
  & a {
    color: unset !important;
    text-decoration: unset !important;
    &:hover {
      color: ${baseColors.BLUE_FIVE} !important;
      transition: all ease-in 300ms;
    }
  }
`

const getUrl: any = (matchType: string, value: string) => {
  if (matchType === MATCH_TYPES.COMPOUND) {
    return `/patents/dashboard-drug/${value}`
  } else if (matchType === MATCH_TYPES.TRIAL) {
    return `/patents/trials/${value}`
  } else if (matchType === MATCH_TYPES.COMPANY) {
    return `/patents/dashboard/${value}`
  } else if (matchType === MATCH_TYPES.PATENT) {
    return `/patents/dashboard-patent/${value}`
  } else {
    return `/patents/dashboard`
  }
}

const handleSort = (
  a: TItem,
  b: TItem,
  sortDirection: string | null,
  sortBy: string,
  tHeaders: string[]
) => {
  const index = tHeaders.filter((d) => !!d).indexOf(sortBy)

  const itemA = parseInt(a[index], 10)
  const itemB = parseInt(b[index], 10)
  if (sortDirection === 'asc') {
    if (isNaN(itemA) && isNaN(itemB)) {
      return a[index] > b[index] ? 1 : -1
    }
    return itemA > itemB ? 1 : -1
  }

  if (sortDirection === 'desc') {
    if (isNaN(itemA) && isNaN(itemB)) {
      return a[index] > b[index] ? -1 : 1
    }
    return itemA > itemB ? -1 : 1
  }

  return 0
}
export { truncateString, TableIndex, TableLink, TdWrapper, getUrl, handleSort }
