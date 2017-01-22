import React from 'react';
import { connect } from 'react-redux';
import { addCard } from '../actions/cardActions';

import AddCard from './cards/AddCard';

const mapStateToProps = ( state ) => {

  return {
    addCardState: state.addCard,
    cards: state.cards
  }

}

const mapDispatchToProps = ( dispatch ) => {

  return {
    submitAddCard: ( card ) => dispatch( addCard( card ) )
  }

}

class Cards extends React.Component {

  render() {
    return (
      <div>
        <AddCard addCardState={ this.props.addCardState }  addCard={this.props.submitAddCard.bind( this )}/>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards)
