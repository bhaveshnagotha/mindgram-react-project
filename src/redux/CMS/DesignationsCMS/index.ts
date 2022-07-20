import reducer from './reducer'
export default reducer
export { designationsCMSKey } from './constants'
export {
  FETCH_DESIGNATIONS_OUTBOX,
  fetchDesignationsOutbox,
  ACCEPT_DESIGNATIONS_OUTBOX_ITEM,
  acceptDesignationsOutboxItem,
  REJECT_DESIGNATIONS_OUTBOX_ITEM,
  rejectDesignationsOutboxItem,
  ADD_DESIGNATIONS_OUTBOX_ITEM,
  addDesignationsOutboxItem,
  SAVE_AND_REMOVE_DESIGNATIONS_OUTBOX_ITEM,
  saveAndRemoveDesignationsOutboxItem,
} from './actions'
export {
  designationsCMSSelector,
  isErrorFetchingDesignationsSelector,
  isFetchingDesignationsSelector,
  isAcceptingItemSelector,
  isErrorAcceptingItemSelector,
  acceptedItemSelector,
  isRejectingItemSelector,
  isErrorRejectingItemSelector,
  rejectedItemSelector,
  isAddingItemSelector,
  isErrorAddingItemSelector,
  addedItemSelector,
  isSavingItemSelector,
  isErrorSavingItemSelector,
  savedItemSelector,
} from './selectors'
export { designationOutboxSagaWatcher } from './sagas'
