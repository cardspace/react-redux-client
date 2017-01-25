import { allCardsActions, allCardsErrorMessages } from '../all-cards/all-cards-action-types';
import { errorActions } from '../../services/error-action-types';


function errorMessage( ) { return this; }

const unauthorisedError = errorMessage.bind( 'Authentication failed when applying the last action.' );
const internalServerError = ( action ) => { return `Internal server error id : [${action.id}]`; }
const unknownError = errorMessage.bind( 'An unanticipated error occured while executing the last action' );
const permissionError = errorMessage.bind( 'You were not authorised to apply the last action.' );
const allCardsEditCardFailedNotFound = errorMessage.bind( allCardsErrorMessages.EDIT_CARD_FAILED_NOT_FOUND );


var errorMessages = {}

errorMessages[ errorActions.UNAUTHORISED_ERROR ] = unauthorisedError;
errorMessages[ errorActions.INTERNAL_SERVER_ERROR ] = internalServerError;
errorMessages[ errorActions.UNKNOWN_ERROR ] = unknownError;
errorMessages[ errorActions.PERMISSION_ERROR ] = permissionError;
errorMessages[ allCardsActions.EDIT_CARD_FAILED_NOT_FOUND ] = allCardsEditCardFailedNotFound;

export const errorMessageTable = errorMessages;