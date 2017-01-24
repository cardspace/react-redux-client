import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ( state ) => {

  return {
    errorMessages: state.banner.errorMessages
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {}
}


class ErrorBanner extends React.Component {

    render() {

        return(
            <ul>
                { this.props.errorMessages.map( error => <li>{error}</li> ) }
            </ul>
        )
    }    
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( ErrorBanner )