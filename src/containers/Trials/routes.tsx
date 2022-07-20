import React from 'react'

import { match as Match, Redirect, Route, Switch } from 'react-router-dom'

import TrialNew from '../TrialNew'

const TrialsRouter = (props: { match: Match }) => {
  // /trials
  const { match } = props
  return (
    <Switch>
      <Route exact path={match.url} render={() => <Redirect to="/" />} />
      <Route
        exact
        path={`${match.url}/:ptab_trial_num`}
        render={(p) => (
          <TrialNew ptabTrialNum={p.match.params.ptab_trial_num} />
        )}
      />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  )
}

export default TrialsRouter
