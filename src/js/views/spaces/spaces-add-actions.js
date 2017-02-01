import axios from 'axios';
import { getIdToken } from '../../services/authentication-store';
import { spacesListActions } from './spaces-list-action-type';
import { loadAllSpacesForCurrentUser } from './spaces-list-actions';
import { spaces_url, space_url } from 'config';
import { createInternalServerErrorFromResponse, getStatusCodeFromResponse } from '../../services/response';
import { createValidationPayloadFromResponse, authenticationError, internalServerError, permissionError, unknownError } from '../../services/error-actions';


export function addSpace( space ) {

    return ( dispatch ) => {

        dispatch( { type: spacesListActions.ADD_SPACE_BEFORE_SUBMIT, payload: space } );

        const config = {
        headers: { 'Authorization': `Bearer ${getIdToken()}` }
        };

        axios
        .post( spaces_url, space, config )
        .then( response => dispatch( { type: spacesListActions.ADD_SPACE_SUCCEEDED } ) )
        .then( () => dispatch( loadAllSpacesForCurrentUser() ) )
        .catch( error => { 

            var responseStatus = getStatusCodeFromResponse( error.response );


            if ( responseStatus == 400 ) {
                dispatch( createSpaceValidationErrorFromResponse( error.response, spacesListActions.ADD_SPACE_FAILED_VALIDATION ) );

            } else if ( responseStatus == 401 ) {
                dispatch( authenticationError() );

            } else if ( responseStatus >= 500 ) {
                dispatch( createInternalServerErrorFromResponse( error.response ) );

            } else {
                dispatch( unknownError() );
            }

        });

    }
}

export function cancelAdd() {
    return { type: spacesListActions.ADD_SPACE_CANCEL }    
}

const spaceFieldNames = [ 'title', 'text' ];

const createSpaceValidationErrorFromResponse = ( response, type ) => {

  var payload 
        = createValidationPayloadFromResponse( response, spaceFieldNames );

  return { 
    type,
    payload
  }

}

