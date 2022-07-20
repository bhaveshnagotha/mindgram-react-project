import { HIDE_SLIDING_PANE, SHOW_SLIDING_PANE } from './actions'

const initialState = {
  isShowingSlidingPane: false,
  slidingPaneProps: {},
  slidingPaneType: null,
}
export default function (
  state: object = initialState,
  action: { slidingPaneProps: any; slidingPaneType: any; type: string }
) {
  switch (action.type) {
    case SHOW_SLIDING_PANE:
      return {
        ...state,
        isShowingSlidingPane: true,
        slidingPaneProps: action.slidingPaneProps,
        slidingPaneType: action.slidingPaneType,
      }
    case HIDE_SLIDING_PANE:
      return {
        ...state,
        isShowingSlidingPane: false,
      }
    default:
      return state
  }
}
