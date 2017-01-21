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

import React from "react";
import { browserHistory } from 'react-router';

import { login } from '../../services/authentication';
import { clearIdToken, hasIdToken } from '../../services/authentication-store';

import Login from './Header/Login';
import Logout from './Header/Logout';
import Title from "./Header/Title";


export default class Header extends React.Component {

  logout() {
    clearIdToken();
    browserHistory.push( '/' );
  }


  render() {
    let button = null;
    if ( !hasIdToken() ) {
      button = <Login login={login} />;
    } else {
      button = <Logout logout={this.logout} />;
    }

    return (
      <div>
        <Title />
        {button}
      </div>
    );
  }
}
