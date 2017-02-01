import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { connect } from 'react-redux';

import { authenticated } from './services/security-actions';

import Layout from './views/layout/layout';
import LandingView from './views/landing/landing-view';

import SpaceView from './views/spaces/spaces-view';

const mapStateToProps = ( state ) => {
  return {
    isLoggedIn: state.security.isLoggedIn
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {

    authenticated: function( nextState, replace ) {
      dispatch( authenticated( nextState.location.hash.replace( '#id_token=', '' ) ) );
      replace( '/' );
    }

  }  
}

class Routes extends React.Component {

  render() {

    return (
      <Router history={ browserHistory }>
        <Route component={ Layout }>
            <Route path='/' component={ LandingView } />
            <Route path='/user-authenticated' onEnter={ this.props.authenticated.bind( this ) } />
            <Route path='/spaces' component={ SpaceView } />
        </Route>
      </Router>
    );
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes)