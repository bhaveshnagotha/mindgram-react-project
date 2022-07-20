import * as React from 'react'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { investorsSelector } from '../../../redux/DealsActivity'
import MuiTable from './MuiTable'

interface ITopInvestorsRow {
  index: number
  deal_count: number
  investor_id: number
  investor_name: string
}

interface IReduxProps {
  investors: any
}

function TopInvestorsTable(props: IReduxProps) {
  const { investors } = props
  const columnNames = [
    { name: '', minWidth: 20, width: '10%' },
    { name: 'Investor', width: '50%' },
    { name: 'Deal Count', rowAlign: 'center', width: '40%' },
  ]
  const fields = ['index', 'investor_name', 'deal_count']
  const columns: object[] = []
  columnNames.forEach((item, index) => {
    const obj = {
      ...item,
      id: fields[index],
    }
    columns.push(obj)
  })

  const [rows, setRows] = useState<ITopInvestorsRow[]>([])

  const renderRows = (data) => {
    const tempRows: ITopInvestorsRow[] = data.map((item, index) => {
      const deal_count: string = item?.deal_count
      const investor_id: number = item?.investor_id
      const investor_name: string = item?.investor_name
      return {
        index: index + 1,
        deal_count,
        investor_name,
        investor_id,
      }
    })
    setRows(tempRows)
  }

  useEffect(() => {
    if (investors) renderRows(investors)
  }, [investors])

  return <MuiTable isLoading={false} rows={rows} columns={columns} />
}

function mapStateToProps(state: object) {
  return {
    investors: investorsSelector(state),
  }
}

export default connect(mapStateToProps)(TopInvestorsTable)
