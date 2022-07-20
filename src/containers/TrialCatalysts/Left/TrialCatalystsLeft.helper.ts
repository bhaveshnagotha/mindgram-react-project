import { IMultiSelectValue } from '../../../components/MultiSelectDropdown'
import { getCollection } from '../../../helpers/api'

const getUrl = (query) => `/v1/ct/catalysts?${query}`

const newsFilterValues = [
  '510(k) APPROVAL',
  'ACCELERATED APPROVAL',
  'ACCELERATED ASSESSMENT',
  'AWARD | GRANT',
  'BLA FILING',
  'BREAKTHROUGH DEVICE DESIGNATION',
  'BREAKTHROUGH THERAPY DESIGNATION',
  'BUSINESS UPDATE',
  'CLINICAL HOLD',
  'CLINICAL TRIAL',
  'CLINICAL TRIAL CLEARANCE',
  'CLINICAL TRIAL DOSING',
  'CLINICAL TRIAL ENROLLMENT',
  'CLINICAL TRIAL INITIATION',
  'CLINICAL TRIAL RECRUITMENT',
  'CONDITIONAL MARKETING AUTHORIZATION',
  'CONFERENCE CALL',
  'DATA READOUT',
  'DATA READOUT | INTERIM RESULTS',
  'DATA READOUT | PIVOTAL RESULTS',
  'DEAL ACTIVITY',
  'EARNINGS REPORT',
  'EMA MARKETING APPLICATION',
  'EMERGENCY USE AUTHORIZATION',
  'FAST TRACK DESIGNATION',
  'FDA LETTER',
  'FINANCIAL PRESENTATION',
  'FINANCING',
  'FOLLOW ON FINANCING',
  'IND APPLICATION',
  'IPO',
  'JOINT VENTURE | PARTNERSHIP',
  'LICENSING | COLLABORATION',
  'M&A',
  'MILESTONE PAYMENTS',
  'NEW DRUG APPLICATION',
  'ORPHAN DRUG DESIGNATION',
  'PATENT',
  'PRE IPO FINANCING',
  'PRESENTATION',
  'PRIME DESIGNATION',
  'PRIORITY REVIEW',
  'PRODUCT APPROVAL',
  'QIDP DESIGNATION',
  'RARE PEDIATRIC DISEASE DESIGNATION',
  'REGULATORY',
  'REGULATORY DESIGNATION',
  'RMAT DESIGNATION',
  'SCIENTIFIC PRESENTATION',
  'SPECIAL PROTOCOL ASSESSMENT',
]

export const newsFilterOptions: IMultiSelectValue[] = newsFilterValues.map(
  (i) =>
    ({
      key: i,
      label: i,
    } as IMultiSelectValue)
)

export enum TabType {
  News = 'news',
  SECFiling = 'sec',
}

export enum TabName {
  News = 'NEWS',
  SECFiling = 'SEC FILINGS',
}

export function isNewsTab(tab) {
  return tab === TabType.News
}

export function isSECTab(tab) {
  return tab === TabType.SECFiling
}

export function fetchCatalysts(query) {
  const url = getUrl(query)
  return getCollection(url)
}

export const getUrlQuery = (req: string[]) => {
  return req?.reduce((acc: any, curr: any) => {
    const param = `company=${curr}&`
    const query = `${acc}${param}`
    return query
  }, '')
}

export const getTrialCatalystsData = (catalystsData) => {
  // TODO: This is a temporary fix to handle different response
  // structure when data is filtered. When backend bug is fixed, this code should be removed.
  // End of temporary fix.
  // console.log(catalystsData)
  // return catalystsData
  const data =
    catalystsData &&
    Object.keys(catalystsData)?.reduce((acc, curr) => {
      const trialObj = {}
      const catData = catalystsData?.[curr]
      const temp = {
        catalyst_type: catData?.catalyst_type,
        id: catData?.id,
        source: catData.source,
        title: curr,
        date: catData?.date,
        products: catData?.products,
        company: catData?.company?.[0],
        conditions: catData?.conditions,
        conditions_dict: catData?.conditions_dict,
        url: catData?.url,
        tags: catData?.tags,
      }
      Object.assign(trialObj, temp)
      acc.push(trialObj)
      return acc
    }, [] as any)
  return data
}

export const compFilterOptions = (data) =>
  data?.reduce((acc: IMultiSelectValue[], curr: any) => {
    const temp = [...acc]
    const cId = `${curr?.company?.type}${curr?.company?.id}`
    const item = {
      key: cId,
      label: curr?.company?.name,
      tag: curr?.company?.ticker,
    }
    temp.push(item)
    const a = temp.filter(
      (ac: any, i, self) => self.findIndex((t: any) => t.key === ac.key) === i
    )
    return a
  }, [])
