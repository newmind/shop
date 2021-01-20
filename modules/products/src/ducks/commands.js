
import { Mode } from '@ui.packages/types';
import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/notifications';

import {
  getProductsRequestAction,
  getProductsRequestFailAction,
  getProductsRequestSuccessAction,

  removeProductRequestAction,
  removeProductRequestFailRequest,
  removeProductRequestSuccessAction,
} from './slice';


export const getProducts = (params = {}) => async (dispatch) => {
  try {
    dispatch(getProductsRequestAction());

    const result = await request({
      url: '/products',
      method: 'get',
      params,
    });

    dispatch(getProductsRequestSuccessAction(result));

    if (document.querySelector('#scroller')) {
      document.querySelector('#scroller').scroll(0, 0);
    }
  }
  catch(error) {
    dispatch(getProductsRequestFailAction());
    dispatch(pushNotification({
      title: 'Ошибка при запросе данных',
      connect: `${error['data']['message']} (${error['data']['code']})`,
      mode: Mode.DANGER,
      autoClose: false,
    }));
  }
};

export const removeProductById = (uuid) => async dispatch => {
  try {
    dispatch(removeProductRequestAction());

    const result = await request({
      method: 'delete',
      url: `/products`,
      data: { uuid },
    });

    dispatch(removeProductRequestSuccessAction(result['data']));
    dispatch(pushNotification({
      title: 'Продукт удален',
      mode: Mode.SUCCESS,
    }));
  }
  catch(error) {
    dispatch(removeProductRequestFailRequest(error));
    dispatch(pushNotification({
      title: 'Ошибка при удаленнии продукта',
      connect: `${error['data']['message']} (${error['data']['code']})`,
      mode: Mode.DANGER,
      autoClose: false,
    }));
  }
};
