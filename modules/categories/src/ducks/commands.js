
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
      title: 'Ошибка получения списка "Категория"'
    }));
  }
};

export const createCategory = (formData) => async (dispatch) => {
  try {
    dispatch(createCategoryRequestAction());

    const { data } = await request({
      url: '/categories',
      method: 'post',
      data: formData,
    });

    dispatch(createCategoryRequestSuccessAction(data));
    dispatch(closeDialog('category'));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Категория успешно добавлена'
    }));
  }
  catch(error) {
    dispatch(createCategoryRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка создания "Категории"'
    }));
  }
};

export const updateCategory = (formData) => async (dispatch) => {
  try {
    dispatch(updateCategoryRequestAction());

    const { data } = await request({
      url: '/categories/' + formData['id'],
      method: 'put',
      data: formData,
    });

    dispatch(updateCategoryRequestSuccessAction(data));
    dispatch(closeDialog('category'));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Категория успешно обновлена'
    }));
  }
  catch(error) {
    dispatch(updateCategoryRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка обновления "Категории"'
    }));
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch(deleteCategoryRequestAction());

    const { data } = await request({
      url: '/categories',
      method: 'delete',
      data: { id }
    });

    dispatch(deleteCategoryRequestSuccessAction(data));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Категория успешно удалена'
    }));
  }
  catch(error) {
    dispatch(deleteCategoryRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка удаления "Категории"'
    }));
  }
};
