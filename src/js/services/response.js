

export function createInternalServerErrorFromResponse( response ) {

  return internalServerError( response.data.id );
}

export function getStatusCodeFromResponse( response ) {

  return ( response && response.status )
       ? response.status
       : -1;

}