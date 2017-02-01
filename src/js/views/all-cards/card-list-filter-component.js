import React from 'react';
import { cardFilters } from './card-filters';


export default class CardListFilter extends React.Component {
    // props = {
    //    filterState: the current filter state. [ 'all', 'active', 'complete' ]    
    //    changeFilter: action that is called when the filter is changed
    // }


    isFilteredOnActive () {
        return this.props.filterState == cardFilters.active;
    }

    isFilteredOnComplete () {
        return this.props.filterState == cardFilters.complete;
    }

    allClass() {

        return !this.isFilteredOnActive() && !this.isFilteredOnComplete()
             ? ' selected'
             : '';
    }

    activeClass() {

        return this.isFilteredOnActive()
             ? ' selected'
             : '';
    }

    completeClass() {
        
        return this.isFilteredOnComplete()
             ? ' selected'
             : '';
    }

    filterSelected ( filter ) {
        
        if ( filter != this.props.filterState ) {
            this.props.changeFilter( filter );
        } 
    }




    render() {

        return(
            <div >
                <ul class='card-list-filter'>
                    <li 
                        class={`card-list-filter-item  ${ this.allClass() }`}
                        onClick={ this.filterSelected.bind( this, cardFilters.all ) }
                    >
                        All
                    </li>
                    <li 
                        class={`card-list-filter-item  ${ this.activeClass() }`}
                        onClick={ this.filterSelected.bind( this, cardFilters.active ) }
                    >
                        Active
                    </li>
                    <li 
                        class={`card-list-filter-item  ${ this.completeClass() }`}
                        onClick={ this.filterSelected.bind( this, cardFilters.complete ) }
                    >
                        Complete
                    </li>
                </ul>
            </div>
        )
    }

}