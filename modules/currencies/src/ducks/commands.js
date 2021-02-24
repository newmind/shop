
import { UnauthorizedError } from '@packages/errors';

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

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка получения списка "Валюта"'
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
      title: 'Операция выполнена успешно'
    }));
  }
  catch(error) {
    dispatch(createCurrencyRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка создания "Валюты"'
    }));
  }
};

export const updateCurrency = (data) => async (dispatch) => {
  try {
    dispatch(updateCurrencyRequestAction());

    const result = await request({
      url: '/currencies/' + data['id'],
      method: 'put',
      data,
    });

    dispatch(updateCurrencyRequestSuccessAction(result['data']));
    dispatch(closeDialog('currency'));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция выполнена успешно'
    }));
  }
  catch(error) {
    dispatch(updateCurrencyRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка обновления "Валюты"'
    }));
  }
};

export const deleteCurrencies = (id) => async (dispatch) => {
  try {
    dispatch(deleteCurrencyRequestAction());

    const { data } = await request({
      url: '/currencies',
      method: 'delete',
      data: { id },
    });

    dispatch(deleteCurrencyRequestSuccessAction(data));
    dispatch(pushNotification({
      mode: 'success',
      title: 'Операция выполнена успешно'
    }));
  }
  catch(error) {
    dispatch(deleteCurrencyRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка удаления "Валюты"'
    }));
  }
};
