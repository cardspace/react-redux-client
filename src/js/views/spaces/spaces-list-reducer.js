
import { spacesListActions } from './spaces-list-action-type';

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

const initialState = {
    spaces: [],
    editState: emptyEditState
}



let actions = {}

actions[ spacesListActions.SPACES_FETCHED ] = ( state, action ) => {

    return {
        ...state,
        spaces: action.payload
    }

}


const createField = ( value ) => {

    return {
        value
        ,errors: []
    }
}

const createEditState = ( space ) => {

    return {
        id: space.id,
        title: createField( space.title ),
        text: createField( space.text )
    }
}


actions[ spacesListActions.EDIT_SPACE ] = ( state, action ) => {


    const space = state.spaces.find( s => s.id == action.payload ); 

    return {
        ...state,
        editState: space ? createEditState( space ) : state.editState
    }
}

actions[ spacesListActions.EDIT_SPACE_BEFORE_SUBMIT ] = ( state, action ) => {

    return {
        ...state,
        editState: createEditState( action.payload )
    }

}

actions[ spacesListActions.EDIT_SPACE_SUCCEEDED ] = ( state, action ) => {

    const getSpace = ( space ) => {
        return space.id != action.payload.id 
                ? space
                : { ...action.payload }
    }

    return {
        ...state,
        spaces: state.spaces.map( getSpace ),
        editState: emptyEditState
    }    

}

actions[ spacesListActions.EDIT_SPACE_FAILED_VALIDATION ] = ( state, action ) => {

    return {
        ...state,
        editState : {
            id: state.editState.id,
            title: { ...state.editState.title, errors: action.payload.title || []  },
            text: { ...state.editState.text, errors: action.payload.text || [] }
        }
    }

}


actions[ spacesListActions.EDIT_SPACE_CANCELED ] = ( state, action ) => {

    return {
        ...state,
        editState: emptyEditState
    }

}

actions[ spacesListActions.SPACE_COMPLETE_SUCCEEDED ] = ( state, action ) => {

    const getSpace = ( space ) => {
        return space.id != action.payload
                ? space
                : { ...space, status: 'complete' }
    }

    return { 
        ...state, 
        spaces: state.spaces.map( getSpace ), 
    }

}

actions[ spacesListActions.SPACE_ACTIVATE_SUCCEEDED ] = ( state, action ) =>{

    const getSpace = ( space ) => {
        return space.id != action.payload
                ? space
                : { ...space, status: 'active' }
    }

    return { 
        ...state, 
        spaces: state.spaces.map( getSpace ), 
    }

};


// spacesListActions.EDIT_SPACE_FAILED_NOT_FOUND
//
// Do nothing we will leave it 

export function spacesListReducer( state=initialState, action ) {

    var reducerAction = actions[ action.type ];

    return reducerAction ? reducerAction( state, action ) : state;
}