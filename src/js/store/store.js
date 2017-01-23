import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { addCardReducer } from './add-card-reducer';
import { bannerReducer } from './banner-reducer';
import { cardsReducer } from './cards-reducer';
import { securityReducer } from './security-reducer';

const reducers = combineReducers({
    addCard: addCardReducer,
    banner: bannerReducer,
    cards: cardsReducer,
    security: securityReducer
});

const middleware = applyMiddleware( thunk, logger() );

export default createStore( reducers, middleware );