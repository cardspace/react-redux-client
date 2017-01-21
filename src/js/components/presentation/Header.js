import React from "react";

// Decided to import the needed functions at this level
// rather that in the Layout.  Security is not really
// paticipating in the Redux architecture, this is 
// due to login component not being an easy fit.
//
// This should change but that would mean creating
// a custom login component and accessing the services
// in middleware which is going to take some time to
// get right which is not a priority at this stage.
//
// ( That decisions will come back an bite me but hey 
// ho you have to make some compromises )
//
// 

import { hasIdToken } from '../../services/authentication-store';

import Login from './Header/Login';
import Logout from './Header/Logout';
import Title from "./Header/Title";


export default class Header extends React.Component {

  render() {
    let button = null;
    if ( !hasIdToken() ) {
      button = <Login />;
    } else {
      button = <Logout />;
    }

    return (
      <div>
        <Title />
        {button}
      </div>
    );
  }
}
