
import { tabsReducer } from '@ui.packages/tabs';
import { dialogReducer } from '@ui.packages/dialog';
import { cartReducer } from '@ui.packages/cart';

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';


export default (asyncReducers = {}) => {
  return combineReducers({
    tabs: tabsReducer,
    dialog: dialogReducer,
    routing: routerReducer,
    cart: cartReducer,
    form: formReducer,
    ...asyncReducers
  });
}