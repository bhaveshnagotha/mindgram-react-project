import { History } from 'history'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'

import Breadcrumbs, { IBreadcrumb } from '../../components/Breadcrumbs'
import { baseColors } from '../../constants/colors'
import {
  dashboardCompanySelector,
  dashboardCompanyKey,
} from '../../redux/DashboardCompany'
import { BREADCRUMBS_HEIGHT } from '../App/App.styles'
import { useAuth } from '../../hooks/useAuth'

export const BREADCRUMB_SESSION_HISTORY = 'breadcrumbHistory'

const GlobalBreadcrumbWrapper = styled.div`
  width: 100%;
  padding: 0 3%;
  position: relative;
  top: 0px;
  min-height: ${BREADCRUMBS_HEIGHT}px;
  display: flex;
  align-items: center;
  background: ${baseColors.TABLE_BORDER};
`

const ROUTE_MATCH_TYPES = Object.freeze({
  COMPANY: 'dashboard',
  CLINICAL_TRIALS: 'trials-dashboard',
  COMPOUND: 'dashboard-drug',
  PATENT: 'dashboard-patent',
  TRIAL: 'trials',
  TRIAL_CATALYSTS: 'trial-catalysts',
  MERGERS: 'mergers',
  PIPELINE_PRODUCTS: 'pipeline-products',
  COMPANY_DASHBOARD: 'company-dashboard',
  CONDTIONS_OVERVIEW: 'conditions-overview',
  EVENTS: 'events',
})

interface IGlobalBreadcrumb {
  location: {
    pathname: string
    search: string
  }
  history: History
}

const getTagData = (
  routeType: string,
  routeName: string,
  tickers: string[]
) => {
  if (routeType === ROUTE_MATCH_TYPES.PATENT) {
    return [
      {
        tagBgColor: baseColors.YELLOW_ONE,
        tagName: 'PATENT',
        tagTextColor: baseColors.WHITE,
      },
    ]
  }
  if (routeType === ROUTE_MATCH_TYPES.COMPANY && routeName) {
    return [
      {
        tagBgColor: baseColors.BLUE_SIX,
        tagName: tickers?.[0],
        tagTextColor: baseColors.GREY_DARKER,
      },
      {
        tagBgColor: baseColors.BLUE_SEVEN,
        tagName: 'COMPANY',
        tagTextColor: baseColors.WHITE,
      },
    ]
  }
  if (routeType === ROUTE_MATCH_TYPES.COMPOUND) {
    return [
      {
        tagBgColor: baseColors.CYAN_ONE,
        tagName: 'DRUG',
        tagTextColor: baseColors.WHITE,
      },
    ]
  }
  if (routeType === ROUTE_MATCH_TYPES.TRIAL) {
    return [
      {
        tagBgColor: baseColors.AFFAIR_ONE,
        tagName: 'TRIAL',
        tagTextColor: baseColors.WHITE,
      },
    ]
  }
  return null
}

function getBreadcrumbData(
  basePath: string,
  routeType: string,
  routeName: string,
  companies: any,
  search: string
) {
  const tickers = companies?.[routeName]?.[0]?.parent_company_tickers
  let data: IBreadcrumb | null
  if (routeType === ROUTE_MATCH_TYPES.COMPANY && !routeName) {
    data = null
  } else if (routeType === ROUTE_MATCH_TYPES.TRIAL_CATALYSTS && !routeName) {
    data = {
      name: 'Trial Catalysts',
      tags: getTagData(routeType, routeName, tickers) ?? [],
      url: `/${basePath}/${routeType}`,
    }
  } else if (
    (routeType === ROUTE_MATCH_TYPES.TRIAL_CATALYSTS ||
      routeType === ROUTE_MATCH_TYPES.PIPELINE_PRODUCTS ||
      routeType === ROUTE_MATCH_TYPES.COMPANY_DASHBOARD ||
      routeType === ROUTE_MATCH_TYPES.CONDTIONS_OVERVIEW ||
      routeType === ROUTE_MATCH_TYPES.MERGERS) &&
    routeName
  ) {
    data = null
  } else if (routeType === ROUTE_MATCH_TYPES.PIPELINE_PRODUCTS && !routeName) {
    data = {
      name: 'Pipeline Products',
      tags: getTagData(routeType, routeName, tickers) || [],
      url: `/${basePath}/${routeType}`,
    }
  } else if (routeType === ROUTE_MATCH_TYPES.MERGERS && !routeName) {
    data = {
      name: 'Overlap Analysis of Mergers',
      tags: getTagData(routeType, routeName, tickers) || [],
      url: `/${basePath}/${routeType}`,
    }
  } else if (routeType === ROUTE_MATCH_TYPES.EVENTS && !routeName) {
    data = {
      name: 'Events',
      tags: getTagData(routeType, routeName, tickers) || [],
      url: `/${basePath}/${routeType}`,
    }
  } else {
    data = {
      name: routeName,
      tags: getTagData(routeType, routeName, tickers) ?? [],
      url: `/${basePath}/${routeType}/${routeName}${search}`,
    }
  }
  return data
}

function isHomeRoute(routePath: string, routeName: string) {
  if (
    (routePath === ROUTE_MATCH_TYPES.COMPANY ||
      routePath === ROUTE_MATCH_TYPES.CLINICAL_TRIALS) &&
    !routeName
  ) {
    return true
  } else {
    return false
  }
}

function GlobalBreadcrumb(props: IGlobalBreadcrumb) {
  const { search, pathname } = props.location
  const [breadcrumbHistory, setBreadcrumbHistory] = useState<IBreadcrumb[]>([])
  const breadcrumbHistoryRef = useRef<IBreadcrumb[]>([])
  const [sessionStorageChecked, setSessionStorageChecked] = useState<boolean>(
    false
  )
  const { isAuthenticated } = useAuth()
  const companyData = useSelector((state) => dashboardCompanySelector(state))
  const companies = companyData[dashboardCompanyKey]

  useEffect(() => {
    const savedBreadCrumbsFromSession = sessionStorage.getItem(
      BREADCRUMB_SESSION_HISTORY
    )
    if (savedBreadCrumbsFromSession) {
      breadcrumbHistoryRef.current = JSON.parse(savedBreadCrumbsFromSession)
    }
    setSessionStorageChecked(true)
  }, [])

  useEffect(() => {
    let tempBreadcrumbData: IBreadcrumb[] = [...breadcrumbHistoryRef.current]
    if (sessionStorageChecked) {
      const currentPathSegments = pathname.split('/').filter((d) => d !== '')
      if (isAuthenticated && currentPathSegments?.length > 0) {
        const basePath = currentPathSegments[0]
        const routePath = currentPathSegments[1]
        const routeName = currentPathSegments[2]
        const isHome = isHomeRoute(routePath, routeName)
        const breadcrumbData: IBreadcrumb | null = getBreadcrumbData(
          basePath,
          routePath,
          routeName,
          companies,
          search
        )
        const linkIndex = tempBreadcrumbData.findIndex((item) => {
          return routeName
            ? item?.name === `${routeName}`
            : item?.url === `/${basePath}/${routePath}`
        })
        if (isHome) {
          tempBreadcrumbData = []
        } else if (linkIndex !== -1) {
          tempBreadcrumbData.splice(linkIndex + 1, 9e9)
        } else if (
          routePath !== ROUTE_MATCH_TYPES.COMPANY ||
          companies?.[routeName]?.[0]
        ) {
          // Need to wait until company has been fetched before we push the company breadcrumb
          const data = getBreadcrumbData(
            basePath,
            ROUTE_MATCH_TYPES.COMPANY,
            '',
            companies,
            search
          )
          if (!tempBreadcrumbData.length && data) {
            tempBreadcrumbData.push(data)
          }
          if (breadcrumbData?.name) {
            tempBreadcrumbData.push(breadcrumbData)
          }
        }
        breadcrumbHistoryRef.current = tempBreadcrumbData
        sessionStorage.setItem(
          BREADCRUMB_SESSION_HISTORY,
          JSON.stringify(tempBreadcrumbData)
        )
        setBreadcrumbHistory(tempBreadcrumbData)
      }
    }
  }, [pathname, isAuthenticated, companies, sessionStorageChecked, search])

  if (pathname === '/newswires' || breadcrumbHistory.length <= 0) {
    return null
  }

  return (
    <GlobalBreadcrumbWrapper>
      <Breadcrumbs data={breadcrumbHistory} history={props.history} />
    </GlobalBreadcrumbWrapper>
  )
}

export default withRouter(GlobalBreadcrumb)
