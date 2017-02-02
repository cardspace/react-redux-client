import React from 'react';


export default class Card extends React.Component {

    // Props:
    //   card               : { id, title, text, status }
    //   editCard           :  event handler that turns a card into an editor
    //   deleteCard         :  event handler that deletes the card
    //   markCardAsComplete :  event handler that will mark a card as complete
    //   markCardAsActive   :  event handler that will mark a card as active

    completeClass ( status ) {

        return status == 'complete'
             ? ' card_is_complete'
             : ' ';
    }

    cardStatusButton( status ) {

        const completeButton = () => {
            return(
                <button 
                    class='card-button'
                    onClick={ this.props.markCardAsComplete } >
                    Complete
                </button>
            )
        }

        const activateButton = () => {
            return(
                <button 
                    class='card-button'
                    onClick={ this.props.markCardAsActive } >
                    Activate
                </button>
            )
        }


        return status != 'complete'
             ? completeButton()
             : activateButton();
    }

    render() {

        return(
            <div class='card card-readonly' onDoubleClick={ this.props.editCard }>
                <div >
                    <h2 class={ `card-title ${this.completeClass( this.props.card.status ) }` }>
                        { this.props.card.title }
                    </h2>
                    <textarea 
                        readOnly 
                        class={ `card-text ${this.completeClass( this.props.card.status ) }` }
                        value={ this.props.card.text }>
                    </textarea>
                </div>
                <div class='card-action-bar'>
                    { this.cardStatusButton( this.props.card.status ) }
                    <button class='card-button' onClick={ this.props.deleteCard }>Delete</button>
                </div>
            </div>
        )
    }
}
