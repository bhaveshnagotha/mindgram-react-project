import React from 'react'
import { match as Match, Route, Switch } from 'react-router-dom'
import PipelineProducts from '.'
import Products from './Products'

const PipelineProductsRoutes = (props: { match: Match }) => {
  const { match } = props
  return (
    <Switch>
      <Route exact path={match.url}>
        <PipelineProducts />
      </Route>
      <Route exact path={`${match.url}/:normCui`}>
        <Products />
      </Route>
    </Switch>
  )
}

export default PipelineProductsRoutes
