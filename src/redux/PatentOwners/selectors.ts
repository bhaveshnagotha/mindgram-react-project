import { patentOwnersKey } from './constants'
export const patentOwnersSelector = (state: any) => state[patentOwnersKey]

export const isFetchingPatentOwnersSelector = (state: any) =>
  patentOwnersSelector(state).isFetchingPatentOwners

export const errorFetchingPatentOwners = (state: any) =>
  patentOwnersSelector(state).errorFetchingPatentOwners
