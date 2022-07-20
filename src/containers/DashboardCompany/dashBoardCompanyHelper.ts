import { format } from 'date-fns'
import { ICompanyInfoData } from '.'
import IDashboardCompany from './IDashboardCompany'
import buildTreeData from './TreeView/treeHelper'

const groupDataBy = (data: any, key: any) => {
  return (
    data &&
    data.reduce((item: any, curr: any) => {
      ;(item[curr[key]] = item[curr[key]] || []).push(curr)
      return item
    }, {})
  )
}

function getDataObjectByGroupName(companyData, groupName: string) {
  const buildDataObj: IDashboardCompany[][] = groupDataBy(
    companyData,
    groupName
  )
  return buildDataObj
}

function buildCompanyInfoData(companyData, isFetchingDashboardCompanyData) {
  let buildCompanyInfoDataObj: ICompanyInfoData = {
    companyName: '',
    tickers: [],
    drugsFacingPatentsChallenges: 0,
    noOfActiveProceedings: 0,
    noOfTerminatedProceedings: 0,
    patentsInDispute: 0,
  }
  if (!isFetchingDashboardCompanyData) {
    const drugsFacingPatentsChallenges: string[] = []
    const patentsInDispute: string[] = []
    let noOfActiveProceedings: number = 0
    let noOfTerminatedProceedings: number = 0
    let companyName: string = ''
    let tickers: string[] = []
    if (companyData && companyData.length > 0) {
      companyData.forEach((curr: any) => {
        companyName = curr.parent_company
        tickers = curr.parent_company_tickers
        if (curr.is_active) {
          drugsFacingPatentsChallenges.push(curr.trade_name)
          patentsInDispute.push(curr.patent_number)
          noOfActiveProceedings = noOfActiveProceedings + 1
        } else if (!curr.is_active) {
          noOfTerminatedProceedings = noOfTerminatedProceedings + 1
        }
      })
    }
    const totalPatentsInDispute = Array.from(new Set(patentsInDispute))
    const totalDrugsFacingPatentsChallenges = Array.from(
      new Set(drugsFacingPatentsChallenges)
    )
    buildCompanyInfoDataObj = {
      tickers,
      companyName,
      drugsFacingPatentsChallenges: totalDrugsFacingPatentsChallenges.length,
      noOfActiveProceedings,
      noOfTerminatedProceedings,
      patentsInDispute: totalPatentsInDispute.length,
    }
  }
  return buildCompanyInfoDataObj
}

function buildIprProceedingInfoData(
  companyData,
  isFetchingDashboardCompanyData,
  isProceedingByActive: boolean
) {
  let iprInfoData: string[][] = [[]]

  if (
    !isFetchingDashboardCompanyData &&
    companyData &&
    companyData.length > 0
  ) {
    iprInfoData =
      companyData &&
      companyData
        .filter((d: any) => d.is_active === isProceedingByActive)
        .map((data: any) => {
          return [
            data.ptab_trial_num,
            data.patent_number,
            format(new Date(data.patent_expiration_date), 'MMM, yyyy'),
            format(new Date(data.proceeding_filing_date), 'yyyy-MM-dd'),
            data.proceeding_status,
          ]
        })
  }

  return iprInfoData
}

function buildProductsData(companyData, isFetchingDashboardCompanyData) {
  let buildProductsInfoDataObj
  if (!isFetchingDashboardCompanyData) {
    buildProductsInfoDataObj = getDataObjectByGroupName(
      companyData,
      'trade_name'
    )
  }

  const buildProductsInfoData: string[][] =
    buildProductsInfoDataObj &&
    Object.keys(buildProductsInfoDataObj).reduce(
      (acc: string[][], key: any) => {
        const curr: IDashboardCompany[] = buildProductsInfoDataObj[key]
        const totalIprProceedings = Array.from(
          new Set(
            curr.map((key2: IDashboardCompany) => key2 && key2.ptab_trial_num)
          )
        )
        const totalPatents = Array.from(
          new Set(
            curr.map((key2: IDashboardCompany) => key2 && key2.patent_number)
          )
        )
        acc.push([
          key,
          `${totalIprProceedings.length}`,
          `${totalPatents.length}`,
        ])
        return acc
      },
      [] as string[][]
    )

  return buildProductsInfoData
}

function buildPatentData(companyData, isFetchingDashboardCompanyData) {
  let buildPatentInfoDataObj
  if (!isFetchingDashboardCompanyData) {
    buildPatentInfoDataObj = getDataObjectByGroupName(
      companyData,
      'patent_number'
    )
  }
  const buildPatentInfoData: string[][] =
    buildPatentInfoDataObj &&
    Object.keys(buildPatentInfoDataObj).reduce((acc: string[][], key: any) => {
      const curr: IDashboardCompany[] = buildPatentInfoDataObj[key]
      const totalPatentExpDate = Array.from(
        new Set(
          curr.map(
            (key2: IDashboardCompany) => key2 && key2.patent_expiration_date
          )
        )
      )
      const totalIprProceedings = Array.from(
        new Set(
          curr.map((key2: IDashboardCompany) => key2 && key2.ptab_trial_num)
        )
      )
      acc.push([
        key,
        format(new Date(totalPatentExpDate[0]), 'MMM, yyyy'),
        `${totalIprProceedings.length}`,
      ])
      return acc
    }, [] as string[][])

  return buildPatentInfoData
}

function getTreeData(companyData, isFetchingDashboardCompanyData) {
  let patentInfoDataObj
  let productsInfoDataObj
  let companyInfoData
  if (!isFetchingDashboardCompanyData) {
    patentInfoDataObj = getDataObjectByGroupName(companyData, 'patent_number')
    productsInfoDataObj = getDataObjectByGroupName(companyData, 'trade_name')
    companyInfoData = buildCompanyInfoData(
      companyData,
      isFetchingDashboardCompanyData
    )
  }

  const treeData: any = buildTreeData(
    companyData,
    patentInfoDataObj,
    productsInfoDataObj,
    companyInfoData
  )
  return treeData
}

export {
  groupDataBy,
  buildCompanyInfoData,
  buildPatentData,
  buildIprProceedingInfoData,
  buildProductsData,
  getTreeData,
}
