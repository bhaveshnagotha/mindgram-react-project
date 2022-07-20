import { latestProductsKey } from './constants'
export const latestProductsSelector = (state: any) => state[latestProductsKey]

export const isFetchingLatestProductsSelector = (state: any) =>
  latestProductsSelector(state).isFetchingLatestProducts

export const errorFetchingLatestProducts = (state: any) =>
  latestProductsSelector(state).errorFetchIngLatestProducts
