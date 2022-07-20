import { IMultiSelectValue } from '../../../components/MultiSelectDropdown'
import { getCollection } from '../../../helpers/api'

const getUrl = (query) => `/v1/ct/catalysts?${query}`

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
  let catalysts = catalystsData
  if (catalysts?.length) {
    catalysts = {}
    catalystsData.forEach((c) => {
      for (const [key, value] of Object.entries(c)) {
        catalysts[key] = value
      }
    })
  }
  // End of temporary fix.
  const data =
    catalysts &&
    Object.keys(catalysts)?.reduce((acc, curr) => {
      const trialObj = {}
      const catData = catalysts?.[curr]
      const temp = {
        id: catData?.id,
        source: catData.source,
        title: curr,
        date: catData?.date,
        products: catData?.products,
        company: catData?.company?.[0],
        conditions: catData?.conditions,
        conditions_dict: catData?.conditions_dict,
        url: catData?.url,
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
    return temp.filter(
      (ac: any, i, self) => self.findIndex((t: any) => t.key === ac.key) === i
    )
  }, [])
