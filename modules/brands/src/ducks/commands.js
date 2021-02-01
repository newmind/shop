
import request from '@ui.packages/request';
import { closeDialog } from '@ui.packages/dialog';
import { pushNotification } from '@ui.packages/notifications';

import {
  getBrandsRequestAction,
  getBrandsRequestFailAction,
  getBrandsRequestSuccessAction,

  createBrandRequestAction,
  createBrandRequestFailAction,
  createBrandRequestSuccessAction,

  updateBrandRequestAction,
  updateBrandRequestFailAction,
  updateBrandRequestSuccessAction,

  deleteBrandRequestAction,
  deleteBrandRequestFailAction,
  deleteBrandRequestSuccessAction,
} from './slice';


export const getBrands = () => async (dispatch) => {
  try {
    dispatch(getBrandsRequestAction());

    const { data } = await request({
      url: '/brands',
      method: 'get',
    });

    dispatch(getBrandsRequestSuccessAction(data));
  }
  catch(error) {

    dispatch(getBrandsRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка получения списка "Валюта"'
    }));
  }
};

export const createBrand = (data) => async (dispatch) => {
  try {
    dispatch(createBrandRequestAction());

    const result = await request({
      url: '/brands',
      method: 'post',
      data,
    });

    dispatch(createBrandRequestSuccessAction(result['data']));
    dispatch(closeDialog('currency'));
    dispatch(pushNotification({
      mode: 'success',
      content: 'Операция выполнена успешно'
    }));
  }
  catch(error) {
    dispatch(createBrandRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка создания "Валюты"'
    }));
  }
};

export const updateBrand = (data) => async (dispatch) => {
  try {
    dispatch(updateBrandRequestAction());

    const result = await request({
      url: '/brands/' + data['id'],
      method: 'put',
      data,
    });

    dispatch(updateBrandRequestSuccessAction(result['data']));
    dispatch(closeDialog('currency'));
    dispatch(pushNotification({
      mode: 'success',
      content: 'Операция выполнена успешно'
    }));
  }
  catch(error) {
    dispatch(updateBrandRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка обновления "Валюты"'
    }));
  }
};

export const deleteBrands = (id) => async (dispatch) => {
  try {
    dispatch(deleteBrandRequestAction());

    const { data } = await request({
      url: '/brands',
      method: 'delete',
      data: { id }
    });

    dispatch(deleteBrandRequestSuccessAction(data));
    dispatch(pushNotification({
      mode: 'success',
      content: 'Операция выполнена успешно'
    }));
  }
  catch(error) {
    dispatch(deleteBrandRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка удаления "Валюты"'
    }));
  }
};
