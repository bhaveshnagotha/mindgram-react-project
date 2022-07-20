import { combineReducers } from 'redux'

import auth, { authKey } from './Auth'
import events, { eventsKey } from './Events'
import companies, { companiesKey } from './Companies'
import compounds, { compoundsKey } from './Compounds'
import searchHistory, { searchHistoryKey } from './SearchHistory'
import latestIprProceedings, {
  latestIprProceedingsKey,
} from './LatestIprProceedings'
import patentOwners, { patentOwnersKey } from './PatentOwners'
import pharmaMergers, { pharmaMergersKey } from './PharmaMergers'
import mergerOverlaps, { mergerOverlapsKey } from './MergerOverlaps'
import pipelineProducts, { pipelineProductsKey } from './PipelineProducts'
import latestProducts, { latestProductsKey } from './LatestProducts'
import productCompetitor, { productCompetitorKey } from './ProductCompetitor'
import trendingDrugs, { trendingDrugsKey } from './TrendingDrugs'
import instituitionSuccessRate, {
  instituitionSuccessRateKey,
} from './InstituitionSuccessRate'
import dashboardCompany, { dashboardCompanyKey } from './DashboardCompany'
import dashboardPatent, { dashboardPatentKey } from './DashboardPatent'
import documentTree, { documentTreeKey } from './DocumentTree'
import priorArtsStats, { priorArtsStatsKey } from './PriorArtsStats'
import trial, { trialKey } from './Trial'
import trialClaims, { trialClaimsKey } from './TrialClaims'
import trialDocuments, { trialDocumentsKey } from './TrialDocuments'
import trialDocumentsReferences, {
  trialDocumentsReferencesKey,
} from './TrialDocumentsReference'
import trialPatent, { trialPatentKey } from './TrialPatent'
import therapeuticAreas, { therapeuticAreasKey } from './TherapeuticAreas'
import therapeuticProducts, {
  therapeuticProductsKey,
} from './TherapeuticProducts'
import trialProceedings, {
  trialRelatedProceedingsKey,
} from './TrialProceedings'
import trialPriorArts, { trialPriorArtsKey } from './TrialPriorArts'
import patentPriorArts, { patentPriorArtsKey } from './PatentPriorArts'
import trialStats, { trialStatsKey } from './TrialStats'
import trialCatalysts, { trialCatalystsKey } from './TrialCatalysts'
import watchLists, { watchListsKey } from './WatchLists'
import trialStages, { trialStagesKey } from './TrialStages'
import insightsGraph, { insightsGraphKey } from './InsightsGraph'
import globalSlidingPane, { globalSlidingPaneKey } from './GlobalSlidingPane'
import whitePaper, { whitePaperKey } from './WhitePaper'
import priorArtsDocuments, { priorArtsDocumentsKey } from './PriorArtsDocuments'
import therapeuticCondition, {
  therapeuticConditionKey,
} from './TherapeuticConditions'
import downloadZip, { downloadZipKey } from './DownloadZip'
import dataAccuracy, { dataAccuracyKey } from './CMS/DataAccuracy'
import diseaseEpidemiology, {
  diseaseEpidemiologyKey,
} from './DiseaseEpidemiology'
import dealsCMS, { dealsCMSKey } from './CMS/DealsCMS'
import companyReviewCMS, { companyReviewCMSKey } from './CMS/CompanyReviewCMS'
import designationsCMS, { designationsCMSKey } from './CMS/DesignationsCMS'
import productDevTimeline, {
  productDevTimelineKey,
} from './ProductDevelopmentTimeline'
import compareProducts, { compareProductsKey } from './CompareProducts'
import dealsActivity, { fetchDealsDataKey } from './DealsActivity'
import dashboardClinicalEdge, {
  dashboardClinicalEdgeKey,
} from './DashboardClinicalEdge'
import companyOutboxCMS, { companyOutboxCMSKey } from './CMS/CompanyOutboxCMS'
import target, { targetKey } from './Target'

export default combineReducers({
  [authKey]: auth,
  [companiesKey]: companies,
  [compoundsKey]: compounds,
  [documentTreeKey]: documentTree,
  [dashboardClinicalEdgeKey]: dashboardClinicalEdge,
  [dashboardCompanyKey]: dashboardCompany,
  [dashboardPatentKey]: dashboardPatent,
  [dataAccuracyKey]: dataAccuracy,
  [eventsKey]: events,
  [searchHistoryKey]: searchHistory,
  [trendingDrugsKey]: trendingDrugs,
  [instituitionSuccessRateKey]: instituitionSuccessRate,
  [latestIprProceedingsKey]: latestIprProceedings,
  [globalSlidingPaneKey]: globalSlidingPane,
  [insightsGraphKey]: insightsGraph,
  [patentOwnersKey]: patentOwners,
  [pharmaMergersKey]: pharmaMergers,
  [mergerOverlapsKey]: mergerOverlaps,
  [pipelineProductsKey]: pipelineProducts,
  [latestProductsKey]: latestProducts,
  [productCompetitorKey]: productCompetitor,
  [priorArtsStatsKey]: priorArtsStats,
  [priorArtsDocumentsKey]: priorArtsDocuments,
  [trialClaimsKey]: trialClaims,
  [trialDocumentsKey]: trialDocuments,
  [trialDocumentsReferencesKey]: trialDocumentsReferences,
  [trialKey]: trial,
  [trialPatentKey]: trialPatent,
  [therapeuticAreasKey]: therapeuticAreas,
  [therapeuticConditionKey]: therapeuticCondition,
  [therapeuticProductsKey]: therapeuticProducts,
  [trialPriorArtsKey]: trialPriorArts,
  [trialRelatedProceedingsKey]: trialProceedings,
  [trialStatsKey]: trialStats,
  [trialCatalystsKey]: trialCatalysts,
  [watchListsKey]: watchLists,
  [trialStagesKey]: trialStages,
  [whitePaperKey]: whitePaper,
  [downloadZipKey]: downloadZip,
  [patentPriorArtsKey]: patentPriorArts,
  [diseaseEpidemiologyKey]: diseaseEpidemiology,
  [dealsCMSKey]: dealsCMS,
  [companyReviewCMSKey]: companyReviewCMS,
  [designationsCMSKey]: designationsCMS,
  [productDevTimelineKey]: productDevTimeline,
  [compareProductsKey]: compareProducts,
  [fetchDealsDataKey]: dealsActivity,
  [companyOutboxCMSKey]: companyOutboxCMS,
  [targetKey]: target,
})
