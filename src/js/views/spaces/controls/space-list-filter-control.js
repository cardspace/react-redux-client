import React from 'react';
import { spaceFilters } from '../space-filters';


export default class SpaceListFilter extends React.Component {
    // props: 
    //    filterState: the current filter state. [ 'all', 'active', 'complete' ]    
    //    changeFilter: action that is called when the filter is changed

    isFilteredOnActive () {
        return this.props.filterState == spaceFilters.active;
    }

    isFilteredOnComplete () {
        return this.props.filterState == spaceFilters.complete;
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
                <ul class='space-list-filter'>
                    <li 
                        class={`space-list-filter-item  ${ this.allClass() }`}
                        onClick={ this.filterSelected.bind( this, spaceFilters.all ) }
                    >
                        All
                    </li>
                    <li 
                        class={`space-list-filter-item  ${ this.activeClass() }`}
                        onClick={ this.filterSelected.bind( this, spaceFilters.active ) }
                    >
                        Active
                    </li>
                    <li 
                        class={`space-list-filter-item  ${ this.completeClass() }`}
                        onClick={ this.filterSelected.bind( this, spaceFilters.complete ) }
                    >
                        Complete
                    </li>
                </ul>
            </div>
        )
    }

}