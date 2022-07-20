import React, { useEffect } from 'react'
import { match as Match, Route, Switch } from 'react-router-dom'
import PharmaMergers from '.'
import MergerDetails from './MergerDetails'
import { connect } from 'react-redux'
import {
  fetchPharmaMergers as fetchPharmaMergersAction,
  errorFetchingPharmaMergers,
  pharmaMergersSelector,
  pharmaMergersKey,
} from '../../redux/PharmaMergers'

const PharmaMergersRoutes = (props: {
  match: Match
  activeLandingType: string
  pharmaMergers
  fetchPharmaMergers
  isErrorFetchingPharmaMergers
}) => {
  const {
    match,
    activeLandingType,
    pharmaMergers,
    fetchPharmaMergers,
    isErrorFetchingPharmaMergers,
  } = props
  const mergersData = pharmaMergers?.[pharmaMergersKey]

  useEffect(() => {
    if (!mergersData && !isErrorFetchingPharmaMergers) {
      fetchPharmaMergers()
    }
  }, [fetchPharmaMergers, mergersData, isErrorFetchingPharmaMergers])

  return (
    <Switch>
      <Route exact path={match.url}>
        <PharmaMergers activeLandingType={activeLandingType} />
      </Route>
      <Route exact path={`${match.url}/:mergerName`}>
        <MergerDetails />
      </Route>
    </Switch>
  )
}

function mapStateToProps(state: object) {
  return {
    pharmaMergers: pharmaMergersSelector(state),
    isErrorFetchingPharmaMergers: errorFetchingPharmaMergers(state),
  }
}

const mapDispatchToProps = {
  fetchPharmaMergers: fetchPharmaMergersAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(PharmaMergersRoutes)
