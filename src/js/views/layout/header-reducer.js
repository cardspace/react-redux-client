import { viewActionTypes } from '../view-action-types';

const initialState = {
    viewTitle: "",   
}

export function headerReducer( state=initialState, action ) {

    if ( action.type == viewActionTypes.CHANGED_VIEW ) {

        return { 
            ...state,
            viewTitle: action.payload.title
         }
         
    } else {
        return state;
    }
}