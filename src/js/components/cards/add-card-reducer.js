import { addCardActions } from './add-card-action-types';

const emptyValue = {  
    value: "",
    errors: []
}

const initialState = {
    title: { ...emptyValue },
    text:  { ...emptyValue }
}


const resetState = ( state, action ) => {

    // make sure it is a new object just set to the initial values
    // so that the control thinks that the props have changed and
    // will clear any internal state.

    return { ...initialState }; 

}


let actions = {};

actions[ addCardActions.ADD_CARD_CANCEL ] = resetState;

actions[ addCardActions.ADD_CARD_BEFORE_SUBMIT ] = ( state, action ) => {

    return {  
        ...state,
        title: { ...state.title, value: action.payload.title },
        text: { ...state.text, value: action.payload.text }
    };
}

actions[ addCardActions.ADD_CARD_SUCCEEDED ] = resetState;

actions[ addCardActions.ADD_CARD_FAILED_VALIDATION ] = ( state, action ) => {

    return {
        ...state,
        title: { ...state.title, errors: action.payload.title || [] },
        text: { ...state.text, errors: action.payload.text || [] }
    }
}


export function addCardReducer( instance, state=initialState, action ) {

    if ( action.instance != instance ) return state;


    const reducerAction = actions[ action.type ];

    return reducerAction ? reducerAction( state, action ) : state;
}