import React from 'react';

export default class Logout extends React.Component {

    render() {
        return <div class="header-user-authentication card-button" onClick={ this.props.logout } >Logout</div>
    }
}