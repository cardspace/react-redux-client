import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import Layout from './Layout'
import AllCards from './views/AllCards'
import About from './views/About'

export default class Routes extends React.Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route component={Layout}>
            <Route path='/' component={About} />
            <Route path='/all-cards' component={AllCards}/>
            <Route path='/about' component={About}/>
        </Route>
      </Router>
    );
  }
}