import React from 'react';

const getErrorClass = ( hasErrors ) => {

   return hasErrors
            ? 'has_an_error'
            : '';
}


export class TextInput extends React.Component {

    // props:
    //
    // {  fieldClass : The class name that idetified the field data
    //    hasErrors  : boolean, used to decide whether the field idetified as having an error
    //    value      : the field value
    //    onChange   : the change event handler
    // }

    render() {
        return (
            <input 
                class={ `text-field ${this.props.fieldClass} ${ getErrorClass( this.props.hasErrors )}` }
                type='text' 
                value={ this.props.value } 
                onChange={ this.props.onChange }
            />
        );
    }
}

export class TextAreaInput extends React.Component {

    // props:
    //
    // {  fieldClass : The class name that idetified the field data
    //    hasErrors  : boolean, used to decide whether the field idetified as having an error
    //    value      : the field value
    //    onChange   : the change event handler
    // }

    render() {
        return (
            <textarea 
                class={ `text-field ${this.props.fieldClass} ${ getErrorClass( this.props.hasErrors )}` }
                wrap="soft"
                value={ this.props.value }
                onChange={ this.props.onChange }
            >
            </textarea>
        );
    }

}