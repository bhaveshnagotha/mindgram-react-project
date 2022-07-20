import * as React from 'react'
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { fundingDetailsSelector } from '../../../redux/DealsActivity'
import { connect } from 'react-redux'
import MuiTableFundingDetails from './MuiTableFundingDetails'

interface IProps {
  fundingDetailsData: any
}

const fields = [
  'date',
  'company',
  'round',
  'dealValue',
  'investors',
  'indications',
  'modalities',
  'stages',
  'targets',
]
const columnNames: any = [
  { name: 'Date', minWidth: 80 },
  {
    name: 'Company',
    link: (linkData) => `/clinical-trials/company-dashboard/${linkData}`,
  },
  { name: 'Round', minWidth: 80 },
  { name: 'Deal Value', format: (value) => '$' + value, minWidth: 80 },
  { name: 'Investor(s)' },
  {
    name: 'Indication(s)',
    link: (linkData) => `/clinical-trials/therapeutic-areas/c/${linkData}`,
  },
  { name: 'Modalities' },
  { name: 'Stage(s)' },
  { name: 'Target(s)' },
]

function FundingDetailsTable(props: IProps) {
  const { fundingDetailsData } = props

  const columns: object[] = []
  columnNames.forEach((item, index) => {
    const obj = {
      ...item,
      id: fields[index],
    }
    columns.push(obj)
  })

  const [rows, setRows] = useState<any[] | null>(null)
  useEffect(() => {
    renderRows(fundingDetailsData)
  }, [fundingDetailsData])
  const renderRows = (data) => {
    const tempRows: any[] = []
    data?.map((item, id) => {
      const date = { type: item?.Date?.type, value: item?.Date?.value }
      const company = {
        type: item?.Company?.type,
        value: item?.Company?.value?.company_name,
        linkData:
          item?.Company?.value?.company_type + item?.Company?.value?.company_id,
      }
      const round = { type: item?.Round?.type, value: item?.Round?.value }
      const dealValue = {
        type: item?.['Deal Value']?.type,
        value: item?.['Deal Value']?.value,
      }
      const investors = item?.['Investor(s)']?.map((v, i) => {
        return { type: v?.type, value: v?.value?.investor_name }
      })
      const indications = item?.['Indication(s)']?.map((v, i) => {
        return {
          type: v?.type,
          value: v?.value?.condition_name,
          linkData: v?.value?.condition_id,
        }
      })
      const modalities = item?.Modalities?.map((v, i) => {
        return { type: v?.type, value: v?.value?.modality }
      })
      const stages: object[] = item?.['Stage(s)']?.map((v, i) => {
        return { type: v?.type, value: v?.value?.stage }
      })
      const targets: object[] = item?.['Target(s)']?.map((v, i) => {
        return { type: v?.type, value: v?.value?.target_symbol }
      })
      const row: any = {
        id,
        date,
        company,
        round,
        dealValue,
        investors,
        indications,
        modalities,
        stages,
        targets,
      }
      tempRows.push(row)
      return row
    })
    setRows(tempRows)
  }
  return (
    <>
      {rows && (
        <MuiTableFundingDetails
          isLoading={false}
          rows={rows}
          columns={columns}
          isPagination={true}
        />
      )}
    </>
  )
}

function mapStateToProps(state: object) {
  return {
    fundingDetailsData: fundingDetailsSelector(state),
  }
}

export default connect(mapStateToProps)(FundingDetailsTable)
