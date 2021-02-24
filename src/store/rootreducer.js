import { combineReducers } from 'redux';
import { cartReducer } from '../pages/cart/reducer';
import tabledata from '../../src/reducer/tabledata'
const rootReducer = combineReducers({
tabledata:tabledata
});

export default rootReducer