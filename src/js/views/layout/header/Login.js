import React from 'react';

export default class Login extends React.Component {

    render() {
        return <div class="header-user-authentication card-button" onClick={ this.props.login } >Signin/up</div>
    }

}