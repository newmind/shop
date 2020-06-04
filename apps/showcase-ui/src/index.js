
import React from 'react';
import ReactDOM from 'react-dom';

import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createSocketIoMiddleware from 'redux-socket.io';

import createSocketIO from '@ui.packages/socket';
import { middleware as requestMiddleware } from "@ui.packages/request";

import createStore, { importReducer }  from './bin/createStore';
import createHistory from './bin/createRouter';

import routes from './configs/routes';
import navigate from './configs/navigate';

import App from "./components/Application/components";
import /* webpackPreload: true */ './styles/index.module.scss';

import * as serviceWorker from './serviceWorker';


const socket = createSocketIO(process.env['REACT_APP_SOCKET_HOST'], {
  path: '/showcase.socket.io',
});

const history = createHistory();
const store = createStore({},
  thunk,
  routerMiddleware(history),
  createSocketIoMiddleware(socket),
  requestMiddleware(window.location.origin)
);


(async () => {

  await importReducer('Application');
  await importReducer('Module');
  await importReducer('Page');

  ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <App
          routes={routes}
          navigate={navigate}
        />
      </Router>
    </Provider>
  ), document.getElementById('root'));

  serviceWorker.unregister();
})();


