
import request from '@ui.packages/request';
import { closeDialog } from '@ui.packages/dialog';
import { pushNotification } from '@ui.packages/notifications';

import {
  getCategoriesRequestAction,
  getCategoriesRequestFailAction,
  getCategoriesRequestSuccessAction,

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


export const getCategories = () => async (dispatch) => {
  try {
    dispatch(getCategoriesRequestAction());

    const { data } = await request({
      url: '/categories',
      method: 'get',
    });

    dispatch(getCategoriesRequestSuccessAction(data));
  }
  catch(error) {

    dispatch(getCategoriesRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка получения списка "Категория"'
    }));
  }
};

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

    const result = await request({
      url: '/types',
      method: 'post',
      data,
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

    const result = await request({
      url: '/types/' + data['id'],
      method: 'put',
      data,
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
