import React from 'react'
import { connect } from 'react-redux';

import { changeView } from '../view-actions';


const mapStateToProps = ( state ) => {
  return {}
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    changeView: ( viewDetails ) => dispatch( changeView( viewDetails ) )
  }
}

class AboutView extends React.Component {


  constructor( props ) {
    super( props );

    this.props.changeView({
      title: 'About'
    })
  }

  render() {
    return (
      <div class='view'>
        <p><strong>CardSpace</strong> is a simple application that allows you to create a list of notes.</p>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) ( AboutView )