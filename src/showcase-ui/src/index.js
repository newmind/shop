
import React from 'react';
import ReactDOM from 'react-dom';
import jsCookie from 'js-cookie';

import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createCookieMiddleware } from 'redux-cookie';
import { routerMiddleware } from 'react-router-redux';
import createSocketIoMiddleware from 'redux-socket.io';
import createSocketIO from '@packages/socket';

import createStore, { importReducer }  from './bin/createStore';
import createHistory from './bin/createRouter';

import routes from './configs/routes';
import navigate from './configs/navigate';

import App from "./components/Application/components";
import './styles/index.module.scss';

import * as serviceWorker from './serviceWorker';


const socket = createSocketIO(process.env['REACT_APP_SOCKET_HOST']);

const history = createHistory();
const store = createStore({},
  thunk,
  routerMiddleware(history),
  createSocketIoMiddleware(socket),
  createCookieMiddleware(jsCookie, '@@COOKIE/'),
);


(async () => {

  await importReducer('Application');
  await importReducer('Page');
  await importReducer('Dialog');
  await importReducer('Cart');

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


