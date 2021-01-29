
import request from '@ui.packages/request';
import { closeDialog } from '@ui.packages/dialog';
import { pushNotification } from '@ui.packages/notifications';

import {
  getUnitsRequestAction,
  getUnitsRequestFailAction,
  getUnitsRequestSuccessAction,

  getItemsRequestAction,
  getItemsRequestFailAction,
  getItemsRequestSuccessAction,

  createItemRequestAction,
  createItemRequestFailAction,
  createItemRequestSuccessAction,

  updateItemRequestAction,
  updateItemRequestFailAction,
  updateItemRequestSuccessAction,

  deleteItemRequestAction,
  deleteItemRequestFailAction,
  deleteItemRequestSuccessAction,
} from './slice';


export const getUnits = () => async (dispatch) => {
  try {
    dispatch(getUnitsRequestAction());

    const result = await request({
      url: '/units',
      method: 'get',
    });

    dispatch(getUnitsRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(getUnitsRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка получения списка "Размерности"'
    }));
  }
};

export const getItems = () => async (dispatch) => {
  try {
    dispatch(getItemsRequestAction());

    const result = await request({
      url: '/attributes',
      method: 'get',
    });

    dispatch(getItemsRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(getItemsRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка получения списка "Аттрибутов"'
    }));
  }
};

export const createItem = (formData) => async (dispatch) => {
  try {
    dispatch(createItemRequestAction());

    const { data } = await request({
      url: '/attributes',
      method: 'post',
      data: {
        value: formData['value'],
        unit: formData['unit'] || null,
        description: formData['description'] || null,
      },
    });

    dispatch(createItemRequestSuccessAction(data));
    dispatch(closeDialog('attribute'));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Аттрибут успешно добавлен'
    }));
  }
  catch(error) {
    dispatch(createItemRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка создания "Аттрибута"'
    }));
  }
};

export const updateItem = (formData) => async (dispatch) => {
  try {
    dispatch(updateItemRequestAction());

    const { data } = await request({
      url: '/attributes/' + formData['id'],
      method: 'put',
      data: {
        value: formData['value'],
        unit: formData['unit'] || null,
        description: formData['description'] || null,
      },
    });

    dispatch(updateItemRequestSuccessAction(data));
    dispatch(closeDialog('attribute'));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Аттрибут успешно обновлен'
    }));
  }
  catch(error) {
    dispatch(updateItemRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка обновления "Аттрибута"'
    }));
  }
};

export const deleteItem = (ids) => async (dispatch) => {
  try {
    dispatch(deleteItemRequestAction());

    await request({
      url: '/attributes',
      method: 'delete',
      data: { id: ids }
    });

    dispatch(deleteItemRequestSuccessAction(ids));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Аттрибут успешно удален'
    }));
  }
  catch(error) {
    dispatch(deleteItemRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка удаления "Аттрибута"'
    }));
  }
};
