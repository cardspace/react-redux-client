import Auth0Lock from 'auth0-lock';
import { browserHistory } from 'react-router';
import { setNonce } from './authentication-store';

import { auth0_client_id, auth0_domain, auth0_redirectUrl } from 'config';

const randomString = ( length ) => {
    var bytes = new Uint8Array( length );
    var random = window.crypto.getRandomValues( bytes );
    var result = [];
    var charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~';

    random.forEach( ( c ) => {
        result.push( charset[ c % charset.length ]);
    });
    return result.join( '' );
}


export function login() {

  const nonce = randomString( 16 );

  setNonce( nonce );

  let lock = new Auth0Lock( auth0_client_id, auth0_domain, {
      rememberLastLogin: false,
      auth: {
        redirectUrl: auth0_redirectUrl,
        responseType: 'id_token',
        params: { 
            scope: 'openid email',
            nonce: nonce
        }
      }
  });

  lock.show();

}