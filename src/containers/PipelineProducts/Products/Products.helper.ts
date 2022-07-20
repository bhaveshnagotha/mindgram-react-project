import { IMultiSelectValue } from '../../../components/MultiSelectDropdown'
import { IPipelineProductTrials } from '../PipelineProducts.helper'

export enum FilterType {
  'Status' = 'Status',
  'Condition' = 'Condition',
  'Phase' = 'Phase',
}

export const statusDropdownOptions: IMultiSelectValue[] = [
  { label: 'Active: Not recruiting', key: 'active' },
]

export const getStatusFilterOptions = (
  data: IPipelineProductTrials[] | undefined
) =>
  data?.reduce((acc: IMultiSelectValue[], curr: IPipelineProductTrials) => {
    const temp = [...acc]
    const item = {
      key: curr?.status,
      label: curr?.status,
    }
    temp.push(item)
    return temp.filter(
      (ac: any, i, self) => self.findIndex((t: any) => t.key === ac.key) === i
    )
  }, [])

export const getConditionFilterOptions = (
  data: IPipelineProductTrials[] | undefined
) =>
  data?.reduce((acc: IMultiSelectValue[], curr: IPipelineProductTrials) => {
    const temp = [...acc]
    curr?.conditions?.map?.((condition) => {
      const item = {
        key: condition,
        label: condition,
      }
      temp.push(item)
    })
    return temp.filter(
      (ac: any, i, self) => self.findIndex((t: any) => t.key === ac.key) === i
    )
  }, [])

export const getPhaseFilterOptions = (
  data: IPipelineProductTrials[] | undefined
) =>
  data
    ?.slice(0)
    ?.sort((a, b) => (a.phase?.[1] > b.phase?.[1] ? 1 : -1))
    ?.reduce((acc: IMultiSelectValue[], curr: IPipelineProductTrials) => {
      const temp = [...acc]
      const item = {
        key: curr?.phase?.[0],
        label: curr?.phase?.[0],
      }
      temp.push(item)
      return temp.filter(
        (ac: any, i, self) => self.findIndex((t: any) => t.key === ac.key) === i
      )
    }, [])
