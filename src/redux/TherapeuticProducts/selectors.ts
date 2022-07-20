import { therapeuticProductsKey } from './constants'
export const therapeuticProductsSelector = (state: any) =>
  state[therapeuticProductsKey]

export const isFetchingTherapeuticProductsSelector = (state: any) =>
  therapeuticProductsSelector(state).isFetchingTherapeuticProducts

export const errorFetchingTherapeuticProducts = (state: any) =>
  therapeuticProductsSelector(state).errorFetchIngTherapeuticProducts
