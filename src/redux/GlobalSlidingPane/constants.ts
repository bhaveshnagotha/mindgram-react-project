import OriginalDocumentPreview from '../../containers/OriginalDocumentPreview'
import PatentPreview from '../../containers/TrialNew/Right/PatentPreview'
import {
  PacerCasePreview,
  TrialPreview,
} from '../../containers/TrialNew/Right/RelatedMatterPreview'
import SynonymPreview from '../../containers/DashboardCMS/DataAccuracy/SynonymPreview'
import LicensingInfoPane from '../../containers/PipelineProducts/Products/LicensingInfoPane'

export const globalSlidingPaneKey = 'globalSlidingPane'

export const slidingPaneTypes = Object.freeze({
  ORIGINAL_DOCUMENT_PREVIEW: 'ORIGINAL_DOCUMENT_PREVIEW',
  PACER_CASE_REVIEW: 'PACER_CASE_REVIEW',
  PATENT_PREVIEW: 'PATENT_PREVIEW',
  TRIAL_PREVIEW: 'TRIAL_PREVIEW',
  SYNONYM_PREVIEW: 'SYNONYM_PREVIEW',
  LICENSING_INFO: 'LICENSING_INFO',
})

export const slidingPaneComponents = {
  [slidingPaneTypes.ORIGINAL_DOCUMENT_PREVIEW]: OriginalDocumentPreview,
  [slidingPaneTypes.PACER_CASE_REVIEW]: PacerCasePreview,
  [slidingPaneTypes.TRIAL_PREVIEW]: TrialPreview,
  [slidingPaneTypes.PATENT_PREVIEW]: PatentPreview,
  [slidingPaneTypes.SYNONYM_PREVIEW]: SynonymPreview,
  [slidingPaneTypes.LICENSING_INFO]: LicensingInfoPane,
}
