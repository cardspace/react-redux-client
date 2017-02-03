import { Router, Route, browserHistory } from 'react-router'

const pageChange = 'PAGE_CHANGE';

export function viewSpace( space ) {

    return ( dispatch ) => {

        dispatch( { type: pageChange, payload: `Space - ${space.title}` } );
        browserHistory.push( '/space/' + space.id );
    }
}

export function viewAllCards( ) {

    return ( dispatch ) => {
        dispatch( { type: pageChange, payload: `All cards` } );
        browserHistory.push( '/all-cards' )
    }
}