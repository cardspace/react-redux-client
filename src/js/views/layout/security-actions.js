import { login } from '../../services/authentication';
import { clearIdToken, setIdToken } from '../../services/authentication-store';
import { browserHistory } from 'react-router';

export function displayLoginForm() {
    login();
}

export function authenticated( id_token ) {
    return ( dispatch ) => {
        setIdToken( id_token );
        dispatch({ type: 'USER_LOGGED_IN' });
    }
}

export function logout() {
    return ( dispatch ) => {
        clearIdToken();
        dispatch( { type: 'USER_LOGGED_OUT' } );
        browserHistory.push( '/' );
    }
}
