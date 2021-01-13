
import request from '@ui.packages/request';
import { closeDialog } from '@ui.packages/dialog';
import { pushNotification } from '@ui.packages/notifications';

import {
  getCategoriesRequestAction,
  getCategoriesRequestFailAction,
  getCategoriesRequestSuccessAction,

  createCategoryRequestAction,
  createCategoryRequestFailAction,
  createCategoryRequestSuccessAction,

  updateCategoryRequestAction,
  updateCategoryRequestFailAction,
  updateCategoryRequestSuccessAction,

  deleteCategoryRequestAction,
  deleteCategoryRequestFailAction,
  deleteCategoryRequestSuccessAction,
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
      content: 'Ошибка получения списка "Тип"'
    }));
  }
};

export const createCategory = (data) => async (dispatch) => {
  try {
    dispatch(createCategoryRequestAction());

    const formData = new FormData();

    formData.append('value', data['value']);
    formData.append('description', data['description'] || '');
    formData.append('file', data['file']);

    const result = await request({
      url: '/categories',
      method: 'post',
      data: formData,
    });

    dispatch(createCategoryRequestSuccessAction(result['data']));
    dispatch(closeDialog('category'));
  }
  catch(error) {
    dispatch(createCategoryRequestFailAction(error));
  }
};

export const updateCategory = (data) => async (dispatch) => {
  try {
    dispatch(updateCategoryRequestAction());

    const formData = new FormData();

    formData.append('value', data['value']);
    formData.append('description', data['description'] || '');
    data['imageId'] && formData.append('imageId', data['imageId']);
    formData.append('updatedAt', data['updatedAt']);
    formData.append('file', data['file']);

    const result = await request({
      url: '/categories/' + data['id'],
      method: 'put',
      data: formData,
    });

    dispatch(updateCategoryRequestSuccessAction(result['data']));
    dispatch(closeDialog('category'));
  }
  catch(error) {
    dispatch(updateCategoryRequestFailAction(error));
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch(deleteCategoryRequestAction());

    const result = await request({
      url: '/categories',
      method: 'delete',
      data: { id }
    });

    dispatch(deleteCategoryRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(deleteCategoryRequestFailAction(error));
  }
};
