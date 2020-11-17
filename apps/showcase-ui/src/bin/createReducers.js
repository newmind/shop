
import { tabsReducer } from '@ui.packages/tabs';
import { dialogReducer } from '@ui.packages/dialog';
import { cartReducer } from '@ui.packages/cart';
import { notificationReducer } from '@ui.packages/notifications';

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';


const reducers = (asyncReducers = {}) => {
  return combineReducers({
    tabs: tabsReducer,
    dialog: dialogReducer,
    routing: routerReducer,
    notifications: notificationReducer,
    cart: cartReducer,
    form: formReducer,
    ...asyncReducers
  });
};

export default reducers;
