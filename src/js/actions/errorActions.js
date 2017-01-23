import { logout } from './securityActions';

export function authenticationError() {
    return ( dispatch ) => {
        dispatch( logout() );
        dispatch( { type: 'UNAUTHORISED_ERROR' } );
    }
}

export function internalServerError( errorId ) {

    return { type: 'INTERNAL_SERVER_ERROR', payload: errorId }
}

export function unknownError( ) {

    // improve: this should really accept the error and log it.
    
    return { type: 'UNKNOWN_ERROR' }
}