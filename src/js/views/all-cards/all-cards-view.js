import React from 'react';
import { connect } from 'react-redux';
import { addCard, editCardInCardList, cancelEditCardInCardList, updateCard, loadAllCardsForCurrentUser, deleteCard } from './all-cards-actions';

import AddCard from './add-card-component';
import CardList from './card-list-component';

const mapStateToProps = ( state ) => {

  return {
    addCardState: state.allCardsAddCard,
    cardListState: state.allCardsCardList
  }
  
}

const mapDispatchToProps = ( dispatch ) => {

  return {
    submitAddCard: ( card ) => dispatch( addCard( card ) ),
    loadCards: () => dispatch( loadAllCardsForCurrentUser() ),
    submitDeleteCard: ( cardId ) => dispatch( deleteCard( cardId ) ),
    editCardInList: ( cardId ) => dispatch( editCardInCardList( cardId ) ),
    updateCard: ( card ) => dispatch( updateCard( card ) ),
    cancelEdit: ( cardId ) => dispatch( cancelEditCardInCardList( cardId ) )
  }

}

class AllCardsView extends React.Component {

  render() {
    return (
      <div class='view'>

        <div class='leftColumn'>
          <AddCard 
              addCardState={ this.props.addCardState }  
              addCard={ this.props.submitAddCard.bind( this ) }
          />
        </div>
        
        <div class='rightColumn'>
          <CardList 
              loadCards={ this.props.loadCards } 
              deleteCard={ this.props.submitDeleteCard } 
              editCardInList={ this.props.editCardInList }
              updateCard={ this.props.updateCard }
              cancelEdit={ this.props.cancelEdit }
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