import React from 'react';

import SpaceSummaryCard from './space-summary-card-control';
import SpaceSummaryEditor from './space-summary-editor-control';

import { spaceFilters } from '../space-filters';

export default class SpaceList extends React.Component {

    // props
    //  loadSpaces : loads spaces from the server
    //  spaces: array of {
    //      id: space id
    //      title: space title
    //      text: space text
    //  }
    //  editState    : state of the item begin edited if there is one
    //  deleteSpace  : delete button clicked, expects a space id
    //  viewSpace    : view button clicked, expects a space id
    //  viewAllCards : view for summary card that represents the all cards view
    //  editSpace   : edit button clicked, expects a space id
    //  updateSpace : update button clicked, { id, title, text }
    //  cancelEdit  : cancel button clicked

    constructor( props ) {
        super( props );

        this.props.loadSpaces();
    }    


    createLineItem( space ) {

        const spaceIsBeingEdited = () => {
            return this.props.editState
                && this.props.editState.id == space.id;
        }

        const spaceSummaryCard = () => {

            return(
                <SpaceSummaryCard 
                    space={ space } 
                    editSpace={ this.props.editSpace.bind( this, space.id ) }
                    deleteSpace={ this.props.deleteSpace.bind( this, space.id ) } 
                    viewSpace={ this.props.viewSpace.bind( this, space.id ) }
                    markSpaceAsActive={ this.props.markSpaceAsActive.bind( this, space.id ) }
                    markSpaceAsComplete={ this.props.markSpaceAsComplete.bind( this, space.id ) }
                />
            )
        }

        const spaceSummaryEditor = () => {

            return(
                <SpaceSummaryEditor 
                    editState={ this.props.editState }
                    updateSpace={ this.props.updateSpace }
                    cancelEdit={ this.props.cancelEdit }
                />
            )
        }

        return spaceIsBeingEdited() 
                ? spaceSummaryEditor()
                : spaceSummaryCard();

    }

    createAllCards( filter ) {

        const allCardsCard = ( ) => {

            return(
                <SpaceSummaryCard 
                    space={ { title:'All cards', text:'A list of all cards that have been created.'} }
                    viewSpace={ this.props.viewAllCards }
                 />
            )
        }

        console.log( this.props )
        console.log( this.props.filterState )

        return filter == spaceFilters.all
                ? allCardsCard() 
                : null;

    }

    render() {
        return(
            <div class='spacelist' >
                { this.createAllCards( this.props.filterState ) }
                { this.props.spaces.map( space => this.createLineItem( space ) )  }

            </div>
        );
    }

}