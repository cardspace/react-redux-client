import { combineReducers } from 'redux';

import addCardReducer from './add-card-reducer';
import cardListReducer from './card-list-reducer';

export default combineReducers({
    addCard: addCardReducer,
    cardList: cardListReducer 
});


