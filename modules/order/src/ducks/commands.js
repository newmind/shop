
import request from '@ui.packages/request';
import { pushNotification } from "@ui.packages/notifications";

import {
  getProductsRequestAction,
  getProductsRequestFailAction,
  getProductsRequestSuccessAction,

  getAmountRequestAction,
  getAmountRequestFailAction,
  getAmountRequestSuccessAction,

  createOperationRequestAction,
  createOperationRequestFailAction,
  createOperationRequestSuccessAction,

  getPaymentsRequestAction,
  getPaymentsRequestFailAction,
  getPaymentsRequestSuccessAction,

  getDeliveriesRequestAction,
  getDeliveriesRequestFailAction,
  getDeliveriesRequestSuccessAction,
} from './slice';


export const getPayments = () => async (dispatch) => {
  try {
    dispatch(getPaymentsRequestAction());

    const result = await request({
      url: '/operations/payments',
      method: 'get',
    });

    dispatch(getPaymentsRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(getPaymentsRequestFailAction(error));
  }
};

export const getDeliveries = () => async (dispatch) => {
  try {
    dispatch(getDeliveriesRequestAction());

    const result = await request({
      url: '/operations/deliveries',
      method: 'get',
    });

    dispatch(getDeliveriesRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(getDeliveriesRequestFailAction(error));
  }
};

export const getProducts = (uuid) => async (dispatch) => {
  try {
    dispatch(getProductsRequestAction());

    const result = await request({
      url: '/products',
      method: 'get',
      params: {
        uuid,
      },
    });

    dispatch(getProductsRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(getProductsRequestFailAction(error));
    dispatch(pushNotification({
      title: 'Ошибка при выполнении операции',
      mode: 'danger',
    }));
  }
};

export const getAmount = (uuid) => async (dispatch) => {
  try {
    dispatch(getAmountRequestAction());

    const result = await request({
      url: '/products/amount',
      method: 'post',
      data: {
        uuid,
      },
    });

    dispatch(getAmountRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(getAmountRequestFailAction(error));
    dispatch(pushNotification({
      title: 'Ошибка при выполнении операции',
      mode: 'danger',
    }));
  }
};

export const createOperation = (order) => async (dispatch) => {
  try {
    dispatch(createOperationRequestAction());

    const result = await request({
      method: 'post',
      url: '/operations',
      data: order,
    });

    dispatch(createOperationRequestSuccessAction());

    return result['data'];
  }
  catch(error) {
    dispatch(createOperationRequestFailAction(error));
    dispatch(pushNotification({
      title: 'Ошибка при выполнении операции',
      mode: 'danger',
    }));

    return false;
  }
};
