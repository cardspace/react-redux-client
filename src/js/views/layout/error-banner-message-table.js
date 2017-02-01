import { allCardsActions, allCardsErrorMessages } from '../all-cards/all-cards-action-types';
import { spacesListActions, spacesListErrorMessages } from '../spaces/spaces-list-action-type';
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

errorMessages[ allCardsActions.EDIT_CARD_FAILED_NOT_FOUND ] 
    = errorMessage.bind( allCardsErrorMessages.EDIT_CARD_FAILED_NOT_FOUND );

errorMessages[ allCardsActions.CARD_COMPLETE_FAILED_NOT_FOUND ]
    = errorMessage.bind( allCardsErrorMessages.CARD_COMPLETE_FAILED_NOT_FOUND );

errorMessages[ allCardsActions.CARD_ACTIVATE_FAILED_NOT_FOUND ]
    = errorMessage.bind( allCardsErrorMessages.CARD_ACTIVATE_FAILED_NOT_FOUND );

errorMessages[  spacesListActions.EDIT_SPACE_FAILED_NOT_FOUND ]
    = errorMessage.bind( spacesListErrorMessages.EDIT_SPACE_FAILED_NOT_FOUND );


export const errorMessageTable = errorMessages;