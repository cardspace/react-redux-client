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
        description: emptyValue,
        url: emptyValue
    }
}

// todo: move the action handlers to separate functions

export function allCardsAddCardReducer( state=initialState, action ) {

    if ( action.type == "ADD_CARD_SUBMITTED" ) {

        return {  
            ...state,
            state: editState.submitted,
            data: {   
                title: { ...state.data.title, value: action.payload.title },
                description: { ...state.data.description, value: action.payload.description },
                url: { ...state.data.url, value: action.payload.url } 
            }
        };

    } else if ( action.type == 'CARD_CREATED' ) {
        return initialState;

    } else if ( action.type == 'ADD_CARD_ERROR' ) {

        return {
            ...state,
            data:{ 
                title: { ...state.data.title, error: action.payload.title || [] },
                description: { ...state.data.description, error: action.payload.description || [] },
                url: { ...state.data.url, error: action.payload.desription || [] }
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