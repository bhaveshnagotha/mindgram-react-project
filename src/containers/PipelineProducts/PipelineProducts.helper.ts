import { IMultiSelectValue } from '../../components/MultiSelectDropdown'
import { getCollection } from '../../helpers/api'
import { ITherapeuticProductCondition } from '../TherapeuticAreas/Middle/TherapeuticProducts'

export interface ICompany {
  company_id: number
  company_name: string
  company_ticker: string
  company_type: string
}

interface IPipelineProductConditions {
  condition: string
  condition_id: number
}

interface IPipelineProductSponsors {
  lead_or_collaborator: string
  name: string
}

export interface IPipelineProductTrials {
  conditions: string[]
  nct_id: string
  phase: any[]
  sponsors: IPipelineProductSponsors[]
  start_date: Date
  status: string
  title: string
}

export interface IPipeLineProductDetails {
  company: ICompany[]
  conditions: ITherapeuticProductCondition[]
  intervention_name: string
  intervention_type: string
  intervention_files: string[]
  isonmarket: boolean
  on_watchlist: boolean
  licensings: any
  pharm_actions: {
    pharm_action: string
    pharm_action_id: string
  }[]
  synonyms: string[]
  trials: any
  norm_cui: string
  has_sales_info: boolean
}

export interface IPipelineProductNewsItem {
  date: Date
  headline: string
  news_file_id: number
  news_id: number
}

interface IPipelineProductConditions {
  condition: string
  condition_id: number
}
export interface IPipelineProductList {
  company: ICompany
  conditions: IPipelineProductConditions[]
  intervention_type: string
  moa: string[]
  preferred_term: string
}

export interface IPipelineProduct {
  company: ICompany[]
  conditions: IPipelineProductConditions[]
  intervention_class: any[]
  intervention_name: string
  intervention_other_name: string[]
  intervention_type: string
  news_date: Date
  news_items: IPipelineProductNewsItem[]
  trials: IPipelineProductTrials
}

export enum FilterType {
  'IntervType' = 'IntervType',
  'Company' = 'Company',
  'Action' = 'Action',
  'Condition' = 'Condition',
}

const getUrl = (query) => `/v1/ct/products?${query}`

export function fetchFilteredProducts(query) {
  const url = getUrl(query)
  return getCollection(url)
}

export const getUrlQuery = (companyArr: string[], conditionArr: string[]) => {
  const companyQuery = companyArr?.reduce((acc: any, curr: any) => {
    const param = `company=c${curr}&`
    const query = `${acc}${param}`
    return query
  }, '')
  const typeQuery = conditionArr?.reduce((acc: any, curr: any) => {
    const param = `condition=${curr}&`
    const query = `${acc}${param}`
    return query
  }, '')
  return `${companyQuery}${typeQuery}`
}

export const getPipelineProductsData = (products) => {
  const data =
    products &&
    Object.keys(products)?.reduce((acc, curr) => {
      const productObj = {}
      const prodData = products?.[curr]
      Object.assign(productObj, { ...prodData })
      acc.push(productObj)
      return acc
    }, [] as any)
  return data
}

export const getIntervTypeFilterOptions = (data: IPipelineProduct[]) =>
  data?.reduce((acc: IMultiSelectValue[], curr: IPipelineProduct) => {
    const temp = [...acc]
    const item = {
      key: curr.intervention_type,
      label: curr.intervention_type,
    }
    temp.push(item)
    return temp.filter(
      (ac: any, i, self) => self.findIndex((t: any) => t.key === ac.key) === i
    )
  }, [])
export const getActionFilterOptions = (data: IPipelineProductList[]) =>
  data?.reduce((acc: IMultiSelectValue[], curr: IPipelineProductList) => {
    const temp = [...acc]
    const item = {
      key: `${curr?.moa?.[0]}`,
      label: curr?.moa?.[0],
    }
    temp.push(item)
    return temp.filter(
      (ac: any, i, self) => self.findIndex((t: any) => t.key === ac.key) === i
    )
  }, [])

export const getCompanyFilterOptions = (data: IPipelineProductList[]) =>
  data?.reduce((acc: IMultiSelectValue[], curr: IPipelineProductList) => {
    const temp = [...acc]
    const item = {
      key: `${curr?.company?.company_id}`,
      label: curr?.company?.company_name,
      tag: curr?.company?.company_ticker,
    }
    temp.push(item)
    return temp.filter(
      (ac: any, i, self) => self.findIndex((t: any) => t.key === ac.key) === i
    )
  }, [])

export const getTherapeuticAreasFilterOptions = (data: any[]) =>
  data?.reduce((acc: IMultiSelectValue[], curr: any) => {
    let temp = [...acc]
    curr?.conditions?.map((c) => {
      const items = c.therapeutic_areas.map((ta) => ({
        key: ta.id.toString(),
        label: ta.name,
      }))
      temp = temp.concat(items)
    })
    return temp.filter(
      (ac: any, i, self) =>
        self.findIndex((t: any) => t.key === ac.key || t.label === ac.label) ===
        i
    )
  }, [])

export const getTherapeuticTargetsFilterOptions = (data: any[]) =>
  data?.reduce((acc: IMultiSelectValue[], curr: any) => {
    let temp = [...acc]
    const items = curr?.targets?.map((target) => {
      return {
        key: target?.target_id?.toString(),
        label: target?.target_name,
        tag: target?.target_symbol,
      }
    })
    temp = temp.concat(items)

    return temp.filter(
      (ac: any, i, self) =>
        self.findIndex((t: any) => t.key === ac.key || t.label === ac.label) ===
        i
    )
  }, [])

export const getConditionFilterOptions = (data: IPipelineProduct[]) =>
  data?.reduce((acc: IMultiSelectValue[], curr: IPipelineProduct) => {
    const temp = [...acc]
    curr?.conditions?.map((condition) => {
      const item = {
        key: `${condition.condition_id}`,
        label: condition.condition,
      }
      temp.push(item)
    })
    return temp.filter(
      (ac: any, i, self) =>
        self.findIndex((t: any) => t.key === ac.key || t.label === ac.label) ===
        i
    )
  }, [])

const getActiveIndex = (index) => {
  if (index < 1) {
    return 0
  } else if (index === 1) {
    return 1
  } else if (index > 1 && index <= 2) {
    return 2
  } else if (index > 2 && index <= 3) {
    return 3
  } else if (index > 3) {
    return 3
  } else {
    return 0
  }
}

const getStepText = (index) => {
  if (index === 0) {
    return 'Pre-Clinical'
  } else if (index === 1) {
    return 'Phase 1'
  } else if (index === 2) {
    return 'Phase 2'
  } else if (index === 3) {
    return 'Phase 3'
  } else {
    return ''
  }
}

export const getTimelineData = (data) => {
  const activeIndex = getActiveIndex(data[1])
  const list = Array.from(Array(4), (_, x) => x).map((d) => {
    return {
      stepText: d === activeIndex ? data[0] : getStepText(d),
      stepTitle: '',
    }
  })
  return { list, activeIndex }
}
