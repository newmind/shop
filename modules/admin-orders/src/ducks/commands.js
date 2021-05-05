
import { UnauthorizedError } from '@packages/errors';

import { Mode } from "@ui.packages/types";
import request from '@ui.packages/request';
import { pushNotification } from "@ui.packages/notifications";

import {
  getItemsRequestAction,
  getItemsRequestFailAction,
  getItemsRequestSuccessAction,

  getStatusesRequestAction,
  getStatusesRequestFailAction,
  getStatusesRequestSuccessAction,
} from './slice';


export const getOperations = () => async (dispatch) => {
  try {
    dispatch(getItemsRequestAction());

    const result = await request({
      url: '/operations',
      method: 'get',
    });

    dispatch(getItemsRequestSuccessAction(result));
  }
  catch (error) {
    dispatch(getItemsRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      title: 'Ошибка при запросе данных',
      connect: `${error['data']['message']} (${error['data']['code']})`,
      mode: Mode.DANGER,
      autoClose: false,
    }));
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

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      title: 'Ошибка при запросе данных',
      connect: `${error['data']['message']} (${error['data']['code']})`,
      mode: Mode.DANGER,
      autoClose: false,
    }));
  }
};
