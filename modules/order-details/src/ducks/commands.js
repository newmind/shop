
import { Mode } from "@ui.packages/types";
import request from '@ui.packages/request';
import { pushNotification } from "@ui.packages/notifications";

import {
  getOrderRequestAction,
  getOrderRequestFailAction,
  getOrderRequestSuccessAction,
} from './slice';


export const getOperation = (id) => async (dispatch) => {
  try {
    dispatch(getOrderRequestAction());

    const result = await request({
      url: '/operations/' + id,
      method: 'get',
    });

    dispatch(getOrderRequestSuccessAction(result['data']));
  }
  catch (error) {

    dispatch(getOrderRequestFailAction(error));
    dispatch(pushNotification({
      title: 'Ошибка при запросе данных',
      connect: `${error['data']['message']} (${error['data']['code']})`,
      mode: Mode.DANGER,
      autoClose: false,
    }));
  }
};
