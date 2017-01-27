import axios from 'axios';
import { cards_url, card_url } from 'config';
import { getIdToken, hasIdToken } from '../../services/authentication-store';
import { createValidationPayloadFromResponse, authenticationError, internalServerError, permissionError, unknownError } from '../../services/error-actions';
import { allCardsActions } from './all-cards-action-types';


export function addCard( card ) {
  return ( dispatch ) => {

    dispatch(  { type: allCardsActions.ADD_CARD_BEFORE_SUBMIT, payload: card } );

    const config = {
      headers: { 'Authorization': `Bearer ${getIdToken()}` }
    };

    axios
      .post( cards_url, card, config )
      .then( response => dispatch( { type: allCardsActions.ADD_CARD_SUCCEEDED } ) )
      .then( () => dispatch( loadAllCardsForCurrentUser() ) )
      .catch( error => { 

        var responseStatus = getStatusCodeFromResponse( error.response );

        if ( responseStatus == 400 ) {
          dispatch( createCardValidationErrorFromResponse( error.response, allCardsActions.ADD_CARD_FAILED_VALIDATION ) );

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

    return { type: allCardsActions.EDIT_CARD, payload: cardId }

}

export function cancelEditCardInCardList( cardId ) {

    return { type: allCardsActions.EDIT_CARD_CANCELED, payload: cardId }
}

export function updateCard( card ) {
  return ( dispatch ) => {

    dispatch(  { type: allCardsActions.EDIT_CARD_BEFORE_SUBMIT, payload: card } );

    const config = {
      headers: { 'Authorization': `Bearer ${getIdToken()}` }
    };

    axios
      .put( `${card_url}/${card.id}`, card, config )
      .then( response => dispatch( { type: allCardsActions.EDIT_CARD_SUCCEEDED } ) )
      .then( () => dispatch( loadAllCardsForCurrentUser() ) )
      .catch( error => { 

        var responseStatus = getStatusCodeFromResponse( error.response );

        if ( responseStatus == 400 ) {
          dispatch( createCardValidationErrorFromResponse( error.response, allCardsActions.EDIT_CARD_FAILED_VALIDATION ) );

        } else if ( responseStatus == 401 ) {
          dispatch( authenticationError() );

        } else if ( responseStatus == 403 ) {
          dispatch( permissionError() );

        } else if ( responseStatus == 404 ) {
          dispatch( { type: allCardsActions.EDIT_CARD_FAILED_NOT_FOUND, payload: card } )

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
      dispatch( { type: allCardsActions.DELETE_CARD_SUCCEEDED, payload: cardId } );
      dispatch( loadAllCardsForCurrentUser() );
    }
  }


  return ( dispatch ) => {

    dispatch(  { type: allCardsActions.DELETE_CARD_BEFORE_SUBMIT, payload: cardId } );

    const config = {
      headers: { 'Authorization': `Bearer ${getIdToken()}` }
    };

    axios
      .delete( `${card_url}/${cardId}`, config )
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
      .get( cards_url, config )
      .then( response => dispatch( { type: allCardsActions.CARDS_FETCHED, payload: response.data  } ) )
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