const initialState = {
    errorMessages: []
}

export function bannerReducer( state=initialState, action  ) {
    
    // clear any error messages from the previous actions
    const nextState = { ...state, errorMessages: [] };

    if ( action.type == 'UNAUTHORISED_ERROR' ) { 
        return { ...nextState, errorMessages: [  'Authentication failed when applying the last action.' ] }

    } else if ( action.type == 'INTERNAL_SERVER_ERROR' ) {
        return { ...nextState, errorMessages: [ `Internal server error id : [${action.id}]` ] }

    } else if ( action.type == 'UNKNOWN_ERROR' ) {
        return { ...nextState, errorMessages: [ 'An unanticipated error occured while executing the last action' ] }

    } else if ( action.type == 'PERMISSION_ERROR' )  {      
        return { ...nextState, errorMessages: [ 'You were not authorised to apply the last action.' ] }

    } else if ( action.type == 'CARD_UPDATE_CARD_NOT_FOUND' ) {
        return { ...nextState, errorMessages: ['This card has been deleted while you were editing it.'] }

    } else {
        return nextState;
    }
}