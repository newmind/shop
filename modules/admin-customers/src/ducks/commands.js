
import { UnauthorizedError } from '@packages/errors';

import request from '@ui.packages/request';
import { closeDialog } from '@ui.packages/dialog';
import { pushNotification } from '@ui.packages/notifications';

import {
  getCustomersRequestAction,
  getCustomersRequestFailAction,
  getCustomersRequestSuccessAction,

  createCustomerRequestAction,
  createCustomerRequestFailAction,
  createCustomerRequestSuccessAction,

  updateCustomerRequestAction,
  updateCustomerRequestFailAction,
  updateCustomerRequestSuccessAction,

  deleteCustomerRequestAction,
  deleteCustomerRequestFailAction,
  deleteCustomerRequestSuccessAction,
} from './slice';


export const getCustomers = (params = {}) => async (dispatch) => {
  try {
    dispatch(getCustomersRequestAction());

    const result = await request({
      url: '/customers',
      method: 'get',
      params,
    });

    dispatch(getCustomersRequestSuccessAction(result));
  }
  catch(error) {
    dispatch(getCustomersRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      autoClose: false,
      mode: 'danger',
      title: 'Ошибка при выполнении операции'
    }));
  }
};

export const createCustomer = (data) => async (dispatch) => {
  try {
    dispatch(createCustomerRequestAction());

    const result = await request({
      url: '/customers',
      method: 'post',
      data,
    });

    dispatch(createCustomerRequestSuccessAction(result['data']));
    dispatch(closeDialog('currency'));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция выполнена успешно'
    }));
  }
  catch(error) {
    dispatch(createCustomerRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      autoClose: false,
      mode: 'danger',
      title: 'Ошибка при выполнении операции'
    }));
  }
};

export const updateCustomer = (data) => async (dispatch) => {
  try {
    dispatch(updateCustomerRequestAction());

    const result = await request({
      url: '/customers/' + data['uuid'],
      method: 'put',
      data,
    });

    dispatch(updateCustomerRequestSuccessAction(result['data']));
    dispatch(closeDialog('currency'));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция выполнена успешно'
    }));
  }
  catch(error) {
    dispatch(updateCustomerRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      autoClose: false,
      mode: 'danger',
      title: 'Ошибка при выполнении операции'
    }));
  }
};

export const deleteCustomers = (uuid) => async (dispatch) => {
  try {
    dispatch(deleteCustomerRequestAction());

    const { data } = await request({
      url: '/customers',
      method: 'delete',
      data: { uuid }
    });

    dispatch(deleteCustomerRequestSuccessAction(data));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция выполнена успешно'
    }));
  }
  catch(error) {
    dispatch(deleteCustomerRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      autoClose: false,
      mode: 'danger',
      title: 'Ошибка при выполнении операции'
    }));
  }
};
