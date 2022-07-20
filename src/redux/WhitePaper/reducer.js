import { FETCH_WHITE_PAPER_URL_SUCCESS } from './actions'

const initialState = {
  url: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_WHITE_PAPER_URL_SUCCESS:
      return {
        ...state,
        url: action.payload,
      }

    default:
      return state
  }
}
