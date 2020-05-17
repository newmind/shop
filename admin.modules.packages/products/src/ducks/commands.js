
import request from '@ui.packages/request';
import moment from '@ui.packages/moment';
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


export const getProducts = (params = {}) => async (dispatch) => {
  try {
    dispatch(getProductsRequestAction());

    const result = await request({
      url: '/products',
      method: 'get',
      params: {
        ...params,
        createdFrom: params['createdFrom'] ? moment(params['createdFrom']).format('YYYY-MM-DD 00:00:00+03:00') : null,
        createdTo: params['createdTo'] ? moment(params['createdTo']).format('YYYY-MM-DD 23:59:59+03:00') : null,
      },
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

export const removeProductById = (uuid) => async dispatch => {
  try {
    dispatch(removeProductsRequestAction());

    const result = await request({
      method: 'delete',
      url: `/products`,
      data: { uuid },
    });

    dispatch(removeProductsRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(removeProductsRequestFailAction());
  }
};
