
import request from '@ui.packages/request';
import { closeDialog } from '@ui.packages/dialog';
import { pushNotification } from '@ui.packages/notifications';

import {
  getColorsRequestAction,
  getColorsRequestFailAction,
  getColorsRequestSuccessAction,

  createColorRequestAction,
  createColorRequestFailAction,
  createColorRequestSuccessAction,

  updateColorRequestAction,
  updateColorRequestFailAction,
  updateColorRequestSuccessAction,

  deleteColorRequestAction,
  deleteColorRequestFailAction,
  deleteColorRequestSuccessAction,
} from './slice';


export const getColors = () => async (dispatch) => {
  try {
    dispatch(getColorsRequestAction());

    const { data } = await request({
      url: '/colors',
      method: 'get',
    });

    dispatch(getColorsRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(getColorsRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка получения списка "Тип"'
    }));
  }
};

export const createColor = (data) => async (dispatch) => {
  try {
    dispatch(createColorRequestAction());

    const result = await request({
      url: '/colors',
      method: 'post',
      data,
    });

    dispatch(createColorRequestSuccessAction(result['data']));
    dispatch(closeDialog('color'));
  }
  catch(error) {
    dispatch(createColorRequestFailAction(error));
  }
};

export const updateColor = (data) => async (dispatch) => {
  try {
    dispatch(updateColorRequestAction());

    const result = await request({
      url: '/colors/' + data['id'],
      method: 'put',
      data,
    });

    dispatch(updateColorRequestSuccessAction(result['data']));
    dispatch(closeDialog('color'));
  }
  catch(error) {
    dispatch(updateColorRequestFailAction(error));
  }
};

export const deleteColor = (id) => async (dispatch) => {
  try {
    dispatch(deleteColorRequestAction());

    const result = await request({
      url: '/colors',
      method: 'delete',
      data: { id }
    });

    dispatch(deleteColorRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(deleteColorRequestFailAction(error));
  }
};
