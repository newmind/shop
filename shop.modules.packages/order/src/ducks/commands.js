
import request from '@ui.packages/request';

import {
  pageInProcessAction,

  getLensesRequestAction,
  getLensesRequestFailAction,
  getLensesRequestSuccessAction,

  createOperationRequestAction,
  createOperationRequestFailAction,
  createOperationRequestSuccessAction,
} from './actions';


export const pageInProcess = (status) => (dispatch) => {
  dispatch(pageInProcessAction(status));
};


export const getLenses = () => async (dispatch) => {
  try {

    dispatch(getLensesRequestAction());

    const result = await request({
      method: 'get',
      url: '/lenses',
    });

    dispatch(getLensesRequestSuccessAction(result));

  } catch(error) {

    dispatch(getLensesRequestFailAction(error));
  }
};

export const createOperation = (order) => async (dispatch) => {
  try {

    dispatch(createOperationRequestAction());

    const result = await request({
      method: 'post',
      url: '/operation',
      data: order,
    });

    dispatch(createOperationRequestSuccessAction(result));

  } catch(error) {

    dispatch(createOperationRequestFailAction(error));
  }
};
