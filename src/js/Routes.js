import React from 'react'
import { Router, Route, hashHistory } from 'react-router'

import Layout from './Layout'
import AllCards from './views/AllCards'
import About from './views/About'

export default class Routes extends React.Component {

  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Layout}>
            <Route path='/all-cards' component={AllCards}/>
            <Route path='/about' component={About}/>
        </Route>
      </Router>
    );
  }
}