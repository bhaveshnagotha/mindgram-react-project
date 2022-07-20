import { productDevTimelineKey } from './constants'
export const productDevTimelineSelector = (state: any) =>
  state[productDevTimelineKey]

export const isFetchingDevTimelineSelector = (state: any) =>
  productDevTimelineSelector(state).isFetchingProductDevTimeline

export const normCuiSelector = (state: any) =>
  productDevTimelineSelector(state).normCui

export const errorFetchingDevTimelineCompetitor = (state: any) =>
  productDevTimelineSelector(state).errorFetchingProductDevTimeline
