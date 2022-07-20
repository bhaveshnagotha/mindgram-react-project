import {
  FETCH_PIPELINE_PRODUCTS,
  FETCH_PIPELINE_PRODUCTS_FAILED,
  FETCH_PIPELINE_PRODUCTS_SUCCESS,
} from './actions'
import { pipelineProductsKey } from './constants'

const initialState = {
  errorFetchingPipelineProducts: null,
  isFetchingPipelineProducts: false,
  [pipelineProductsKey]: null,
}

interface IData {
  data: any[]
  companyName: string
}

export default function (
  state: object = initialState,
  action: { type: string; payload: IData }
) {
  switch (action.type) {
    case FETCH_PIPELINE_PRODUCTS:
      return {
        ...state,
        isFetchingPipelineProducts: true,
        [pipelineProductsKey]: state[pipelineProductsKey],
      }
    case FETCH_PIPELINE_PRODUCTS_SUCCESS:
      return {
        ...state,
        errorFetchingPipelineProducts: null,
        isFetchingPipelineProducts: false,
        [pipelineProductsKey]: {
          ...state[pipelineProductsKey],
          ...action.payload.data,
        },
      }
    case FETCH_PIPELINE_PRODUCTS_FAILED:
      return {
        ...state,
        errorFetchingPipelineProducts: true,
        isFetchingPipelineProducts: false,
        [pipelineProductsKey]: state[pipelineProductsKey],
      }
    default:
      return state
  }
}
