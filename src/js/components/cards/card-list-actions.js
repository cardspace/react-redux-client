import axios from 'axios';
import { standardConfig, standardErrorResponse } from '../../services/http';
import { cardListActions } from './card-list-action-types';
import { cards_url, card_url } from 'config';
import { getStatusCodeFromResponse } from '../../services/response';
import { createValidationPayloadFromResponse } from '../../services/error-actions';

import { browserHistory } from 'react-router'



export function buildCardListActions( instance, cards_url, getInstanceState ) {

    var load = loadCards.bind( null, instance, cards_url, getInstanceState )

    return {
        loadCards: load,
        changeFilter: changeFilter.bind( null, instance, load ),
        editCard: editCard.bind( null, instance ),
        cancelEdit: cancelEdit.bind( null, instance ),
        updateCard: updateCard.bind( null, instance, load ),
        markCardAsComplete: markCardAsComplete.bind( null, instance, load ),
        markCardAsActive: markCardAsActive.bind( null, instance, load ),
        deleteCard: deleteCard.bind( null, instance, load )
    }    
}

export function loadCards( instance, cards_url, getInstanceState ) {

  // get state should give you the current state for this list

  return ( dispatch, getState ) => {


    const { filterState } =  getInstanceState( getState() );

    axios
      .get( `${cards_url}?status=${filterState}`, standardConfig() )
      .then( response => 

            dispatch( { 
                type: cardListActions.CARDS_FETCHED, 
                instance: instance,  
                payload: response.data 
            }) 

       )
      .catch( error => { 

        var statusCode = getStatusCodeFromResponse( error.response );

        dispatch( standardErrorResponse( statusCode, error.response ) );

      });
  }
}

export function changeFilter( instance, loadCards, filter ) {

  return ( dispatch ) => {
    dispatch( { type: cardListActions.CARDS_FILTER_CHANGED, instance: instance, payload: filter  } );
    dispatch( loadCards() );
  }

}

export function editCard( instance, cardId ) {

    return { 
        type: cardListActions.EDIT_CARD, 
        instance: instance,
        payload: cardId 
    }

}

export function cancelEdit( instance, cardId ) {

    return { 
        type: cardListActions.EDIT_CARD_CANCELED, 
        instance: instance,
        payload: cardId 
    }

}

export function updateCard( instance, loadCards, card ) {

    const getUpdateErrorAction = ( error ) => {

        var responseStatus = getStatusCodeFromResponse( error.response );

        if ( responseStatus == 400 ) {

            return createValidationErrorFromResponse( 
                error.response, 
                cardListActions.EDIT_CARD_FAILED_VALIDATION,
                instance 
            );

        } else if ( responseStatus == 404 ) {
        
            return { 
                type: cardListActions.EDIT_CARD_FAILED_NOT_FOUND, 
                instance: instance,
                payload: card
            }

        } else {
            return standardErrorResponse( responseStatus, error.response );
        }
    }



    return ( dispatch ) => {

        dispatch({ 
            type: cardListActions.EDIT_CARD_BEFORE_SUBMIT,
            instance: instance, 
            payload: card
        });

        axios
          .put( `${card_url}/${card.id}`, card, standardConfig() )
          .then( response => 
            
                dispatch( { 
                    type: cardListActions.EDIT_CARD_SUCCEEDED, 
                    instance: instance,
                    payload: card
                }) 

          )
          .then( () => dispatch( loadCards() ) )
          .catch( error => dispatch( getUpdateErrorAction( error ) ) );

    }
}

export function markCardAsComplete( instance, loadCards, cardId ) {

    const getMarkAsCompletErrorAction = ( error ) => {

        var responseStatus = getStatusCodeFromResponse( error.response );

        if ( responseStatus == 404 ) {

            return { 
                type: cardListActions.CARD_COMPLETE_FAILED_NOT_FOUND,
                instance: instance,
                payload: cardId 
            }

        } else {
            return standardErrorResponse( responseStatus, error.response );

        }
    }



    return ( dispatch ) => {

        axios
            .put( `${card_url}/${cardId}/completed`, {}, standardConfig() )
            .then( response => 
            
                dispatch( { 
                    type: cardListActions.CARD_COMPLETE_SUCCEEDED, 
                    instance: instance,
                    payload: cardId 
                })

            )
            .then( () => dispatch( loadCards() ) )
            .catch( error => dispatch( getMarkAsCompletErrorAction( error ) ) );

    }
}

export function markCardAsActive( instance, loadCards, cardId ) {

    const getMarkAsActiveErrorAction = ( error ) => {

        var responseStatus = getStatusCodeFromResponse( error.response );

        if ( responseStatus == 404 ) {

            return { 
                type: cardListActions.CARD_ACTIVATED_FAILED_NOT_FOUND,
                instance: instance,
                payload: cardId 
            }
        
        } else {
            return standardErrorResponse( responseStatus, error.response );
        }

    }



    return ( dispatch ) => {

        axios
            .put( `${card_url}/${cardId}/activate`, {}, standardConfig() )
            .then( response => 
            
                dispatch( { 
                    type: cardListActions.CARD_ACTIVATE_SUCCEEDED, 
                    instance: instance,
                    payload: cardId 
                })

            )
            .then( () => dispatch( loadCards() ) )
            .catch( error => dispatch( getMarkAsActiveErrorAction( error ) ) );
        
    }
}

export function deleteCard( instance, loadCards, cardId ) {

    const cardDeleted = ( cardId ) => {

        return ( dispatch ) => {

            dispatch( { 
                type: cardListActions.DELETE_CARD_SUCCEEDED, 
                instance: instance,
                payload: cardId 
            } );

            dispatch( loadCards() );
        }
    }

    const getDeleteErrorAction = ( error ) => {

        var responseStatus = getStatusCodeFromResponse( error.response );

        if ( responseStatus == 404 ) {
            // 404 Not found, so just treat it like the card was deleted
            return cardDeleted( cardId );
        
        } else { 
            return standardErrorResponse( responseStatus, error.response );

        }

    }



    return ( dispatch ) => {

        axios
        .delete( `${card_url}/${cardId}`, standardConfig() )
        .then( response => dispatch( cardDeleted( cardId ) ) )
        .catch( error => dispatch( getDeleteErrorAction( error ) ) );

    }
}

const cardFieldNames = [ 'title', 'text' ];

const createValidationErrorFromResponse = ( response, type, instance ) => {

  var payload 
        = createValidationPayloadFromResponse( response, cardFieldNames );

  return { 
    type,
    instance,
    payload
  }

}
