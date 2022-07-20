import { globalSlidingPaneKey } from './constants'

export const SHOW_SLIDING_PANE = `${globalSlidingPaneKey}/showSlidingPane`
export const HIDE_SLIDING_PANE = `${globalSlidingPaneKey}/hideSlidingPane`

function showSlidingPane(slidingPaneType: string, slidingPaneProps: object) {
  return {
    slidingPaneProps,
    slidingPaneType,
    type: SHOW_SLIDING_PANE,
  }
}

function hideSlidingPane() {
  return {
    type: HIDE_SLIDING_PANE,
  }
}

export { showSlidingPane, hideSlidingPane }
