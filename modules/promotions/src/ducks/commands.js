
import { UnauthorizedError } from '@packages/errors';

import request from '@ui.packages/request';
import { closeDialog } from '@ui.packages/dialog';
import { pushNotification } from '@ui.packages/notifications';

import {
  getPromotionsRequestAction,
  getPromotionsRequestFailAction,
  getPromotionsRequestSuccessAction,

  createPromotionRequestAction,
  createPromotionRequestFailAction,
  createPromotionRequestSuccessAction,

  updatePromotionRequestAction,
  updatePromotionRequestFailAction,
  updatePromotionRequestSuccessAction,

  deletePromotionRequestAction,
  deletePromotionRequestFailAction,
  deletePromotionRequestSuccessAction,
} from './slice';


export const getPromotions = () => async (dispatch) => {
  try {
    dispatch(getPromotionsRequestAction());

    const { data } = await request({
      url: '/promotions',
      method: 'get',
    });

    dispatch(getPromotionsRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(getPromotionsRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции'
    }));
  }
};

export const createPromotion = (formData) => async (dispatch) => {
  try {
    dispatch(createPromotionRequestAction());

    const result = await request({
      url: '/promotions',
      method: 'post',
      data: formData,
    });

    dispatch(createPromotionRequestSuccessAction(result['data']));
    dispatch(closeDialog('promotion'));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция выполнена успешно'
    }));
  }
  catch(error) {
    dispatch(createPromotionRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка выполнения операции'
    }));
  }
};

export const updatePromotion = (formData) => async (dispatch) => {
  try {
    dispatch(updatePromotionRequestAction());

    const result = await request({
      url: '/promotions/' + formData['id'],
      method: 'put',
      data: formData,
    });

    dispatch(updatePromotionRequestSuccessAction(result['data']));
    dispatch(closeDialog('promotion'));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция выполнена успешно'
    }));
  }
  catch(error) {
    dispatch(updatePromotionRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка выполнения операции'
    }));
  }
};

export const deletePromotions = (id) => async (dispatch) => {
  try {
    dispatch(deletePromotionRequestAction());

    const { data } = await request({
      url: '/promotions',
      method: 'delete',
      data: { id },
    });

    dispatch(deletePromotionRequestSuccessAction(data));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция выполнена успешно'
    }));
  }
  catch(error) {
    dispatch(deletePromotionRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка выполнения операции'
    }));
  }
};
