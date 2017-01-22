import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { cardsReducer } from './cards-reducer';
import { addCardReducer } from './add-card-reducer';

const reducers = combineReducers({
    addCard: addCardReducer,
    cards: cardsReducer
});

const middleware = applyMiddleware( thunk, logger() );

export default createStore( reducers, middleware );