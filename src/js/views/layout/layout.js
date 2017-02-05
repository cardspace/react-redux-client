import React from 'react';

import ErrorBanner from './controls/error-banner-control';
import Header from './controls/header-control';


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

