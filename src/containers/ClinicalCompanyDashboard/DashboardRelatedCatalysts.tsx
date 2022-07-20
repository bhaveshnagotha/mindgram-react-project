import React, { useState, useEffect } from 'react'
import { headerHeight } from './ClinicalCompanyDashboard.styles'
import styled from 'styled-components'
import { baseColors } from '../../constants/colors'
import theme from '../../theme'
import { scrollBarStyles, NoDataErrorMsgSmall } from '../App/App.styles'
import { Box } from '../../primitives'
import { InputSearchBar, Loading } from '../../components'
import { debounce } from 'lodash'
import { CatalystItem } from '../TrialCatalysts/Left'
import { TableButton } from '../../components/Table'
import { getCollection } from '../../helpers/api'
import { isNewsTab } from '../TrialCatalysts/Left/TrialCatalystsLeft.helper'
import { useParams } from 'react-router-dom'

import { LoadingWrapper } from '../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'

const getUrl = (companyId: string, tab: string) => {
  if (tab) {
    return `/v1/ct/catalysts/${tab}?company=${companyId}`
  } else {
    return `/v1/ct/catalysts?company=${companyId}`
  }
}

function fetchCatalysts(companyId: string, tab: string) {
  const url = getUrl(companyId, tab)
  return getCollection(url)
}

const Container = styled.div`
  height: 49%;
  box-shadow: ${theme.boxShadow};
  background-color: ${baseColors.WHITE};
`
const Header = styled.div`
  height: ${headerHeight}px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  color: ${baseColors.GREY_DARKER};
  > p {
    margin-bottom: 0;
    flex: 1;
  }
  > div {
    flex: 1;
    > div {
      padding-left: 0;
      padding-right: 0;
      > input {
        width: 100%;
      }
    }
  }
`
export const BodyWrapper = styled.div`
  height: calc(100% - ${headerHeight}px);
  overflow-y: auto;
  ${scrollBarStyles};
`
const DashboardRelatedCatalysts = ({ onActiveCatalystSelect, activeTab }) => {
  const [isSearching, setIsSearching] = useState(false)
  const [searchBy, setSearchBy] = useState('')
  const { companyId } = useParams<any>()

  const [newsCatalysts, setNewsCatalysts] = useState([])
  const [secCatalysts, setSecCatalysts] = useState([])
  const [isLoadingCatalysts, setIsLoadingCatalysts] = useState(false)

  const onSearch = (text) => {
    setSearchBy(text)
  }
  const debouncedSearch = debounce(onSearch, 200, { trailing: true })
  useEffect(() => {
    const isNewsTabSelected = isNewsTab(activeTab)
    setIsLoadingCatalysts(true)
    fetchCatalysts(companyId, activeTab)
      .then((responseData) => {
        if (isNewsTabSelected) setNewsCatalysts(responseData)
        else setSecCatalysts(responseData)
        setIsLoadingCatalysts(false)
      })
      .catch(() => {
        setIsLoadingCatalysts(false)
        if (isNewsTabSelected) setNewsCatalysts([])
        else setSecCatalysts([])
      })
  }, [companyId, activeTab])

  const sortedData = () => {
    // const key = Object.keys(TABS_CATALYSTS)[
    //   Object.values(TABS_CATALYSTS).indexOf(activeTab)
    // ]
    const catalystsData = isNewsTab(activeTab) ? newsCatalysts : secCatalysts

    const items: any = catalystsData || []
    let filteredData = items.map((i) => i)

    if (searchBy) {
      filteredData = filteredData.filter((item) => {
        return (
          item?.products?.includes(searchBy) ||
          item?.conditions?.includes(searchBy) ||
          item?.company?.name?.toLowerCase().indexOf(searchBy.toLowerCase()) >=
            0
        )
      })
    }
    return filteredData
  }

  const list = sortedData()

  return (
    <Container>
      <Header>
        <p>Related Catalysts</p>
        {!isSearching ? (
          <TableButton
            className="p-0"
            noFilter={true}
            onClick={() => setIsSearching(!isSearching)}
          >
            <span className="fa fa-search"></span>
          </TableButton>
        ) : (
          <Box position="relative" top="0px">
            <InputSearchBar
              showCancel
              id="dashboardRelatedCatalysts"
              placeholder="Search..."
              handleChange={(text) => debouncedSearch(text.trim())}
              onCancel={() => setIsSearching(false)}
            />
          </Box>
        )}
      </Header>
      <BodyWrapper>
        {isLoadingCatalysts ? (
          <LoadingWrapper className={'mb-5 mt-5'}>
            <Loading size={30} />
          </LoadingWrapper>
        ) : list.length > 0 ? (
          list?.map((d, index) => (
            <CatalystItem
              lastItem={index === sortedData()?.length - 1}
              activeItem={false}
              key={index}
              data={d}
              handleClick={() => {
                onActiveCatalystSelect(d)
              }}
            />
          ))
        ) : (
          <NoDataErrorMsgSmall>
            We couldn't find any relevant catalysts at this time.
          </NoDataErrorMsgSmall>
        )}
      </BodyWrapper>
    </Container>
  )
}

export default DashboardRelatedCatalysts
