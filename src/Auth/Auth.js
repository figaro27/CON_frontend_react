import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';
import ApiPathConstants from '../Constants/ApiPathConstants';

const STATE_TOKEN = `${Math.round(Math.random() * 100000)}`;
const NONCE_TOKEN = `${Math.round(Math.random() * 100000)}`;

const routes = {
  home: '/',
  continue: '/continue',
  login: '/login'
};

export default class Auth {
  constructor(history) {
    if (!history) {
      throw new Error('Cannot initialize Auth object without a valid history');
    }

    this.history = history;

    this.auth0 = new auth0.WebAuth({
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientID,
      redirectUri: AUTH_CONFIG.redirectUri,
      audience: `https://${AUTH_CONFIG.domain}/userinfo`,
      responseType: 'token id_token',
      scope: 'openid'
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.generateAuthorizeUrl = this.generateAuthorizeUrl.bind(this);
    this.startListeningForIframe = this.startListeningForIframe.bind(this);
    this.setSession = this.setSession.bind(this);

    this.startListeningForIframe();
  }

  login() {
    this.history.replace(routes.login);
  }

   // Listens for parent.postMessage with a data package that looks like this:
   // {event: 'iframe-redirect', hash: '#access-token=[LONG TOKEN]'}
   // This message is dispatched from callback.html in the /public directory.

  startListeningForIframe() {
    const receiveMessage = (event, ...args) => {
      if (event.origin !== AUTH_CONFIG.redirectOrigin)
        return;

      if (!event.data.event || event.data.event !== 'iframe-redirect')
        return;

      this.handleAuthentication(event.data.hash);
    };

    window.addEventListener("message", receiveMessage.bind(this), false);
  }

  generateAuthorizeUrl() {
    return this.auth0.client.buildAuthorizeUrl({
      clientID: AUTH_CONFIG.clientID,
      connection: AUTH_CONFIG.connection,
      redirectUri: AUTH_CONFIG.redirectUri,
      audience: AUTH_CONFIG.audience,
      responseType: 'token id_token',
      scope: 'openid profile',
      prompt: 'consent', // consent/none
      state: STATE_TOKEN,
      nonce: NONCE_TOKEN,
    });
  }

  handleAuthentication(hash) {
    this.auth0.parseHash({ hash, nonce: NONCE_TOKEN, state: STATE_TOKEN }, ((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        // Successfull login
        /*
        fetch(ApiPathConstants.getApiPath() + 'profile/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        });*/

        this.setSession(authResult);
      } else if (err) {
        this.history.replace(routes.home);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    }));
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    localStorage.setItem('loggedin_first', 1)
    localStorage.setItem('first_cookie', 1)
    // navigate to the home route
    this.history.replace(routes.home);
    // this.history.replace(routes.continue);
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('loggedin_first')
    localStorage.removeItem('started_deposit')
    localStorage.removeItem('currency');
    localStorage.removeItem('rate')
    // localStorage.removeItem('lang')
    localStorage.removeItem('past_filled')

    this.auth0.logout({ returnTo: AUTH_CONFIG.logoutUri, federated: true });
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  isPastFilled() {
    if(localStorage.getItem('past_filled')) {
      return (parseInt(localStorage.getItem('past_filled'), 10) === 1) ? true : false
    }

    var request = new XMLHttpRequest();
    request.open('GET', ApiPathConstants.getApiPath() + 'profile/info/', false);
    request.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    request.send();
    if (request.status === 200 && JSON.parse(request.response).is_loggedin === true) {
      localStorage.setItem('past_filled', 1)
      return true
    }

    localStorage.setItem('past_filled', 0)
    return false
  }
}
