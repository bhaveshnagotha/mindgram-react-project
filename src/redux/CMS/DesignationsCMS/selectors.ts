import {
  acceptDesignationsOutboxItemKey,
  addDesignationsOutboxItemKey,
  designationsCMSKey,
  rejectDesignationsOutboxItemKey,
  saveAndRemoveDesignationsOutboxItemKey,
} from './constants'

export const designationsCMSSelector = (state: any) => state[designationsCMSKey]
const acceptDesignationsOutboxItemSelector = (state: any) =>
  designationsCMSSelector(state)[acceptDesignationsOutboxItemKey]
const rejectDesignationsOutboxItemSelector = (state: any) =>
  designationsCMSSelector(state)[rejectDesignationsOutboxItemKey]
const addDesignationsOutboxItemSelector = (state: any) =>
  designationsCMSSelector(state)[addDesignationsOutboxItemKey]
const saveAndRemoveDesignationsOutboxItemSelector = (state: any) =>
  designationsCMSSelector(state)[saveAndRemoveDesignationsOutboxItemKey]

export const isFetchingDesignationsSelector = (state: any) =>
  designationsCMSSelector(state).isFetchingDesignations
export const isErrorFetchingDesignationsSelector = (state: any) =>
  designationsCMSSelector(state).errorFetchingDesignations

export const isAcceptingItemSelector = (state: any) =>
  acceptDesignationsOutboxItemSelector(state).isAcceptingItem
export const isErrorAcceptingItemSelector = (state: any) =>
  acceptDesignationsOutboxItemSelector(state).errorAcceptingItem
export const acceptedItemSelector = (state: any) =>
  acceptDesignationsOutboxItemSelector(state).acceptedItem

export const isRejectingItemSelector = (state: any) =>
  rejectDesignationsOutboxItemSelector(state).isRejectingItem
export const isErrorRejectingItemSelector = (state: any) =>
  rejectDesignationsOutboxItemSelector(state).errorRejectingItem
export const rejectedItemSelector = (state: any) =>
  rejectDesignationsOutboxItemSelector(state).rejectedItem

export const isAddingItemSelector = (state: any) =>
  addDesignationsOutboxItemSelector(state).isAddingItem
export const isErrorAddingItemSelector = (state: any) =>
  addDesignationsOutboxItemSelector(state).errorAddingItem
export const addedItemSelector = (state: any) =>
  addDesignationsOutboxItemSelector(state).addedItem

export const isSavingItemSelector = (state: any) =>
  saveAndRemoveDesignationsOutboxItemSelector(state).isSavingItem
export const isErrorSavingItemSelector = (state: any) =>
  saveAndRemoveDesignationsOutboxItemSelector(state).errorSavingItem
export const savedItemSelector = (state: any) =>
  saveAndRemoveDesignationsOutboxItemSelector(state).savedItem
