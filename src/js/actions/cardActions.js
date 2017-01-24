import axios from 'axios';

import { getIdToken, hasIdToken } from '../services/authentication-store';
import { authenticationError, internalServerError, permissionError, unknownError } from './errorActions';

export function addCard( card ) {
  return ( dispatch ) => {

    dispatch(  { type: "ADD_CARD_SUBMITTED", payload: card } );

    const config = {
      headers: { 'Authorization': `Bearer ${getIdToken()}` }
    };

    axios
      .post( 'https://cardspace-api-dev.herokuapp.com/v1/cards', card, config )
      .then( response => dispatch( { type: 'CARD_CREATED' } ) )
      .then( () => dispatch( loadAllCardsForCurrentUser() ) )
      .catch( error => { 

        var responseStatus = getStatusCodeFromResponse( error.response );

        if ( responseStatus == 400 ) {
          dispatch( createAddCardErrorFromResponse( error.response ) )

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

export function updateCard( card ) {
  return ( dispatch ) => {

    console.log( 'updateCard' );

    dispatch(  { type: "UPDATE_CARD_SUBMITTED", payload: card } );

    const config = {
      headers: { 'Authorization': `Bearer ${getIdToken()}` }
    };

    axios
      .put( `https://cardspace-api-dev.herokuapp.com/v1/card/${card.id}`, card, config )
      .then( response => dispatch( { type: 'CARD_UPDATED' } ) )
      .then( () => dispatch( loadAllCardsForCurrentUser() ) )
      .catch( error => { 

        var responseStatus = getStatusCodeFromResponse( error.response );

        if ( responseStatus == 400 ) {
          dispatch( createEditCardErrorFromResponse( error.response ) );

        } else if ( responseStatus == 401 ) {
          dispatch( authenticationError() );

        } else if ( responseStatus == 403 ) {
          dispatch( permissionError() );

        } else if ( responseStatus == 404 ) {
          dispatch( { type: 'CARD_UPDATE_CARD_NOT_FOUND', payload: card } )

        } else {
          dispatch( unknownError() );
  
        }


/*


        } else if ( responseStatus == 401 ) {
          dispatch( authenticationError() );
        
        } else if ( responseStatus >= 500 ) {
          dispatch( createInternalServerErrorFromResponse( error.response ) );

        } else {
          dispatch( unknownError() );
        }
*/
      });    

  }  
}

export function deleteCard( cardId ) {
  return ( dispatch ) => {

    dispatch(  { type: "DELETE_CARD_SUBMITTED", payload: cardId } );

    const config = {
      headers: { 'Authorization': `Bearer ${getIdToken()}` }
    };

    axios
      .delete( `https://cardspace-api-dev.herokuapp.com/v1/card/${cardId}`, config )
      .then( response => dispatch( cardDeleted( cardId ) ) )
      .catch( error => { 

        var responseStatus = getStatusCodeFromResponse( error.response );

        if ( responseStatus == 401 ) {
          dispatch( authenticationError() );

        } else if ( responseStatus == 403 ) {
          dispatch( permissionError() );

        } else if ( responseStatus == 404 ) {
          // 404 Not found, so just treat it like the card was deleted
          dispatch( cardDeleted( cardId ) );

        } else if ( responseStatus >= 500 ) {
          dispatch( createInternalServerErrorFromResponse( error.response ) );

        } else {
          dispatch( unknownError() );
        }

      });
  }

}

function cardDeleted ( cardId ) {
  return ( dispatch ) => {
    dispatch( { type: 'CARD_DELETED', payload: cardId } );
    dispatch( loadAllCardsForCurrentUser() );
  }
}

export function loadAllCardsForCurrentUser () {

  return ( dispatch ) => {
    console.log( 'loadAllCardsForCurrentUser' );


    const config = {
      headers: { 'Authorization': `Bearer ${getIdToken()}` }
    };

    axios
      .get( 'https://cardspace-api-dev.herokuapp.com/v1/cards', config )
      .then( response => dispatch( { type: 'CARDS_FETCHED', payload: response.data  } ) )
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


const createAddCardErrorFromResponse = ( response ) => {

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


  return { 
    type: 'ADD_CARD_ERROR',
    payload: {
      description: getErrorMessages( getField( 'description', response.data ) ),
      title: getErrorMessages( getField( 'title', response.data ) ),
      url: getErrorMessages( getField( 'url', response.data ) )
    }
  };

}

const createEditCardErrorFromResponse = ( response ) => {

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


  return { 
    type: 'UPDATE_CARD_ERROR',
    payload: {
      description: getErrorMessages( getField( 'description', response.data ) ),
      title: getErrorMessages( getField( 'title', response.data ) ),
      url: getErrorMessages( getField( 'url', response.data ) )
    }
  };

}


const createInternalServerErrorFromResponse = ( response ) => {

  return internalServerError( response.data.id );
}

const getStatusCodeFromResponse = ( response ) => {

  return ( response && response.status )
       ? response.status
       : -1;

}