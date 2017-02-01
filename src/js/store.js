import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { bannerReducer } from './views/layout/banner-reducer';
import { securityReducer } from './services/security-reducer';

import { allCardsAddCardReducer } from  './views/all-cards/add-card-reducer';
import { allCardsCardListReducer } from './views/all-cards/card-list-reducer';
import { spacesListReducer } from'./views/spaces/spaces-list-reducer';
import { spacesAddReducer } from './views/spaces/spaces-add-reducer';

const reducers = combineReducers({
    security: securityReducer,
    banner: bannerReducer,
    
    allCardsAddCard: allCardsAddCardReducer,
    allCardsCardList: allCardsCardListReducer,

    spacesAdd: spacesAddReducer,
    spacesList: spacesListReducer
});

const middleware = applyMiddleware( thunk, logger() );

export default createStore( reducers, middleware );