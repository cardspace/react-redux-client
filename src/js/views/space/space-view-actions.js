/*  NOTE - most of the view actions are generated from the card list component

*/
import axios from 'axios';

import { space_url } from 'config';
import { changeView } from '../view-actions';

import { standardConfig, standardErrorResponse } from '../../services/http';


export function enterView ( spaceId ) {

    return ( dispatch ) => {

        axios
           .get( `${space_url}/${spaceId}`, standardConfig() )
           .then( response =>

                dispatch( changeView({
                    title: `${response.data.title} ( Space )`
                }))

            )
            .catch( error => { 

                dispatch( changeView({
                    title: `Space`
                }))
                

            } )


        // load the space from the space
        // then dispatch the title change


    }

}

