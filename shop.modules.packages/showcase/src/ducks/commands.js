
import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/notifications';

import {
  pageInProcessAction,

  setNextPageAction,
  addProductToCartAction,

  getProductsRequest,
  getProductsRequestFail,
  getProductsRequestSuccess,

  getAdditionalDataRequestAction,
  getAdditionalDataRequestFailAction,
  getAdditionalDataRequestSuccessAction,
} from './actions';


export const pageInProcess = (status) => (dispatch) => {
  dispatch(pageInProcessAction(status));
};


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

    const result = await request({
      url: '/products',
      params: params,
    });

    if (params['page']) {
      dispatch(setNextPageAction(Number(params['page'])));
    }
    dispatch(getProductsRequestSuccess(result));
  }
  catch(error) {
    dispatch(getProductsRequestFail(error));
  }
};

export const getDataForFilter = (params) => async dispatch => {
  try {

    dispatch(getAdditionalDataRequestAction());

    const result = await request({
      method: 'get',
      url: '/products/additional-data',
      params,
    });

    dispatch(getAdditionalDataRequestSuccessAction(result['data']));
  }
  catch (error) {
    dispatch(getAdditionalDataRequestFailAction(error));
  }
};
