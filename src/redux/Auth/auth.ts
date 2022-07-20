import auth0 from 'auth0-js'

class Auth {
  public auth0: auth0.WebAuth

  constructor() {
    this.auth0 = new auth0.WebAuth({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
      domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
      redirectUri: `${process.env.REACT_APP_CLIENT_HOST}/callback`,
      responseType: 'token id_token',
      scope: 'openid profile email',
    })

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.checkSession = this.checkSession.bind(this)
  }

  public login(returnTo: string) {
    this.auth0.authorize({
      state: returnTo,
    })
  }

  public logout() {
    this.auth0.logout({
      returnTo: `${process.env.REACT_APP_CLIENT_HOST}/`,
    })
  }

  public checkSession() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          resolve(authResult)
        } else if (err) {
          reject(err)
        }
      })
    })
  }
}

export const auth = new Auth()
