import { therapeuticConditionKey } from './constants'
export const therapeuticConditionSelector = (state: any) =>
  state[therapeuticConditionKey]

export const isFetchingTherapeuticConditionSelector = (state: any) =>
  therapeuticConditionSelector(state).isFetchingTherapeuticCondition

export const errorFetchingTherapeuticCondition = (state: any) =>
  therapeuticConditionSelector(state).errorFetchIngTherapeuticCondition
