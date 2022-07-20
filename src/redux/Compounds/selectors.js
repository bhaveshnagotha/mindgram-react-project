import { compoundsKey } from './constants'

export const compoundsSelector = (state) => state[compoundsKey]

export const isFetchingCompoundsSelector = (state) =>
  compoundsSelector(state).isFetchingCompounds

export const errorFetchingCompoundsSelector = (state) =>
  compoundsSelector(state).errorFetchingCompounds

export const compoundsDataSelector = (state) =>
  compoundsSelector(state).compounds
