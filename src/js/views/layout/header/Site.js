import React from "react";


export default class Site extends React.Component {

  render() {
    return (

        <h1 class="header-site">
            <a class='header-site-title' href="/">{ this.props.siteTitle }</a>
        </h1>
    );
  }
}