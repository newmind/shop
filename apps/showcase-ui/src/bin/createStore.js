
import { createStore, applyMiddleware } from 'redux';
import createReducer from './createReducers';
import { composeWithDevTools } from 'redux-devtools-extension';


let store = null;

export default (initialState, ...middleware) => {
  store = createStore(createReducer(), initialState, composeWithDevTools(applyMiddleware(...middleware)));
  store.asyncReducers = {};
  return store;
}

export const injectAsyncReducer = (name, asyncReducer) => {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
};

export const checkReducer = (name) => {
  const container = store.getState();
  return (name in container);
};

export const importReducer = async (component) => {
  const module = await import(`../components/${component}/ducks/reducer.js`);
  injectAsyncReducer(module['KEY'], module['default']);
};
