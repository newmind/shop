
import request from '@ui.packages/request';
import { openDialog } from '@ui.packages/dialog';
import { pushNotification } from '@ui.packages/notifications';

import {
  pageInProcessAction,

  setNextPageAction,
  addProductToCartAction,

  getProductsRequest,
  getProductsRequestFail,
  getProductsRequestSuccess,
} from './actions';
import {removeProductFromCartAction} from "@modules.packages/product/src/ducks/actions";


export const pageInProcess = (status) => (dispatch) => dispatch(pageInProcessAction(status));

export const removeProductFromCart = (id) => (dispatch) => dispatch(removeProductFromCartAction(id));

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
    dispatch(getProductsRequest());
    dispatch(setNextPageAction(Number(params['page'] || 1)));

    const result = await request({
      url: '/products',
      params: params,
    });

    dispatch(getProductsRequestSuccess(result));
  }
  catch(error) {

    dispatch(getProductsRequestFail(error));
  }
};
