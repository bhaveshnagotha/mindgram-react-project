import reducer from './reducer'

export default reducer
export { latestIprProceedingsKey } from './constants'
export {
  FETCH_LATEST_IPR_PROCEEDINGS,
  fetchLatestIprProceedings,
} from './actions'
export {
  latestIprProceedingsSelector,
  isFetchingLatestIprProceedingsSelector,
  errorFetchingLatestIprProceedings,
} from './selectors'
export { latestIprProceedingsSagaWatcher } from './sagas'
