import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { bannerReducer } from './views/layout/banner-reducer';
import { securityReducer } from './services/security-reducer';

import { allCardsAddReducer } from  './views/all-cards/all-cards-add-reducer';
import { allCardsListReducer } from './views/all-cards/all-cards-list-reducer';

import { spacesListReducer } from'./views/spaces/spaces-list-reducer';
import { spacesAddReducer } from './views/spaces/spaces-add-reducer';


const reducers = combineReducers({
    security: securityReducer,
    banner: bannerReducer,

    allCardsAdd: allCardsAddReducer,
    allCardsList: allCardsListReducer,

    spacesAdd: spacesAddReducer,
    spacesList: spacesListReducer

});

const middleware = applyMiddleware( thunk, logger() );

export default createStore( reducers, middleware );