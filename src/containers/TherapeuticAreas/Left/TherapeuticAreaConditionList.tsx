import { isEmpty } from 'lodash'
import React, { Fragment, useEffect, useState } from 'react'
import ReactList from 'react-list'
import { useHistory, useParams } from 'react-router-dom'
import { Loading } from '../../../components'
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
  StyledConditionItem,
} from './TherapeuticLeft.styles'

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

const TherapeuticAreaConditionList = ({
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

  const tData = () => {
    if (isEmpty(therapeuticConditionData?.[therapeuticAreaId])) return []
    const items = Object.values(therapeuticConditionData?.[therapeuticAreaId])
    let filteredData = items?.map((i) => i)

    if (searchBy) {
      filteredData = filteredData.filter((item: any) => {
        return (
          item?.disease_name?.toLowerCase()?.includes(searchBy.toLowerCase()) ||
          0
        )
      })
    }
    return filteredData
  }

  useEffect(() => {
    if (!therapeuticConditionData?.[therapeuticAreaId] && !isError) {
      fetchTherapeuticCondition(therapeuticAreaId)
    }
  }, [
    fetchTherapeuticCondition,
    isError,
    therapeuticAreaId,
    therapeuticConditionData,
  ])

  const ConditionItem = (index, key) => {
    const item: any = tData()?.[index]
    return (
      <StyledConditionItem
        key={key}
        onClick={() => {
          closeLeftPane()
          setActiveItem(item?.id?.toString())
          push(`${baseUrl}/${therapeuticAreaId}/${item.id.toString()}`)
        }}
        isActive={activeItem === item?.id?.toString()}
      >
        {item?.disease_name}
      </StyledConditionItem>
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
          {tData()?.length ? (
            <ReactList
              itemRenderer={ConditionItem}
              length={tData()?.length}
              type="simple"
            />
          ) : (
            <NoDataErrorMsg>No items found</NoDataErrorMsg>
          )}
        </ContainerTabBody>
      )}
    </Fragment>
  )
}

export default TherapeuticAreaConditionList
