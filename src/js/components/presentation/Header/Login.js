import React from 'react';

export default class Login extends React.Component {

    render() {
        return <button onClick={this.props.login} >Signin/up</button>
        
    }

}