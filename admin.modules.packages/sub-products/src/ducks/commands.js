
import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/notifications';

import {
  pageInProcess,

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

  dispatch(pageInProcess(true));
  dispatch(getProductsRequestAction());

  try {

    const result = await request({
      method: 'get',
      url: '/sub-products'
    });

    dispatch(getProductsRequestSuccessAction(result['items']));

  } catch(error) {

    dispatch(getProductsRequestFailAction());
  }

  dispatch(pageInProcess(false));
};

export const createProducts = (data) => async dispatch => {
  try {

    dispatch(createProductsRequestAction());

    const result = await request({
      method: 'post',
      url: '/sub-products',
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

export const removeProductById = (id, status) => async dispatch => {
  try {

    dispatch(removeProductsRequestAction());

    const product = await request({
      method: 'put',
      url: `/sub-products/${id}/status/${status}`,
    });

    dispatch(removeProductsRequestSuccessAction(product));

  } catch(error) {

    dispatch(removeProductsRequestFailAction());
  }
};
