import { Router, Route, browserHistory } from 'react-router'

import { viewActionTypes } from './view-action-types';


const pageChange = 'PAGE_CHANGE';


export function changeView( viewDetails ) {

    // viewDetails : {
    //      title: the title that will be displayed for the view   
    // }
    return ( dispatch ) => {

        dispatch( { 
            type: viewActionTypes.CHANGED_VIEW, 
            payload: viewDetails
         });

     }

}


export function viewSpace( spaceId ) {

    return ( dispatch ) => {

        browserHistory.push( '/space/' + spaceId );
    }
}

export function viewAllCards( ) {

    return ( dispatch ) => {
        browserHistory.push( '/all-cards' )
    }
}