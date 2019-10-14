
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import { tabsReducer } from '@ui.packages/tabs';
import { dialogReducer } from '@ui.packages/dialog';


export default (asyncReducers = {}) => {
  return combineReducers({
    tabs: tabsReducer,
    dialog: dialogReducer,
    routing: routerReducer,
    form: formReducer,
    ...asyncReducers
  });
}