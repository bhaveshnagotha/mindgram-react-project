import { globalSlidingPaneKey } from './constants'

export const globalSlidingPaneSelector = (state: any) =>
  state[globalSlidingPaneKey]

export const isShowingSlidingPaneSelector = (state: any) =>
  globalSlidingPaneSelector(state).isShowingSlidingPane

export const slidingPanePropsSelector = (state: any) =>
  globalSlidingPaneSelector(state).slidingPaneProps

export const slidingPaneTypeSelector = (state: any) =>
  globalSlidingPaneSelector(state).slidingPaneType
