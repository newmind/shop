
import request from '@ui.packages/request';
import { closeDialog } from '@ui.packages/dialog';
import { pushNotification } from '@ui.packages/notifications';

import {
  getFormsRequestAction,
  getFormsRequestFailAction,
  getFormsRequestSuccessAction,

  createFormRequestAction,
  createFormRequestFailAction,
  createFormRequestSuccessAction,

  updateFormRequestAction,
  updateFormRequestFailAction,
  updateFormRequestSuccessAction,

  deleteFormRequestAction,
  deleteFormRequestFailAction,
  deleteFormRequestSuccessAction,
} from './slice';


export const getForms = () => async (dispatch) => {
  try {
    dispatch(getFormsRequestAction());

    const { data } = await request({
      url: '/forms',
      method: 'get',
    });

    dispatch(getFormsRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(getFormsRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка получения списка "Форма"'
    }));
  }
};

export const createForm = (data) => async (dispatch) => {
  try {
    dispatch(createFormRequestAction());

    const result = await request({
      url: '/forms',
      method: 'post',
      data,
    });

    dispatch(createFormRequestSuccessAction(result['data']));
    dispatch(closeDialog('form'));
  }
  catch(error) {
    dispatch(createFormRequestFailAction(error));
  }
};

export const updateForm = (data) => async (dispatch) => {
  try {
    dispatch(updateFormRequestAction());

    const result = await request({
      url: '/forms/' + data['id'],
      method: 'put',
      data,
    });

    dispatch(updateFormRequestSuccessAction(result['data']));
    dispatch(closeDialog('form'));
  }
  catch(error) {
    dispatch(updateFormRequestFailAction(error));
  }
};

export const deleteForm = (id) => async (dispatch) => {
  try {
    dispatch(deleteFormRequestAction());

    const result = await request({
      url: '/forms',
      method: 'delete',
      data: { id }
    });

    dispatch(deleteFormRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(deleteFormRequestFailAction(error));
  }
};
