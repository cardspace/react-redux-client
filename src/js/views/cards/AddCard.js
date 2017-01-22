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
            <form onSubmit={this.onSubmit.bind( this )}>
                <label for='title'>Tiltle:</label>
                <input type='text' name='title' id='title' value={this.state.title.value} onChange={this.titleChanged.bind( this )}/>
                <ul>
                  {this.props.addCardState.data.title.error.map( ( error ) => {
                     return <li>{error}</li>;
                   })}
                </ul>

                <label for='description'>Description:</label>
                <input type='text' name='description' id='description' value={this.state.description.value} onChange={this.descriptionChanged.bind( this )}/>
                <ul>
                  {this.props.addCardState.data.description.error.map( ( error ) => {
                     return <li>{error}</li>;
                   })}
                </ul>

                <label for='url'>Url:</label>
                <input type='text' name='url' id='url' value={this.state.url.value} onChange={this.urlChanged.bind( this )}/>
                <ul>
                  {this.props.addCardState.data.url.error.map( ( error ) => {
                     return <li>{error}</li>;
                   })}
                </ul>

                <input type="submit" value="Submit" />
            </form>
        );
    }
}