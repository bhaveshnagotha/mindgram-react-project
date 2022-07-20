import reducer from './reducer'

export default reducer
export { fetchTargetAction } from './actions'
export { targetKey } from './constants'
export { targetSagaWatcher } from './sagas'
export {
  targetDataSelector,
  isTargetErrorSelector,
  isFetchingTargetSelector,
} from './selectors'
