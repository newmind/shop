
import { UnauthorizedError } from '@packages/errors';

import { Mode } from '@ui.packages/types';
import request from '@ui.packages/request';
import { pushNotification } from "@ui.packages/notifications";

import {
  getProfileRequestAction,
  getProfileRequestFailAction,
  getProfileRequestSuccessAction,

  updateUserRequestAction,
  updateUserRequestFailAction,
  updateUserRequestSuccessAction,

  updateCustomerRequestAction,
  updateCustomerRequestFailAction,
  updateCustomerRequestSuccessAction,
} from './slice';


export const getSettings = () => async (dispatch) => {
  try {
    dispatch(getProfileRequestAction());

    const { data } = await request({
      method: 'get',
      url: `/settings`,
    });

    dispatch(getProfileRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(getProfileRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }

    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при выполнении операции'
    }));
  }
};

export const changeLogin = (data) => async (dispatch) => {
  try {
    dispatch(updateUserRequestAction());

    await request({
      method: 'put',
      url: '/profile/' + data['id'],
      data: {
        login: data['login'],
      },
    });

    dispatch(updateUserRequestSuccessAction(data));
    dispatch(pushNotification({
      mode: Mode.SUCCESS,
      title: 'Данные успешно обновлены'
    }));
  }
  catch(error) {
    dispatch(updateUserRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }

    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при выполнении операции'
    }));
  }
};

export const updateUserData = (data) => async (dispatch) => {
  try {
    dispatch(updateCustomerRequestAction());

    const result = await request({
      url: '/customers/' + data['id'],
      method: 'put',
      data: {
        ...data
      },
    });

    dispatch(updateCustomerRequestSuccessAction(result['data']));
    dispatch(pushNotification({
      mode: Mode.SUCCESS,
      title: 'Данные успешно обновлены'
    }));
  }
  catch(error) {
    dispatch(updateCustomerRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }

    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при выполнении операции'
    }));
  }
};
