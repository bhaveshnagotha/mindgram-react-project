import { productCompetitorKey } from './constants'
export const productCompetitorSelector = (state: any) =>
  state[productCompetitorKey]

export const isFetchingProductCompetitorSelector = (state: any) =>
  productCompetitorSelector(state).isFetchingProductCompetitor

export const normCuiSelector = (state: any) =>
  productCompetitorSelector(state).normCui

export const errorFetchingProductCompetitor = (state: any) =>
  productCompetitorSelector(state).errorFetchIngProductCompetitor
