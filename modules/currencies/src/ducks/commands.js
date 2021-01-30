
import request from '@ui.packages/request';
import { closeDialog } from '@ui.packages/dialog';
import { pushNotification } from '@ui.packages/notifications';

import {
  getCurrenciesRequestAction,
  getCurrenciesRequestFailAction,
  getCurrenciesRequestSuccessAction,

  createCurrencyRequestAction,
  createCurrencyRequestFailAction,
  createCurrencyRequestSuccessAction,

  updateCurrencyRequestAction,
  updateCurrencyRequestFailAction,
  updateCurrencyRequestSuccessAction,

  deleteCurrencyRequestAction,
  deleteCurrencyRequestFailAction,
  deleteCurrencyRequestSuccessAction,
} from './slice';


export const getCurrencies = () => async (dispatch) => {
  try {
    dispatch(getCurrenciesRequestAction());

    const { data } = await request({
      url: '/currencies',
      method: 'get',
    });

    dispatch(getCurrenciesRequestSuccessAction(data));
  }
  catch(error) {

    dispatch(getCurrenciesRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка получения списка "Валюта"'
    }));
  }
};

export const createCurrency = (data) => async (dispatch) => {
  try {
    dispatch(createCurrencyRequestAction());

    const result = await request({
      url: '/currencies',
      method: 'post',
      data,
    });

    dispatch(createCurrencyRequestSuccessAction(result['data']));
    dispatch(closeDialog('currency'));
    dispatch(pushNotification({
      mode: 'success',
      content: 'Операция выполнена успешно'
    }));
  }
  catch(error) {
    dispatch(createCurrencyRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка создания "Валюты"'
    }));
  }
};

export const updateCurrency = (data) => async (dispatch) => {
  try {
    dispatch(updateCurrencyRequestAction());

    const result = await request({
      url: '/currencies/' + data['uuid'],
      method: 'put',
      data,
    });

    dispatch(updateCurrencyRequestSuccessAction(result['data']));
    dispatch(closeDialog('currency'));
    dispatch(pushNotification({
      mode: 'success',
      content: 'Операция выполнена успешно'
    }));
  }
  catch(error) {
    dispatch(updateCurrencyRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка обновления "Валюты"'
    }));
  }
};

export const deleteCurrencies = (uuid) => async (dispatch) => {
  try {
    dispatch(deleteCurrencyRequestAction());

    const { data } = await request({
      url: '/currencies',
      method: 'delete',
      data: { uuid }
    });

    dispatch(deleteCurrencyRequestSuccessAction(data));
    dispatch(pushNotification({
      mode: 'success',
      content: 'Операция выполнена успешно'
    }));
  }
  catch(error) {
    dispatch(deleteCurrencyRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка удаления "Валюты"'
    }));
  }
};
