
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';


export default (asyncReducers = {}) => {
  return combineReducers({
    routing: routerReducer,
    form: formReducer,
    ...asyncReducers
  });
}