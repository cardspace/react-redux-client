import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { connect } from 'react-redux';

import { authenticated } from './actions/security-actions';

import Layout from './Layout'
import About from './views/About'
import Cards from './views/Cards'
import UserAuthenticated from './views/UserAuthenticated';

const mapStateToProps = ( state ) => {
  return {
    isLoggedIn: state.security.isLoggedIn
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {

    authenticated: function( nextState, replace ) {
      dispatch( authenticated( nextState.location.hash.replace( '#id_token=', '' ) ) );
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
            <Route path='/' component={About} />
            <Route path='/about' component={About} onEnter={this.props.requiresAuthentication.bind(this)} />
            <Route path='/cards' component={Cards} onEnter={this.props.requiresAuthentication.bind(this)} />
            <Route path='/user-authenticated' onEnter={this.props.authenticated.bind(this)} component={UserAuthenticated} />
        </Route>
      </Router>
    );
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes)