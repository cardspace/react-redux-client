import axios from 'axios';

import { getIdToken, hasIdToken } from '../services/authentication-store';
import { authenticationError, internalServerError, unknownError } from './errorActions';

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
        
        } else if ( responseStatus <= 500 ) {
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

const createInternalServerErrorFromResponse = ( response ) => {

  return internalServerError( response.data.id );
}

const getStatusCodeFromResponse = ( response ) => {

  return ( response && response.status )
       ? response.status
       : -1;

}