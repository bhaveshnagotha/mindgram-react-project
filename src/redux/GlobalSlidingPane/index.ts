import reducer from './reducer'

export default reducer
export {
  globalSlidingPaneKey,
  slidingPaneTypes,
  slidingPaneComponents,
} from './constants'
export { showSlidingPane, hideSlidingPane } from './actions'
export {
  isShowingSlidingPaneSelector,
  slidingPanePropsSelector,
  slidingPaneTypeSelector,
} from './selectors'
