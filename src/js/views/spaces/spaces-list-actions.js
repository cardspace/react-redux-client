import axios from 'axios';
import { standardConfig, standardErrorResponse } from '../../services/http';
import { getIdToken } from '../../services/authentication-store';
import { spacesListActions } from './spaces-list-action-type';
import { spaces_url, space_url } from 'config';
import { createInternalServerErrorFromResponse, getStatusCodeFromResponse } from '../../services/response';
import { createValidationPayloadFromResponse, authenticationError, internalServerError, permissionError, unknownError } from '../../services/error-actions';




export function loadAllSpacesForCurrentUser () {

    return ( dispatch ) => {

        const config = {
            headers: { 'Authorization': `Bearer ${ getIdToken() }` }
        }

        axios
            .get( `${ spaces_url }`, config )
            .then( response => dispatch( { type: spacesListActions.SPACES_FETCHED, payload: response.data } ) )
            .catch( error => {

                var responseStatus = getStatusCodeFromResponse( error.response );

                if ( responseStatus == 401 ) {
                    dispatch( authenticationError() );
                
                } else if ( responseStatus >= 500 ) {
                    dispatch( createInternalServerErrorFromResponse( error.response ) );

                } else {
                    dispatch( unknownError() );

                }

             });

    }

}

export function editSpace( spaceId ) {

    return { type: spacesListActions.EDIT_SPACE, payload: spaceId }
}

export function updateSpace( space ) {

    return ( dispatch ) => {

        dispatch( { type: spacesListActions.EDIT_SPACE_BEFORE_SUBMIT, payload: space } );

        const config = {
            headers: { 'Authorization': `Bearer ${getIdToken()}` }
        };

        axios
          .put( `${space_url}/${space.id}`, space, config )
          .then( response => dispatch( { type: spacesListActions.EDIT_SPACE_SUCCEEDED, payload: space } ) )
          .then( () => dispatch( loadAllSpacesForCurrentUser() ) )
          .catch( error => {

              var responseStatus = getStatusCodeFromResponse( error.response );

              if ( responseStatus == 400 ) {
                dispatch( createSpaceValidationErrorFromResponse( error.response, spacesListActions.EDIT_SPACE_FAILED_VALIDATION ) );

              } else if ( responseStatus == 401 ) {
                dispatch( authenticationError() );

              } else if ( responseStatus == 403 ) {
                dispatch( permissionError() );

              } else if ( responseStatus == 404 ) {
                dispatch( { type: spacesListActions.EDIT_SPACE_FAILED_NOT_FOUND, payload: space } )

              } else {
                dispatch( unknownError() );

              }

          } );

    }
}

export function cancelEdit( ) {

    return { type: spacesListActions.EDIT_SPACE_CANCELED }
}


export function deleteSpace( spaceId ) {

    return ( dispatch ) => {

        const spaceDeleted = ( spaceId ) => {
            return ( dispatch ) => {
                dispatch( { type: spacesListActions.DELETE_SPACE_SUCCEEDED, payload: spaceId } );
                dispatch(  loadAllSpacesForCurrentUser() );
            }
        }

        const config = {
            headers: { 'Authorization': `Bearer ${getIdToken()}` }
        };

        axios
        .delete(  `${space_url}/${spaceId}`, config )
        .then( response => dispatch(  spaceDeleted( spaceId ) ) )
        .catch( error => {

            var responseStatus = getStatusCodeFromResponse( error.response );

            if ( responseStatus == 401 ) {
                dispatch( authenticationError() );

            } else if ( responseStatus == 403 ) {
                dispatch( permissionError() );

            } else if ( responseStatus == 404 ) {
                // 404 Not found, so just treat it like the card was deleted
                dispatch( cardDeleted( spaceId ) );

            } else if ( responseStatus >= 500 ) {
                dispatch( createInternalServerErrorFromResponse( error.response ) );

            } else {
                dispatch( unknownError() );
            }

        });
    }
}


export function markSpaceAsActive( spaceId ) {

   const getMarkAsActiveErrorAction = ( error ) => {

        var responseStatus = getStatusCodeFromResponse( error.response );

        if ( responseStatus == 404 ) {

            return { 
                type: spacesListActions.SPACE_ACTIVATED_FAILED_NOT_FOUND,
                payload: spaceId 
            }
        
        } else {
            return standardErrorResponse( responseStatus, error.response );
        }

    }



    return ( dispatch ) => {

        axios
            .put( `${space_url}/${spaceId}/activate`, {}, standardConfig() )
            .then( response => 
            
                dispatch( { 
                    type: spacesListActions.SPACE_ACTIVATE_SUCCEEDED, 
                    payload: spaceId 
                })

            )
            .then( () => dispatch( loadAllSpacesForCurrentUser() ) )
            .catch( error => dispatch( getMarkAsActiveErrorAction( error ) ) );
       
    }
}


export function markSpaceAsComplete( spaceId ) {

    const getMarkAsCompletErrorAction = ( error ) => {

        var responseStatus = getStatusCodeFromResponse( error.response );

        if ( responseStatus == 404 ) {

            return { 
                type: spacesListActions.SPACE_COMPLETE_FAILED_NOT_FOUND,
                payload: spaceId 
            }

        } else {
            return standardErrorResponse( responseStatus, error.response );

        }
    }



    return ( dispatch ) => {

        axios
            .put( `${space_url}/${spaceId}/completed`, {}, standardConfig() )
            .then( response => 
            
                dispatch( { 
                    type: spacesListActions.SPACE_COMPLETE_SUCCEEDED, 
                    payload: spaceId 
                })

            )
            .then( () => dispatch( loadCards() ) )
            .catch( error => dispatch( getMarkAsCompletErrorAction( error ) ) );

    }
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

