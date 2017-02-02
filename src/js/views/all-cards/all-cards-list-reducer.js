import { initialState, cardListReducer } from '../../components/cards/card-list-reducer';

const allCardsListReducer = cardListReducer.bind( null, 'allCards' );

export { allCardsListReducer }