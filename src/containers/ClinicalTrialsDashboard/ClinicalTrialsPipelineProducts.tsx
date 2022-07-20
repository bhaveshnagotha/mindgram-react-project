import React, { Fragment, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { StyledLink, NoDataErrorMsg } from '../App/App.styles'
import {
  Header,
  BodyWrapper,
  ItemInner,
  ItemHeader,
  ItemDetailBody,
  ItemTitle,
  ItemInnerWrapper,
  ItemDetailText,
} from './ClinicalTrialsDashboard.style'
import styled from 'styled-components'
import theme from '../../theme'
import { baseColors } from '../../constants/colors'
import { Loading } from '../../components'
import { connect } from 'react-redux'
import {
  errorFetchingLatestProducts,
  fetchLatestProducts as fetchLatestProductsAction,
  isFetchingLatestProductsSelector,
  latestProductsKey,
  latestProductsSelector,
} from '../../redux/LatestProducts'
import { LoadingWrapper } from '../TrialNew/Middle/TrialInfoRightPanel/TrialInfoRightPanel.styles'
import { useHistory } from 'react-router-dom'

export const ItemWrapper = styled.div`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid ${baseColors.GREY_LIGHT};
  transition: all 150ms ease-in;
  cursor: pointer;
  &:hover {
    box-shadow: ${theme.boxShadow};
  }
`

interface ILatestProductCompany {
  id: number
  name: string
  ticker: string
  type: string
}
interface ILatestProduct {
  [id: string]: {
    norm_cui: string
    company: ILatestProductCompany[]
    note: string[]
  }
}

interface TData {
  productId: string
  company: ILatestProductCompany[]
  note: string[]
}

const ListItem = ({
  data,
  handleClick,
}: {
  data: TData
  handleClick: () => void
}) => {
  const companyName = data.company?.[0].name
  const companyUrl = `${data.company?.[0].type}${data.company?.[0].id}`
  return (
    <ItemWrapper onClick={handleClick}>
      <ItemInner style={{ flex: 1 }}>
        <ItemInnerWrapper>
          <ItemDetailBody>
            <Row>
              <Col md={4}>
                <div>
                  <ItemTitle>Product</ItemTitle>
                  <div className="d-flex">
                    <ItemHeader>
                      <p>{data.productId}</p>
                    </ItemHeader>
                  </div>
                </div>
              </Col>
              <Col md={8}>
                <div>
                  <ItemTitle>Company</ItemTitle>
                  <div className="d-flex">
                    <StyledLink
                      onClick={(e) => e.stopPropagation()}
                      to={`/clinical-trials/company-dashboard/${companyUrl}`}
                      bgcolor={baseColors.BLUE_SIX}
                      width="30px"
                      color={baseColors.GREY_BLUE}
                      content={data?.company?.[0]?.ticker}
                    >
                      {companyName}
                    </StyledLink>
                  </div>
                </div>
              </Col>
            </Row>
          </ItemDetailBody>
          <ItemDetailText>{data?.note?.[0]}x</ItemDetailText>
        </ItemInnerWrapper>
      </ItemInner>
    </ItemWrapper>
  )
}

const getLatestProductsData = (products: ILatestProduct[]) => {
  return products?.map((product: ILatestProduct) => {
    const productId = Object.keys(product)[0]
    return {
      ...product[productId],
      productId,
    }
  })
}

const ClinicalTrialsPipelineProducts = ({
  latestProducts,
  fetchLatestProducts,
  isErrorFetchingLatestProducts,
  isFetchingLatestProducts,
}) => {
  const { push } = useHistory()
  const productsData = latestProducts[latestProductsKey]
  const tData = getLatestProductsData(productsData?.data)

  useEffect(() => {
    if (!productsData && !isErrorFetchingLatestProducts) {
      fetchLatestProducts()
    }
  }, [fetchLatestProducts, productsData, isErrorFetchingLatestProducts])
  return (
    <Fragment>
      <Header>
        <p>Products in Focus</p>
        <div onClick={() => push('/clinical-trials/pipeline-products')}>
          View all
        </div>
      </Header>
      <BodyWrapper>
        {isFetchingLatestProducts ? (
          <LoadingWrapper>
            <Loading size={30} />
          </LoadingWrapper>
        ) : tData?.length === 0 ? (
          <NoDataErrorMsg>No products found</NoDataErrorMsg>
        ) : (
          tData
            ?.splice(0, 5)
            ?.map((data: any, index) => (
              <ListItem
                key={index}
                data={data}
                handleClick={() =>
                  push(`/clinical-trials/pipeline-products/${data?.norm_cui}`)
                }
              />
            ))
        )}
      </BodyWrapper>
    </Fragment>
  )
}

function mapStateToProps(state: object) {
  return {
    latestProducts: latestProductsSelector(state),
    isErrorFetchingLatestProducts: errorFetchingLatestProducts(state),
    isFetchingLatestProducts: isFetchingLatestProductsSelector(state),
  }
}

const mapDispatchToProps = {
  fetchLatestProducts: fetchLatestProductsAction,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClinicalTrialsPipelineProducts)
