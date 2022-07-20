import React, { useState, Fragment, useEffect } from 'react'
import { Card, Loading } from '../../../components'
import { ActionBar, CatalystItem } from '../../TrialCatalysts/Left'
import { LoadingWrapper } from '../../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { useParams } from 'react-router-dom'
import { ActionHeader } from '../../TrialCatalysts/Left/TrialCatalystsLeft.styles'
import { ContainerTabBody } from '../../TrialNew/TrialNew.styles'
import { getCollection } from '../../../helpers/api'
import { baseColors } from '../../../constants/colors'
import { NoDataErrorMsg } from '../../App/App.styles'
import { Header } from './TherapeuticMiddle.styles'

const getUrl = (conditionId) => `/v1/ct/catalysts/news?condition=${conditionId}`

function fetchProductCatalysts(conditionId) {
  const url = getUrl(conditionId)
  return getCollection(url)
}

const RelatedCatalysts = ({
  onActiveCatalystSelect,
}: {
  onActiveCatalystSelect: (d: any) => void
}) => {
  const { therapeuticConditionId } = useParams<any>()
  const [productCatalysts, setProductCatalysts] = useState<any[]>([])
  const [isLoadingProductCatalysts, setIsLoadingProductCatalysts] = useState(
    false
  )
  const [searchBy, setSearchBy] = useState('')
  const [isSearchable, setIsSearchable] = useState(false)

  const buildData = productCatalysts

  useEffect(() => {
    setIsLoadingProductCatalysts(true)
    fetchProductCatalysts(therapeuticConditionId)
      .then((responseData) => {
        setProductCatalysts(responseData)
        setIsLoadingProductCatalysts(false)
      })
      .catch(() => {
        setIsLoadingProductCatalysts(false)
        setProductCatalysts([])
      })
  }, [therapeuticConditionId])

  const sortedData = () => {
    const items = buildData || []
    let filteredData = items.map((i) => i)

    if (searchBy) {
      filteredData = filteredData.filter((item) => {
        return item?.title?.toLowerCase()?.includes(searchBy.toLowerCase())
      })
    }
    return filteredData
  }

  const listData = sortedData()

  return (
    <Card height="500px" width="100%">
      {isLoadingProductCatalysts ? (
        <LoadingWrapper>
          <Loading size={30} />
        </LoadingWrapper>
      ) : (
        <Fragment>
          <ActionHeader>
            <Header>
              <p className="mb-0">Related Catalysts</p>
            </Header>
            {isSearchable ? (
              <ActionBar
                onSearch={(text) => setSearchBy(text)}
                searchPlaceholder="Search..."
                onClose={() => {
                  setIsSearchable(false)
                  setSearchBy('')
                }}
              />
            ) : (
              <div onClick={() => setIsSearchable(true)}>
                <span
                  className="fa fa-search"
                  style={{
                    color: baseColors.GREY_ONE,
                    cursor: 'pointer',
                    fontSize: '15px',
                  }}
                ></span>
              </div>
            )}
          </ActionHeader>
          <ContainerTabBody style={{ height: '90%' }} padding={'0px'}>
            {listData?.length > 0 ? (
              listData?.map((d, index) => {
                return (
                  <CatalystItem
                    key={d.id}
                    lastItem={index === listData.length - 1}
                    activeItem={false}
                    data={d}
                    handleClick={() => onActiveCatalystSelect(d)}
                  />
                )
              })
            ) : (
              <NoDataErrorMsg>No related catalysts</NoDataErrorMsg>
            )}
          </ContainerTabBody>
        </Fragment>
      )}
    </Card>
  )
}

export default RelatedCatalysts
