import React from 'react';

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

    render() {
        return (
            <form class='card card-editor' onSubmit={this.onSubmit.bind( this )}>
              
              
                <input 
                    class='card-title'
                    type='text' 
                    name='title' 
                    id='title' 
                    value={ this.state.title.value } 
                    onChange={ this.titleChanged.bind( this ) }
                />
                <ul>
                  { this.props.addCardState.data.title.error.map( ( error ) => {
                     return <li>{error}</li>;
                   })}
                </ul>

                <textarea 
                    class='card-text'
                    name="description" 
                    id="description"
                    wrap="soft"
                    onChange={ this.descriptionChanged.bind( this ) }
                    value={ this.state.description.value }
                >
                </textarea>
                <ul>
                  {this.props.addCardState.data.description.error.map( ( error ) => {
                     return <li>{error}</li>;
                   })}
                </ul>

                <div class='card-action-bar' >
                    <input class='card-button' type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}