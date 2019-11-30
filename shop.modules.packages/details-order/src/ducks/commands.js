
import request from '@ui.packages/request';

import {
  pageInProcessAction,

  getOperationByIdRequestAction,
  getOperationByIdRequestFailAction,
  getOperationByIdRequestSuccessAction,
} from './actions';


export const pageInProcess = (status) => (dispatch) => {
  dispatch(pageInProcessAction(status));
};

export const getOperationById = (id) => async (dispatch) => {
  try {
    dispatch(getOperationByIdRequestAction());

    const result = await request({
      url: `/operations/${id}`,
      method: 'get',
    });

    dispatch(getOperationByIdRequestSuccessAction(result));
  }
  catch(error) {
    dispatch(getOperationByIdRequestFailAction(error));
  }
};
