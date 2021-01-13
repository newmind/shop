
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
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка получения списка "Тип"'
    }));
  }
};

export const createType = (data) => async (dispatch) => {
  try {
    dispatch(createTypeRequestAction());

    const formData = new FormData();

    formData.append('value', data['value']);
    formData.append('description', data['description'] || '');
    formData.append('file', data['file']);

    const result = await request({
      url: '/types',
      method: 'post',
      data: formData,
    });

    dispatch(createTypeRequestSuccessAction(result['data']));
    dispatch(closeDialog('type'));
  }
  catch(error) {
    dispatch(createTypeRequestFailAction(error));
  }
};

export const updateType = (data) => async (dispatch) => {
  try {
    dispatch(updateTypeRequestAction());

    const formData = new FormData();

    formData.append('value', data['value']);
    formData.append('description', data['description'] || '');
    data['imageId'] && formData.append('imageId', data['imageId']);
    formData.append('updatedAt', data['updatedAt']);
    formData.append('file', data['file']);

    const result = await request({
      url: '/types/' + data['id'],
      method: 'put',
      data: formData,
    });

    dispatch(updateTypeRequestSuccessAction(result['data']));
    dispatch(closeDialog('type'));
  }
  catch(error) {
    dispatch(updateTypeRequestFailAction(error));
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
  }
  catch(error) {
    dispatch(deleteTypeRequestFailAction(error));
  }
};
