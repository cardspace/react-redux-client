import React from 'react';
import { connect } from 'react-redux';
import { cancelAddCard, 
         addCard, 
         editCardInCardList, 
         cancelEditCardInCardList, 
         updateCard, 
         loadAllCardsForCurrentUser, 
         deleteCard,
         completeCard,
         activateCard,
         changeFilter } from './all-cards-actions';

import AddCard from './add-card-component';
import CardListFilter from './card-list-filter-component';
import CardList from './card-list-component';

const mapStateToProps = ( state ) => {

  return {
    addCardState: state.allCardsAddCard,
    cardListState: state.allCardsCardList
  }
  
}

const mapDispatchToProps = ( dispatch ) => {

  return {
    cancelAddCard: () => dispatch( cancelAddCard() ), 
    submitAddCard: ( card ) => dispatch( addCard( card ) ),
    loadCards: () => dispatch( loadAllCardsForCurrentUser() ),
    submitDeleteCard: ( cardId ) => dispatch( deleteCard( cardId ) ),
    editCardInList: ( cardId ) => dispatch( editCardInCardList( cardId ) ),
    updateCard: ( card ) => dispatch( updateCard( card ) ),
    cancelEdit: ( cardId ) => dispatch( cancelEditCardInCardList( cardId ) ),
    markCardAsComplete: ( cardId ) => dispatch( completeCard( cardId ) ),
    markCardAsActive: ( cardId ) => dispatch( activateCard( cardId ) ),
    changeFilter: ( filter ) => dispatch( changeFilter( filter ) )
  }

}

class AllCardsView extends React.Component {

  render() {
    return (
      <div class='view'>

        <div class='leftColumn'>
          <AddCard 
              addCardState={ this.props.addCardState }  
              cancel={ this.props.cancelAddCard  }
              addCard={ this.props.submitAddCard.bind( this ) }
          />
          <CardListFilter
            filterState={ this.props.cardListState.filterState } 
            changeFilter={ this.props.changeFilter  }
          />
        </div>
        
        <div class='rightColumn'>
  
          <CardList 
              loadCards={ this.props.loadCards } 
              deleteCard={ this.props.submitDeleteCard } 
              editCardInList={ this.props.editCardInList }
              updateCard={ this.props.updateCard }
              cancelEdit={ this.props.cancelEdit }
              markCardAsComplete={ this.props.markCardAsComplete }
              markCardAsActive= { this.props.markCardAsActive }
              cardListState={ this.props.cardListState }
          />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( AllCardsView )