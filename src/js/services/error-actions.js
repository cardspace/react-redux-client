import { logout } from './security-actions';
import { errorActions } from './error-action-types';

export function authenticationError() {
    return ( dispatch ) => {
        dispatch( logout() );
        dispatch( { type: errorAction.UNAUTHORISED_ERROR } );
    }
}

export function internalServerError( errorId ) {

    return { type: errorActions.INTERNAL_SERVER_ERROR, payload: errorId }
}

export function unknownError( ) {

    // improve: this should really accept the error and log it.
    
    return { type: errorActions.UNKNOWN_ERROR }
}

export function permissionError() {

    return { type: errorAction.PERMISSION_ERROR }
}


export function createValidationPayloadFromResponse( response, fields ) {

  const getField = ( fieldName, data ) => {

    if (  data
       && data.fieldErrors ) {

         return data.fieldErrors[ fieldName ];
    
    } else {
        return undefined;
    }

  }

  const getErrorMessages = ( field ) => {

    return ( field && field.errors )
         ? field.errors.map( error => error.message )
         : [];
  }

  var result = {};

  for ( var i=0; i < fields.length; i++ ) {
    result[ fields[ i ]] = getErrorMessages( getField( fields[ i ], response.data ) );
  }
  return result;
}