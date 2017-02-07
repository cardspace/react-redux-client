import React from 'react';
import { connect } from 'react-redux';

import { space_cards_url } from 'config';

import CardListFilter from '../../components/cards/controls/card-list-filter-control';
import CardList from '../../components/cards/controls/cards-list-control';
import AddCard from  '../../components/cards/controls/add-card-control';

import { buildCardListActions } from '../../components/cards/card-list-actions';
import { buildAddCardActions } from  '../../components/cards/add-card-actions';

import { enterView } from './space-view-actions';


import { changeView } from '../view-actions';


const mapStateToProps = ( state ) => {

    return {
        // filter state
        filterState: state.spaceList.filterState,

        // add state
        addState: state.spaceAdd,

        // list state 
        editState: state.spaceList.editState,
        cards: state.spaceList.cards
    }

}

const mapDispatchToProps = ( dispatch, ownProps ) => {


    const spaceCardsUrl = space_cards_url.replace( ':id', ownProps.routeParams.id );

    const addEventHandlers = buildAddCardActions( 'space', spaceCardsUrl );
    const listEventHandlers = buildCardListActions( 'space', spaceCardsUrl, ( state ) => state.spaceList );
    
    const addCard = ( card ) => {
        dispatch( addEventHandlers.addCard( card ) );
        dispatch( listEventHandlers.loadCards() );
    }

    return {
        enterView : () => dispatch( enterView( ownProps.routeParams.id ) ),

        changeView : ( viewDetails ) => dispatch( changeView( viewDetails ) ),

        // filter event handlers
        changeFilter: ( filter ) => dispatch( listEventHandlers.changeFilter( filter ) ),

        // add event handlers
        addCard: addCard,
        cancelAdd: () => dispatch( addEventHandlers.cancelEdit() ),

        // list event handlers
        loadCards          : () => dispatch( listEventHandlers.loadCards() ),
        editCard           : ( cardId ) => dispatch( listEventHandlers.editCard( cardId ) ),
        cancelEdit         : ( cardId ) => dispatch( listEventHandlers.cancelEdit( cardId ) ),
        updateCard         : ( card ) => dispatch( listEventHandlers.updateCard( card ) ),
        markCardAsComplete : ( cardId ) => dispatch( listEventHandlers.markCardAsComplete( cardId ) ),
        markCardAsActive   : ( cardId ) => dispatch( listEventHandlers.markCardAsActive( cardId ) ),
        deleteCard         : ( cardId ) => dispatch( listEventHandlers.deleteCard( cardId )  )

    }
}

class SpaceView extends React.Component {

    constructor( props ) {
        super( props );

        this.props.enterView();
        // this.props.changeView({
        //     title: 'Space'
        // })
    }

    render() {

        return(

            <div class='view'>

                <div class='leftColumn'>

                    <CardListFilter 
                        filterState={ this.props.filterState }
                        changeFilter={ this.props.changeFilter }
                    />                    

                    <AddCard 
                        editState={ this.props.addState }
                        addCard={ this.props.addCard }
                        cancel={ this.props.cancelAdd }
                    />
                </div>

                <div class='rightColumn'>
                    <CardList 
                        loadCards={ this.props.loadCards } 
                        editState={ this.props.editState }
                        cards={ this.props.cards }
                        deleteCard={ this.props.deleteCard }
                        editCard={ this.props.editCard }
                        markCardAsComplete={ this.props.markCardAsComplete } 
                        markCardAsActive= { this.props.markCardAsActive }
                        updateCard={ this.props.updateCard }
                        cancelEdit={ this.props.cancelEdit }
                    />
                </div>
            </div>
        )
    }

}

export default connect(  
    mapStateToProps,
    mapDispatchToProps
)( SpaceView )