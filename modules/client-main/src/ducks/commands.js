
import request from "@ui.packages/request";
import { pushNotification } from '@ui.packages/notifications';

import {
  getMainAction,

  getProductRequestAction,
  getProductRequestFailAction,
  getProductRequestSuccessAction,
} from './slice';


export const getTypes = () => async (dispatch) => {
  try {
    const result = await request({
      url: '/main',
    });

    dispatch(getMainAction(result['data']));
  }
  catch(error) {

    dispatch(pushNotification({
      title: 'Ошибка при загрузке глфвной страницы',
      mode: 'danger',
    }));
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
