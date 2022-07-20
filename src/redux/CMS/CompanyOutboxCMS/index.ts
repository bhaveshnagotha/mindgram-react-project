import reducer from './reducer'
export default reducer
export { headlineKey, companyOutboxCMSKey } from './constants'

export { SET_HEADLINE, setHeadline } from './actions'

export {
  headlineSelector,
  dealOutboxIdSelector,
  companyOutboxCMSSelector,
} from './selectors'
