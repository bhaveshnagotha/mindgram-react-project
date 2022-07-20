import { latestIprProceedingsKey } from './constants'
export const latestIprProceedingsSelector = (state: any) =>
  state[latestIprProceedingsKey]

export const isFetchingLatestIprProceedingsSelector = (state: any) =>
  latestIprProceedingsSelector(state).isFetchingLatestIprProceedings

export const errorFetchingLatestIprProceedings = (state: any) =>
  latestIprProceedingsSelector(state).errorFetchingLatestIprProceedings
