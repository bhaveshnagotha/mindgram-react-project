import { targetKey } from '.'

export const targetSelector = (state: any) => state[targetKey]

export const isFetchingTargetSelector = (state: any) =>
  targetSelector(state).isFetchingTarget

export const isTargetErrorSelector = (state: any) =>
  targetSelector(state).isTargetError

export const targetDataSelector = (state: any) =>
  targetSelector(state).targetData
