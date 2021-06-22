
import { UnauthorizedError } from '@packages/errors';

import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/notifications';

import {
  getDeliveriesRequestAction,
  getDeliveriesRequestFailAction,
  getDeliveriesRequestSuccessAction,

  updateDeliveryRequestAction,
  updateDeliveryRequestFailAction,
  updateDeliveryRequestSuccessAction,
} from './slice';


export const getDeliveries = () => async (dispatch) => {
  try {
    dispatch(getDeliveriesRequestAction());

    const { data } = await request({
      url: '/deliveries',
      method: 'get',
    });

    dispatch(getDeliveriesRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(getDeliveriesRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка при выполнении операции'
    }));
  }
};

export const updateDelivery = (code, status) => async (dispatch) => {
  try {
    dispatch(updateDeliveryRequestAction());

    const { data } = await request({
      url: '/deliveries/' + code,
      method: 'put',
      data: {
        isUse: status,
      },
    });

    dispatch(updateDeliveryRequestSuccessAction(data));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция успешно выполнена',
    }));
  }
  catch(error) {
    dispatch(updateDeliveryRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции'
    }));
  }
};
