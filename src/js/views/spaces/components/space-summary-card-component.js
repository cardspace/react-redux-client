import React from 'react';

export default class SpaceSummaryCard extends React.Component {

    // props = {
    //      space :{
    //          title    : the title text 
    //          text     : main body text
    //      },
    //      viewSpace   : view button event handler, if null the button is not displayed
    //      editSpace   : edit the space summary
    //      deleteSpace : delete button event handler, if null the delete button is not displayed
    //  }

    render() {

        let deleteButton = ( ) => {

            const button = () => {
                return(
                    <button 
                        class='space-summary-button' 
                        onClick={ this.props.deleteSpace } >
                        Delete
                    </button>
                )
            }

            return this.props.deleteSpace
                    ? button()
                    : null;
        }


        return(        
            <div class='space-summary readonly' onDoubleClick={ this.props.editSpace } >

                <div>
                    <h2 class='space-summary-title'>{ this.props.space.title }</h2>
                    <textarea class='space-summary-text' value={ this.props.space.text }></textarea>
                </div>

                <div class='space-summary-action-bar'>
                    <button 
                        class='space-summary-button'
                        onClick={ this.props.viewSpace }
                    >
                        View
                    </button>
                    { deleteButton() }
                </div>

            </div>
        );
    }
}