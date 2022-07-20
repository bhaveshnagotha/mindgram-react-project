import * as React from 'react'
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import {
  heatmapModalitySelector,
  heatmapStageSelector,
} from '../../../redux/DealsActivity'
import { connect } from 'react-redux'
import MuiHeatmap from './MuiHeatmap'
import { HeatmapDataType } from '../index'

interface IReduxProps {
  heatmapModalityData: any
  heatmapStageData: any
}

interface IProps {
  heatmapDataType: HeatmapDataType
}

const stageColumns = [
  'Preclinical',
  'IND Filed',
  'Phase 1',
  'Phase 1/2',
  'Phase 2',
  'Phase 2/3',
  'Phase 3',
  'Phase 4',
  'NDA/BLA/MAA',
  'Approved',
]

function HeatmapTable(props: IReduxProps & IProps) {
  const { heatmapModalityData, heatmapStageData, heatmapDataType } = props
  const isModality = heatmapDataType === HeatmapDataType.MODALITY
  const [rows, setRows] = useState<any[]>([])
  const [columns, setColumns] = useState<string[]>([])

  useEffect(() => {
    const heatmapData = isModality ? heatmapModalityData : heatmapStageData
    const renderRows = (data: object) => {
      const tempColumns: string[] = ['rowKey']
      const columnSet = isModality ? new Set<string>(tempColumns) : null
      const tempRows: any[] = []
      if (data) {
        Object.keys(data)?.map((rowKey, rowIndex) => {
          const row: any = {}
          const rowColumns: object = data[rowKey]
          for (const columnKey in rowColumns) {
            if (rowColumns.hasOwnProperty(columnKey)) {
              if (isModality) {
                if (!columnSet?.has(columnKey)) {
                  columnSet?.add(columnKey)
                  tempColumns.push(columnKey)
                }
              }
              const cellData = rowColumns[columnKey]
              const dealValue = cellData?.deal_value
              const dealCount = cellData?.count
              const dealIds = cellData?.deal_ids
              row[columnKey] = { dealCount, dealValue, dealIds }
            }
          }
          row[rowIndex] = rowIndex
          row.rowKey = rowKey
          tempRows.push(row)
          return row
        })
      }
      if (isModality) {
        const sortedColumns = tempColumns?.sort((a, b) => {
          if (a === 'rowKey') return -1
          if (b === 'rowKey') return 1
          a = a.toLowerCase()
          b = b.toLowerCase()
          if (a < b) return -1
          if (a > b) return 1
          return 0
        })
        setColumns(sortedColumns)
      } else {
        setColumns(['rowKey', ...stageColumns])
      }
      setRows(tempRows)
    }
    renderRows(heatmapData)
  }, [heatmapModalityData, heatmapStageData, heatmapDataType, isModality])
  return <MuiHeatmap isLoading={false} rows={rows} columns={columns} />
}

function mapStateToProps(state: object) {
  return {
    heatmapModalityData: heatmapModalitySelector(state),
    heatmapStageData: heatmapStageSelector(state),
  }
}

export default connect(mapStateToProps)(HeatmapTable)
