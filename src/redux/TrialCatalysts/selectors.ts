import {
  trialCatalystsKey,
  trialCatalystsNewsKey,
  trialCatalystsSecKey,
  marketNewsKey,
  newsByIDsKey,
  newsByTagsKey,
} from './constants'
export const trialCatalystsSelector = (state: any) => state[trialCatalystsKey]
export const trialCatalystsNewsSelector = (state: any) =>
  state[trialCatalystsNewsKey]
export const trialCatalystsSecSelector = (state: any) =>
  state[trialCatalystsSecKey]

export const isFetchingTrialCatalystsSelector = (state: any) =>
  trialCatalystsSelector(state).isFetchingTrialCatalysts

export const errorFetchingTrialCatalysts = (state: any) =>
  trialCatalystsSelector(state).errorFetchIngTrialCatalysts

export const marketNewsSelector = (state: any) =>
  trialCatalystsSelector(state)[marketNewsKey]

export const isFetchingMarketNewsSelector = (state: any) =>
  trialCatalystsSelector(state).isFetchingMarketNews

export const errorFetchingMarketNewsSelector = (state: any) =>
  trialCatalystsSelector(state).errorFetchingMarketNews

export const newsByIDsSelector = (state: any) =>
  trialCatalystsSelector(state)[newsByIDsKey]

export const newsByTagsSelector = (state: any) =>
  trialCatalystsSelector(state)[newsByTagsKey]
