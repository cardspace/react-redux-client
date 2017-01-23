import { hasIdToken } from '../services/authentication-store';

const initialState = {
    isLoggedIn: hasIdToken(),
}

export function securityReducer ( state=initialState, action ) {

    // clear any error messages from the previous actions
    const nextState = { ...state, errorMessage: "" };

    if ( action.type == 'USER_LOGGED_IN' ) {
        return { ...nextState, isLoggedIn: true }

    } else if ( action.type == 'USER_LOGGED_OUT' ) {
        return { ...nextState, isLoggedIn: false }

    } else {
        return state;
    }
}