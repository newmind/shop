
import request from '@ui.packages/request';

import {
  pageInProcessAction,

  getOperationsRequestAction,
  getOperationsRequestFailAction,
  getOperationsRequestSuccessAction,
} from './actions';


export const pageInProcess = (status) => (dispatch) => {
  dispatch(pageInProcessAction(status));
};

export const getOperations = () => async (dispatch) => {
  try {
    dispatch(getOperationsRequestAction());

    const result = await request({
      url: '/operations',
      method: 'get',
    });

    dispatch(getOperationsRequestSuccessAction(result));
  }
  catch (error) {

    dispatch(getOperationsRequestFailAction(error));
  }
};
