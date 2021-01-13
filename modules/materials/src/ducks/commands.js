
import request from '@ui.packages/request';
import { closeDialog } from '@ui.packages/dialog';
import { pushNotification } from '@ui.packages/notifications';

import {
  getMaterialsRequestAction,
  getMaterialsRequestFailAction,
  getMaterialsRequestSuccessAction,

  createMaterialRequestAction,
  createMaterialRequestFailAction,
  createMaterialRequestSuccessAction,

  updateMaterialRequestAction,
  updateMaterialRequestFailAction,
  updateMaterialRequestSuccessAction,

  deleteMaterialRequestAction,
  deleteMaterialRequestFailAction,
  deleteMaterialRequestSuccessAction,
} from './slice';


export const getMaterials = () => async (dispatch) => {
  try {
    dispatch(getMaterialsRequestAction());

    const { data } = await request({
      url: '/materials',
      method: 'get',
    });

    dispatch(getMaterialsRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(getMaterialsRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка получения списка "Тип"'
    }));
  }
};

export const createMaterial = (data) => async (dispatch) => {
  try {
    dispatch(createMaterialRequestAction());

    const result = await request({
      url: '/materials',
      method: 'post',
      data,
    });

    dispatch(createMaterialRequestSuccessAction(result['data']));
    dispatch(closeDialog('material'));
  }
  catch(error) {
    dispatch(createMaterialRequestFailAction(error));
  }
};

export const updateMaterial = (data) => async (dispatch) => {
  try {
    dispatch(updateMaterialRequestAction());

    const result = await request({
      url: '/materials/' + data['id'],
      method: 'put',
      data,
    });

    dispatch(updateMaterialRequestSuccessAction(result['data']));
    dispatch(closeDialog('material'));
  }
  catch(error) {
    dispatch(updateMaterialRequestFailAction(error));
  }
};

export const deleteMaterial = (id) => async (dispatch) => {
  try {
    dispatch(deleteMaterialRequestAction());

    const result = await request({
      url: '/materials',
      method: 'delete',
      data: { id }
    });

    dispatch(deleteMaterialRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(deleteMaterialRequestFailAction(error));
  }
};
