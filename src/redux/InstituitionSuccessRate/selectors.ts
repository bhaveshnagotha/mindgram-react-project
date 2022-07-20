import { instituitionSuccessRateKey } from './constants'
export const instituitionSuccessRateSelector = (state: any) =>
  state[instituitionSuccessRateKey]

export const isFetchingInstituitionSuccessRateSelector = (state: any) =>
  instituitionSuccessRateSelector(state).isFetchingInstituitionSuccessRate

export const errorFetchingInstituitionSuccessRate = (state: any) =>
  instituitionSuccessRateSelector(state).errorFetchInginstituitionSuccessRate
