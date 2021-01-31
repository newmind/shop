
import request from '@ui.packages/request';
import { closeDialog } from '@ui.packages/dialog';
import { pushNotification } from '@ui.packages/notifications';
import { UUID } from '@ui.packages/utils';

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
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при выполнении операции'
    }));
  }
};

export const createPromotion = (data) => async (dispatch) => {
  try {
    dispatch(createPromotionRequestAction());

    const uuid = UUID();

    const result = await request({
      url: '/promotions',
      method: 'post',
      data: {
        uuid,
        ...data,
      },
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
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка выполнения операции'
    }));
  }
};

export const updatePromotion = (data) => async (dispatch) => {
  try {
    dispatch(updatePromotionRequestAction());

    const result = await request({
      url: '/promotions/' + data['uuid'],
      method: 'put',
      data,
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
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка выполнения операции'
    }));
  }
};

export const deletePromotions = (uuid) => async (dispatch) => {
  try {
    dispatch(deletePromotionRequestAction());

    const { data } = await request({
      url: '/promotions',
      method: 'delete',
      data: { uuid }
    });

    dispatch(deletePromotionRequestSuccessAction(data));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция выполнена успешно'
    }));
  }
  catch(error) {
    dispatch(deletePromotionRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка выполнения операции'
    }));
  }
};
