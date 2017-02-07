import React from 'react';
import { connect } from 'react-redux';

import { loadAllSpacesForCurrentUser
       , editSpace
       , updateSpace
       , cancelEdit
       , deleteSpace
       , markSpaceAsActive
       , markSpaceAsComplete
       , changeFilter } from './spaces-list-actions';

import { addSpace
       , cancelAdd } from './spaces-add-actions';

import { viewAllCards
       , viewSpace
       , changeView } from '../view-actions';

import SpaceListFilter from './controls/space-list-filter-control';
import SpaceList from './controls/space-list-control';
import SpaceAdd from './controls/spaces-add-control';

const mapStateToProps = ( state ) => {
    return {
        filterState: state.spacesList.filterState,
        spaces: state.spacesList.spaces,
        editState: state.spacesList.editState,
        addState: state.spacesAdd
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        changeFilter: ( filter ) => dispatch( changeFilter( filter ) ),

        changeView: ( viewDetails ) => dispatch( changeView( viewDetails ) ),
        loadSpaces: () => dispatch( loadAllSpacesForCurrentUser()  ),
        editSpace: ( spaceId ) => dispatch( editSpace( spaceId ) ),
        updateSpace: ( space ) => dispatch( updateSpace( space ) ),
        cancelEdit:  ( ) => dispatch( cancelEdit() ),
        deleteSpace: ( spaceId ) => dispatch( deleteSpace( spaceId ) ),
        addSpace : ( space ) => dispatch( addSpace( space )),
        cancelAdd : () => dispatch( cancelAdd() ),
        viewSpace : ( spaceId ) => dispatch( viewSpace( spaceId )),
        viewAllCards : () => dispatch( viewAllCards() ),

        markSpaceAsActive: ( spaceId ) => dispatch( markSpaceAsActive( spaceId ) ),
        markSpaceAsComplete: ( spaceId ) => dispatch( markSpaceAsComplete( spaceId ) )

    }
}

class SpacesView extends React.Component {

    constructor( props ) {
        super( props );

        this.props.changeView( {
            title: 'Spaces'
        } )
    }


    render() {

        return(
            <div class='view'>

                <div class='leftColumn'>
                    <SpaceListFilter
                        filterState={ this.props.filterState }
                        changeFilter={ this.props.changeFilter } 

                    />
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
                        filterState={ this.props.filterState }

                        editState={ this.props.editState }
                        updateSpace={ this.props.updateSpace }
                        cancelEdit={ this.props.cancelEdit }

                        viewSpace={ this.props.viewSpace }
                        viewAllCards={ this.props.viewAllCards }

                        deleteSpace={ this.props.deleteSpace }

                        markSpaceAsActive={ this.props.markSpaceAsActive  }
                        markSpaceAsComplete={ this.props.markSpaceAsComplete }
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
