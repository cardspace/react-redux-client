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

import { displayLoginForm, logout } from '../../actions/securityActions'

import Login from './Header/Login';
import Logout from './Header/Logout';
import Title from './Header/Title';

const mapStateToProps = ( state ) => {
  return {
    isLoggedIn: state.security.isLoggedIn
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

    let button = null;
    if ( !this.props.isLoggedIn ) {
      button = <Login login={ this.props.login.bind( this ) } />;
    } else {
      button = <Logout logout={ this.props.logout.bind( this ) } />;
    }

    return (
      <div>
        <Title />
        {button}
      </div>
    );
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)