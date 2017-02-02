import axios from 'axios';
import { standardConfig, standardErrorResponse } from '../../services/http';
import { addCardActions } from './add-card-action-types';
import { cards_url, card_url } from 'config';
import { getStatusCodeFromResponse } from '../../services/response';
import { createValidationPayloadFromResponse } from '../../services/error-actions';



export function buildAddCardActions( instance, addCard_url ) {

    return {
        addCard: addCard.bind( null, instance, addCard_url ),
        cancelEdit: cancelAddCard.bind( null, instance )
    }    
}

export function addCard( instance, addCard_url, card ) {


  const addCardErrorAction = ( error ) => {

    var responseStatus 
          = getStatusCodeFromResponse( error.response );


    if ( responseStatus == 400 ) {
      
      return createCardValidationErrorFromResponse(
        error.response, 
        addCardActions.ADD_CARD_FAILED_VALIDATION,
        instance
      );

    } else {
      return standardErrorResponse( statusCode, error.response );

    }

  }



  return ( dispatch ) => {

    dispatch({ 
      type: addCardActions.ADD_CARD_BEFORE_SUBMIT,
      instance: instance,
      payload: card 
    });

    axios
      .post( addCard_url, card, standardConfig() )
      .then( response => 
        
          dispatch( { 
            type: addCardActions.ADD_CARD_SUCCEEDED,
            instance: instance
          })

       )
      .catch( error => dispatch( addCardErrorAction( error ) ) );
  }

}

export function cancelAddCard( instance ) {

  return { 
    type: addCardActions.ADD_CARD_CANCEL,
    instance: instance
  }

}



const cardFieldNames = [ 'title', 'text' ];

const createCardValidationErrorFromResponse = ( response, type, instance ) => {

  var payload 
        = createValidationPayloadFromResponse( response, cardFieldNames );

  return { 
    type,
    instance,
    payload
  }

}

