
import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/notifications';

import {
  openDialogAction,
  closeDialogAction,

  getProductsRequestAction,
  getProductsRequestFailAction,
  getProductsRequestSuccessAction,

  createProductsRequestAction,
  createProductsRequestFailAction,
  createProductsRequestSuccessAction,

  removeProductsRequestAction,
  removeProductsRequestFailAction,
  removeProductsRequestSuccessAction,
} from './actions';


export const openDialog = () => dispatch => {
  dispatch(openDialogAction());
};

export const closeDialog = () => dispatch => {
  dispatch(closeDialogAction());
};


export const getProducts = () => async dispatch => {
  try {

    dispatch(getProductsRequestAction());

    const result = await request({
      method: 'get',
      url: '/products'
    });

    dispatch(getProductsRequestSuccessAction(result['items']));

  } catch(error) {
    dispatch(getProductsRequestFailAction());
  }
};

export const createProducts = (data) => async dispatch => {
  try {

    dispatch(createProductsRequestAction());

    const result = await request({
      method: 'post',
      url: '/products',
      data: data,
    });

    dispatch(createProductsRequestSuccessAction(result));
    dispatch(closeDialog());

  } catch(error) {
    dispatch(pushNotification({
      type: 'Ошибка запроса',
      message: error['message'],
      mode: 'danger'
    }));
    dispatch(createProductsRequestFailAction());
  }
};

export const removeProductById = (id) => async dispatch => {
  try {

    dispatch(removeProductsRequestAction());

    const product = await request({
      method: 'delete',
      url: `/products/${id}`,
    });

    dispatch(removeProductsRequestSuccessAction(product));

  } catch(error) {

    dispatch(removeProductsRequestFailAction());
  }
};
