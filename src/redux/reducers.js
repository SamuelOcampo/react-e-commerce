import { combineReducers } from 'redux';
import { reducer as cartReducer } from './cart';
import { reducer as catalogReducer } from './catalog';

const rootReducer = combineReducers({
  cart: cartReducer,
  catalog: catalogReducer
});

export default rootReducer;
