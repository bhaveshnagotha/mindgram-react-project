import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'

import Dashboard from '../Dashboard'
import DashboardCompany from '../DashboardCompany'
import DashboardCompound from '../DashboardCompound'
import DashboardPatent from '../DashboardPatent'
import GlobalSlidingPane from '../GlobalSlidingPane'
import Home from '../Home'
import NavBar from '../NavBar'
import TrialsRouter from '../Trials/routes'
import NewsWires from '../NewsWires'
import WatchLists from '../WatchLists'
import { AppContainer, PageBodyContainer } from './App.styles'
import TrialCatalysts from '../TrialCatalysts'
import PipelineProductsRoutes from '../PipelineProducts/routes'
import PharmaMergersRoutes from '../PharmaMergers/routes'
import Events from '../Events'
import TherapeuticAreas from '../TherapeuticAreas'
import ConditionsOverview from '../ConditionsOverview'
import ClinicalCompanyDashboard from '../ClinicalCompanyDashboard'
import ClinicalTrialsDashboard from '../ClinicalTrialsDashboard'
import DataAccuracy from '../DashboardCMS/DataAccuracy'
import ProtectedRoute from '../../components/ProtectedRoute'
import Loading from '../../components/Loading'
import { auth0Functions } from '../../helpers/api'
import { useAuth } from '../../hooks/useAuth'
import DiseaseEpidemiology from '../DiseaseEpidemiology'
import DashboardCMS from '../DashboardCMS'
import DesignationsCMS from '../DashboardCMS/DesignationsCMS'
import CompareProducts from '../CompareProducts'

import Sidebar from './Sidebar'
import DealsCMS from '../DashboardCMS/DealsCMS'
import CompanyReview from '../DashboardCMS/CompanyReview'
import DealsDashboard from '../DealsDashboard'
import CompanyOutbox from '../DashboardCMS/CompanyOutbox'
import TargetDashboard from '../Target'

export const LANDING_TYPE = Object.freeze({
  CLINICAL_TRIALS: {
    id: 'CLINICAL_TRIALS',
    title: 'Clinical Edge',
    desc:
      'Track latest clinical trial updates, analyze product pipelines & monitor key FDA events',
    link: '/clinical-trials/trials-dashboard',
  },
  PATENTS: {
    id: 'PATENTS',
    title: 'Patent Edge',
    desc: 'Comprehensive research tools to analyze patent litigation risk',
    link: '/patents/dashboard',
  },
})

const IndexRoute = ({ activeLandingType }) => {
  return <Redirect to={LANDING_TYPE[activeLandingType].link} />
}

const App: React.FC = () => {
  const location = useLocation()
  const activeLandingType = location.pathname.startsWith('/patents')
    ? LANDING_TYPE.PATENTS.id
    : LANDING_TYPE.CLINICAL_TRIALS.id

  const { isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth()

  // Assign Auth0 functions to a global so that they can be
  // used outside the React framework, for example in Redux
  // sagas.
  // See: https://github.com/auth0/auth0-react/issues/67#issuecomment-662566676
  auth0Functions.getAccessTokenSilently = getAccessTokenSilently

  if (isLoading) {
    return <Loading />
  }

  return (
    <AppContainer>
      <NavBar
        isAuthenticated={isAuthenticated}
        isFetchingUser={false}
        user={user}
        activeLandingType={activeLandingType}
      />

      <Sidebar />

      <PageBodyContainer isAuthenticated={isAuthenticated}>
        <GlobalSlidingPane />
        <Switch>
          <ProtectedRoute
            exact
            path="/clinical-trials/deals-dashboard"
            component={DealsDashboard}
          />
          <ProtectedRoute
            exact
            path="/"
            component={IndexRoute}
            componentProps={{
              activeLandingType,
            }}
          />

          <ProtectedRoute
            exact
            path="/admin/cms"
            component={DashboardCMS}
            componentProps={{
              activeLandingType,
            }}
          />

          <ProtectedRoute
            exact
            path="/admin/cms/product"
            component={DataAccuracy}
            componentProps={{
              activeLandingType,
            }}
          />

          <ProtectedRoute
            exact
            path="/admin/cms/designations"
            component={DesignationsCMS}
            componentProps={{
              activeLandingType,
            }}
          />

          <ProtectedRoute
            exact
            path="/admin/cms/deals"
            component={DealsCMS}
            componentProps={{
              activeLandingType,
            }}
          />

          <ProtectedRoute
            exact
            path="/admin/cms/company-review"
            component={CompanyReview}
            componentProps={{
              activeLandingType,
            }}
          />

          <ProtectedRoute
            exact
            path="/admin/cms/company-outbox"
            component={CompanyOutbox}
            componentProps={{
              activeLandingType,
            }}
          />

          <ProtectedRoute
            exact
            path="/home"
            component={Home}
            componentProps={{
              activeLandingType,
            }}
          />

          {/* Clinical trials routes */}
          <ProtectedRoute
            exact
            path="/clinical-trials/trials-dashboard"
            component={ClinicalTrialsDashboard}
          />
          <ProtectedRoute
            path="/clinical-trials/pipeline-products"
            component={PipelineProductsRoutes}
          />
          <ProtectedRoute
            path="/clinical-trials/mergers"
            component={PharmaMergersRoutes}
            componentProps={{
              activeLandingType,
            }}
          />
          <Route
            path="/clinical-trials/trial-catalysts"
            component={TrialCatalysts}
          />
          <Route path="/watchlist/notifications" component={WatchLists} />
          <ProtectedRoute path="/clinical-trials/events" component={Events} />
          <ProtectedRoute
            path="/clinical-trials/therapeutic-areas"
            component={TherapeuticAreas}
          />
          <ProtectedRoute
            path="/clinical-trials/conditions-overview/:therapeuticConditionId"
            component={ConditionsOverview}
          />
          <ProtectedRoute
            path="/clinical-trials/company-dashboard/:companyId"
            component={ClinicalCompanyDashboard}
          />
          <ProtectedRoute
            path="/clinical-trials/epidemiology/:conditionId"
            component={DiseaseEpidemiology}
          />
          <ProtectedRoute
            path="/clinical-trials/compare-products"
            component={CompareProducts}
          />
          <ProtectedRoute
            path="/clinical-trials/targets/:targetId"
            component={TargetDashboard}
          />

          {/* Patents routes */}
          <ProtectedRoute
            exact
            path="/patents/dashboard"
            component={Dashboard}
          />
          <ProtectedRoute
            exact
            path="/patents/dashboard/:companyName"
            component={DashboardCompany}
          />
          <ProtectedRoute
            exact
            path="/patents/dashboard-patent/:patentNumber"
            component={DashboardPatent}
          />
          <ProtectedRoute
            exact
            path="/patents/dashboard-drug/:compoundName"
            component={DashboardCompound}
          />
          <ProtectedRoute path="/patents/trials" component={TrialsRouter} />
          <Route path="/newswires" component={NewsWires} />
          <Route path="*">
            <Redirect to={{ pathname: '/' }} />
          </Route>
        </Switch>
      </PageBodyContainer>
    </AppContainer>
  )
}

export default App
