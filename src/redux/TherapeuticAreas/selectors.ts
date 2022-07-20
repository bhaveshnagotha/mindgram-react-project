import { therapeuticAreasKey } from './constants'
export const therapeuticAreasSelector = (state: any) =>
  state[therapeuticAreasKey]

export const isFetchingTherapeuticAreasSelector = (state: any) =>
  therapeuticAreasSelector(state).isFetchingTherapeuticAreas

export const errorFetchingTherapeuticAreas = (state: any) =>
  therapeuticAreasSelector(state).errorFetchIngTherapeuticAreas
