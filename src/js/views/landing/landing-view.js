import React from 'react';
import { connect } from 'react-redux';

import AboutView from '../about/about-view';
import AllCardsView from '../all-cards/all-cards-view';

const mapStateToProps = ( state ) => {
    return {
        isLoggedIn: state.security.isLoggedIn,
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {}
}

class LandingView extends React.Component {

    render() {

        return this.props.isLoggedIn
             ? <AllCardsView />
             : <AboutView />
             
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( LandingView )