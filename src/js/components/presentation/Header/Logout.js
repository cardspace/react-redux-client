import React from 'react';
import { browserHistory } from 'react-router';

import { clearIdToken } from '../../../services/authentication-store';

export default class Logout extends React.Component {

    logout() {
        clearIdToken();
        browserHistory.push( '/' );
    }

    render() {
        return <button onClick={this.logout.bind(this)} >Logout</button>
    }
}