import { addCardReducer } from '../../components/cards/add-card-reducer';

const spaceAddReducer = addCardReducer.bind( null, 'space' );

export { spaceAddReducer }