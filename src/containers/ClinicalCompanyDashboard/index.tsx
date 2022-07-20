import React, { Fragment, useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import styled from 'styled-components'
import theme from '../../theme'
import DashboardPipelineProducts from './DashboardPipelineProducts'
import DashboardRelatedCatalysts from './DashboardRelatedCatalysts'
import DashboardUpcomingEvents from './DashboardUpcomingEvents'
import { baseColors } from '../../constants/colors'
import { useHistory, useParams } from 'react-router-dom'
import { getCollection, postCollection } from '../../helpers/api'
import ClinicalRelatedCatalystViewer from './ClinicalRelatedCatalystViewer'
import PresentationsPublications from './PresentationsPublications'
import { UnwatchButton, WatchButton } from '../../components/WatchButton'

import { ContainerTabs } from '../TrialNew/TrialNew.styles'
import {
  isNewsTab,
  TabName,
  TabType,
} from '../TrialCatalysts/Left/TrialCatalystsLeft.helper'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BackNavigation } from '../PipelineProducts/Products/BackNavigation'

const GridContainer = styled.div<{ isCatalystViewerOpen: boolean }>`
  margin: 0 1.5rem;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 66.3% auto;
  grid-gap: 15px;
`
const Left = styled.div`
  position: relative;
  height: 99%;
  box-shadow: ${theme.boxShadow};
  background-color: ${baseColors.WHITE};
  overflow: hidden;
  border-radius: 6px;
`
const Right = styled.div`
  height: 100%;
  overflow: auto;
  padding-right: 40px;
`
const RightContainer = styled.div`
  display: flex;
  flex-flow: column;
  & > * {
    margin: 0px 0px 10px;
    max-height: 500px;
    overflow: auto;
    &:first-child {
      // margin: 0px;
    }
  }
`

const getUrl = (companyId, offset) =>
  `/v1/ct/products?company=${companyId}&offset=${offset}`

function fetchProducts(companyId, offset) {
  const url = getUrl(companyId, offset)
  return getCollection(url)
}

function getTabs(activeTab: string, onTabChange: any) {
  return (
    <Tabs activeKey={activeTab} onSelect={onTabChange} id="trial-tabs">
      <Tab eventKey={TabType.News} title={TabName.News} />
      <Tab eventKey={TabType.SECFiling} title={TabName.SECFiling} />
    </Tabs>
  )
}

const ClinicalCompanyDashboard = () => {
  const [companyInfo, setCompanyInfo] = useState<any>(null)
  const [products, setProducts] = useState<any>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [isSubsequentFetch, setIsSubsequentFetch] = useState(false)
  const { companyId } = useParams<any>()
  const [activeCatalyst, setActiveCatalyst] = useState(null)
  const [activeTab, setActiveTab] = useState<TabType>(TabType.News)

  const [nextOffset, setNextOffset] = useState(-1)

  const onTabChange = (selectedTab: string) => {
    setActiveTab(isNewsTab(selectedTab) ? TabType.News : TabType.SECFiling)
  }

  const handleActiveCatalystSelect = (catData) => {
    setActiveCatalyst(catData)
  }
  const { goBack } = useHistory()

  const [isLoadingWatch, setLoadingWatch] = useState<boolean>(false)
  const [onWatchlist, setOnWatchlist] = useState<boolean>(false)

  const handleCloseActiveCatalyst = () => {
    setActiveCatalyst(null)
  }

  const watchProduct = () => {
    setOnWatchlist(true)

    const payload = {
      resource_type: 'COMPANY',
      resource_id: companyId,
    }
    const url = `/v1/user/watchlist/add`

    postCollection(url, payload)
      .then((responseData: any) => {
        toast.success(
          `${
            products?.[0]?.company?.[0]?.company_name || 'Company'
          } added to watchlist successfully.`,
          {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
      })
      .catch(() => {
        setOnWatchlist(onWatchlist)
        toast.error(
          `Error adding ${
            products?.[0]?.company?.[0]?.company_name || 'company'
          } to watchlist.`,
          {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
      })
  }

  const unWatchProduct = () => {
    setOnWatchlist(false)

    const payload = {
      resource_type: 'COMPANY',
      resource_id: companyId,
    }
    const url = `/v1/user/watchlist/delete`

    postCollection(url, payload)
      .then((responseData: any) => {
        toast.success(
          `${
            products?.[0]?.company?.[0]?.company_name || 'Company'
          } removed from watchlist successfully.`,
          {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
      })
      .catch(() => {
        setOnWatchlist(onWatchlist)
        toast.error(
          `Error removing ${
            products?.[0]?.company?.[0]?.company_name || 'company'
          } from watchlist.`,
          {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
      })
  }

  useEffect(() => {
    if (companyId) {
      setIsLoadingProducts(true)
      setLoadingWatch(true)
      fetchProducts(companyId, 0)
        .then((responseData) => {
          setOnWatchlist(responseData?.on_watchlist)
          setCompanyInfo(responseData?.company)
          setProducts(responseData?.data)
          setNextOffset(
            responseData?.next_offset ? responseData?.next_offset : -1
          )
          setIsLoadingProducts(false)
          setLoadingWatch(false)
        })
        .catch(() => {
          setIsLoadingProducts(false)
          setLoadingWatch(false)
          setProducts([])
        })
    }
  }, [companyId])

  const isCatalystViewerOpen = activeCatalyst !== null

  const handleScrollFetch = () => {
    if (nextOffset !== -1) {
      setIsSubsequentFetch(true)
      fetchProducts(companyId, nextOffset)
        .then((responseData) => {
          setProducts((prevProducts) => [
            ...prevProducts,
            ...responseData?.data,
          ])
          setNextOffset(
            responseData?.next_offset ? responseData?.next_offset : -1
          )
          setIsSubsequentFetch(false)
        })
        .catch(() => {
          setIsSubsequentFetch(false)
          setProducts([])
        })
    }
  }

  return (
    <Fragment>
      <div style={{ margin: '0 1.5rem 5px 1.5rem', display: 'flex', gap: 15 }}>
        <div>
          <BackNavigation
            title={companyInfo?.company_name}
            onClick={() => goBack()}
            tags={companyInfo?.tickers}
            priceDataType={companyInfo?.stock_info?.price_data_type}
            stockInfo={[
              companyInfo?.stock_info?.premarket_data,
              companyInfo?.stock_info?.price_data,
              companyInfo?.stock_info?.afterhours_data,
            ]}
          />
        </div>
        <div
          style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}
        >
          {!isLoadingWatch &&
            (onWatchlist ? (
              <UnwatchButton
                useFlex={true}
                style={{ marginRight: '40px' }}
                onClick={() => unWatchProduct()}
              />
            ) : (
              <WatchButton
                useFlex={true}
                style={{ marginRight: '40px' }}
                onClick={() => watchProduct()}
              />
            ))}
        </div>
      </div>
      <GridContainer isCatalystViewerOpen={isCatalystViewerOpen}>
        {isCatalystViewerOpen ? (
          <Left>
            <ClinicalRelatedCatalystViewer
              activeCatalyst={activeCatalyst}
              fdaLabelURL={''}
              onCloseActiveCatalyst={handleCloseActiveCatalyst}
            />
          </Left>
        ) : (
          <Fragment>
            <Left>
              <DashboardPipelineProducts
                products={products}
                isLoadingProducts={isLoadingProducts}
                isSubsequentFetch={isSubsequentFetch}
                handleScrollFetch={handleScrollFetch}
              />
            </Left>
            {/* <Middle>
            <OnMarketProducts
            products={products}
            isLoadingProducts={isLoadingProducts}
            />
          </Middle> */}
          </Fragment>
        )}
        <Right>
          <ContainerTabs>{getTabs(activeTab, onTabChange)}</ContainerTabs>
          <RightContainer>
            <DashboardRelatedCatalysts
              onActiveCatalystSelect={handleActiveCatalystSelect}
              activeTab={activeTab}
            />
            <PresentationsPublications
              onActiveCatalystSelect={handleActiveCatalystSelect}
            />
            <DashboardUpcomingEvents />
          </RightContainer>
        </Right>
      </GridContainer>
      <ToastContainer />
    </Fragment>
  )
}

export default ClinicalCompanyDashboard
