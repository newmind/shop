
import { createStore, applyMiddleware } from 'redux';
import createReducer from './createReducers';
import { composeWithDevTools } from 'redux-devtools-extension';


let store = null;
const RESET = 'RESET';

export default (initialState, ...middleware) => {
  store = createStore(createReducer(), initialState, composeWithDevTools(applyMiddleware(...middleware)));
  store.asyncReducers = {};
  return store;
}

export const injectAsyncReducer = async (name, asyncReducer) => {
  return new Promise(resolve => {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
    resolve();
  });
};

export const rejectAsyncReducer = async (name) => {
  // delete store.asyncReducers[name];
  // store.replaceReducer(createReducer(store.asyncReducers));
  store.dispatch({ type: RESET });
};

export const importReducer = async (component) => {
  const module = await import(`../components/${component}/ducks/reducer.js`);
  injectAsyncReducer(module['KEY'], module['default']);
};
