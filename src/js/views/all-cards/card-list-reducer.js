import { allCardsActions } from './all-cards-action-types';

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
        text: emptyValue
    }
}

const initialState = {
    cards: [],
    cardEditState: initialCardEditState
}

export function allCardsCardListReducer( state=initialState, action ) {

    if ( action.type == allCardsActions.CARDS_FETCHED ) {
        return { ...state, cards: action.payload }

    } else if ( action.type == allCardsActions.EDIT_CARD ) {
        let card = state.cards.find( c => c.id == action.payload );

        let editState = { };
        if ( card ) {

            let editState= {
                state: editState,
                data: {
                    id: card.id,
                    title: createFieldValue( card.title ),
                    text: createFieldValue( card.text )
                }
            }
            return { ...state,  cardEditState: editState };

        } else {
            return state
        }

    } else if ( action.type == allCardsActions.EDIT_CARD_BEFORE_SUBMIT ) {

        // Make the edit state reflect what has been submitted for update.
        // The update is included as the action payload.

        return {
            ...state,
            cardEditState: {
                state: editState.editing,
                data: {
                    id: action.payload.id,
                    title: createFieldValue( action.payload.title ),
                    text: createFieldValue( action.payload.text )
                }
            }
        }

    } else if ( action.type == allCardsActions.EDIT_CARD_SUCCEEDED ) {

        const getCard = ( card ) => {
            return card.id != action.payload.id 
                 ? card
                 : { ...action.payload }
        }

        /* Update the card in the card list to reflect the edit */
        var cards = [];
            cards.length = state.cards.length;

        state
          .cards
          .forEach( card => cards.push( getCard( card ) ) );
        
        const nextState = {
            cards: cards,
            cardEditState: initialCardEditState
        }

        return nextState;

    } else if ( action.type == allCardsActions.EDIT_CARD_FAILED_VALIDATION ) {

        // record the errors in the edit state

        return {
            ...state,
            cardEditState : {
                ...state.cardEitState,
                data: {
                  id: state.cardEditState.data.id,
                  title: { ...state.cardEditState.title, error: action.payload.title || []  },
                  text: { ...state.cardEditState.text , error: action.payload.text || []  }
                }
            } 
        }

    } else if ( action.type == allCardsActions.EDIT_CARD_FAILED_NOT_FOUND ) {

        let card = action.payload;

        let editState = {
            state: editState,
            data: {
                id: card.id,
                title: createFieldValue( card.title ),
                text: createFieldValue( card.text )
            }
        }
        return { ...state,  cardEditState: editState };

    } else if ( action.type == allCardsActions.EDIT_CARD_CANCELED ) {  

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