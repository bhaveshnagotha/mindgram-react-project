export const FETCH_DESIGNATIONS_OUTBOX = 'FETCH_DESIGNATIONS_OUTBOX'
export const FETCH_DESIGNATIONS_OUTBOX_SUCCESS =
  'FETCH_DESIGNATIONS_OUTBOX_SUCCESS'
export const FETCH_DESIGNATIONS_OUTBOX_FAILED =
  'FETCH_DESIGNATIONS_OUTBOX_FAILED'
export const ACCEPT_DESIGNATIONS_OUTBOX_ITEM = 'ACCEPT_DESIGNATIONS_OUTBOX_ITEM'
export const ACCEPT_DESIGNATIONS_OUTBOX_ITEM_SUCCESS =
  'ACCEPT_DESIGNATIONS_OUTBOX_ITEM_SUCCESS'
export const ACCEPT_DESIGNATIONS_OUTBOX_ITEM_FAILED =
  'ACCEPT_DESIGNATIONS_OUTBOX_ITEM_FAILED'
export const REJECT_DESIGNATIONS_OUTBOX_ITEM = 'REJECT_DESIGNATIONS_OUTBOX_ITEM'
export const REJECT_DESIGNATIONS_OUTBOX_ITEM_SUCCESS =
  'REJECT_DESIGNATIONS_OUTBOX_ITEM_SUCCESS'
export const REJECT_DESIGNATIONS_OUTBOX_ITEM_FAILED =
  'REJECT_DESIGNATIONS_OUTBOX_ITEM_FAILED'
export const ADD_DESIGNATIONS_OUTBOX_ITEM = 'ADD_DESIGNATIONS_OUTBOX_ITEM'
export const ADD_DESIGNATIONS_OUTBOX_ITEM_SUCCESS =
  'ADD_DESIGNATIONS_OUTBOX_ITEM_SUCCESS'
export const ADD_DESIGNATIONS_OUTBOX_ITEM_FAILED =
  'ADD_DESIGNATIONS_OUTBOX_ITEM_FAILED'
export const SAVE_AND_REMOVE_DESIGNATIONS_OUTBOX_ITEM =
  'SAVE_AND_REMOVE_DESIGNATIONS_OUTBOX_ITEM'
export const SAVE_AND_REMOVE_DESIGNATIONS_OUTBOX_ITEM_SUCCESS =
  'SAVE_AND_REMOVE_DESIGNATIONS_OUTBOX_ITEM_SUCCESS'
export const SAVE_AND_REMOVE_DESIGNATIONS_OUTBOX_ITEM_FAILED =
  'SAVE_AND_REMOVE_DESIGNATIONS_OUTBOX_ITEM_FAILED'

export function fetchDesignationsOutbox() {
  return { type: FETCH_DESIGNATIONS_OUTBOX }
}

export function fetchDesignationsOutboxSuccess(payload: object) {
  return {
    payload,
    type: FETCH_DESIGNATIONS_OUTBOX_SUCCESS,
  }
}

export function fetchDesignationsOutboxFailed(error: any) {
  return {
    payload: error,
    type: FETCH_DESIGNATIONS_OUTBOX_FAILED,
  }
}

export function acceptDesignationsOutboxItem(outboxItemId: number) {
  return {
    payload: { id: outboxItemId },
    type: ACCEPT_DESIGNATIONS_OUTBOX_ITEM,
  }
}

export function acceptDesignationsOutboxItemSuccess(outboxItemId: number) {
  return {
    payload: { id: outboxItemId },
    type: ACCEPT_DESIGNATIONS_OUTBOX_ITEM_SUCCESS,
  }
}

export function acceptDesignationsOutboxItemFailed(error: any) {
  return {
    payload: error,
    type: ACCEPT_DESIGNATIONS_OUTBOX_ITEM_FAILED,
  }
}

export function rejectDesignationsOutboxItem(outboxItemId: number) {
  return {
    payload: { id: outboxItemId },
    type: REJECT_DESIGNATIONS_OUTBOX_ITEM,
  }
}

export function rejectDesignationsOutboxItemSuccess(outboxItemId: number) {
  return {
    payload: { id: outboxItemId },
    type: REJECT_DESIGNATIONS_OUTBOX_ITEM_SUCCESS,
  }
}

export function rejectDesignationsOutboxItemFailed(error: any) {
  return {
    payload: error,
    type: REJECT_DESIGNATIONS_OUTBOX_ITEM_FAILED,
  }
}

export function addDesignationsOutboxItem(
  outboxItemId: number,
  interventionConditionId: number,
  designationStr: string
) {
  return {
    payload: {
      designation_outbox_id: outboxItemId,
      intervention_condition_id: interventionConditionId,
      designation: designationStr,
    },
    type: ADD_DESIGNATIONS_OUTBOX_ITEM,
  }
}

export function addDesignationsOutboxItemSuccess(outboxItemId: number) {
  return {
    payload: { id: outboxItemId },
    type: ADD_DESIGNATIONS_OUTBOX_ITEM_SUCCESS,
  }
}

export function addDesignationsOutboxItemFailed(error: any) {
  return {
    payload: error,
    type: ADD_DESIGNATIONS_OUTBOX_ITEM_FAILED,
  }
}

export function saveAndRemoveDesignationsOutboxItem(
  outboxItemId: number,
  interventionConditionId: number,
  designationStr: string
) {
  return {
    payload: {
      designation_outbox_id: outboxItemId,
      intervention_condition_id: interventionConditionId,
      designation: designationStr,
    },
    type: SAVE_AND_REMOVE_DESIGNATIONS_OUTBOX_ITEM,
  }
}

export function saveAndRemoveDesignationsOutboxItemSuccess(
  outboxItemId: number
) {
  return {
    payload: { id: outboxItemId },
    type: SAVE_AND_REMOVE_DESIGNATIONS_OUTBOX_ITEM_SUCCESS,
  }
}

export function saveAndRemoveDesignationsOutboxItemFailed(error: any) {
  return {
    payload: error,
    type: SAVE_AND_REMOVE_DESIGNATIONS_OUTBOX_ITEM_FAILED,
  }
}
