
import { UnauthorizedError, NotfoundError } from '@packages/errors';

import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/notifications';

import {
  getDeliveriesRequestAction,
  getDeliveriesRequestFailAction,
  getDeliveriesRequestSuccessAction,

  getPaymentsRequestAction,
  getPaymentsRequestFailAction,
  getPaymentsRequestSuccessAction,

  getShopRequestAction,
  getShopRequestFailAction,
  getShopRequestSuccessAction,

  createShopRequestAction,
  createShopRequestFailAction,
  createShopRequestSuccessAction,

  updateShopRequestAction,
  updateShopRequestFailAction,
  updateShopRequestSuccessAction,
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
      title: 'Ошибка при выполнении операции'
    }));
  }
};

export const getPayments = () => async (dispatch) => {
  try {
    dispatch(getPaymentsRequestAction());

    const { data } = await request({
      url: '/payments',
      method: 'get',
    });

    dispatch(getPaymentsRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(getPaymentsRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции'
    }));
  }
};


export const getShop = (uuid) => async (dispatch) => {
  try {
    dispatch(getShopRequestAction());

    const { data } = await request({
      url: '/shops',
      method: 'get',
      params: {
        uuid,
      }
    });

    if ( ! data.length) {
      throw new NotfoundError('Магазин не найден');
    }

    dispatch(getShopRequestSuccessAction(data[0]));
  }
  catch(error) {
    dispatch(getShopRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции'
    }));
  }
};

export const createShop = (data) => async (dispatch) => {
  try {
    dispatch(createShopRequestAction());

    const result = await request({
      url: '/shops',
      method: 'post',
      data: {
        uuid: data['uuid'],
        name: data['name'],
        address: data['address'],
        description: data['description'],
        deliveries: data['deliveries'],
        payments: data['payments'],
        updatedAt: data['updatedAt'],
      },
    });

    dispatch(createShopRequestSuccessAction(result['data']));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция выполнена успешно'
    }));

    return true;
  }
  catch(error) {
    dispatch(createShopRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции'
    }));

    return false;
  }
};

export const updateShop = (data) => async (dispatch) => {
  try {
    dispatch(updateShopRequestAction());

    const result = await request({
      url: '/shops/' + data['uuid'],
      method: 'put',
      data: {
        uuid: data['uuid'],
        name: data['name'],
        address: data['address'],
        description: data['description'],
        deliveries: data['deliveries'],
        payments: data['payments'],
        updatedAt: data['updatedAt'],
      },
    });

    dispatch(updateShopRequestSuccessAction(result['data']));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция выполнена успешно'
    }));
  }
  catch(error) {
    dispatch(updateShopRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции'
    }));
  }
};
