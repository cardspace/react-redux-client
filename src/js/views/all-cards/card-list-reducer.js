import { allCardsActions } from './all-cards-action-types';
import { cardFilters } from './card-filters';

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
    filterState: cardFilters.all,    
    cards: [],
    cardEditState: initialCardEditState
}


const createFieldValue = ( value ) => {
    return { 
        value: value,
        error: []
    }
}

let actions = {};

actions[ allCardsActions.CARDS_FILTER_CHANGED ] = ( state, action ) => {

    return { 
        ...state, 
        filterState: action.payload 
    }

}

actions[ allCardsActions.CARDS_FETCHED ] = ( state, action ) => {

    return { 
        ...state, 
        cards: action.payload 
    }
    
}

actions[ allCardsActions.EDIT_CARD ] = ( state, action ) =>{

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

}


actions[ allCardsActions.EDIT_CARD_BEFORE_SUBMIT ] = ( state, action ) => {

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
}

actions[ allCardsActions.EDIT_CARD_SUCCEEDED ] = ( state, action ) => {

    const getCard = ( card ) => {
        return card.id != action.payload.id 
                ? card
                : { ...action.payload }
    }

    return { 
        ...state, 
        cards: state.cards.map( getCard ), 
        cardEditState: initialCardEditState 
    }

}


actions[ allCardsActions.EDIT_CARD_FAILED_VALIDATION ] = ( state, action ) => {

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

}

actions[ allCardsActions.EDIT_CARD_FAILED_NOT_FOUND ] = ( state, action ) => {

    // Q. is there any point to this it is just going to be the previous state?

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

}


actions[ allCardsActions.EDIT_CARD_CANCELED ] = ( state, action ) => {

    return { 
        ...state, 
        cardEditState: initialCardEditState 
    };

}


actions[ allCardsActions.CARD_COMPLETE_SUCCEEDED ] = ( state, action ) => {

    const getCard = ( card ) => {
        return card.id != action.payload
                ? card
                : { ...card, status: 'complete' }
    }

    return { 
        ...state, 
        cards: state.cards.map( getCard ), 
        cardEditState: initialCardEditState 
    }

}

actions[ allCardsActions.CARD_ACTIVATE_SUCCEEDED ] = ( state, action ) =>{

    const getCard = ( card ) => {
        return card.id != action.payload
                ? card
                : { ...card, status: 'active' }
    }

    return { 
        ...state, 
        cards: state.cards.map( getCard ), 
        cardEditState: initialCardEditState 
    }

};

export function allCardsCardListReducer( state=initialState, action ) {

    var reducerAction = actions[ action.type ];

    return reducerAction ? reducerAction( state, action ) : state;

}