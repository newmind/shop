
import moment from '@packages/moment';

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
