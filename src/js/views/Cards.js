import React from 'react';
import { connect } from 'react-redux';
import { addCard, editCardInCardList, cancelEditCardInCardList, updateCard, loadAllCardsForCurrentUser, deleteCard } from '../actions/card-list-actions';

import AddCard from './cards/AddCard';
import CardList from './cards/CardList';

const mapStateToProps = ( state ) => {

  return {
    addCardState: state.addCard,
    cards: state.cards
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

class Cards extends React.Component {

  render() {
    return (
      <div>
        <AddCard 
            addCardState={ this.props.addCardState }  
            addCard={ this.props.submitAddCard.bind( this ) }
        />
        <CardList 
            loadCards={ this.props.loadCards } 
            deleteCard={ this.props.submitDeleteCard } 
            editCardInList={ this.props.editCardInList }
            updateCard={ this.props.updateCard }
            cancelEdit= { this.props.cancelEdit }
            cards={ this.props.cards } 
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards)
