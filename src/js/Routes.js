import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { connect } from 'react-redux';

import { authenticated } from './services/security-actions';

import Layout from './views/layout/layout';
import AboutView from './views/about/about-view';
import AllCardsView from './views/all-cards/all-cards-view';

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
    },

    requiresAuthentication: function ( nextState, replace ) {
      if ( !this.props.isLoggedIn ) {
        replace( '/' )
      }
    }
  }  
}

class Routes extends React.Component {

  render() {

    return (
      <Router history={browserHistory}>
        <Route component={Layout}>
            <Route path='/' component={ AboutView } />
            <Route path='/about' component={ AboutView } onEnter={ this.props.requiresAuthentication.bind( this ) } />
            <Route path='/cards' component={ AllCardsView } onEnter={ this.props.requiresAuthentication.bind( this ) } />
            <Route path='/user-authenticated' onEnter={ this.props.authenticated.bind( this ) } component={ AboutView } />
        </Route>
      </Router>
    );
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes)