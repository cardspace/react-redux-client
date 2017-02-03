import { initialState, cardListReducer } from '../../components/cards/card-list-reducer';

const spaceListReducer = cardListReducer.bind( null, 'space' );

export { spaceListReducer }