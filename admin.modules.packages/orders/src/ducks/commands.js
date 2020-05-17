
import request from '@ui.packages/request';

import {
  pageInProcessAction,

  getOperationsRequestAction,
  getOperationsRequestFailAction,
  getOperationsRequestSuccessAction,

  getStatusesRequestAction,
  getStatusesRequestFailAction,
  getStatusesRequestSuccessAction,

  updateStatusRequestAction,
  updateStatusRequestFailAction,
  updateStatusRequestSuccessAction,
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

export const getStatuses = () => async (dispatch) => {
  try {
    dispatch(getStatusesRequestAction());

    const result = await request({
      url: '/statuses',
      method: 'get',
    });

    dispatch(getStatusesRequestSuccessAction(result['data']));
  }
  catch (error) {

    dispatch(getStatusesRequestFailAction(error));
  }
};

export const updateStatus = (data, statusCode) => async (dispatch) => {
  try {
    dispatch(updateStatusRequestAction(data['externalId']));

    const result = await request({
      url: '/operations/' + data['externalId'],
      method: 'put',
      data: {
        ...data,
        statusCode,
      },
    });

    dispatch(updateStatusRequestSuccessAction(result['data']));
  }
  catch (error) {

    dispatch(updateStatusRequestFailAction(error));
  }
};
