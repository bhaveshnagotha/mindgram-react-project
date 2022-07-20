import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'

import { authSagaWatcher } from './Auth'
import { dataAccuracySagaWatcher } from './CMS/DataAccuracy'
import { documentTreeSagaWatcher } from './DocumentTree'
import { trialSagaWatcher } from './Trial'
import { fetchTrialStagesSagaWatcher } from './TrialStages'
import { trialDocumentsSagaWatcher } from './TrialDocuments'
import { fetchTrialDocumentsReferencesSagaWatcher } from './TrialDocumentsReference'
import { trialPatentSagaWatcher } from './TrialPatent'
import { fetchTherapeuticAreasSagaWatcher } from './TherapeuticAreas'
import { fetchTherapeuticConditionSagaWatcher } from './TherapeuticConditions'
import { trialClaimsSagaWatcher } from './TrialClaims'
import { fetchTrialCatalystsSagaWatcher } from './TrialCatalysts'
import { fetchWatchListsSagaWatcher } from './WatchLists'
import { patentPriorArtsSagaWatcher } from './PatentPriorArts'
import { trialStatsSagaWatcher } from './TrialStats'
import { compoundsSagaWatcher } from './Compounds'
import { companiesSagaWatcher } from './Companies'
import { searchHistorySagaWatcher } from './SearchHistory'
import { latestIprProceedingsSagaWatcher } from './LatestIprProceedings'
import { patentOwnersSagaWatcher } from './PatentOwners'
import { trendingDrugsSagaWatcher } from './TrendingDrugs'
import { instituitionSuccessRateSagaWatcher } from './InstituitionSuccessRate'
import { fetchDashboardCompanySagaWatcher } from './DashboardCompany'
import { fetchDashboardPatentSagaWatcher } from './DashboardPatent'
import { fetchPriorArtsStatsSagaWatcher } from './PriorArtsStats'
import { fetchTrialRelatedProceedingsSagaWatcher } from './TrialProceedings'
import { fetchPharmaMergersSagaWatcher } from './PharmaMergers'
import { fetchMergersOverlapsSagaWatcher } from './MergerOverlaps'
import { fetchPipelineProductsSagaWatcher } from './PipelineProducts'
import { fetchLatestProductsSagaWatcher } from './LatestProducts'
import { fetchProductCompetitorSagaWatcher } from './ProductCompetitor'
import { fetchEventsSagaWatcher } from './Events'
import { fetchPriorArtsDocumentsSagaWatcher } from './PriorArtsDocuments'
import { fetchTherapeuticProductsSagaWatcher } from './TherapeuticProducts'
import { downloadZipSagaWatcher } from './DownloadZip'
import { trialPriorArtsSagaWatcher } from './TrialPriorArts'
import { fetchDiseaseEpidemiologySagaWatcher } from './DiseaseEpidemiology'
import { designationOutboxSagaWatcher } from './CMS/DesignationsCMS'
import { fetchProductDevTimelineSagaWatcher } from './ProductDevelopmentTimeline'
import rootReducer from './rootReducer'
import { fetchCompareProductsSagaWatcher } from './CompareProducts'
import { fetchDealsDataSagaWatcher } from './DealsActivity'
import { clinicalTrialsDashboardSagaWatcher } from './DashboardClinicalEdge'
import { targetSagaWatcher } from './Target'

const sagaMiddleware = createSagaMiddleware()
const sagaWatchers = [
  authSagaWatcher,
  companiesSagaWatcher,
  compoundsSagaWatcher,
  dataAccuracySagaWatcher,
  documentTreeSagaWatcher,
  trialSagaWatcher,
  trialDocumentsSagaWatcher,
  fetchTrialDocumentsReferencesSagaWatcher,
  trialPatentSagaWatcher,
  fetchTherapeuticAreasSagaWatcher,
  fetchTherapeuticConditionSagaWatcher,
  fetchTherapeuticProductsSagaWatcher,
  trialClaimsSagaWatcher,
  patentPriorArtsSagaWatcher,
  trialStatsSagaWatcher,
  fetchTrialCatalystsSagaWatcher,
  fetchWatchListsSagaWatcher,
  fetchTrialStagesSagaWatcher,
  latestIprProceedingsSagaWatcher,
  searchHistorySagaWatcher,
  patentOwnersSagaWatcher,
  trendingDrugsSagaWatcher,
  instituitionSuccessRateSagaWatcher,
  fetchDashboardCompanySagaWatcher,
  fetchDashboardPatentSagaWatcher,
  fetchPriorArtsStatsSagaWatcher,
  fetchTrialRelatedProceedingsSagaWatcher,
  fetchPharmaMergersSagaWatcher,
  fetchMergersOverlapsSagaWatcher,
  fetchPipelineProductsSagaWatcher,
  fetchLatestProductsSagaWatcher,
  fetchProductCompetitorSagaWatcher,
  fetchEventsSagaWatcher,
  fetchPriorArtsDocumentsSagaWatcher,
  downloadZipSagaWatcher,
  trialPriorArtsSagaWatcher,
  fetchDiseaseEpidemiologySagaWatcher,
  designationOutboxSagaWatcher,
  fetchProductDevTimelineSagaWatcher,
  fetchCompareProductsSagaWatcher,
  fetchDealsDataSagaWatcher,
  clinicalTrialsDashboardSagaWatcher,
  targetSagaWatcher,
]

const middleware = [thunk, sagaMiddleware]

function configureStoreCommon(initialState, enhancer) {
  const store = createStore(rootReducer, initialState, enhancer)
  sagaWatchers.forEach((saga) => {
    sagaMiddleware.run(saga)
  })
  return store
}

export function configureStoreDev(initialState) {
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose
  const enhancer = composeEnhancers(applyMiddleware(...middleware))
  return configureStoreCommon(initialState, enhancer)
}

export function configureStoreProd(initialState) {
  const enhancer = compose(applyMiddleware(...middleware))
  return configureStoreCommon(initialState, enhancer)
}
