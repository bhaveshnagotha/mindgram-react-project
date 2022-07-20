import React, { ReactElement } from 'react'
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
} from 'react-virtualized'
import { MeasuredCellParent } from 'react-virtualized/dist/es/CellMeasurer'

interface IProps {
  height: number
  list: any[]
  rowRenderer: (list: any[], index: number) => ReactElement
  width: number
}
class DynamicHeightList extends React.PureComponent<IProps> {
  private cache: any

  constructor(props: IProps) {
    super(props)

    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 50,
    })
  }

  public render() {
    const { height, list, width } = this.props

    return (
      <List
        deferredMeasurementCache={this.cache}
        height={height}
        overscanRowCount={1}
        rowCount={list.length}
        rowHeight={this.cache.rowHeight}
        rowRenderer={this.rowRenderer}
        width={width}
      />
    )
  }

  private rowRenderer = ({
    index,
    key,
    parent,
    style,
  }: {
    index: number
    key: string
    parent: MeasuredCellParent
    style: React.CSSProperties
  }) => {
    const { list, rowRenderer } = this.props

    return (
      <CellMeasurer
        cache={this.cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        <div style={style} key={key}>
          {rowRenderer(list, index)}
        </div>
      </CellMeasurer>
    )
  }
}

function Wrapper({
  list,
  height,
  rowRenderer,
}: {
  height: number
  list: any[]
  rowRenderer: (list: any[], index: number) => ReactElement
}) {
  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <div style={{ width }}>
          <DynamicHeightList
            list={list}
            height={height}
            width={width}
            rowRenderer={rowRenderer}
          />
        </div>
      )}
    </AutoSizer>
  )
}

export default Wrapper
