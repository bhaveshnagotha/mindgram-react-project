import React, { useState } from 'react'
import {
  OverlapActionBar,
  Container,
  OverlapBodyWrapper,
  OverlapFixedSearchHeader,
  OverlapBody,
  OverlapItem,
  OverlapItemTitle,
  OverlapItemDetails,
  OverlapItemDetailsCol,
  OverlapItemText,
  OverlapItemSubtext,
} from './PharmaMergers.styles'
import { debounce } from 'lodash'
import { InputSearchBar, Tag, Button, Loading } from '../../components'
import { baseColors } from '../../constants/colors'
import { buttonTypes } from '../../components/Button'
import AnalyzeOverlapsModal from './AnalyzeOverlapsModal'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  isFetchingPharmaMergersSelector,
  pharmaMergersKey,
  pharmaMergersSelector,
} from '../../redux/PharmaMergers'
import { LoadingWrapper } from '../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { getMergersData } from './PharmaMergers.helper'
import { NoDataErrorMsg } from '../App/App.styles'
import { format } from 'date-fns'

const OverlapItems = ({ data, handleClick }) => {
  const title = `${data?.target_company?.ticker ?? '-'}/${
    data?.acquirer_company?.ticker ?? '-'
  }`
  const acqCompId = `${data?.acquirer_company?.type}${data?.acquirer_company?.id}`
  const targCompId = `${data?.target_company?.type}${data?.target_company?.id}`

  return (
    <OverlapItem onClick={() => handleClick(`${targCompId}-${acqCompId}`)}>
      <OverlapItemTitle>{title}</OverlapItemTitle>
      <OverlapItemDetails>
        <OverlapItemDetailsCol>
          <OverlapItemText>Target</OverlapItemText>
          <OverlapItemSubtext>
            {data?.target_company?.name}
            {data?.target_company?.ticker && (
              <Tag bgColor={baseColors.BLUE_SIX} width="15px" className="ml-3">
                {data?.target_company?.ticker}
              </Tag>
            )}
          </OverlapItemSubtext>
        </OverlapItemDetailsCol>
        <OverlapItemDetailsCol>
          <OverlapItemText>Acquirer</OverlapItemText>
          <OverlapItemSubtext>
            {data?.acquirer_company?.name}
            {data?.acquirer_company?.ticker && (
              <Tag bgColor={baseColors.BLUE_SIX} width="15px" className="ml-3">
                {data?.acquirer_company?.ticker}
              </Tag>
            )}
          </OverlapItemSubtext>
        </OverlapItemDetailsCol>
        <OverlapItemDetailsCol>
          <OverlapItemText>Deal Value</OverlapItemText>
          <OverlapItemSubtext>{data?.deal_value}</OverlapItemSubtext>
        </OverlapItemDetailsCol>
        <OverlapItemDetailsCol>
          <OverlapItemText>Offer Price</OverlapItemText>
          <OverlapItemSubtext>{data?.offer_price}</OverlapItemSubtext>
        </OverlapItemDetailsCol>
        <OverlapItemDetailsCol>
          <OverlapItemText>Announcement Date</OverlapItemText>
          <OverlapItemSubtext>
            {data?.announcement_date &&
              format(new Date(data?.announcement_date), 'dd MMM yyyy')}
          </OverlapItemSubtext>
        </OverlapItemDetailsCol>
        {/* <OverlapItemDetailsCol className="d-flex align-items-center">
          <OverlapIcon
            color={
              data.overlaps ? baseColors.MAROON_FIVE : baseColors.GREEN_FOUR
            }
          >
            <div></div>
            <div></div>
          </OverlapIcon>
          <OverlapItemText>{data.overlaps} overlaps</OverlapItemText>
        </OverlapItemDetailsCol> */}
      </OverlapItemDetails>
    </OverlapItem>
  )
}

const PharmaMergers = ({
  activeLandingType,
  pharmaMergers,
  isFetchingPharmaMergers,
}: {
  activeLandingType: string
  pharmaMergers: any
  isFetchingPharmaMergers: boolean
}) => {
  const history = useHistory()
  const match = useRouteMatch()
  const [isAnalyzeOverlapsModalOpen, setIsAnalyzeOverlapsModalOpen] = useState(
    false
  )
  const [searchBy, setSearchBy] = useState<string>('')
  const mergersData = pharmaMergers[pharmaMergersKey]
  const tData = getMergersData(mergersData)

  const onSearch = (text) => {
    setSearchBy(text)
  }

  const debouncedSearch = debounce(onSearch, 200, { trailing: true })
  const getFilteredData = () => {
    const items = tData || []
    let filterableData = items.map((i) => i)

    if (searchBy) {
      filterableData = filterableData.filter((item) => {
        return (
          item?.acquirer_company?.name
            ?.toLowerCase()
            .indexOf(searchBy.toLowerCase()) >= 0 ||
          item?.target_company?.name
            ?.toLowerCase()
            .indexOf(searchBy.toLowerCase()) >= 0
        )
      })
    }

    return filterableData
  }

  const filteredData = getFilteredData()
  return (
    <Container>
      <OverlapActionBar>
        <Button
          onClick={() => setIsAnalyzeOverlapsModalOpen(true)}
          backgroundColor={baseColors.BLUE_FIVE}
          hoverBackgroundColor={baseColors.BLUE_NINE}
          type={buttonTypes.SHADOWED}
          hasShadow={true}
          width={150}
        >
          Analyze Overlaps
        </Button>
      </OverlapActionBar>
      <OverlapBodyWrapper>
        <OverlapFixedSearchHeader>
          <InputSearchBar
            id="pharmaMergers"
            handleChange={(text) => debouncedSearch(text.trim())}
            placeholder="Search company"
            roundedBorder={false}
            showSearchIcon={true}
          />
        </OverlapFixedSearchHeader>
        <OverlapBody>
          {isFetchingPharmaMergers && (
            <LoadingWrapper>
              <Loading size={40} />
            </LoadingWrapper>
          )}
          {!isFetchingPharmaMergers &&
            filteredData?.map((data, index) => (
              <OverlapItems
                data={data}
                key={index}
                handleClick={(mergerName: string) => {
                  history.push(`${match.url}/${mergerName}`)
                }}
              />
            ))}
          {!filteredData?.length && (
            <NoDataErrorMsg>No overlaps found</NoDataErrorMsg>
          )}
        </OverlapBody>
      </OverlapBodyWrapper>
      <AnalyzeOverlapsModal
        activeLandingType={activeLandingType}
        setIsAnalyzeOverlapsModalOpen={setIsAnalyzeOverlapsModalOpen}
        isAnalyzeOverlapsModalOpen={isAnalyzeOverlapsModalOpen}
      />
    </Container>
  )
}

function mapStateToProps(state: object) {
  return {
    pharmaMergers: pharmaMergersSelector(state),
    isFetchingPharmaMergers: isFetchingPharmaMergersSelector(state),
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PharmaMergers)
