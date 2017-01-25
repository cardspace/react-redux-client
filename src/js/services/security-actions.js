import { login } from './authentication';
import { clearIdToken, setIdToken } from './authentication-store';
import { browserHistory } from 'react-router';
import { securityActions } from './security-action-types';

export function displayLoginForm() {
    login();
}

export function authenticated( id_token ) {
    return ( dispatch ) => {
        setIdToken( id_token );
        dispatch({ type: securityActions.USER_LOGGED_IN });
    }
}

export function logout() {
    return ( dispatch ) => {
        clearIdToken();
        dispatch( { type: securityActions.USER_LOGGED_OUT } );
        browserHistory.push( '/' );
    }
}
