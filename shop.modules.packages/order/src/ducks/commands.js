
import { openDialog } from '@ui.packages/dialog';
import request from '@ui.packages/request';

import { push } from 'react-router-redux';

import {
  pageInProcessAction,

  createOperationRequestAction,
  createOperationRequestFailAction,
  createOperationRequestSuccessAction,
} from './actions';


export const pageInProcess = (status) => (dispatch) => {
  dispatch(pageInProcessAction(status));
  dispatch(openDialog('success'));
};

export const createOperation = (order) => async (dispatch) => {
  try {
    dispatch(createOperationRequestAction());

    const result = await request({
      method: 'post',
      url: '/operations',
      data: order,
    });

    dispatch(createOperationRequestSuccessAction(result));
    dispatch(push(process.env['PUBLIC_URL'] + `/order/${result['externalId']}`));
  }
  catch(error) {
    dispatch(createOperationRequestFailAction(error));
  }
};
