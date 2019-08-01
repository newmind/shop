
import request from '@ui.packages/request';

import {
  createOperationRequestAction,
  createOperationRequestFailAction,
  createOperationRequestSuccessAction,
} from './actions';


export const createOperation = (order) => async dispatch => {
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
