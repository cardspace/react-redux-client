import { spacesListActions } from './spaces-list-action-type';

const emptyField = {
    value: '',
    errors: []
}

const initialState = {
    title: emptyField,
    text: emptyField
}



let actions = {}


actions[ spacesListActions.ADD_SPACE_BEFORE_SUBMIT  ] = ( state, action ) => {

    return {
        title: { ...state.title, value: action.payload.title },
        text: { ...state.text, value: action.payload.text }
    }

}

actions[ spacesListActions.ADD_SPACE_SUCCEEDED ] = ( state, action ) => {

    // Always return a new object so that React believes that 
    // the state has changed and will tell the component to 
    // refresh itself ( The component stores local state ).

    return { ...initialState }

}

actions[ spacesListActions.ADD_SPACE_SUCCEEDED ] = ( state, action ) => {

    return { ...initialState }

}

actions[ spacesListActions.ADD_SPACE_FAILED_VALIDATION ] = ( state, action ) => {
    
    return {
        title: { ...state.title, errors: action.payload.title || [] },
        text: { ...state.text, errors: action.payload.text || [] }
    }
}

actions[ spacesListActions.ADD_SPACE_CANCEL ] = ( state, action ) => {
    
    return { ...initialState }
}


export function spacesAddReducer( state=initialState, action ) {

    var reducer = actions[ action.type ];

    return reducer ? reducer( state, action ) : state;
}