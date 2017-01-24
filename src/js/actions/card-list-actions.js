import axios from 'axios';

import { getIdToken, hasIdToken } from '../services/authentication-store';
import { createValidationPayloadFromResponse, authenticationError, internalServerError, permissionError, unknownError } from './error-actions';

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
          dispatch( createCardValidationErrorFromResponse( error.response, 'ADD_CARD_ERROR' ) );

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

export function editCardInCardList( cardId ) {

    return { type: 'EDIT_CARD_IN_CARD_LIST', payload: cardId }

}

export function cancelEditCardInCardList( cardId ) {

    return { type: 'CANCEL_EDIT_CARD_IN_CARD_LIST', payload: cardId }
}

export function updateCard( card ) {
  return ( dispatch ) => {

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
          dispatch( createCardValidationErrorFromResponse( error.response, 'UPDATE_CARD_ERROR' ) );

        } else if ( responseStatus == 401 ) {
          dispatch( authenticationError() );

        } else if ( responseStatus == 403 ) {
          dispatch( permissionError() );

        } else if ( responseStatus == 404 ) {
          dispatch( { type: 'CARD_UPDATE_CARD_NOT_FOUND', payload: card } )

        } else {
          dispatch( unknownError() );
  
        }
      });    

  }  
}

export function deleteCard( cardId ) {

  // Ations that should be dispatched if the card is considered
  // delete, Note if there is a 404 ( Not Found ) response it
  // is considered that the card has been deleted.
  const cardDeleted = ( cardId ) => {
    return ( dispatch ) => {
      dispatch( { type: 'CARD_DELETED', payload: cardId } );
      dispatch( loadAllCardsForCurrentUser() );
    }
  }


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


export function loadAllCardsForCurrentUser () {

  return ( dispatch ) => {

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


const cardFieldNames = [ 'title', 'description', 'url' ];

const createCardValidationErrorFromResponse = ( response, type ) => {

  var payload 
        = createValidationPayloadFromResponse( response, cardFieldNames );

  return { 
    type,
    payload
  }

}

const createInternalServerErrorFromResponse = ( response ) => {

  return internalServerError( response.data.id );
}

const getStatusCodeFromResponse = ( response ) => {

  return ( response && response.status )
       ? response.status
       : -1;

}