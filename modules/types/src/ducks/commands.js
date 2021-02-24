
import { UnauthorizedError } from '@packages/errors';

import request from '@ui.packages/request';
import { closeDialog } from '@ui.packages/dialog';
import { pushNotification } from '@ui.packages/notifications';

import {
  getTypesRequestAction,
  getTypesRequestFailAction,
  getTypesRequestSuccessAction,

  createTypeRequestAction,
  createTypeRequestFailAction,
  createTypeRequestSuccessAction,

  updateTypeRequestAction,
  updateTypeRequestFailAction,
  updateTypeRequestSuccessAction,

  deleteTypeRequestAction,
  deleteTypeRequestFailAction,
  deleteTypeRequestSuccessAction,
} from './slice';


export const getTypes = () => async (dispatch) => {
  try {
    dispatch(getTypesRequestAction());

    const { data } = await request({
      url: '/types',
      method: 'get',
    });

    dispatch(getTypesRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(getTypesRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка при выполнении операции'
    }));
  }
};

export const createType = (data) => async (dispatch) => {
  try {
    dispatch(createTypeRequestAction());

    const result = await request({
      url: '/types',
      method: 'post',
      data,
    });

    dispatch(createTypeRequestSuccessAction(result['data']));
    dispatch(closeDialog('type'));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция успешно выполнена',
    }));
  }
  catch(error) {
    dispatch(createTypeRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции'
    }));
  }
};

export const updateType = (data) => async (dispatch) => {
  try {
    dispatch(updateTypeRequestAction());

    const result = await request({
      url: '/types/' + data['id'],
      method: 'put',
      data,
    });

    dispatch(updateTypeRequestSuccessAction(result['data']));
    dispatch(closeDialog('type'));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция успешно выполнена',
    }));
  }
  catch(error) {
    dispatch(updateTypeRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции'
    }));
  }
};

export const deleteTypes = (id) => async (dispatch) => {
  try {
    dispatch(deleteTypeRequestAction());

    const result = await request({
      url: '/types',
      method: 'delete',
      data: { id }
    });

    dispatch(deleteTypeRequestSuccessAction(result['data']));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция успешно выполнена',
    }));
  }
  catch(error) {
    dispatch(deleteTypeRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции'
    }));
  }
};
