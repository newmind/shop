
import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/notifications';

import {
  pageInProcessAction,

  setNextPageAction,
  addProductToCartAction,

  getProductsRequest,
  getProductsRequestFail,
  getProductsRequestSuccess,
} from './actions';


export const pageInProcess = (status) => (dispatch) => dispatch(pageInProcessAction(status));


export const addProductToCart = (product) => dispatch => {
  product['recipe'] = {};
  dispatch(addProductToCartAction(product));
  dispatch(pushNotification({
    title: 'Товар добавлен в корзину',
  }));
};


export const getProducts = (params) => async dispatch => {
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
