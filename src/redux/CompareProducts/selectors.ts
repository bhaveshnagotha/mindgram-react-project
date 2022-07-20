import { compareProductsKey } from './constants'
export const compareProductsSelector = (state: any) => state[compareProductsKey]

export const compareProductsDataSelector = (state: any) =>
  compareProductsSelector(state)[compareProductsKey]

export const isFetchingCompareProductsSelector = (state: any) =>
  compareProductsSelector(state).isFetchingCompareProducts

export const errorFetchingCompareProductsSelector = (state: any) =>
  compareProductsSelector(state).errorFetchingCompareProducts

export const normCuisSelector = (state: any) =>
  compareProductsSelector(state).normCuis
