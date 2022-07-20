import React from 'react'
import { connect } from 'react-redux'

import {
  errorFetchingLatestProducts,
  fetchLatestProducts as fetchLatestProductsAction,
  isFetchingLatestProductsSelector,
  latestProductsKey,
  latestProductsSelector,
} from '../../redux/LatestProducts'

const MyComponent = ({
  latestProducts,
  fetchLatestProducts,
  isErrorFetchingLatestProducts,
  isFetchingLatestProducts,
}) => {
  return <div>Hello</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent)
