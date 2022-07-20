import { SET_HEADLINE, SET_MODIFY } from './actions'
import { dealsCMSKey, headlineKey, modifyKey } from './constants'

const initialState = {
  [dealsCMSKey]: null,
  [headlineKey]: {
    selectedHeadline: null,
  },
  [modifyKey]: true,
}

export default function (
  state: object = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case SET_HEADLINE:
      return {
        ...state,
        [headlineKey]: {
          ...state[headlineKey],
          selectedHeadline: action.payload,
        },
      }

    case SET_MODIFY:
      return {
        ...state,
        [modifyKey]: action.payload,
      }

    default:
      return state
  }
}
