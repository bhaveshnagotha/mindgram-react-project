import reducer from './reducer'

export default reducer
export { therapeuticAreasKey } from './constants'
export { FETCH_THERAPEUTIC_AREAS, fetchTherapeuticAreas } from './actions'
export {
  therapeuticAreasSelector,
  isFetchingTherapeuticAreasSelector,
  errorFetchingTherapeuticAreas,
} from './selectors'
export { fetchTherapeuticAreasSagaWatcher } from './sagas'
