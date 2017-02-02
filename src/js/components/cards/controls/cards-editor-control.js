import React from 'react'
import { TextInput, TextAreaInput } from '../../input-controls';

export default class Editor extends React.Component {

    // Props:
    //   editState: { 
    //      id    : the id
    //      title : { value, errors[] }
    //      text  : { value, errors[] }
    //   }
    //   updateCard : event handler that updates the card
    //   cancelEdit : event handler that cancels the edits

    constructor( props ) {
        super( props );

        this.state = this.getStateFromProps( this.props )
    }

    getStateFromProps( props ) {
        return props.editState;
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
                    hasErrors={ this.state.title.errors.length > 0 }
                    value={ this.state.title.value }
                    onChange={ this.titleChanged.bind( this ) }
                />

                <TextAreaInput
                    fieldClass='card-text'
                    hasErrors={ this.state.text.errors.length > 0 }
                    value={ this.state.text.value }
                    onChange={ this.textChanged.bind( this ) }
                />

                <div class='card-action-bar' >
                    <input class='card-button' type="submit" value="Save" />
                    <button class='card-button' type="button" onClick={ this.props.cancelEdit } >Cancel</button>
                </div>
            </form>
        )
    }
}