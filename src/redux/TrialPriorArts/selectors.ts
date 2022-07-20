import { trialPriorArtsKey } from './constants'

export const trialPriorArtsSelector = (state: any) => state[trialPriorArtsKey]

export const isFetchingPriorArtsSelector = (state: any) =>
  trialPriorArtsSelector(state).isFetchingPriorArts

export const errorFetchingPriorArtsSelector = (state: any) =>
  trialPriorArtsSelector(state).errorFetchingPriorArts

export const trialPriorArtsDataSelector = (state: any) => {
  return trialPriorArtsSelector(state).trialPriorArts
}
