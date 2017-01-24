const editState = {
    editing: 'editing',
    submitted: 'submitted'
}

const emptyValue = {  
    value: "",
    error: []
}

const initialCardEditState = {
    state: editState.editing,
    data: {
        id : '',
        title: emptyValue,
        description: emptyValue,
        url: emptyValue
    }
}

const initialState = {
    cards: [],
    cardEditState: initialCardEditState
}

export function cardsReducer( state=initialState, action ) {

    if ( action.type == 'CARDS_FETCHED' ) {
        return { ...state, cards: action.payload }

    } else if ( action.type == 'EDIT_CARD_IN_CARD_LIST' ) {
        let card = state.cards.find( c => c.id == action.payload );

        let editState = { };
        if ( card ) {

            let editState= {
                state: editState,
                data: {
                    id: card.id,
                    title: createFieldValue( card.title ),
                    description: createFieldValue( card.description ),
                    url: createFieldValue( card.url )
                }
            }
            return { ...state,  cardEditState: editState };

        } else {
            return state
        }

    } else if ( action.type == 'CARD_UPDATED' ) {
        const nextState = {
            cards: state.cards,
            cardEditState: initialCardEditState
        }

        return nextState;

    } else if ( action.type == 'CARD_UPDATE_CARD_NOT_FOUND' ) {

        let card = action.payload;

        let editState = {
            state: editState,
            data: {
                id: card.id,
                title: createFieldValue( card.title ),
                description: createFieldValue( card.description ),
                url: createFieldValue( card.url )
            }
        }
        return { ...state,  cardEditState: editState };

    } else if ( action.type == 'CANCEL_EDIT_CARD_IN_CARD_LIST' ) {  

        return { ...state, cardEditState: initialCardEditState };

    } else {
        return state;
    }
}

const createFieldValue = ( value ) => {
    return { 
        value: value,
        error: []
    }
}