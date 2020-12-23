
import request from '@ui.packages/request';
import { openDialog } from '@ui.packages/dialog';

import {
  createOperationAction,
  createOperationFailAction,
  createOperationSuccessAction,
} from './slice';


export const pageInProcess = (status) => (dispatch) => {
  dispatch(pageInProcessAction(status));
  dispatch(openDialog('success'));
};

export const createOperation = (order) => async (dispatch) => {
  try {
    dispatch(createOperationAction());

    const result = await request({
      method: 'post',
      url: '/operations',
      data: order,
    });

    dispatch(createOperationSuccessAction(result));
    // dispatch(push(process.env['PUBLIC_URL'] + `/order/${result['externalId']}`));
  }
  catch(error) {

    dispatch(createOperationFailAction(error));
  }
};
