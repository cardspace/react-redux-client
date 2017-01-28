import React from 'react';
import { TextInput, TextAreaInput } from '../../controls/input-controls';


export default class AddCard extends React.Component {
    constructor( props ) {
        super( props );

        this.state = this.getStateFromProps( this.props )
    }

    getStateFromProps( props ) {
        return props.addCardState.data;
    }

    componentWillReceiveProps( nextProps ) {

        this.setState( this.getStateFromProps( nextProps ) );
    }

    convertStateToSubmitPayload( state ) {

        return {
            title: this.state.title.value,
            description: this.state.description.value,
            url: this.state.url.value
        }
    }

    onSubmit( event ) {
        event.preventDefault();
        this.props.addCard( this.convertStateToSubmitPayload ( this.state ) );
    }

    titleChanged( event ) {
        this.setState( { ...this.state, title: { ...this.state.title, value: event.target.value } });
    }

    descriptionChanged( event ) {
        this.setState( { ...this.state, description: { ...this.state.description, value: event.target.value }} );
    }

    urlChanged( event ) {
        this.setState( { ...this.state, url: { ...this.state.url, value: event.target.value }} );
    }

    getErrorClass( errors ) {

        return errors.length > 0
                ? 'has_an_error'
                : '';
    }

    render() {
        return (
            <form class='card card-editor' onSubmit={ this.onSubmit.bind( this ) }>
              
                <TextInput 
                    fieldClass='card-title'
                    hasErrors={ this.state.title.error.length > 0 }
                    value={ this.state.title.value }
                    onChange={ this.titleChanged.bind( this ) }
                />              

                <TextAreaInput
                    fieldClass='card-text'
                    hasErrors={ this.state.description.error.length > 0 }
                    value={ this.state.description.value }
                    onChange={ this.descriptionChanged }
                />

                <div class='card-action-bar' >
                    <input class='card-button' type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}