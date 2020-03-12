
import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/notifications';

import {
  pageInProcessAction,

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


export const pageInProcess = (state) => (dispatch) => dispatch(pageInProcessAction(state));

export const openDialog = () => (dispatch) => dispatch(openDialogAction());

export const closeDialog = () => (dispatch) => dispatch(closeDialogAction());


export const getProducts = (params) => async (dispatch) => {
  try {
    dispatch(getProductsRequestAction());

    const result = await request({
      url: '/products',
      method: 'get',
      params,
    });

    dispatch(getProductsRequestSuccessAction(result));
  }
  catch(error) {
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

    dispatch(createProductsRequestSuccessAction(result['data']));
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

    const result = await request({
      method: 'delete',
      url: `/products`,
      data: { id },
    });

    dispatch(removeProductsRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(removeProductsRequestFailAction());
  }
};
