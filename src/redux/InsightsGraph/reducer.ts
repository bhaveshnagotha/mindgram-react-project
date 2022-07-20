import { HANDLE_NODE_CLICK } from './actions'

interface IState {
  clickedFlag: boolean
  currentNode: any
}
const initialState = {
  clickedFlag: false,
  currentNode: null,
}

export default function (
  state: IState = initialState,
  action: { payload: object; type: string }
) {
  switch (action.type) {
    case HANDLE_NODE_CLICK:
      return {
        ...state,
        clickedFlag: !state.clickedFlag,
        currentNode: action.payload,
      }
    default:
      return state
  }
}
