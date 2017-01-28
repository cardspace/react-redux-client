import React from 'react';
import { TextInput, TextAreaInput } from '../../controls/input-controls';

export default class CardList extends React.Component {

    constructor( props ) {
        super( props );

        this.props.loadCards();
    }

    createLineItem ( card ) {

        const cardIsBeingEdited = ( ) =>  {

            return this.props.cardListState.cardEditState
                && this.props.cardListState.cardEditState.data.id == card.id;

        }


        const cardDetails = () => {
            return(
                <CardDetails 
                    card={ card } 
                    deleteCard={ this.props.deleteCard.bind( this, card.id )  } 
                    editCard={ this.props.editCardInList.bind( this, card.id ) }
                />                
            )
        }

        const cardEditor = () => {
            return(
                <CardEditor
                    cardEditState={ this.props.cardListState.cardEditState }
                    updateCard={ this.props.updateCard }
                    cancelEdit={ this.props.cancelEdit }
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
                { this.props.cardListState.cards.map( card => this.createLineItem( card )  ) }
            </div>
        );
    }
}

class CardDetails extends React.Component {

    render() {

        return(
            <div class='card card-readonly' onDoubleClick={ this.props.editCard }>
                <div >
                    <h2 class='card-title'>{ this.props.card.title }</h2>
                    <textarea readOnly class='card-text' value={ this.props.card.text }></textarea>
                </div>
                <div class='card-action-bar'>
                    <button class='card-button' onClick={ this.props.deleteCard.bind( this, this.props.card.id ) }>Delete</button>
                </div>
            </div>
        )
    }
}

class CardEditor extends React.Component {

    constructor( props ) {
        super( props );

        this.state = this.getStateFromProps( this.props )
    }

    getStateFromProps( props ) {
        return props.cardEditState.data;
    }


    componentWillReceiveProps( nextProps ) {

        this.setState( this.getStateFromProps( nextProps ) );
    }


    onSubmit( event ) {
        event.preventDefault();

        const submitPayload = this.convertStateToSubmitPayload( this.state );
        this.props.updateCard( submitPayload );
    }

    convertStateToSubmitPayload( state ) {

        return {
            id: this.state.id,
            title: this.state.title.value,
            text: this.state.text.value,
        }
    }


    titleChanged( event ) {
        this.setState( { ...this.state, title: { ...this.state.title, value: event.target.value } });
    }

    textChanged( event ) {
        this.setState( { ...this.state, text: { ...this.state.text, value: event.target.value }} );
    }


    render() {

        return(
            <form class='card card-editor' onSubmit={ this.onSubmit.bind( this ) }>

                <TextInput 
                    fieldClass='card-title'
                    hasErrors={ this.state.title.error.length > 0 }
                    value={ this.state.title.value }
                    onChange={ this.titleChanged.bind( this ) }
                />

                <TextAreaInput
                    fieldClass='card-text'
                    hasErrors={ this.state.text.error.length > 0 }
                    value={ this.state.text.value }
                    onChange={ this.textChanged.bind( this ) }
                />

                <div class='card-action-bar' >
                    <input class='card-button' type="submit" value="Save" />
                    <button class='card-button' type="button" onClick= { this.props.cancelEdit.bind( this, this.state.id ) } >Cancel</button>
                </div>
            </form>
        )
    }
}