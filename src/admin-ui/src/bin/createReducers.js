
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import { dialogReducer } from '@ui.packages/dialog';
import { notificationReducer } from '@ui.packages/notifications';


export default (asyncReducers = {}) => {
  return combineReducers({
    dialog: dialogReducer,
    notifications: notificationReducer,
    routing: routerReducer,
    form: formReducer,

    ...asyncReducers
  });
}