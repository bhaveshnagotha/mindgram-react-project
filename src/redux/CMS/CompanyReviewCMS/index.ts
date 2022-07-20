import reducer from './reducer'
export default reducer
export { companyKey, companyReviewCMSKey, modifyKey } from './constants'

export { SET_COMPANY, setCompany, setModify } from './actions'

export {
  companySelector,
  companyReviewIdSelector,
  modifySelector,
} from './selectors'
