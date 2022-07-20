import reducer from './reducer'

export default reducer
export { patentOwnersKey } from './constants'
export { FETCH_PATENT_OWNERS, fetchPatentOwners } from './actions'
export {
  patentOwnersSelector,
  isFetchingPatentOwnersSelector,
  errorFetchingPatentOwners,
} from './selectors'
export { patentOwnersSagaWatcher } from './sagas'
