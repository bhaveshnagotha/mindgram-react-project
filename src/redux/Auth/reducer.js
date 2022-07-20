import {
  SET_AUTH_DATA,
  RESET_AUTH_DATA,
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
} from './actions'

const initialState = {
  accessToken: null,
  expiresAt: null,
  idToken: null,

  errorFetchingUser: null,
  isFetchingUser: false,
  user: null,
}
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_DATA: {
      const { accessToken, expiresAt, idToken } = action.payload
      return {
        ...state,
        accessToken,
        expiresAt,
        idToken,
      }
    }
    case RESET_AUTH_DATA:
      return {
        ...initialState,
      }
    case FETCH_USER:
      return {
        ...state,
        errorFetchingUser: null,
        isFetchingUser: true,
        user: null,
      }
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        errorFetchingUser: null,
        isFetchingUser: false,
        user: action.payload,
      }
    case FETCH_USER_FAILED:
      return {
        ...state,
        errorFetchingUser: true,
        isFetchingUser: false,
        user: null,
      }
    default:
      return state
  }
}
