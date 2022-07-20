import React, { Fragment, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Loading, Tag } from '../../../components'
import BackIcon from '../../../components/SvgIcons/BackIcon'
import SearchIcon from '../../../components/SvgIcons/SearchIcon'
import ThreeLinesIcon from '../../../components/SvgIcons/ThreeLinesIcon'
import { baseColors } from '../../../constants/colors'
import { NoDataErrorMsg } from '../../App/App.styles'
import { LoadingWrapper } from '../../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { ContainerTabBody } from '../../TrialNew/TrialNew.styles'
import { TherapeuticSearchBar } from './TherapeuticAreasList'
import {
  HeaderIconWrapper,
  StyledBackBar,
  StyledHLTConditionItem,
  TherapeuticItemWrapper,
} from './TherapeuticLeft.styles'
import { Accordion, Card } from 'react-bootstrap'
import styled from 'styled-components'

const BackBar = ({
  currentArea,
  handleGoBack,
  handleSearchOpen,
  showThreeLineMenu,
  closeLeftPane,
}) => {
  return (
    <StyledBackBar>
      <div className="d-flex align-items-center">
        <BackIcon
          onClick={handleGoBack}
          height={15}
          color={baseColors.GREY_ONE}
        />
        <span>{currentArea?.name}</span>
      </div>
      <HeaderIconWrapper>
        <SearchIcon
          onClick={handleSearchOpen}
          height={20}
          color={baseColors.GREY_ONE}
        />
        {showThreeLineMenu && (
          <ThreeLinesIcon
            onClick={() => closeLeftPane()}
            height={25}
            color={baseColors.GREY_ONE}
          />
        )}
      </HeaderIconWrapper>
    </StyledBackBar>
  )
}

export interface ITherapeuticConditionData {
  id: number
  disease_name: string
}

enum SearchResultType {
  TherapeuticArea = 'Therapeutic Area',
  Condition = 'Condition',
  DiseaseArea = 'Disease Area',
}

const TherapeuticAreaHLTList = ({
  therapeuticAreasData,
  therapeuticConditionData,
  fetchTherapeuticCondition,
  resetTherapeuticCondition,
  resetTherapeuticProducts,
  isError,
  isLoading,
  baseUrl,
  showThreeLineMenu,
  expandLeftPane,
  closeLeftPane,
}: {
  therapeuticAreasData: any
  therapeuticConditionData: any
  fetchTherapeuticCondition: any
  resetTherapeuticCondition: any
  resetTherapeuticProducts: any
  isError: boolean
  isLoading: boolean
  baseUrl: string
  showThreeLineMenu: boolean
  expandLeftPane: () => void
  closeLeftPane: () => void
}) => {
  const { push } = useHistory()
  const { therapeuticAreaId, therapeuticConditionId } = useParams<any>()
  const [searchBy, setSearchBy] = useState('')
  const [isOpenSearch, setIsOpenSearch] = useState(false)
  const [activeItem, setActiveItem] = useState(therapeuticConditionId)

  const [resultsListData, setResultsListData] = useState<any>([])
  const [condQueryResults, setCondQueryResults] = useState<any>([])
  const conditionsList = therapeuticConditionData?.[therapeuticAreaId]
  const HLTList = therapeuticConditionData?.[therapeuticAreaId + 'HLT']

  useEffect(() => {
    if (searchBy && conditionsList && conditionsList?.length > 0) {
      setCondQueryResults(
        conditionsList
          ?.map((curr) => ({
            name: curr.disease_name,
            type: SearchResultType.Condition,
            id: curr.id,
          }))
          ?.filter((item) =>
            item.name.toLowerCase().includes(searchBy.toLowerCase())
          )
      )
    }
  }, [searchBy, conditionsList])

  useEffect(() => {
    if (!HLTList || HLTList?.length === 0) setResultsListData([])
    else {
      let filteredData = HLTList.filter(
        (item: any) => item?.diseases?.length > 0
      ).map((curr, index) => ({
        name: curr?.hlt_name,
        type: SearchResultType.DiseaseArea,
        key: index,
        data: curr?.diseases,
      }))

      if (searchBy) {
        filteredData = filteredData.filter((item: any) => {
          return item?.name?.toLowerCase()?.includes(searchBy.toLowerCase())
        })
      }
      setResultsListData(filteredData)
    }
  }, [HLTList, searchBy, condQueryResults])

  useEffect(() => {
    if (!HLTList && !isLoading && !isError) {
      fetchTherapeuticCondition(therapeuticAreaId)
    }
  }, [
    fetchTherapeuticCondition,
    isLoading,
    isError,
    therapeuticAreaId,
    HLTList,
  ])

  const HoverableCardHeader = styled(Card.Header)`
    background-color: ${baseColors.WHITE};
    &:hover {
      cursor: pointer;
    }
  `

  const tData = () => {
    if (!HLTList || HLTList.length === 0) return []
    const filteredData = HLTList.filter(
      (item: any) => item?.diseases?.length > 0
    )

    return filteredData
  }

  const HLTItem = (hltItem, index) => {
    return (
      <Card key={index}>
        <Accordion.Toggle as={HoverableCardHeader} eventKey={index}>
          {hltItem?.hlt_name}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={index}>
          <Fragment>
            {hltItem?.diseases?.map((disease, i) => {
              return (
                <StyledHLTConditionItem
                  key={i}
                  onClick={() => {
                    closeLeftPane()
                    setActiveItem(disease?.id?.toString())
                    push(
                      `${baseUrl}/${therapeuticAreaId}/${disease.id.toString()}`
                    )
                  }}
                  isActive={activeItem === disease?.id?.toString()}
                >
                  • {disease?.disease_name}
                </StyledHLTConditionItem>
              )
            })}
          </Fragment>
        </Accordion.Collapse>
      </Card>
    )
  }

  const TherapeuticItem = ({
    name,
    handleClick,
    type,
    index,
    data,
  }: {
    name: string
    handleClick: () => void
    type: SearchResultType
    index: string
    data: any
  }) => {
    return (
      <Fragment>
        {type === SearchResultType.DiseaseArea ? (
          <Card>
            <Accordion.Toggle as={HoverableCardHeader} eventKey={index}>
              {name}
              <Tag
                fontWeight={600}
                color={baseColors.GREY_BLUE}
                bgColor={baseColors.BLUE_SIX}
                width="fit-content"
                style={{ height: 'fit-content' }}
              >
                {type}
              </Tag>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={index}>
              <Fragment>
                {data?.map((disease, i) => {
                  return (
                    <StyledHLTConditionItem
                      key={i}
                      onClick={() => {
                        closeLeftPane()
                        setActiveItem(disease?.id?.toString())
                        push(
                          `${baseUrl}/${therapeuticAreaId}/${disease.id.toString()}`
                        )
                      }}
                      isActive={activeItem === disease?.id?.toString()}
                    >
                      • {disease?.disease_name}
                    </StyledHLTConditionItem>
                  )
                })}
              </Fragment>
            </Accordion.Collapse>
          </Card>
        ) : (
          <TherapeuticItemWrapper onClick={handleClick}>
            {name}
            {type && (
              <Tag
                fontWeight={600}
                color={baseColors.GREY_BLUE}
                bgColor={baseColors.BLUE_SIX}
                width="fit-content"
                style={{ height: 'fit-content' }}
              >
                {type}
              </Tag>
            )}
          </TherapeuticItemWrapper>
        )}
      </Fragment>
    )
  }

  return (
    <Fragment>
      {isOpenSearch ? (
        <TherapeuticSearchBar
          onSearch={(text) => setSearchBy(text)}
          searchPlaceholder="Search therapeutic area"
          onClose={() => {
            setSearchBy('')
            setIsOpenSearch(false)
          }}
        />
      ) : (
        <BackBar
          handleGoBack={() => {
            push(`${baseUrl}`)
          }}
          currentArea={Object.values(therapeuticAreasData || {})?.find(
            (d: any) => d?.id?.toString() === therapeuticAreaId
          )}
          handleSearchOpen={() => setIsOpenSearch(true)}
          showThreeLineMenu={showThreeLineMenu}
          closeLeftPane={closeLeftPane}
        />
      )}

      {isLoading ? (
        <LoadingWrapper>
          <Loading size={40} />
        </LoadingWrapper>
      ) : (
        <ContainerTabBody padding="0px">
          {searchBy ? (
            condQueryResults.length || resultsListData.length ? (
              <Fragment>
                {condQueryResults.map((item, index) => (
                  <TherapeuticItem
                    name={item.name}
                    type={item.type}
                    data={item?.data}
                    key={index}
                    index={index.toString()}
                    handleClick={() => {
                      if (item.type === SearchResultType.Condition)
                        push(`${baseUrl}/c/${item.id}`)
                    }}
                  />
                ))}
                <Accordion>
                  {resultsListData.map((item, index) => (
                    <TherapeuticItem
                      name={item.name}
                      type={item.type}
                      data={item?.data}
                      key={index}
                      index={index.toString()}
                      handleClick={() => {
                        if (item.type === SearchResultType.Condition)
                          push(`${baseUrl}/c/${item.id}`)
                      }}
                    />
                  ))}
                </Accordion>
              </Fragment>
            ) : (
              <NoDataErrorMsg>No items found</NoDataErrorMsg>
            )
          ) : tData()?.length ? (
            <Accordion>{tData().map(HLTItem)}</Accordion>
          ) : (
            <NoDataErrorMsg>No items found</NoDataErrorMsg>
          )}
        </ContainerTabBody>
      )}
    </Fragment>
  )
}

export default TherapeuticAreaHLTList
