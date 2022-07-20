export const getMergersData = (mergersData) => {
  const data =
    mergersData &&
    Object.keys(mergersData).reduce((acc: any, currKey: any) => {
      const temp = [...acc]
      const item = mergersData?.[currKey] || {}
      temp.push(item)
      return temp
    }, [])
  return data
}

export interface IPharmActions {
  pharm_action: string
  pharm_action_id: string
}

interface IMergerTarget {
  name: string
  id: string
  norm_cui: string
  on_market: boolean
  pharm_actions: IPharmActions[]
}

interface ICompanyType {
  company_id: number
  company_name: string
  company_ticker: string
  company_type: string
}

interface IMergerOverlapData {
  acquirer: IMergerTarget[]
  condition: string
  overlap: boolean
  condition_id: number
  target: IMergerTarget[]
}

export interface IMergersOverlaps {
  acquirer: ICompanyType
  target: ICompanyType
  next_offset: number
  merger_overlap_data: IMergerOverlapData[]
}

export const getMergersOverlapsData = (mergersData) => {
  if (mergersData) {
    const data =
      mergersData &&
      Object.keys(mergersData)?.reduce((acc: any, currKey: any) => {
        const temp = [...acc]
        const item = mergersData?.[currKey] || {}
        temp.push(item)
        return temp
      }, [])
    return data
  }
  return []
}

export const getRelatedMergerData = ({ data, mergerName }) => {
  if (data && mergerName) {
    const mData = getMergersData(data)
    const mergArr = mergerName.split('-')
    const acquirerCompId = mergArr[0]
    const targetCompId = mergArr[1]
    const relatedMergerData = mData?.find(
      (d) =>
        `${d.acquirer_company.type}${d.acquirer_company.id}` ===
          acquirerCompId &&
        `${d.target_company.type}${d.target_company.id}` === targetCompId
    )
    return relatedMergerData
  }
  return {}
}
