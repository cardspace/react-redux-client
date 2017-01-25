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

export function allCardsCardListReducer( state=initialState, action ) {

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

    } else if ( action.type == 'UPDATE_CARD_SUBMITTED' ) {

        console.log( action );

        // Make the edit state reflect what has been submitted for update.
        // The update is included as the action payload.

        return {
            ...state,
            cardEditState: {
                state: editState.editing,
                data: {
                    id: action.payload.id,
                    title: createFieldValue( action.payload.title ),
                    description: createFieldValue( action.payload.description ),
                    url: createFieldValue( action.payload.url )
                }
            }
        }

    } else if ( action.type == 'CARD_UPDATED' ) {
        const nextState = {
            cards: state.cards,
            cardEditState: initialCardEditState
        }

        return nextState;

    } else if ( action.type == 'UPDATE_CARD_ERROR' ) {

        // record the errors in the edit state

        return {
            ...state,
            cardEditState : {
                ...state.cardEitState,
                data: {
                  id: state.cardEditState.data.id,
                  title: { ...state.cardEditState.title, error: action.payload.title || []  },
                  description: { ...state.cardEditState.description, error: action.payload.description || []  },
                  url: { ...state.cardEditState.url, error: action.payload.url || []  },
                }
            } 
        }

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