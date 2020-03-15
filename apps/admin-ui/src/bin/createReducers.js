
import { dialogReducer } from '@ui.packages/dialog';
import { tabsReducer } from '@ui.packages/tabs';
import { notificationReducer } from '@ui.packages/notifications';

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';


export default (asyncReducers = {}) => {
  return combineReducers({
    form: formReducer,
    tabs: tabsReducer,
    dialog: dialogReducer,
    routing: routerReducer,
    notifications: notificationReducer,

    ...asyncReducers
  });
}