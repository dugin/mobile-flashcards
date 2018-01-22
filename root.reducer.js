import { combineReducers } from 'redux';
import deckReducer from './reducers/deck.reducer';

export default combineReducers({
  deck: deckReducer
});
