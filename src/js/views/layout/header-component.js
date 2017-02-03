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
// ( That decisions will come back an bite me but hey 
// ho you have to make some compromises )
//

import React from 'react';
import { connect } from 'react-redux';

import { displayLoginForm, logout } from '../../services/security-actions'

import Site from './header/Site';
import User from './header/User';

const mapStateToProps = ( state ) => {
  return {
    isLoggedIn: state.security.isLoggedIn,
    pageTitle: state.header.pageTitle
  }
}

const mapDispatchToProps = ( dispatch ) => {

  return {
    login: () => dispatch( displayLoginForm() ),
    logout: () => dispatch( logout() )
  }
}


class Header extends React.Component {

  render() {

    return (
      <header class='header'>
        <Site 
          siteTitle='CardSpace'
          pageTitle={ this.props.pageTitle }
        />
        <User 
          isLoggedIn={ this.props.isLoggedIn } 
          login={ this.props.login.bind( this ) }
          logout={ this.props.logout.bind( this ) }          
        />
      </header>
    );

  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)