import {
  FETCH_DESIGNATIONS_OUTBOX,
  FETCH_DESIGNATIONS_OUTBOX_SUCCESS,
  FETCH_DESIGNATIONS_OUTBOX_FAILED,
  ACCEPT_DESIGNATIONS_OUTBOX_ITEM,
  ACCEPT_DESIGNATIONS_OUTBOX_ITEM_SUCCESS,
  ACCEPT_DESIGNATIONS_OUTBOX_ITEM_FAILED,
  REJECT_DESIGNATIONS_OUTBOX_ITEM,
  REJECT_DESIGNATIONS_OUTBOX_ITEM_SUCCESS,
  REJECT_DESIGNATIONS_OUTBOX_ITEM_FAILED,
  ADD_DESIGNATIONS_OUTBOX_ITEM,
  ADD_DESIGNATIONS_OUTBOX_ITEM_SUCCESS,
  ADD_DESIGNATIONS_OUTBOX_ITEM_FAILED,
  SAVE_AND_REMOVE_DESIGNATIONS_OUTBOX_ITEM,
  SAVE_AND_REMOVE_DESIGNATIONS_OUTBOX_ITEM_SUCCESS,
  SAVE_AND_REMOVE_DESIGNATIONS_OUTBOX_ITEM_FAILED,
} from './actions'
import {
  acceptDesignationsOutboxItemKey,
  designationsCMSKey,
  rejectDesignationsOutboxItemKey,
  addDesignationsOutboxItemKey,
  saveAndRemoveDesignationsOutboxItemKey,
} from './constants'

const initialState = {
  errorFetchingDesignations: null,
  isFetchingDesignations: false,
  [designationsCMSKey]: [],
  [acceptDesignationsOutboxItemKey]: {
    errorAcceptingItem: false,
    isAcceptingItem: false,
    acceptedItem: false,
  },
  [rejectDesignationsOutboxItemKey]: {
    errorRejectingItem: false,
    isRejectingItem: false,
    rejectedItem: false,
  },
  [addDesignationsOutboxItemKey]: {
    errorAddingItem: false,
    isAddingItem: false,
    addedItem: false,
  },
  [saveAndRemoveDesignationsOutboxItemKey]: {
    errorSavingItem: false,
    isSavingItem: false,
    savedItem: false,
  },
}

export default function (
  state: object = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case FETCH_DESIGNATIONS_OUTBOX:
      return {
        ...state,
        isFetchingDesignations: true,
        [designationsCMSKey]: state[designationsCMSKey],
      }
    case FETCH_DESIGNATIONS_OUTBOX_SUCCESS:
      return {
        ...state,
        errorFetchingDesignations: null,
        isFetchingDesignations: false,
        [designationsCMSKey]: state[designationsCMSKey].concat(action.payload),
      }
    case FETCH_DESIGNATIONS_OUTBOX_FAILED:
      return {
        ...state,
        errorFetchingDesignations: true,
        isFetchingDesignations: false,
        [designationsCMSKey]: state[designationsCMSKey],
      }
    case ACCEPT_DESIGNATIONS_OUTBOX_ITEM:
      return {
        ...state,
        [acceptDesignationsOutboxItemKey]: {
          ...state[acceptDesignationsOutboxItemKey],
          errorAcceptingItem: false,
          isAcceptingItem: true,
          acceptedItem: false,
        },
      }
    case ACCEPT_DESIGNATIONS_OUTBOX_ITEM_SUCCESS:
      const acceptIndexToRemove = state[designationsCMSKey].findIndex(
        (item) => item.id === action.payload.id
      )
      state[designationsCMSKey].splice(acceptIndexToRemove, 1)

      return {
        ...state,
        [designationsCMSKey]: state[designationsCMSKey],
        [acceptDesignationsOutboxItemKey]: {
          ...state[acceptDesignationsOutboxItemKey],
          errorAcceptingItem: false,
          isAcceptingItem: false,
          acceptedItem: true,
        },
      }
    case ACCEPT_DESIGNATIONS_OUTBOX_ITEM_FAILED:
      return {
        ...state,
        [acceptDesignationsOutboxItemKey]: {
          ...state[acceptDesignationsOutboxItemKey],
          errorAcceptingItem: true,
          isAcceptingItem: false,
          acceptedItem: false,
        },
      }
    case REJECT_DESIGNATIONS_OUTBOX_ITEM:
      return {
        ...state,
        [rejectDesignationsOutboxItemKey]: {
          ...state[rejectDesignationsOutboxItemKey],
          errorRejectingItem: false,
          isRejectingItem: true,
          rejectedItem: false,
        },
      }
    case REJECT_DESIGNATIONS_OUTBOX_ITEM_SUCCESS:
      const rejectIndexToRemove = state[designationsCMSKey].findIndex(
        (item) => item.id === action.payload.id
      )
      state[designationsCMSKey].splice(rejectIndexToRemove, 1)

      return {
        ...state,
        [designationsCMSKey]: state[designationsCMSKey],
        [rejectDesignationsOutboxItemKey]: {
          ...state[rejectDesignationsOutboxItemKey],
          errorRejectingItem: false,
          isRejectingItem: false,
          rejectedItem: true,
        },
      }
    case REJECT_DESIGNATIONS_OUTBOX_ITEM_FAILED:
      return {
        ...state,
        [rejectDesignationsOutboxItemKey]: {
          ...state[rejectDesignationsOutboxItemKey],
          errorRejectingItem: true,
          isRejectingItem: false,
          rejectedItem: false,
        },
      }
    case ADD_DESIGNATIONS_OUTBOX_ITEM:
      return {
        ...state,
        [addDesignationsOutboxItemKey]: {
          ...state[addDesignationsOutboxItemKey],
          errorAddingItem: false,
          isAddingItem: true,
          addedItem: false,
        },
      }
    case ADD_DESIGNATIONS_OUTBOX_ITEM_SUCCESS:
      // const addIndexToRemove = state[designationsCMSKey].findIndex(
      //   (item) => item.id === action.payload.id
      // )
      // state[designationsCMSKey].splice(addIndexToRemove, 1)

      return {
        ...state,
        [addDesignationsOutboxItemKey]: {
          ...state[addDesignationsOutboxItemKey],
          errorAddingItem: false,
          isAddingItem: false,
          addedItem: true,
        },
      }
    case ADD_DESIGNATIONS_OUTBOX_ITEM_FAILED:
      return {
        ...state,
        [addDesignationsOutboxItemKey]: {
          ...state[addDesignationsOutboxItemKey],
          errorAddingItem: true,
          isAddingItem: false,
          addedItem: false,
        },
      }
    case SAVE_AND_REMOVE_DESIGNATIONS_OUTBOX_ITEM:
      return {
        ...state,
        [saveAndRemoveDesignationsOutboxItemKey]: {
          ...state[addDesignationsOutboxItemKey],
          errorSavingItem: false,
          isSavingItem: true,
          savedItem: false,
        },
      }
    case SAVE_AND_REMOVE_DESIGNATIONS_OUTBOX_ITEM_SUCCESS:
      const saveIndexToRemove = state[designationsCMSKey].findIndex(
        (item) => item.id === action.payload.id
      )
      state[designationsCMSKey].splice(saveIndexToRemove, 1)

      return {
        ...state,
        [saveAndRemoveDesignationsOutboxItemKey]: {
          ...state[addDesignationsOutboxItemKey],
          errorSavingItem: false,
          isSavingItem: false,
          savedItem: true,
        },
      }
    case SAVE_AND_REMOVE_DESIGNATIONS_OUTBOX_ITEM_FAILED:
      return {
        ...state,
        [saveAndRemoveDesignationsOutboxItemKey]: {
          ...state[addDesignationsOutboxItemKey],
          errorSavingItem: true,
          isSavingItem: false,
          savedItem: false,
        },
      }
    default:
      return state
  }
}
