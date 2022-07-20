import { patentPriorArtsKey } from './constants'

export const patentPriorArtsSelector = (state: any) => state[patentPriorArtsKey]

export const isFetchingPatentPriorArtsSelector = (state: any) =>
  patentPriorArtsSelector(state).isFetchingPatentPriorArts

export const errorFetchingPatentPriorArtsSelector = (state: any) =>
  patentPriorArtsSelector(state).errorFetchingPatentPriorArts

export const patentPriorArtsDataSelector = (state: any) => {
  return patentPriorArtsSelector(state).patentPriorArts
}
