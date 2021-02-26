
import request from '@ui.packages/request';
import { pushNotification } from "@ui.packages/notifications";

import {
  getProductsRequestAction,
  getProductsRequestFailAction,
  getProductsRequestSuccessAction,

  getAmountRequestAction,
  getAmountRequestFailAction,
  getAmountRequestSuccessAction,
} from './slice';


export const getProducts = (uuid, token) => async (dispatch) => {
  try {
    dispatch(getProductsRequestAction());

    const result = await request({
      url: '/products',
      method: 'get',
      cancelToken: token['token'],
      params: {
        uuid,
      }
    });

    dispatch(getProductsRequestSuccessAction(result['data'] || []));
  }
  catch(error) {

    dispatch(getProductsRequestFailAction(error));
    dispatch(pushNotification({
      content: 'Ошибка при выполнении операции',
      mode: 'danger',
    }));
  }
};

export const getAmount = (uuid, token) => async (dispatch) => {
  try {
    dispatch(getAmountRequestAction());

    const result = await request({
      url: '/products/amount',
      method: 'post',
      cancelToken: token['token'],
      data: {
        uuid,
      },
    });

    dispatch(getAmountRequestSuccessAction(result['data'] || []));
  }
  catch(error) {

    dispatch(getAmountRequestFailAction(error));
    dispatch(pushNotification({
      content: 'Ошибка при выполнении операции',
      mode: 'danger',
    }));
  }
};
