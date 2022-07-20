import { SET_COMPANY, SET_MODIFY } from './actions'
import { companyReviewCMSKey, companyKey, modifyKey } from './constants'

const initialState = {
  [companyReviewCMSKey]: null,
  [companyKey]: {
    selectedCompany: null,
  },
  [modifyKey]: true,
}

export default function(
  state: object = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case SET_COMPANY:
      return {
        ...state,
        [companyKey]: {
          ...state[companyKey],
          selectedCompany: action.payload,
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
