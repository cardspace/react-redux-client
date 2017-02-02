import { cardListActions } from './card-list-action-types';
import { cardFilters } from './card-filters';

// state:
//   spaces      :  [ { id, title, text } ] list of all the spaces
//   editState   :
//   filterState :

const emptyField = {
    value: '',
    errors: []
}

const emptyEditState = {
    id: '',
    title: emptyField,
    text: emptyField
}

export const initialState = {
    cards: [],
    editState: emptyEditState,
    filterState: cardFilters.all
}



let actions = {}

actions[ cardListActions.CARDS_FETCHED ] = ( state, action ) => {

    return { 
        ...state, 
        cards: action.payload 
    }
    
}

actions[ cardListActions.CARDS_FILTER_CHANGED ] = ( state, action ) => {

    return{
        ...state,
        filterState: action.payload
    }

}


const createField = ( value ) => {

    return {
        value
        ,errors: []
    }
}

const createEditState = ( card ) => {

    return {
        id: card.id,
        title: createField( card.title ),
        text: createField( card.text )
    }
}

actions[ cardListActions.EDIT_CARD ] = ( state, action ) => {

    const card = state.cards.find( c => c.id == action.payload ); 

    return {
        ...state,
        editState: card ? createEditState( card ) : state.editState
    }
}

actions[ cardListActions.EDIT_CARD_CANCELED ] = ( state, action ) => {

    return {
        ...state,
        editState: emptyEditState
    }

}



actions[ cardListActions.EDIT_CARD_BEFORE_SUBMIT ] = ( state, action ) => {

    return {
        ...state,
        editState: createEditState( action.payload )
    }

}

actions[ cardListActions.EDIT_CARD_SUCCEEDED ] = ( state, action ) => {

    const getCard = ( card ) => {
        return card.id != action.payload.id 
                ? card
                : { ...action.payload }
    }

    return {
        ...state,
        cards: state.cards.map( getCard ),
        editState: emptyEditState
    }    

}

actions[ cardListActions.EDIT_CARD_FAILED_VALIDATION ] = ( state, action ) => {

    return {
        ...state,
        editState : {
            id: state.editState.id,
            title: { ...state.editState.title, errors: action.payload.title || []  },
            text: { ...state.editState.text, errors: action.payload.text || [] }
        }
    }

}


actions[ cardListActions.CARD_COMPLETE_SUCCEEDED ] = ( state, action ) => {

    const getCard = ( card ) => {
        return card.id != action.payload
                ? card
                : { ...card, status: 'complete' }
    }

    return { 
        ...state, 
        cards: state.cards.map( getCard ), 
    }

}

actions[ cardListActions.CARD_ACTIVATE_SUCCEEDED ] = ( state, action ) =>{

    const getCard = ( card ) => {
        return card.id != action.payload
                ? card
                : { ...card, status: 'active' }
    }

    return { 
        ...state, 
        cards: state.cards.map( getCard ), 
    }

};




// spacesListActions.EDIT_SPACE_FAILED_NOT_FOUND
//
// Do nothing we will leave it 

export function cardListReducer( instance='', state=initialState, action ) {

    if ( action.instance != instance ) return state;

    
    var reducerAction = actions[ action.type ];

    return reducerAction ? reducerAction( state, action ) : state;

}