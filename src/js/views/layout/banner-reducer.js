import { errorMessageTable } from './error-banner-message-table';

const initialState = {
    errorMessages: []
}


export function bannerReducer( state=initialState, action  ) {

    // clear any error messages from the previous actions
    const nextState = { ...state, errorMessages: [] };

    const message = errorMessageTable[ action.type ];

    if ( message ) {
        return { ...nextState, errorMessages: [ message( action ) ] };
    
    } else {
        return nextState;
    }
}


