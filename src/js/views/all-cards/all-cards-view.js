import React from 'react';
import { connect } from 'react-redux';

import { cards_url, card_url } from 'config';

import CardListFilter from '../../components/cards/controls/card-list-filter-control';
import CardList from '../../components/cards/controls/cards-list-control';
import AddCard from  '../../components/cards/controls/add-card-control';

import { buildCardListActions } from '../../components/cards/card-list-actions';
import { buildAddCardActions } from  '../../components/cards/add-card-actions';

import { changeView } from '../view-actions';



const mapStateToProps = ( state ) => {

    return {
        // filter state
        filterState: state.allCardsList.filterState,

        // add state
        addState: state.allCardsAdd,

        // list state 
        editState: state.allCardsList.editState,
        cards: state.allCardsList.cards
    }

}

const mapDispatchToProps = ( dispatch ) => {

    const addEventHandlers = buildAddCardActions( 'allCards', cards_url );
    const listEventHandlers = buildCardListActions( 'allCards', cards_url, ( state ) => state.allCardsList );
    
    const addCard = ( card ) => {
        dispatch( addEventHandlers.addCard( card ) );
        dispatch( listEventHandlers.loadCards() );
    }

    return {

        changeView: ( viewDetails ) => dispatch( changeView( viewDetails ) ),

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

class Cards extends React.Component {

    constructor( props ) {
        super( props );

        this.props.changeView({
            title: 'All Cards'
        })
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
)( Cards )