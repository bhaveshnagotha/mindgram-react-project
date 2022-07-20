import { pharmaMergersKey } from './constants'
export const pharmaMergersSelector = (state: any) => state[pharmaMergersKey]

export const isFetchingPharmaMergersSelector = (state: any) =>
  pharmaMergersSelector(state).isFetchingPharmaMergers

export const errorFetchingPharmaMergers = (state: any) =>
  pharmaMergersSelector(state).errorFetchIngPharmaMergers
