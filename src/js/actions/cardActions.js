import axios from 'axios';

import { getIdToken, hasIdToken } from '../services/authentication-store';

export function addCard( card ) {
  return ( dispatch ) => {

    dispatch(  { type: "ADD_CARD_SUBMITTED", payload: card } );

    const config = {
      headers: { 'Authorization': `Bearer ${getIdToken()}` }
    };

    axios
      .post( 'https://cardspace-api-dev.herokuapp.com/v1/cards', card, config )
      .then( response => dispatch( { type: 'CARD_CREATED' } ) )
      .catch( error => { 

        if ( error.response.status == 400 ) {
          dispatch( createAddCardErrorFromResponse( error.response )    )
        
        } else if ( error.response <= 500 ) {
          dispatch( createAddCardinternalServerError() );

        } else {
          dispatch( createAddCardUnknownErrorError() );
        }

      });

    // if no id token we have a problem ???

    // dispatch adding card
    // post card to the api
    // then  - 201, 400, 500
    // catch - ( ? ) 

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

const createAddCardinternalServerError = () => {

  return { type: 'ADD_CARD_INTERNAL_SERVER_ERROR' };
}

const createAddCardUnknownErrorError = () => {

  return { type: 'ADD_CARD_UNKNOWN_ERROR' }
}