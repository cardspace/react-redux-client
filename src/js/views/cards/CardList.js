import React from 'react';

export default class CardList extends React.Component {

    constructor( props ) {
        super( props );

        console.log( this.props )

        this.props.loadCards();
    }


    createLineItem ( card ) {

        const cardIsBeingEdited = ( ) =>  {

            return this.props.cards.cardEditState
                && this.props.cards.cardEditState.data.id == card.id;

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
                    cardEditState={ this.props.cards.cardEditState }
                    updateCard={ this.props.updateCard }
                    cancelEdit={ this.props.cancelEdit }
                />
            )
        }

        const representation = () => {

            return cardIsBeingEdited()
                 ? cardEditor()
                 : cardDetails();
        } 


        return(
            <li key={ card.id }>{ representation() }</li>        
        ) 
    }

    render(){
        return(
            <ul>
                { this.props.cards.cards.map( card => this.createLineItem( card )  ) }
            </ul>
        );
    }
}

class CardDetails extends React.Component {

    render() {
        const id = this.props.card.id;
        const title = this.props.card.title;
        const description = this.props.card.description;

        const deleteCard = this.props.deleteCard.bind( this, id );
        const editCard = this.props.editCard;

        return(
            <div>
                <div onDoubleClick={ this.props.editCard }>
                    <p>{ title }</p>
                    <p>{ description }</p>
                </div>
                <button onClick={ deleteCard }>delete</button>
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

    onSubmit( event ) {
        event.preventDefault();
        this.props.addCard( this.convertStateToSubmitPayload ( this.state ) );
    }



    onSubmit( event ) {
        event.preventDefault();

        const submitPayload = this.convertStateToSubmitPayload( this.state );
        console.log( 'edit line item submit' );
        console.log( submitPayload );
        this.props.updateCard( submitPayload );
    }

    convertStateToSubmitPayload( state ) {

        return {
            id: this.state.id,
            title: this.state.title.value,
            description: this.state.description.value,
            url: this.state.url.value
        }
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
        return(
            <form onSubmit={ this.onSubmit.bind( this ) }>
                <label for='title'>Tiltle:</label>
                <input 
                    type='text' 
                    name='title' 
                    id='title'
                    value={ this.state.title.value }
                    onChange={ this.titleChanged.bind( this ) }
                />

                <label for='description'>Description:</label>
                <input 
                    type='text' 
                    name='description' 
                    id='description' 
                    value={ this.state.description.value }                    
                    onChange={ this.descriptionChanged.bind( this ) }
                />

                <label for='url'>Url:</label>
                <input 
                    type='text' 
                    name='url' 
                    id='url' 
                    value={ this.state.url.value }
                    onChange={ this.urlChanged.bind( this ) }
                />

                <input type="submit" value="Submit" />
                <button type="button" onClick= { this.props.cancelEdit.bind( this, this.state.id ) } >Cancel</button>
            </form>
        )
    }
}