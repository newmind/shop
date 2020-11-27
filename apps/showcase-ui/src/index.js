
import { cartReducer } from '@ui.packages/cart';
import Application from '@ui.packages/application';
import { dialogReducer } from '@ui.packages/dialog';
import { middleware as requestMiddleware } from '@ui.packages/request'

import { reducer as formReducer } from 'redux-form';

import routes from './configs/routes';
import navigate from './configs/navigate';

import Empty from './wrappers/Empty';
import Navigate from './wrappers/Navigate';
import Composite from './wrappers/Composite';

import './styles/index.module.scss';


try {
  const app = new Application({
    portal: document.getElementById('root'),
    reducers: {
      cart: cartReducer,
      form: formReducer,
      dialog: dialogReducer,
    },
    routes,
    navigate,
    middleware: [
      requestMiddleware({
        host: process.env['REACT_APP_API_HOST'],
        silent: true,
      }),
    ],
    wrappers: { Empty, Navigate, Composite },
  });

  app.start();
}
catch (error) {

  console.error(error);
}

