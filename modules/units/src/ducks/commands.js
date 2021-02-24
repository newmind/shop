
import { UnauthorizedError } from '@packages/errors';

import request from '@ui.packages/request';
import { closeDialog } from '@ui.packages/dialog';
import { pushNotification } from '@ui.packages/notifications';

import {
  getUnitsRequestAction,
  getUnitsRequestFailAction,
  getUnitsRequestSuccessAction,

  createUnitRequestAction,
  createUnitRequestFailAction,
  createUnitRequestSuccessAction,

  updateUnitRequestAction,
  updateUnitRequestFailAction,
  updateUnitRequestSuccessAction,

  deleteUnitRequestAction,
  deleteUnitRequestFailAction,
  deleteUnitRequestSuccessAction,
} from './slice';


export const getUnits = () => async (dispatch) => {
  try {
    dispatch(getUnitsRequestAction());

    const { data } = await request({
      url: '/units',
      method: 'get',
    });

    dispatch(getUnitsRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(getUnitsRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка получения списка "Единица измерения"'
    }));
  }
};

export const createUnit = (data) => async (dispatch) => {
  try {
    dispatch(createUnitRequestAction());

    const result = await request({
      url: '/units',
      method: 'post',
      data,
    });

    dispatch(createUnitRequestSuccessAction(result['data']));
    dispatch(closeDialog('unit'));
  }
  catch(error) {
    dispatch(createUnitRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
  }
};

export const updateUnit = (data) => async (dispatch) => {
  try {
    dispatch(updateUnitRequestAction());

    const result = await request({
      url: '/units/' + data['id'],
      method: 'put',
      data,
    });

    dispatch(updateUnitRequestSuccessAction(result['data']));
    dispatch(closeDialog('unit'));
  }
  catch(error) {
    dispatch(updateUnitRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
  }
};

export const deleteUnit = (id) => async (dispatch) => {
  try {
    dispatch(deleteUnitRequestAction());

    const result = await request({
      url: '/units',
      method: 'delete',
      data: { id }
    });

    dispatch(deleteUnitRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(deleteUnitRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
  }
};
