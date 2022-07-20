import React from 'react'
import ReactDOM from 'react-dom'
import { useHistory, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { Auth0Provider } from '@auth0/auth0-react'

import '@fortawesome/fontawesome-free/js/all'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-virtualized/styles.css'
import App from './containers/App/App'
import './fonts.css'
import './index.css'
import './styles/utils.scss'
import { configureStoreDev, configureStoreProd } from './redux/configureStore'
import * as serviceWorker from './serviceWorker'
import theme from './theme'

const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN || ''
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID || ''
const AUTH0_AUDIENCE = process.env.REACT_APP_AUTH0_AUDIENCE || ''

const Auth0ProviderWithHistory = ({ children }: { children: any }) => {
  const history = useHistory()

  // You use the onRedirectCallback() method to handle the
  // event where Auth0 redirects your users from the Auth0
  // Universal Login page to your React application. You use
  // the useHistory() hook to get the history object from React
  // Router. You use the history.push() method to take users
  // back to the route they intended to access before authentication.
  // See: https://auth0.com/blog/complete-guide-to-react-user-authentication/
  const onRedirectCallback = (appState: any) => {
    history.push(appState?.returnTo || window.location.pathname)
  }

  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      audience={AUTH0_AUDIENCE}
      scope="read:current_user update:current_user_metadata"
      useRefreshTokens={true}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}

const initialState = {}
export const store =
  process.env.NODE_ENV === 'production'
    ? configureStoreProd(initialState)
    : configureStoreDev(initialState)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
