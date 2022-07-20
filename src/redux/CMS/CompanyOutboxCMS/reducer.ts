import { SET_HEADLINE } from './actions'
import { companyOutboxCMSKey, headlineKey } from './constants'

const initialState = {
  [companyOutboxCMSKey]: null,
  [headlineKey]: {
    selectedHeadline: null,
  },
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

    default:
      return state
  }
}
