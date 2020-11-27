
import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Application from './Application';

import initStore, { injectAsyncReducer } from './redux/initStore';

import ApplicationContext from "./contexts/ApplicationContext";

import * as worker from './serviceWorker';


const defaultOptions = {
  portal: null,
  state: {},
  reducers: {},
  middleware: [],
  wrappers: {}
};

class App {
  constructor(options) {
    this.options = {
      ...defaultOptions,
      ...options,
      middleware: [
        thunk,
        ...options['middleware'] || [],
      ],
    };
  }

  _createReducers() {

    this.options['routes'].map(async (route) => {
      const module = await route['module'];
      await injectAsyncReducer(module['name'], module['reducer']);
    });
  }

  start() {
    this._createReducers();
    this.store = initStore(this.options['reducers'], this.options['state'], this.options['middleware']);

    ReactDOM.render(
      <Provider store={this.store}>
        <ApplicationContext.Provider value={this.options}>
          <Application />
        </ApplicationContext.Provider>
      </Provider>
    , this.options['portal']);

    worker.unregister();
  }
}

export default App;
export {
  ApplicationContext
};
