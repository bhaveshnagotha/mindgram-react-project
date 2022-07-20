import React, { Component, ReactNode } from 'react'

import ReactList from 'react-list'

interface IProps {
  items: any[]
  renderItem: (item: any, index: number) => ReactNode
}
class List extends Component<IProps> {
  public render() {
    const { items } = this.props

    return (
      <ReactList
        itemRenderer={this.renderItem}
        length={items && items.length}
        type="uniform"
      />
    )
  }
  private renderItem = (index: number, key: any) => {
    const item = this.props.items[index]
    return <div key={key}>{this.props.renderItem(item, index)}</div>
  }
}

export default List
