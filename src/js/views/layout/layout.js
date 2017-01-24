import React from 'react';

import ErrorBanner from './error-banner-component';
import Header from './header-component';


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

