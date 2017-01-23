import React from 'react';
import { connect } from 'react-redux';
import { addCard, loadAllCardsForCurrentUser } from '../actions/cardActions';

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
    loadCards: () => dispatch( loadAllCardsForCurrentUser() )
  }

}

class Cards extends React.Component {

  render() {
    return (
      <div>
        <AddCard addCardState={ this.props.addCardState }  addCard={ this.props.submitAddCard.bind( this ) }/>
        <CardList loadCards={ this.props.loadCards } cards={ this.props.cards.cards }/>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards)
