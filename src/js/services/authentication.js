import Auth0Lock from 'auth0-lock';
import { browserHistory } from 'react-router';
import { setNonce } from './authentication-store';


const randomString = (length) => {
    var bytes = new Uint8Array(length);
    var random = window.crypto.getRandomValues(bytes);
    var result = [];
    var charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~';

    random.forEach( ( c ) => {
        result.push( charset[ c % charset.length ]);
    });
    return result.join('');
}


export function login() {

  const nonce = randomString( 16 );

  console.log( 'nonce: '+ nonce );

  setNonce( nonce );

  let lock = new Auth0Lock('NP5BF3hkstyAEyg1J3boW6xXmOVGnHj3', 'wipmoore.eu.auth0.com', {
      rememberLastLogin: false,
      auth: {
        redirectUrl: 'http://localhost:8080/user-authenticated',
        responseType: 'id_token',
        params: { 
            scope: 'openid email',
            nonce: nonce
        }
      }
  });

  lock.show();

}


export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    const nonce = randomString( 16 );

    console.log( 'nonce: '+ nonce );

    AuthenticationStore.nonce = nonce;

    this.lock = new Auth0Lock(clientId, domain, {
      rememberLastLogin: false,
      auth: {
        redirectUrl: 'http://localhost:8080/user-authenticated',
        responseType: 'id_token',
        params: { 
            scope: 'openid email',
            nonce: nonce
        }
      }
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult) {
    console.log(  '_doAuthentication' );

    // Saves the user token
    this.setToken(authResult.idToken)
    // navigate to the home route
    browserHistory.replace('/home')
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token');
  }
}