
import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/notifications';

import {
  getProductsAction,
  getProductsFailAction,
  getProductsSuccessAction,

  getProductRequestAction,
  getProductRequestFailAction,
  getProductRequestSuccessAction,
} from './slice';


export const getProducts = (params = {}) => async (dispatch) => {
  try {
    dispatch(getProductsAction());

    const result = await request({
      url: '/products',
      params: params,
    });

    dispatch(getProductsSuccessAction(result));

    // if (document.querySelector('#scroller')) {
    //   document.querySelector('#scroller').scroll(0, 0);
    // }
  }
  catch(error) {

    dispatch(getProductsFailAction(error));
  }
};

export const getProduct = (uuid) => async (dispatch) => {
  try {
    dispatch(getProductRequestAction());

    const result = await request({
      method: 'get',
      url: `/products/${uuid}`
    });

    dispatch(getProductRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(getProductRequestFailAction(error));

    dispatch(pushNotification({
      title: 'Ошибка при выполнении операции',
      mode: 'danger',
    }));
  }
};
