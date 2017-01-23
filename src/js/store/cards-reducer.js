const initialState = {
    cards: []
}

export function cardsReducer( state=initialState, action ) {

    if ( action.type == 'CARDS_FETCHED' ) {

        return { ...state, cards: action.payload }
    } else {
        return state;
    }
}