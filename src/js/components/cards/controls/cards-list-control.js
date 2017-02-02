import React from 'react'

import Card from './cards-card-control';
import Editor from './cards-editor-control';

export default class CardList extends React.Component {

    // props 
    //     loadCards: method that loads the cards from the server
    //     editState: {
    //          id: id of the card
    //          title : { value, errors[] },
    //          text  : { value, errors[] }
    //     }
    //     cards: array of { id, title, text, status ( active, complete ) }
    //     deleteCard         : delete button clicked, it expects a card id
    //     editCard           : edit button clicked, it expects a card id
    //     markCardAsComplete : complete button clicked, it expects a card id
    //     markCardAsActive   : active button clicked, it expects a card id
    //     updateCard         : update button clicked { id, title, text }
    //     cancelEdit         : cancel button clicked


    constructor( props ) {
        super( props );

        this.props.loadCards();
    }

    createLineItem ( card ) {

        const cardIsBeingEdited = ( ) =>  {

            return this.props.editState
                && this.props.editState.id == card.id;

        }


        const cardDetails = () => {

            return(

                <Card
                    card={ card } 
                    deleteCard={ this.props.deleteCard.bind( this, card.id )  } 
                    editCard={ this.props.editCard.bind( this, card.id ) }
                    markCardAsComplete={ this.props.markCardAsComplete.bind( this, card.id ) }
                    markCardAsActive={ this.props.markCardAsActive.bind( this, card.id ) }
                />                
            )
        }

        const cardEditor = () => {

            return(
                <Editor
                    editState={ this.props.editState }
                    updateCard={ this.props.updateCard }
                    cancelEdit={ this.props.cancelEdit.bind( this, card.id ) }
                />
            )
        }

        return cardIsBeingEdited()
                ? cardEditor()
                : cardDetails();

    }

    render(){

        return(
            <div class='cardlist'>
                { this.props.cards.map( card => this.createLineItem( card )  ) }
            </div>
        );
    }
}

