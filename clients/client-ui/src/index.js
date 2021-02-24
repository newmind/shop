
import Application from '@ui.packages/application';
import { dialogReducer } from '@ui.packages/dialog';
import { reducer as cartReducer } from '@ui.packages/cart-widget';
import { tabsReducer } from '@ui.packages/tabs';
import { notificationReducer } from '@ui.packages/notifications';

import { reducer as formReducer } from 'redux-form';

import routes from './configs/routes';
import navigate from './configs/navigate';

import Empty from './wrappers/Empty';
import Navigate from './wrappers/Navigate';

import './styles/index.module.scss';


(async () => {
  try {

    const app = new Application({
      portal: document.getElementById('root'),
      reducers: {
        cart: cartReducer,
        tabs: tabsReducer,
        form: formReducer,
        dialog: dialogReducer,
        notification: notificationReducer,
      },
      routes,
      navigate,
      wrappers: { Empty, Navigate },
    });

    await app.start();
  }
  catch (error) {

    console.error(error);
  }
})();
