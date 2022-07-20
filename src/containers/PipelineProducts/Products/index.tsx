import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import {
  pipelineProductsSelector,
  pipelineProductsKey,
  fetchPipelineProducts as fetchPipelineProductsAction,
} from '../../../redux/PipelineProducts'
import ProductDetails from './ProductDetails'
import { Container } from '../PipelineProducts.styles'
import { IPipeLineProductDetails } from '../PipelineProducts.helper'

const Products = ({ fetchPipelineProducts }) => {
  const data = useSelector(pipelineProductsSelector)
  const { errorFetchingPipelineProducts, isFetchingPipelineProducts } =
    data || {}
  const pipelineProducts = data?.[pipelineProductsKey]
  // const productsData: IPipeLineProductDetails[] = getPipelineProductsData(
  //   pipelineProducts
  // )
  const productsData: IPipeLineProductDetails[] = pipelineProducts?.data

  useEffect(() => {
    if (!pipelineProducts && !errorFetchingPipelineProducts) {
      fetchPipelineProducts()
    }
  }, [fetchPipelineProducts, pipelineProducts, errorFetchingPipelineProducts])

  return (
    <Container>
      <ProductDetails
        isFetchingPipelineProducts={isFetchingPipelineProducts}
        productsData={productsData}
      />
    </Container>
  )
}

const mapDispatchToProps = {
  fetchPipelineProducts: fetchPipelineProductsAction,
}
export default connect(null, mapDispatchToProps)(Products)
