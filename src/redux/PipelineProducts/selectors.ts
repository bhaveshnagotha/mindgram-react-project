import { pipelineProductsKey } from './constants'
export const pipelineProductsSelector = (state: any) =>
  state[pipelineProductsKey]

export const isFetchingPipelineProductsSelector = (state: any) =>
  pipelineProductsSelector(state).isFetchingPipelineProducts

export const errorFetchingPipelineProducts = (state: any) =>
  pipelineProductsSelector(state).errorFetchIngPipelineProducts
