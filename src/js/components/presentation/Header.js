import React from "react";

import { hasIdToken } from '../../services/authentication-store';

import Logout from './Header/Logout';
import Signin from './Header/Signin';
import Title from "./Header/Title";


export default class Header extends React.Component {

  render() {
    let button = null;
    if ( !hasIdToken() ) {
      button = <Signin />;
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
