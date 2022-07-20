import React, { Fragment, useEffect, useState } from 'react'
import { Card, Loading } from '../../../components'
import { NoDataErrorMsg, scrollBarStyles } from '../../App/App.styles'
import { headerHeight } from '../../ClinicalTrialsDashboard/ClinicalTrialsDashboard.style'
import { LoadingWrapper } from '../../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import styled from 'styled-components'
import { baseColors } from '../../../constants/colors'
import theme from '../../../theme'
import { useParams } from 'react-router'
import { getCollection } from '../../../helpers/api'
import { Link } from 'react-router-dom'
import { ArrowRightSquare } from 'react-bootstrap-icons'

const tableHeaderHeight = 70

const EpidemiologyHeader = styled.div`
  display: flex;
  flex-flow: row;
  height: ${tableHeaderHeight}px;
  align-items: center;
  padding: 10px 20px 0;
  > div > div {
    position: relative;
  }
`

const EpidemiologyTitle = styled.p<{ textAlign?: string }>`
  margin: 0;
  font-weight: bold;
  color: ${baseColors.GREY_DARKER};
  font-family: ${theme.fonts.sourceSansPro};
  font-size: 18px;
  line-height: 20px;
  flex-grow: 1;
  flex-basis: 50%;
  text-align: ${(props) => props.textAlign || ''};
`

const BodyWrapper = styled.div`
  height: calc(95% - ${headerHeight}px);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  ${scrollBarStyles};
`

const EpidemiologyItemWrapper = styled.div`
  border-bottom: 2px solid ${baseColors.GREY_LIGHT};
  padding: 10px 20px;
  transition: all 150ms ease-in;
  &:hover {
    box-shadow: ${theme.boxShadow};
  }
`
const EpidemiologyItemSnippet = styled.p`
  margin-bottom: 0.5rem;
  span:first-child {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    color: ${baseColors.GREY_ONE};
  }
  span.bullet {
    color: ${baseColors.GREY_DARKER};
    font-size: 20px;
    margin: 0 5px;
  }
  span.bar {
    color: ${baseColors.GREY_DARKER};
    margin: 0 5px;
  }
  strong {
    color: ${baseColors.GREY_DARKER};
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
  }
  small {
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: ${baseColors.GREY_DARKER};
  }
`
const EpidemiologyItemSubtitle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  & p {
    margin-bottom: 0.5rem;
    font-size: 14px;
    color: ${baseColors.GREY_DARKER};
    font-weight: 600;
  }

  & p:first-child {
    justify-self: start;
  }

  & p:last-child {
    justify-self: end;
  }
`

const StyledLink = styled(Link)`
  text-transform: uppercase;
  color: ${baseColors.BLUE_ONE};

  &:hover,
  &:hover * {
    text-decoration: none;
    color: ${baseColors.BLUE_TWO};
    fill: ${baseColors.BLUE_TWO};
  }
`

const Item = ({ item }) => {
  return (
    <EpidemiologyItemWrapper>
      <EpidemiologyItemSnippet>{item?.snippet}</EpidemiologyItemSnippet>
      <EpidemiologyItemSubtitle>
        <p>Geographic Area: {item?.geographic_area}</p>
        <p>Year: {item?.source_year}</p>
      </EpidemiologyItemSubtitle>
    </EpidemiologyItemWrapper>
  )
}

const getUrl = (conditionId) => `/v1/ct/conditions/${conditionId}/epidemiology`

function fetchEpidemiology(conditionId) {
  const url = getUrl(conditionId)
  return getCollection(url)
}

const DiseaseEpidemiology = () => {
  const [data, setData] = useState([])
  const [isLoadingEpidemiology, setIsLoadingEpidemiology] = useState<boolean>(
    true
  )
  const { therapeuticConditionId } = useParams<any>()

  useEffect(() => {
    setIsLoadingEpidemiology(true)
    fetchEpidemiology(therapeuticConditionId)
      .then((responseData) => {
        setData(responseData)
        setIsLoadingEpidemiology(false)
      })
      .catch(() => {
        setIsLoadingEpidemiology(false)
        setData([])
      })
  }, [therapeuticConditionId])

  return (
    <Card
      height="500px"
      width="100%"
      boxShadow={`0 6px 18px 0 ${baseColors.GREY_LIGHT}`}
    >
      {isLoadingEpidemiology ? (
        <LoadingWrapper>
          <Loading size={30} />
        </LoadingWrapper>
      ) : (
        <Fragment>
          <EpidemiologyHeader>
            <EpidemiologyTitle>Disease Epidemiology</EpidemiologyTitle>
            <StyledLink
              to={`/clinical-trials/epidemiology/${therapeuticConditionId}`}
            >
              Epidemiology Viewer
              <ArrowRightSquare
                className="arrowIcon ml-2"
                color={baseColors.BLUE_ONE}
                size={25}
              />
            </StyledLink>
          </EpidemiologyHeader>
          <BodyWrapper>
            {false ? (
              <LoadingWrapper>
                <Loading size={30} />
              </LoadingWrapper>
            ) : data?.length === 0 ? (
              <NoDataErrorMsg>No data found</NoDataErrorMsg>
            ) : (
              data?.map((d, index) => (
                <Fragment key={index}>
                  <Item item={d} />
                </Fragment>
              ))
            )}
          </BodyWrapper>
        </Fragment>
      )}
    </Card>
  )
}

export default DiseaseEpidemiology
