
import { UnauthorizedError } from '@packages/errors';

import request from '@ui.packages/request';
import { closeDialog } from '@ui.packages/dialog';
import { pushNotification } from '@ui.packages/notifications';

import {
  getShopsRequestAction,
  getShopsRequestFailAction,
  getShopsRequestSuccessAction,

  deleteShopsRequestAction,
  deleteShopsRequestFailAction,
  deleteShopsRequestSuccessAction,
} from './slice';


export const getShops = () => async (dispatch) => {
  try {
    dispatch(getShopsRequestAction());

    const { data } = await request({
      url: '/shops',
      method: 'get',
    });

    dispatch(getShopsRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(getShopsRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции'
    }));
  }
};

export const deleteShop = (uuid) => async (dispatch) => {
  try {
    dispatch(deleteShopsRequestAction());

    const result = await request({
      url: '/shops',
      method: 'delete',
      data: {
        uuid: [uuid],
      },
    });

    dispatch(deleteShopsRequestSuccessAction(result['data']));
    dispatch(closeDialog());
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция выполнена успешно'
    }));
  }
  catch(error) {
    dispatch(deleteShopsRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции'
    }));
  }
};
