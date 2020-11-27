
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';


let store = null;


export function injectAsyncReducer(name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(combineReducers(store['asyncReducers']));
}

export function checkReducer(name) {
  const container = store.getState();
  return (name in container);
}

export default function initStore(reducers = {}, initialState = {}, middleware = []) {
  store = createStore(
    combineReducers(reducers),
    initialState,
    composeWithDevTools(
      applyMiddleware(...middleware)
    )
  );
  store['asyncReducers'] = { ...reducers };
  return store;
}
