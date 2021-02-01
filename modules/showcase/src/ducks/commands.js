
import request from '@ui.packages/request';
import { openDialog } from '@ui.packages/dialog';
import { pushNotification } from '@ui.packages/notifications';
import { addProductToCart as addProductToCartAction } from '@ui.packages/cart';

import {
  getProductsAction,
  getProductsFailAction,
  getProductsSuccessAction,
} from './slice';


export const addProductToCart = (product) => (dispatch) => {
  product['recipe'] = {};
  dispatch(addProductToCartAction(product));
  dispatch(pushNotification({
    title: `Товар ${product['uuid']} "${product['brand']}" добавлен в карзину`,
    mode: 'success',
  }));
};

export const fastViewProduct = (product) => (dispatch) => {
  dispatch(openDialog('fast-view-product', product));
};

export const getProducts = (params = {}) => async (dispatch) => {
  try {
    dispatch(getProductsAction());

    const result = await request({
      url: '/products',
      params: params,
    });

    dispatch(getProductsSuccessAction(result));
    //
    // if (document.querySelector('#scroller')) {
    //   document.querySelector('#scroller').scroll(0, 0);
    // }
  }
  catch(error) {

    dispatch(getProductsFailAction(error));
  }
};
