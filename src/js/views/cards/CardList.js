import React from 'react';

export default class CardList extends React.Component {

    constructor( props ) {
        super( props );

        this.props.loadCards();
    }

    render(){
        return(
            <ul>
                { this.props.cards.map( card => <li>{ card.title }</li> ) }
            </ul>
        );
    }


}