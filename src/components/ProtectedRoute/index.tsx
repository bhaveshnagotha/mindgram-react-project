import React from 'react'
import { Route, RouteProps, useLocation } from 'react-router-dom'

import GlobalBreadcrumb from '../../containers/GlobalBreadcrumb'
import withAuthenticationRequired from '../../hocs/withAuthenticationRequired'
import Loading from '../Loading'

interface IProtectedRouteProps {
  component: React.ComponentType<any>
  path: string
  componentProps?: object
}

const ProtectedRoute: React.FunctionComponent<
  IProtectedRouteProps & RouteProps
> = ({ component: Component, componentProps, ...rest }) => {
  const location = useLocation()

  const ProtectedComponent = withAuthenticationRequired(Component, {
    onRedirecting: () => <Loading />,
  })
  return (
    <>
      {location.pathname.includes('patents') && (
        <Route component={GlobalBreadcrumb} />
      )}
      <Route
        {...rest}
        render={(routeProps) => {
          return (
            <ProtectedComponent {...routeProps} {...componentProps} {...rest} />
          )
        }}
      />
    </>
  )
}

export default ProtectedRoute
