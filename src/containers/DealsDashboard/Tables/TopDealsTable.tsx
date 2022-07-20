import * as React from 'react'
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { topDealsSelector } from '../../../redux/DealsActivity'
import { connect } from 'react-redux'
import MuiTable from './MuiTable'

interface ReduxProps {
  topDeals: any
}

function TopDealsTable(props: ReduxProps) {
  const { topDeals } = props
  const columnNames = [
    { name: 'Date' },
    { name: 'Company' },
    { name: 'Deal Value', rowAlign: 'center', format: (value) => '$' + value },
  ]
  const fields = ['date', 'company', 'amount']
  const columns: object[] = []
  columnNames.forEach((item, index) => {
    const obj = {
      ...item,
      id: fields[index],
    }
    columns.push(obj)
  })

  const [rows, setRows] = useState<any[]>([])
  useEffect(() => {
    renderRows(topDeals)
  }, [topDeals])
  const renderRows = (data) => {
    const tempRows: any[] = []
    data?.map((item, id) => {
      const date = item?.Date?.value
      const company = item?.Company?.value?.company_name
      const amount = item?.['Deal Value']?.value
      const row: any = {
        id,
        date,
        company,
        amount,
      }
      tempRows.push(row)
      return row
    })
    setRows(tempRows)
  }
  return <MuiTable isLoading={false} rows={rows} columns={columns} />
}

function mapStateToProps(state: object) {
  return {
    topDeals: topDealsSelector(state),
  }
}

export default connect(mapStateToProps)(TopDealsTable)
