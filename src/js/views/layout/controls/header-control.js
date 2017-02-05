// Decided to import the needed functions at this level
// rather that in the Layout.  Security is not really
// paticipating in the Redux architecture, this is 
// due to login component not being an easy fit.
// Importing at this level because this is a more 
// focused component than the Layout.
//
// This should change but that would mean creating
// a custom login component and accessing the services
// in middleware which is going to take some time to
// get right which is not a priority at this stage.
//

import React from 'react';
import { connect } from 'react-redux';

import { displayLoginForm, logout } from '../../../services/security-actions'


const mapStateToProps = ( state ) => {
  return {
    isLoggedIn: state.security.isLoggedIn,
    viewTitle: state.header.viewTitle
  }
}

const mapDispatchToProps = ( dispatch ) => {

  return {
    login: () => dispatch( displayLoginForm() ),
    logout: () => dispatch( logout() )
  }
}


class Header extends React.Component {

  authenticationControl() {

    const login =() => {

      return (
        <div class="header-user-authentication card-button" onClick={ this.props.login } >
          Signin/up
        </div>
      )

    }

    const logout = () => {

      return(
        <div class="card-button" onClick={ this.props.logout } >
          Logout
        </div>
      ) 
    }

    return this.props.isLoggedIn ? logout() : login();

  }

  render() {

    return (
      <header class='header'>
        <h1 class='site-header'>
            <a class='site-title' href='/'>CardSpace</a>
            <span class="view-title" > : { this.props.viewTitle }</span>
        </h1>

        <nav class='user-menue'>
            { this.authenticationControl() }
        </nav>

      </header>
    );

  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)