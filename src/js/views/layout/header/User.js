import React from "react";

import Login from './Login';
import Logout from './Logout';

export default class User extends React.Component {

  render() {
    
    let authenticationAction = null;

    if ( !this.props.isLoggedIn ) {
      authenticationAction = <Login login={ this.props.login.bind( this ) } />;

    } else {
      authenticationAction = <Logout logout={ this.props.logout.bind( this ) } />;

    }

    return (
        <nav class="header-user">
            { authenticationAction }
        </nav>
    );
  }
}