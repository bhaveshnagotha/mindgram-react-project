import { format } from 'date-fns'
import { isEmpty, isEqual } from 'lodash'
import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router'
import styled from 'styled-components'
import { ModalComponent, Tag } from '../../components'
import VerticalBoxedTimeline from '../../components/VerticalBoxedTimeline'
import { baseColors } from '../../constants/colors'
import {
  compareProductsDataSelector,
  errorFetchingCompareProductsSelector,
  fetchCompareProducts as fetchCompareProductsAction,
  isFetchingCompareProductsSelector,
  normCuisSelector,
} from '../../redux/CompareProducts'
import { NoDataErrorMsg } from '../App/App.styles'
import { ItemSubHeader } from '../PipelineProducts/PipelineProducts.styles'
import { TimelineBoxItem } from '../PipelineProducts/Products/DevelopmentTimeline'
import { CompanyWrapper } from '../PipelineProducts/Products/MarketAnalysis'
import { EmptyPlaceholder } from '../PipelineProducts/Products/ProductDetails'
import { CardSubtitle } from '../PipelineProducts/Products/Products.styles'
import { getCollection } from '../../helpers/api'
import CatalystViewer from '../TrialCatalysts/Middle/CatalystViewer'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const TagContainer = styled.div`
  display: flex;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  flex-wrap: wrap;
`

const CompareProducts = ({
  errorFetchingCompareProducts,
  isFetchingCompareProducts,
  compareProducts,
  normCuis,
  fetchCompareProducts,
}) => {
  const query = useQuery()
  const initNormCuiList = query.getAll('normCui')

  const [isModalShowing, setIsModalShowing] = useState<boolean>(false)

  useEffect(() => {
    if (
      !isFetchingCompareProducts &&
      !errorFetchingCompareProducts &&
      (isEmpty(compareProducts) || !isEqual(initNormCuiList, normCuis))
    ) {
      fetchCompareProducts(initNormCuiList)
    }
  }, [
    isFetchingCompareProducts,
    errorFetchingCompareProducts,
    compareProducts,
    fetchCompareProducts,
    initNormCuiList,
    normCuis,
  ])

  const [newsId, setNewsId] = useState<number | null>(null)

  const [articleContent, setArticleContent] = useState<any>(null)

  useEffect(() => {
    if (newsId !== null && newsId !== undefined) {
      getCollection(`/v1/ct/catalysts/news/${newsId}`)
        .then((res) => {
          setArticleContent(res)
        })
        .catch((err) => {
          return
        })
    } else {
      setArticleContent(null)
    }
    // eslint-disable-next-line
  }, [newsId])

  const timelinesData = compareProducts?.map((item) => item.clinical_data)
  const onItemClick = (id) => {
    if (id !== newsId) {
      setArticleContent(null)
      setIsModalShowing(true)
      setNewsId(id)
    } else {
      setIsModalShowing(true)
    }
  }

  const timelineComponents = timelinesData?.map((devTimelineData) => {
    let activeIndex = -1
    const todaysDate = new Date()
    const timelineStepData = devTimelineData.map((item: any, i: number) => {
      const currDate = new Date(item.date)
      activeIndex = currDate <= todaysDate ? i : activeIndex

      return {
        boxComponent: (
          <TimelineBoxItem
            sourceType={item.source_type}
            title={item.title}
            stage={item.stage}
            indication={item.condition.condition_name}
            url={item.source?.source_link ?? ''}
            id={item?.source?.source_id ?? null}
            onClick={onItemClick}
          />
        ),
        date: format(currDate, 'MMM dd, yyyy'),
      }
    })

    return isEmpty(timelineStepData) ? null : (
      <VerticalBoxedTimeline
        data={timelineStepData}
        activeIndex={activeIndex}
      />
    )
  })

  return (
    <div className="p-5" style={{ display: 'flex' }}>
      {compareProducts?.map((item, index) => {
        const currCompany: any = Object.values(item.company)[0]
        return (
          <div
            key={index}
            className="mx-3"
            style={{ minWidth: 300, maxWidth: 600 }}
          >
            <h5 className="mb-0">{item.intervention_name}</h5>
            <ItemSubHeader>
              Also known as: <strong>{item?.synonyms?.join(' | ')}</strong>
            </ItemSubHeader>
            <CompanyWrapper style={{ alignItems: 'center' }} className="mb-3">
              <div>
                <span className="value">{currCompany?.company_name}</span>
              </div>
              <Tag
                className="ml-2"
                fontWeight={600}
                color={baseColors.GREY_BLUE}
                bgColor={baseColors.BLUE_SIX}
                fontSize={10}
                height={18}
                width="fit-content"
              >
                {currCompany?.company_ticker}
              </Tag>
            </CompanyWrapper>
            <div className="mb-3">
              <h6>Mechanism(s) of Action</h6>
              <CardSubtitle style={{ flexWrap: 'wrap' }}>
                {item?.pharm_actions?.map((p, i) => (
                  <Fragment key={i}>
                    <div
                      style={{
                        paddingRight: 10,
                        marginRight: 10,
                        fontSize: 13,
                        borderRightColor: baseColors.GREY_DARK,
                        borderRightWidth: 1,
                        borderRightStyle: 'solid',
                      }}
                    >
                      {p.pharm_action}
                    </div>
                  </Fragment>
                )) || <EmptyPlaceholder />}
              </CardSubtitle>
            </div>
            <div className="mb-3">
              <h6>Indications</h6>
              <TagContainer>
                {item.conditions?.map((conditionItem, i) => (
                  <Tag
                    className="ml-2"
                    fontWeight={600}
                    color={baseColors.GREY_BLUE}
                    bgColor={baseColors.BLUE_SIX}
                    fontSize={10}
                    height={18}
                    width="fit-content"
                    key={i}
                  >
                    {conditionItem.condition}
                  </Tag>
                ))}
              </TagContainer>
            </div>
            <div className="mb-3">
              <h6>Modality</h6>
              {!item.intervention_modality?.length && 'n/a'}
              <TagContainer>
                {item.intervention_modality?.map((modality, i) => (
                  <Tag
                    className="ml-2"
                    fontWeight={600}
                    color={baseColors.WHITE}
                    bgColor="#654F83"
                    fontSize={10}
                    height={18}
                    width="fit-content"
                  >
                    {modality}
                  </Tag>
                ))}
              </TagContainer>
            </div>
            <div className="mb-3">
              <h6>Target</h6>
              {!item.targets?.length && 'n/a'}
              <TagContainer>
                {item.targets?.map((target, i) => (
                  <Tag
                    className="ml-2"
                    fontWeight={600}
                    color={baseColors.WHITE}
                    bgColor="#749D83"
                    fontSize={10}
                    height={18}
                    width="fit-content"
                    key={i}
                  >
                    {target.target_symbol}
                  </Tag>
                ))}
              </TagContainer>
            </div>
            <div>
              <h6>Development Timeline</h6>
              {!!timelineComponents[index] ? (
                timelineComponents[index]
              ) : (
                <NoDataErrorMsg>No timeline found</NoDataErrorMsg>
              )}
            </div>
          </div>
        )
      })}
      <div onClick={(e) => e.stopPropagation()}>
        <ModalComponent show={isModalShowing} width={window.innerWidth / 1.1}>
          <CatalystViewer
            activeCatalyst={articleContent}
            fdaLabelURL={''}
            onCloseActiveCatalyst={(e) => {
              e.stopPropagation()
              setIsModalShowing(false)
            }}
          />
        </ModalComponent>
      </div>
    </div>
  )
}

function mapStateToProps(state: object) {
  return {
    compareProducts: compareProductsDataSelector(state),
    errorFetchingCompareProducts: errorFetchingCompareProductsSelector(state),
    isFetchingCompareProducts: isFetchingCompareProductsSelector(state),
    normCuis: normCuisSelector(state),
  }
}

const mapDispatchToProps = {
  fetchCompareProducts: fetchCompareProductsAction,
}
export default connect(mapStateToProps, mapDispatchToProps)(CompareProducts)
