import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { bannerReducer } from './views/layout/banner-reducer';
import { securityReducer } from './views/layout/security-reducer';

import { allCardsAddCardReducer } from  './views/all-cards/add-card-reducer';
import { allCardsCardListReducer } from './views/all-cards/card-list-reducer';


const reducers = combineReducers({
    security: securityReducer,
    banner: bannerReducer,
    allCardsAddCard: allCardsAddCardReducer,
    allCardsCardList: allCardsCardListReducer
});

const middleware = applyMiddleware( thunk, logger() );

export default createStore( reducers, middleware );