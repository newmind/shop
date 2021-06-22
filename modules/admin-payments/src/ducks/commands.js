
import { UnauthorizedError } from '@packages/errors';

import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/notifications';

import {
  getPaymentsRequestAction,
  getPaymentsRequestFailAction,
  getPaymentsRequestSuccessAction,

  updatePaymentRequestAction,
  updatePaymentRequestFailAction,
  updatePaymentRequestSuccessAction,
} from './slice';


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
      content: 'Ошибка при выполнении операции'
    }));
  }
};

export const updatePayment = (code, status) => async (dispatch) => {
  try {
    dispatch(updatePaymentRequestAction());

    const { data } = await request({
      url: '/payments/' + code,
      method: 'put',
      data: {
        isUse: status,
      },
    });

    dispatch(updatePaymentRequestSuccessAction(data));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция успешно выполнена',
    }));
  }
  catch(error) {
    dispatch(updatePaymentRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции'
    }));
  }
};
