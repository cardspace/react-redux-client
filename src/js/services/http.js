import { getIdToken } from './authentication-store';
import { authenticationError, permissionError, unknownError } from './error-actions';
import { createInternalServerErrorFromResponse } from './response';

export const bearerIdentityToken = () => {
    return `Bearer ${getIdToken()}`;    
}

export function standardConfig() {

    return {
        headers: { 'Authorization': bearerIdentityToken()  }
    };
}


export function standardErrorResponse ( statusCode, response ) {

    if ( statusCode == 401 ) {
        return authenticationError()
    
    } else if ( statusCode = 403 ) {
        return permissionError();

    } else if ( statusCode >= 500 ) {
        return createInternalServerErrorFromResponse( response );

    } else {
        return unknownError();

    }

}


