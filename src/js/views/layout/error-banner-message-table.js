import { errorActions } from '../../services/error-action-types';


function errorMessage( ) { return this; }


var errorMessages = {}

errorMessages[ errorActions.UNAUTHORISED_ERROR ] 
    = errorMessage.bind( 'Authentication failed when applying the last action.' );

errorMessages[ errorActions.INTERNAL_SERVER_ERROR ] 
    = ( action ) => { return `Internal server error id : [${action.id}]`; }

errorMessages[ errorActions.UNKNOWN_ERROR ] 
    = errorMessage.bind( 'An unanticipated error occured while executing the last action' );

errorMessages[ errorActions.PERMISSION_ERROR ] 
    = errorMessage.bind( 'You were not authorised to apply the last action.' );



export const errorMessageTable = errorMessages;