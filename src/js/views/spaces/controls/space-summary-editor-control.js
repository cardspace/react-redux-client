import React from 'react';

import { TextInput, TextAreaInput } from '../../../components/input-controls';



export default class SpaceSummaryEditor extends React.Component {

    
    // props = {
    //      editState :{
    //          id : the id          
    //          title    : { value: string, errors: [] }
    //          text     : { value: string, errors: [] }
    //      },
    //      updateSpace  : view button event handler, if null the button is not displayed
    //      cancelEdit  : cancels the edit
    //  }

    constructor ( props ) {
        super( props );

        this.state = this.props.editState;
    }

    componentWillReceiveProps( nextProps ) {

        this.setState( nextProps.editState );
    }



    onSubmit( event ) {

        const convertStateToSubmitPayload = ( state )  => {
            
            return {
                id: state.id,
                title: state.title.value,
                text: state.text.value
            }

        }

        event.preventDefault();
        this.props.updateSpace( convertStateToSubmitPayload( this.state ) );
    }


    
    titleChanged( event ) {   

        this.setState( { ...this.State, title: { ...this.state.title, value: event.target.value } } );
    }

    textChanged( event ) {

        this.setState( { ...this.State, text: { ...this.state.text, value: event.target.value } } );
    }


    render() {

        return(
            <form class='space-summary editor' onSubmit={ this.onSubmit.bind( this ) }>

                <TextInput 
                    fieldClass='space-summary-title'
                    hasErrors={ this.state.title.errors.length > 0 }
                    value={ this.state.title.value }
                    onChange={ this.titleChanged.bind( this ) }
                />

                <TextAreaInput
                    fieldClass='space-summary-text'
                    hasErrors={ this.state.text.errors.length > 0 }
                    value={ this.state.text.value }
                    onChange={ this.textChanged.bind( this ) }
                />

                <div class='space-summary-action-bar' >
                    <input class='space-summary-button' type="submit" value="Save" />
                    <button class='space-summary-button' type="button" onClick= { this.props.cancelEdit.bind( this, this.state.id ) } >Cancel</button>
                </div>
            </form>
        ) 
    }
}