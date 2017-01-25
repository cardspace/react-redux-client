import { hasIdToken } from './authentication-store';
import { securityActions } from './security-action-types';

const initialState = {
    isLoggedIn: hasIdToken(),
}

export function securityReducer ( state=initialState, action ) {

    // clear any error messages from the previous actions
    const nextState = { ...state, errorMessage: "" };

    if ( action.type == securityActions.USER_LOGGED_IN ) {
        return { ...nextState, isLoggedIn: true }

    } else if ( action.type == securityActions.USER_LOGGED_OUT ) {
        return { ...nextState, isLoggedIn: false }

    } else {
        return state;
    }
}