import React from 'react';

export default class UserAuthenticated extends React.Component {

    constructor( props ) {
        super( props );
        console.log( this.props );
    }

    render() {
        return(
            <h2>User Authenticated</h2>
        );
    }

}
