import { allCardsActions } from './all-cards-action-types';

const editState = {
    editing: 'editing',
    submitted: 'submitted'
}

const emptyValue = {  
    value: "",
    error: []
}

const initialState = {
    state: editState.editing,
    data: {
        title: emptyValue,
        text: emptyValue
    }
}

// todo: move the action handlers to separate functions

export function allCardsAddCardReducer( state=initialState, action ) {

    if ( action.type == allCardsActions.ADD_CARD_BEFORE_SUBMIT ) {


        return {  
            ...state,
            state: editState.submitted,
            data: {   
                title: { ...state.data.title, value: action.payload.title },
                text: { ...state.data.text, value: action.payload.text }
            }
        };

    } else if ( action.type == allCardsActions.ADD_CARD_SUCCEEDED ) {
        return initialState;

    } else if ( action.type == allCardsActions.ADD_CARD_FAILED_VALIDATION ) {

        return {
            ...state,
            data:{ 
                title: { ...state.data.title, error: action.payload.title || [] },
                text: { ...state.data.text, error: action.payload.text || [] }
            }        
        }

    } else  {
        return state;
    }

}

const getFieldError = ( field ) => {

    return (field && field.error ) 
         ? field.error
         : ""
}