import React from 'react';

import ErrorBanner from './components/presentation/ErrorBanner';
import Header from './components/presentation/Header';


export default class Layout extends React.Component {

  render() {

    return (
      <div>
        <Header />
        <ErrorBanner />

        { this.props.children }
      </div>
    );
  }
}

