import { insightsGraphKey } from '.'

export const insightsGraphSelector = (state: any) => state[insightsGraphKey]

export const clickedFlagSelector = (state: any) =>
  insightsGraphSelector(state).clickedFlag

export const currentNodeSelector = (state: any) =>
  insightsGraphSelector(state).currentNode
