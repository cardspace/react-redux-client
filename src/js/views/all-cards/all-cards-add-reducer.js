import { addCardReducer } from '../../components/cards/add-card-reducer';

const allCardsAddReducer = addCardReducer.bind( null, 'allCards' );

export { allCardsAddReducer }