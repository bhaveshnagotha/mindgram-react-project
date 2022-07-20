import { documentTreeKey } from '.'

export const documentTreeSelector = (state: any) => state[documentTreeKey]

export const isFetchingSelector = (state: any) =>
  documentTreeSelector(state).isFetching

export const errorSelector = (state: any) => documentTreeSelector(state).error

export const dataSelector = (state: any) => documentTreeSelector(state).data
