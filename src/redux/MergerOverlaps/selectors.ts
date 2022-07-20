import { mergerOverlapsKey } from './constants'
export const mergersOverlapsSelector = (state: any) => state[mergerOverlapsKey]

export const isFetchingMergersOverlapsSelector = (state: any) =>
  mergersOverlapsSelector(state).isFetchingMergersOverlaps

export const errorFetchingMergersOverlaps = (state: any) =>
  mergersOverlapsSelector(state).errorFetchingMergersOverlaps
