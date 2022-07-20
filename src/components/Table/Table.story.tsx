import React from 'react'

import { boolean, text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import Table, { TableRow, TSortBy, TSortOrder } from '.'
import Button, { buttonTypes } from '../Button'
import { IValue as IFilterOption } from '../Dropdown'

const renderRow = (item: any, index: number) => (
  <TableRow key={index}>
    <td>{item[0]}</td>
    <td>{item[1]}</td>
    <td>
      <Button
        type={buttonTypes.ICON}
        icon="redo-alt"
        onClick={() => undefined}
      />
    </td>
  </TableRow>
)

type TItem = string[]
const mockItems: TItem[] = [
  ['AMRIX', 'Product'],
  ['Teva Pharmaceuticals', 'Company'],
  ['IPR2015-01978', 'Trial'],
  ['LEXIVA', 'Product'],
]

interface IProps {
  items: TItem[]
  error?: boolean
}
interface IState {
  filter: string
  filterOptions: IFilterOption[]
  header: string[]
  search: string
  sortBy: TSortBy
  sortDirection: TSortOrder
}

class TableWrapper extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      filter: '',
      filterOptions: [
        { label: 'All', key: 'all' },
        { label: 'Companies', key: 'company' },
        { label: 'Products', key: 'product' },
        { label: 'Trials', key: 'trial' },
      ],
      header: ['Search Details', 'Category', 'Search Again'],
      search: '',
      sortBy: null,
      sortDirection: null,
    }
  }

  public render() {
    const { header, filterOptions } = this.state
    const { error } = this.props
    const sortedItems = this.sortedItems()

    return (
      <Table
        id="tableStory"
        renderRow={renderRow}
        columnHeadings={header}
        sortableColumns={[0, 1]}
        items={sortedItems}
        error={error}
        title={text('Title', 'Search History')}
        isLoading={boolean('Loading', false)}
        isSearchable={boolean('Searchable', false)}
        filterOptions={filterOptions}
        onFilter={this.onFilter}
        onSearch={this.onSearch}
        onSort={this.onSort}
      />
    )
  }

  private onFilter = (filter: string) => this.setState({ filter })

  private onSearch = (search: string) => this.setState({ search })

  private onSort = (sortBy: TSortBy, sortDirection: TSortOrder) =>
    this.setState({ sortBy, sortDirection })

  private sortedItems() {
    const { sortBy, sortDirection, search, filter } = this.state
    const items = this.props.items || []
    let sortedItems = items.map((i) => i)

    if (search) {
      sortedItems = sortedItems.filter((item) => {
        return (
          item[0].toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
          item[1].toLowerCase().indexOf(search.toLowerCase()) >= 0
        )
      })
    }

    if (filter && filter !== 'all') {
      sortedItems = sortedItems.filter(
        (item) => item[1].toLowerCase() === filter
      )
    }

    if (sortBy) {
      sortedItems.sort((a: TItem, b: TItem) => {
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

    return sortedItems
  }
}

storiesOf('Table', module)
  .addDecorator(withKnobs)
  .add('Table', () => <TableWrapper items={mockItems} />)
  .add('Empty table', () => <TableWrapper items={[]} />)
  .add('Table with error', () => <TableWrapper error={true} items={[]} />)
