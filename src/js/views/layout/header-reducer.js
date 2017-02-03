
const initialState = {
    pageTitle: "",   
}

export function headerReducer( state=initialState, action ) {

    if ( action.type == 'PAGE_CHANGE' ) {

        return { 
            ...state,
            pageTitle: action.payload
         }
         
    } else {
        return state;
    }
}