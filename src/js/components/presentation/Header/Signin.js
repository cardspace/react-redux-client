import React from 'react';

import { AuthService, login } from '../../../services/authentication';

export default class Signin extends React.Component {

    signIn() {
        login();
    }

    render() {
        return <button onClick={this.signIn} >Signin/up</button>
        
    }

}