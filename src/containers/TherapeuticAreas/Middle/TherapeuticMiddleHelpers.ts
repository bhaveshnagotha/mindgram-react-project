import { isEmpty } from 'lodash'

export const getCompanyFilterOptions = (data: any) =>
  data?.reduce((acc, curr) => {
    const temp = [...acc]
    const item = {
      key: `${curr?.company?.[0]?.company_id}`,
      label: curr?.company?.[0]?.company_name,
      tag: curr?.company?.[0]?.company_ticker,
    }
    temp.push(item)
    return temp.filter(
      (ac: any, i, self) => self.findIndex((t: any) => t.key === ac.key) === i
    )
  }, [])

export const getActionFilterOptions = (data: any) =>
  data?.reduce((acc, curr) => {
    let temp = [...acc]
    let items
    if (!isEmpty(curr.pharm_actions)) {
      items = curr.pharm_actions.map((a) => ({
        key: `${a.pharm_action_id}`,
        label: `${a.pharm_action}`,
      }))
      temp = temp.concat(items)
    }
    return temp.filter(
      (ac: any, i, self) => self.findIndex((t: any) => t.key === ac.key) === i
    )
  }, [])

export const getStageFilterOptions = (data: any) =>
  data?.reduce((acc, curr) => {
    const temp = [...acc]
    const item = {
      key: `${curr?.conditions?.[0]?.phase?.[1]?.toString()}`,
      label: curr?.conditions?.[0]?.phase?.[0],
    }
    temp.push(item)
    return temp.filter(
      (ac: any, i, self) => self.findIndex((t: any) => t.key === ac.key) === i
    )
  }, [])

export const getInterventionFilterOptions = (data: any) =>
  data?.reduce((acc, curr) => {
    const temp = [...acc]
    const item = {
      key: `${curr?.intervention_type?.toLowerCase()}`,
      label: curr?.intervention_type,
    }
    temp.push(item)
    return temp.filter(
      (ac: any, i, self) => self.findIndex((t: any) => t.key === ac.key) === i
    )
  }, [])
