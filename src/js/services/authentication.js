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