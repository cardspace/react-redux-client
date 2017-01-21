import React from 'react';

import { AuthService, login } from '../../../services/authentication';

export default class Signin extends React.Component {

    signIn() {
        console.log( 'SignIn' );

        // const auth = new AuthService('NP5BF3hkstyAEyg1J3boW6xXmOVGnHj3', 'wipmoore.eu.auth0.com');
        // auth.login();
        login();
    }

    render() {
        return <button onClick={this.signIn} >Signin/up</button>
        
    }

}