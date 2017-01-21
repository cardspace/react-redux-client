import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import { getNonce, setIdToken, hasIdToken } from './services/authentication-store';

import Layout from './Layout'
import About from './views/About'
import Cards from './views/Cards'
import UserAuthenticated from './views/UserAuthenticated';

const storeAuthenticationToken = ( nextState, replace ) => {
  const { hash } = nextState.location;
  setIdToken( hash.replace( '#id_token=', '' ) );
  replace( '/cards' );
}

const requiresAuthentication = ( nextState, replace ) => {
  
  if (!hasIdToken()) {
    replace( '/' );
  }
  
} 

export default class Routes extends React.Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route component={Layout}>
            <Route path='/' component={About} />
            <Route path='/about' component={About} onEnter={requiresAuthentication} />
            <Route path='/cards' component={Cards} onEnter={requiresAuthentication} />
            <Route path='/user-authenticated' onEnter={storeAuthenticationToken} component={UserAuthenticated} />
        </Route>
      </Router>
    );
  }
}