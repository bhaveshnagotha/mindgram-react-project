import {
  FETCH_TARGET,
  FETCH_TARGET_ERROR,
  FETCH_TARGET_SUCCESS,
} from './actions'

const initialState = {
  isTargetError: false,
  isFetchingTarget: false,
  targetData: null,
}
export default function (
  state: any = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case FETCH_TARGET:
      return {
        ...state,
        isFetchingTarget: true,
      }
    case FETCH_TARGET_SUCCESS:
      return {
        ...state,
        isTargetError: false,
        isFetchingTarget: false,
        targetData: {
          ...state.targetData,
          [action.payload.targetId]: action.payload.data,
        },
      }
    case FETCH_TARGET_ERROR:
      return {
        ...state,
        isTargetError: true,
        isFetchingTarget: false,
        targetData: { ...state.targetData },
      }
    default:
      return state
  }
}
