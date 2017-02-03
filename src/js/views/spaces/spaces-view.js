import React from 'react';
import { connect } from 'react-redux';

import { loadAllSpacesForCurrentUser
       , editSpace
       , updateSpace
       , cancelEdit
       , deleteSpace } from './spaces-list-actions';

import { addSpace
       , cancelAdd } from './spaces-add-actions';

import { viewAllCards
       , viewSpace } from '../view-actions';

import SpaceList from './components/space-list-component';
import SpaceAdd from './components/spaces-add-component';

const mapStateToProps = ( state ) => {
    return {
        spaces: state.spacesList.spaces,
        editState: state.spacesList.editState,
        addState: state.spacesAdd
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        loadSpaces: () => dispatch( loadAllSpacesForCurrentUser()  ),
        editSpace: ( spaceId ) => dispatch( editSpace( spaceId ) ),
        updateSpace: ( space ) => dispatch( updateSpace( space ) ),
        cancelEdit:  ( ) => dispatch( cancelEdit() ),
        deleteSpace: ( spaceId ) => dispatch( deleteSpace( spaceId ) ),
        addSpace : ( space ) => dispatch( addSpace( space )),
        cancelAdd : () => dispatch( cancelAdd() ),
        viewSpace : ( spaceId ) => dispatch( viewSpace( spaceId )),
        viewAllCards : () => dispatch( viewAllCards() )

    }
}

class SpacesView extends React.Component {

    render() {
        return(
            <div class='view'>

                <div class='leftColumn'>
                    <SpaceAdd 
                        addState={ this.props.addState }
                        addSpace={ this.props.addSpace }
                        cancelAdd={ this.props.cancelAdd }
                    />
                </div>

                <div class='rightColumn'>
                    <SpaceList
                        spaces={ this.props.spaces }
                        editSpace={ this.props.editSpace }
                        loadSpaces={ this.props.loadSpaces }

                        editState={ this.props.editState }
                        updateSpace={ this.props.updateSpace }
                        cancelEdit={ this.props.cancelEdit }

                        viewSpace={ this.props.viewSpace }
                        viewAllCards={ this.props.viewAllCards }

                        deleteSpace={ this.props.deleteSpace }
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( SpacesView )
